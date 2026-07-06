#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
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
import type { EffectCategory } from "../src/types/effect.ts";

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

const notionBaseUrl = "https://api.notion.com/v1";
const localPathPattern =
  /(?:[A-Za-z]:[\\/][^\s"'<>]+|\\\\[^\s"'<>]+\\[^\s"'<>]+|(?:~|\.{1,2})[\\/][^\s"'<>]+|\/(?:Users|Volumes|home|mnt|var|tmp|opt)\/[^\s"'<>]+)/g;

function printHelp() {
  console.log(`Sync Notion Effect Inbox records into Design Atlas.

Usage:
  npm run effects:inbox:sync

Safety:
  Without --write, this script only prints what it would do.
  Write mode is intentionally disabled after the per-effect folder migration.
  Add synced effects with npm run new-effect -- <category> <slug> "<Title>" and place
  the final record in src/content/effects/<category>/<slug>/meta.ts.
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

  if (options.write) {
    throw new Error(
      "Write mode is disabled because final effects must be created under src/content/effects/<category>/<slug>/. Use npm run new-effect and update the category index instead."
    );
  }

  const dataSourceId = await resolveDataSourceId();
  const pages = await queryReadyPages(dataSourceId);
  const parsedPages: ParsedInboxPage[] = [];
  for (const page of pages) {
    parsedPages.push(await parseInboxPage(page));
  }

  printPlan(parsedPages);
  console.log("Write mode: disabled. Use npm run new-effect and the per-effect folder workflow for final imports.");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
