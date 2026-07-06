#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  composeWebsiteDescription,
  composeWebsiteNote,
  effectInboxSchema,
  generatedEffectNameForInbox,
  isKnownNotionCategory,
  isPlaceholderEffectName,
  notionApiVersionFromEnv,
  sourceNameFromUrl,
  websiteCategorySlugForNotionCategory
} from "../src/lib/notion/effectInboxSchema.ts";
import type { DesignEffect, EffectCategory } from "../src/types/effect.ts";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };
type NotionProperty = { type: string; [key: string]: unknown };

interface RichText {
  plain_text?: string;
  href?: string | null;
}

interface NotionPage {
  id: string;
  url?: string;
  properties: Record<string, NotionProperty>;
}

interface ParsedInboxPage {
  id: string;
  rawTitle: string;
  title: string;
  slug: string;
  category: EffectCategory | null;
  sourceUrl: string | null;
  websiteDescription: string;
  note: string;
  bodyText: string[];
  warnings: string[];
}

interface SyncResult {
  page: ParsedInboxPage;
  status: "success" | "skipped" | "failed";
  reason: string;
}

const notionBaseUrl = "https://api.notion.com/v1";
const generatedFile = path.resolve(process.cwd(), "src", "data", "effects", "notion-inbox.ts");
const effectsRegistryFile = path.resolve(process.cwd(), "src", "data", "effects.ts");
const localPathPattern =
  /(?:[A-Za-z]:[\\/][^\s"'<>]+|\\\\[^\s"'<>]+\\[^\s"'<>]+|(?:~|\.{1,2})[\\/][^\s"'<>]+|\/(?:Users|Volumes|home|mnt|var|tmp|opt)\/[^\s"'<>]+)/g;

function printHelp() {
  console.log(`Sync Notion Effect Inbox records into Design Atlas.

Usage:
  npm run effects:inbox:sync -- --write

Safety:
  Without --write, this script only prints what it would do.
  With --write, it updates src/data/effects/notion-inbox.ts and marks successful Notion pages as 已新增.
`);
}

function loadLocalEnv() {
  const envFiles = [
    process.env.NOTION_ENV_FILE,
    ".env.local",
    ".env",
    path.resolve(process.cwd(), "..", "Key", ".env.local")
  ].filter(isNonEmptyString);

  for (const filename of envFiles) {
    const filePath = path.resolve(process.cwd(), filename);
    if (!existsSync(filePath)) continue;

    const text = readFileSync(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const equalsIndex = trimmed.indexOf("=");
      if (equalsIndex === -1) continue;

      const key = trimmed.slice(0, equalsIndex).trim();
      const rawValue = trimmed.slice(equalsIndex + 1).trim();
      if (process.env[key]) continue;

      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }
}

function parseArgs(argv: string[]) {
  return {
    help: argv.includes("--help") || argv.includes("-h"),
    write: argv.includes("--write")
  };
}

function asObject(value: JsonValue): JsonObject {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Expected a JSON object from Notion.");
  }
  return value;
}

async function notionRequest(pathname: string, options: RequestInit = {}) {
  const token = process.env[effectInboxSchema.tokenEnv];
  if (!token) {
    throw new Error(`Missing ${effectInboxSchema.tokenEnv}. Add it to .env.local, ../Key/.env.local, or your shell environment.`);
  }

  const response = await fetch(`${notionBaseUrl}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": notionApiVersionFromEnv(process.env[effectInboxSchema.apiVersionEnv]),
      ...options.headers
    }
  });

  const text = await response.text();
  const body = text ? asObject(JSON.parse(text) as JsonValue) : {};

  if (!response.ok) {
    const message = typeof body.message === "string" ? body.message : response.statusText;
    throw new Error(`Notion API ${response.status} ${response.statusText}: ${message}`);
  }

  return body;
}

async function resolveDataSourceId() {
  const explicitDataSourceId = process.env[effectInboxSchema.dataSourceIdEnv];
  if (explicitDataSourceId) return explicitDataSourceId;

  const databaseId = process.env[effectInboxSchema.databaseIdEnv];
  if (!databaseId) {
    throw new Error(`Missing ${effectInboxSchema.databaseIdEnv}. Add it to .env.local, ../Key/.env.local, or your shell environment.`);
  }

  const database = await notionRequest(`/databases/${databaseId}`);
  const dataSources = Array.isArray(database.data_sources) ? database.data_sources : [];
  const firstDataSource = dataSources[0];
  if (!firstDataSource || typeof firstDataSource !== "object" || !("id" in firstDataSource)) {
    throw new Error(`Could not resolve a data source. Set ${effectInboxSchema.dataSourceIdEnv} explicitly.`);
  }

  return String(firstDataSource.id);
}

async function queryReadyPages(dataSourceId: string) {
  const pages: NotionPage[] = [];
  let startCursor: string | null = null;

  do {
    const body = await notionRequest(`/data_sources/${dataSourceId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: effectInboxSchema.fields.status.notionName,
          status: { equals: effectInboxSchema.statuses.ready }
        },
        page_size: 100,
        start_cursor: startCursor ?? undefined
      })
    });

    const results = Array.isArray(body.results) ? body.results : [];
    pages.push(...(results as unknown as NotionPage[]));
    startCursor = typeof body.next_cursor === "string" ? body.next_cursor : null;
  } while (startCursor);

  return pages;
}

async function readPageBodyText(pageId: string) {
  const text: string[] = [];
  let startCursor: string | null = null;

  do {
    const body = await notionRequest(
      `/blocks/${pageId}/children?page_size=100${startCursor ? `&start_cursor=${encodeURIComponent(startCursor)}` : ""}`
    );
    const results = Array.isArray(body.results) ? body.results : [];

    for (const block of results as JsonObject[]) {
      text.push(...textFromBlock(block));
    }

    startCursor = typeof body.next_cursor === "string" ? body.next_cursor : null;
  } while (startCursor);

  return text.filter(Boolean);
}

function textFromBlock(block: JsonObject) {
  const type = typeof block.type === "string" ? block.type : "";
  const typedBlock = block[type];
  if (!typedBlock || typeof typedBlock !== "object" || Array.isArray(typedBlock)) return [];

  const values: string[] = [];
  if ("rich_text" in typedBlock && Array.isArray(typedBlock.rich_text)) {
    values.push(plainText(typedBlock.rich_text as RichText[]));
  }
  if ("caption" in typedBlock && Array.isArray(typedBlock.caption)) {
    values.push(plainText(typedBlock.caption as RichText[]));
  }
  if ("url" in typedBlock && isNonEmptyString(typedBlock.url)) {
    values.push(typedBlock.url);
  }

  return values.filter(Boolean);
}

function property(page: NotionPage, key: keyof typeof effectInboxSchema.fields) {
  return page.properties[effectInboxSchema.fields[key].notionName];
}

function titlePropertyText(value: NotionProperty | undefined) {
  return value?.type === "title" ? plainText(richTextArray(value.title)) : "";
}

function richTextPropertyText(value: NotionProperty | undefined) {
  return value?.type === "rich_text" ? plainText(richTextArray(value.rich_text)) : "";
}

function selectPropertyName(value: NotionProperty | undefined) {
  if (value?.type !== "select" || !isJsonObject(value.select)) return null;
  return isNonEmptyString(value.select.name) ? value.select.name : null;
}

function urlPropertyValue(value: NotionProperty | undefined) {
  return value?.type === "url" && isNonEmptyString(value.url) ? value.url : null;
}

function plainText(items: RichText[]) {
  return items.map((item) => item.plain_text ?? "").join("").trim();
}

function richTextArray(value: unknown): RichText[] {
  return Array.isArray(value) ? (value as RichText[]) : [];
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isJsonObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function parseInboxPage(page: NotionPage): Promise<ParsedInboxPage> {
  const sourceUrl = urlPropertyValue(property(page, "sourceUrl"));
  const rawTitle = titlePropertyText(property(page, "effectName"));
  const categoryName = selectPropertyName(property(page, "category"));
  const category = websiteCategorySlugForNotionCategory(categoryName) as EffectCategory | null;
  const description = richTextPropertyText(property(page, "description"));
  const note = composeWebsiteNote(richTextPropertyText(property(page, "note")) || sourceNameFromUrl(sourceUrl), sourceUrl);
  const bodyText = await readPageBodyText(page.id);
  const title = generatedEffectNameForInbox({ currentName: rawTitle, sourceUrl, description, bodyText });
  const websiteDescription = composeWebsiteDescription(description, sourceUrl);
  const warnings: string[] = [];

  if (!title) warnings.push("Effect name could not be generated.");
  if (!categoryName) warnings.push("Category is empty.");
  if (categoryName && !isKnownNotionCategory(categoryName)) warnings.push(`Category "${categoryName}" is not mapped.`);
  if (!sourceUrl && !description && !bodyText.length) warnings.push("Source URL, Description, and page body are all empty.");
  if (localPathPattern.test([description, ...bodyText].join("\n"))) warnings.push("Local path references are present and treated as human-only references.");

  return {
    id: page.id,
    rawTitle,
    title,
    slug: slugify(title),
    category,
    sourceUrl,
    websiteDescription,
    note,
    bodyText,
    warnings
  };
}

function effectFromPage(page: ParsedInboxPage, syncedAt: string): DesignEffect {
  if (!page.category) {
    throw new Error(`Cannot create effect without category: ${page.title || page.id}`);
  }

  const sourceName = sourceNameFromUrl(page.sourceUrl);
  const sourceTag = slugify(sourceName);

  return {
    id: `notion-${page.slug}`,
    slug: page.slug,
    title: page.title,
    type: page.title,
    category: page.category,
    status: "reference",
    description: page.websiteDescription,
    tags: ["notion-inbox", sourceTag].filter(Boolean),
    useCases: ["Reference preview", "Implementation reference"],
    sourceUrl: page.sourceUrl ?? undefined,
    note: page.note,
    prompt: `Recreate ${page.title} as a reusable web design effect for Design Atlas. Use the source reference and Notion inbox notes as implementation guidance.`,
    createdAt: syncedAt,
    updatedAt: syncedAt
  };
}

async function loadExistingGeneratedEffects() {
  if (!existsSync(generatedFile)) return [];
  const moduleUrl = `${pathToFileURL(generatedFile).href}?t=${Date.now()}`;
  const module = (await import(moduleUrl)) as { notionInboxEffects?: DesignEffect[] };
  return module.notionInboxEffects ?? [];
}

async function collectExistingSlugs(directory: string, results = new Set<string>()) {
  if (!existsSync(directory)) return results;
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectExistingSlugs(entryPath, results);
      continue;
    }

    if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".tsx")) continue;
    if (path.resolve(entryPath) === generatedFile) continue;

    const text = await readFile(entryPath, "utf8");
    for (const match of text.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
      results.add(match[1]);
    }
  }

  return results;
}

async function writeGeneratedEffects(effects: DesignEffect[]) {
  await mkdir(path.dirname(generatedFile), { recursive: true });

  const content = `import type { DesignEffect } from "../../types/effect";

export const notionInboxEffects: DesignEffect[] = ${JSON.stringify(effects, null, 2)};
`;

  await writeFile(generatedFile, content, "utf8");
}

async function ensureEffectsRegistryImport() {
  let text = await readFile(effectsRegistryFile, "utf8");

  if (!text.includes('import { notionInboxEffects } from "./effects/notion-inbox";')) {
    text = text.replace(
      'import { navigationEffects } from "./effects/navigation";\n',
      'import { navigationEffects } from "./effects/navigation";\nimport { notionInboxEffects } from "./effects/notion-inbox";\n'
    );
  }

  if (!text.includes("...notionInboxEffects")) {
    text = text.replace("  ...toolEffects\n", "  ...toolEffects,\n  ...notionInboxEffects\n");
  }

  await writeFile(effectsRegistryFile, text, "utf8");
}

async function updateNotionSuccess(page: ParsedInboxPage, syncedAt: string) {
  const shouldBackfillTitle = isPlaceholderEffectName(page.rawTitle) && Boolean(page.title);
  const syncNote = shouldBackfillTitle
    ? `Synced to Design Atlas as ${page.category}/${page.slug}. Backfilled Effect Name: ${page.title}.`
    : `Synced to Design Atlas as ${page.category}/${page.slug}.`;

  await notionRequest(`/pages/${page.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        ...(shouldBackfillTitle
          ? {
              [effectInboxSchema.fields.effectName.notionName]: {
                title: [
                  {
                    type: "text",
                    text: { content: page.title }
                  }
                ]
              }
            }
          : {}),
        [effectInboxSchema.fields.status.notionName]: {
          status: { name: effectInboxSchema.statuses.synced }
        },
        [effectInboxSchema.fields.syncedAt.notionName]: {
          date: { start: syncedAt }
        },
        [effectInboxSchema.fields.syncNote.notionName]: {
          rich_text: [
            {
              type: "text",
              text: {
                content: syncNote
              }
            }
          ]
        }
      }
    })
  });
}

async function updateNotionFailure(page: ParsedInboxPage, reason: string) {
  await notionRequest(`/pages/${page.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        [effectInboxSchema.fields.syncNote.notionName]: {
          rich_text: [
            {
              type: "text",
              text: { content: `Sync failed: ${reason}` }
            }
          ]
        }
      }
    })
  });
}

function printPlan(pages: ParsedInboxPage[]) {
  console.log(`Ready records: ${pages.length}`);
  for (const page of pages) {
    console.log(
      `- ${page.title || "(name pending)"} | ${page.category ?? "(no category)"} | ${page.sourceUrl ?? "(no source)"} | note: ${page.note}`
    );
    if (page.warnings.length) {
      console.log(`  warnings: ${page.warnings.join("; ")}`);
    }
  }
}

async function main() {
  loadLocalEnv();
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const syncedAt = new Date().toISOString();
  const dataSourceId = await resolveDataSourceId();
  const pages = await queryReadyPages(dataSourceId);
  const parsedPages: ParsedInboxPage[] = [];
  for (const page of pages) {
    parsedPages.push(await parseInboxPage(page));
  }

  printPlan(parsedPages);
  if (!options.write) {
    console.log("Write mode: disabled. Re-run with --write to sync.");
    return;
  }

  const existingGenerated = await loadExistingGeneratedEffects();
  const existingExternalSlugs = await collectExistingSlugs(path.resolve(process.cwd(), "src"));
  const generatedBySlug = new Map(existingGenerated.map((effect) => [`${effect.category}/${effect.slug}`, effect]));
  const results: SyncResult[] = [];

  for (const page of parsedPages) {
    if (!page.category || !page.title || !page.slug) {
      const reason = page.warnings.join("; ") || "Missing required title, slug, or category.";
      results.push({ page, status: "failed", reason });
      await updateNotionFailure(page, reason);
      continue;
    }

    if (existingExternalSlugs.has(page.slug)) {
      const reason = `Slug already exists outside generated inbox file: ${page.slug}`;
      results.push({ page, status: "skipped", reason });
      await updateNotionFailure(page, reason);
      continue;
    }

    const key = `${page.category}/${page.slug}`;
    generatedBySlug.set(key, effectFromPage(page, syncedAt));
    results.push({ page, status: "success", reason: key });
  }

  await writeGeneratedEffects(Array.from(generatedBySlug.values()).sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug)));
  await ensureEffectsRegistryImport();

  for (const result of results) {
    if (result.status !== "success") continue;
    try {
      await updateNotionSuccess(result.page, syncedAt);
    } catch (error) {
      result.status = "failed";
      result.reason = error instanceof Error ? error.message : String(error);
    }
  }

  const success = results.filter((result) => result.status === "success");
  const skipped = results.filter((result) => result.status === "skipped");
  const failed = results.filter((result) => result.status === "failed");

  console.log(`Synced records: ${success.length}`);
  console.log(`Skipped records: ${skipped.length}`);
  console.log(`Failed records: ${failed.length}`);
  for (const result of [...skipped, ...failed]) {
    console.log(`- ${result.page.title || result.page.id}: ${result.reason}`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
