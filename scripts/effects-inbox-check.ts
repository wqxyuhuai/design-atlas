#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  composeWebsiteDescription,
  composeWebsiteNote,
  effectInboxSchema,
  isKnownNotionCategory,
  isPlaceholderEffectName,
  notionApiVersionFromEnv,
  sourceNameFromUrl,
  websiteCategorySlugForNotionCategory
} from "../src/lib/notion/effectInboxSchema.ts";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

interface NotionPage {
  id: string;
  url?: string;
  properties: Record<string, NotionProperty>;
}

type NotionProperty = { type: string; [key: string]: unknown };

interface RichText {
  plain_text?: string;
  href?: string | null;
}

interface PageBodySummary {
  text: string[];
  links: string[];
  media: Array<{ type: string; url: string | null; caption: string }>;
  localPaths: string[];
  truncated: boolean;
}

interface ParsedEffectInboxPage {
  id: string;
  notionUrl: string;
  effectName: string;
  needsGeneratedName: boolean;
  status: string;
  category: string | null;
  websiteCategory: string | null;
  sourceUrl: string | null;
  description: string;
  websiteDescription: string;
  descriptionLinks: string[];
  note: string;
  websiteNote: string;
  derivedNote: string;
  syncedAt: string | null;
  syncNote: string;
  body: PageBodySummary;
  warnings: string[];
}

const notionBaseUrl = "https://api.notion.com/v1";
const richTextFieldKeys = ["description", "note", "syncNote"] as const;
const localPathPattern =
  /(?:[A-Za-z]:[\\/][^\s"'<>]+|\\\\[^\s"'<>]+\\[^\s"'<>]+|(?:~|\.{1,2})[\\/][^\s"'<>]+|\/(?:Users|Volumes|home|mnt|var|tmp|opt)\/[^\s"'<>]+)/g;
const urlPattern = /https?:\/\/[^\s"'<>]+/g;

function printHelp() {
  console.log(`Read pending Notion Effect Inbox records without writing anything.

Usage:
  npm run effects:inbox:check
  npm run effects:inbox:check -- 10

Environment:
  ${effectInboxSchema.tokenEnv}
  ${effectInboxSchema.databaseIdEnv}
  ${effectInboxSchema.dataSourceIdEnv} optional
  ${effectInboxSchema.apiVersionEnv} optional, defaults to ${effectInboxSchema.defaultApiVersion}
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
  const options: { help: boolean; limit: number | null } = { help: false, limit: null };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--help" || value === "-h") {
      options.help = true;
      continue;
    }

    if (value === "--limit") {
      const next = argv[index + 1];
      if (!next || Number.isNaN(Number(next))) {
        throw new Error("--limit requires a number.");
      }
      options.limit = Number(next);
      index += 1;
      continue;
    }

    if (!value.startsWith("--") && !Number.isNaN(Number(value))) {
      options.limit = Number(value);
    }
  }

  return options;
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
    throw new Error(`Missing ${effectInboxSchema.tokenEnv}. Add it to .env.local or your shell environment.`);
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
    throw new Error(`Missing ${effectInboxSchema.databaseIdEnv}. Add it to .env.local or your shell environment.`);
  }

  const database = await notionRequest(`/databases/${databaseId}`);
  const dataSources = Array.isArray(database.data_sources) ? database.data_sources : [];
  const firstDataSource = dataSources[0];

  if (!firstDataSource || typeof firstDataSource !== "object" || !("id" in firstDataSource)) {
    throw new Error(
      `Could not resolve a data source from ${effectInboxSchema.databaseIdEnv}. Set ${effectInboxSchema.dataSourceIdEnv} explicitly.`
    );
  }

  return String(firstDataSource.id);
}

async function queryReadyPages(dataSourceId: string, limit: number | null) {
  const pages: NotionPage[] = [];
  let startCursor: string | null = null;

  do {
    const body = await notionRequest(`/data_sources/${dataSourceId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: effectInboxSchema.fields.status.notionName,
          status: {
            equals: effectInboxSchema.statuses.ready
          }
        },
        page_size: limit ? Math.min(limit - pages.length, 100) : 100,
        start_cursor: startCursor ?? undefined
      })
    });

    const results = Array.isArray(body.results) ? body.results : [];
    pages.push(...(results as unknown as NotionPage[]));
    startCursor = typeof body.next_cursor === "string" ? body.next_cursor : null;

    if (limit && pages.length >= limit) {
      return pages.slice(0, limit);
    }
  } while (startCursor);

  return pages;
}

async function readPageBody(pageId: string, depth = 0): Promise<PageBodySummary> {
  const summary: PageBodySummary = { text: [], links: [], media: [], localPaths: [], truncated: false };
  let startCursor: string | null = null;
  let fetchedBlocks = 0;

  do {
    const body = await notionRequest(
      `/blocks/${pageId}/children?page_size=100${startCursor ? `&start_cursor=${encodeURIComponent(startCursor)}` : ""}`
    );
    const results = Array.isArray(body.results) ? body.results : [];

    for (const block of results as JsonObject[]) {
      fetchedBlocks += 1;
      mergeBodySummary(summary, summarizeBlock(block));

      const hasChildren = block.has_children === true;
      if (hasChildren && depth < 2) {
        const nested = await readPageBody(String(block.id), depth + 1);
        mergeBodySummary(summary, nested);
      } else if (hasChildren) {
        summary.truncated = true;
      }
    }

    startCursor = typeof body.next_cursor === "string" ? body.next_cursor : null;

    if (fetchedBlocks >= 300) {
      summary.truncated = true;
      break;
    }
  } while (startCursor);

  summary.links = unique(summary.links);
  summary.localPaths = unique(summary.localPaths);
  return summary;
}

function summarizeBlock(block: JsonObject): PageBodySummary {
  const summary: PageBodySummary = { text: [], links: [], media: [], localPaths: [], truncated: false };
  const type = typeof block.type === "string" ? block.type : "";
  const typedBlock = block[type];

  if (!typedBlock || typeof typedBlock !== "object" || Array.isArray(typedBlock)) {
    return summary;
  }

  const richText = "rich_text" in typedBlock && Array.isArray(typedBlock.rich_text) ? (typedBlock.rich_text as RichText[]) : [];
  const caption = "caption" in typedBlock && Array.isArray(typedBlock.caption) ? plainText(typedBlock.caption as RichText[]) : "";
  const richTextValue = plainText(richText);

  if (richTextValue) {
    summary.text.push(richTextValue);
    summary.links.push(...extractUrls(richTextValue));
    summary.localPaths.push(...extractLocalPaths(richTextValue));
  }

  summary.links.push(...richText.map((item) => item.href).filter(isNonEmptyString));

  if (caption) {
    summary.text.push(caption);
    summary.links.push(...extractUrls(caption));
    summary.localPaths.push(...extractLocalPaths(caption));
  }

  if (["image", "video", "file", "pdf"].includes(type)) {
    const url = fileUrlFromBlockValue(typedBlock);
    summary.media.push({ type, url, caption });
    if (url) summary.links.push(url);
  }

  if (["bookmark", "embed", "link_preview"].includes(type) && "url" in typedBlock && isNonEmptyString(typedBlock.url)) {
    summary.links.push(typedBlock.url);
  }

  return summary;
}

function mergeBodySummary(target: PageBodySummary, source: PageBodySummary) {
  target.text.push(...source.text);
  target.links.push(...source.links);
  target.media.push(...source.media);
  target.localPaths.push(...source.localPaths);
  target.truncated = target.truncated || source.truncated;
}

function fileUrlFromBlockValue(value: JsonObject) {
  const file = value.file;
  if (file && typeof file === "object" && !Array.isArray(file) && isNonEmptyString(file.url)) {
    return file.url;
  }

  const external = value.external;
  if (external && typeof external === "object" && !Array.isArray(external) && isNonEmptyString(external.url)) {
    return external.url;
  }

  return null;
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

function statusPropertyName(value: NotionProperty | undefined) {
  if (value?.type !== "status" || !isJsonObject(value.status)) return effectInboxSchema.defaultStatus;
  return isNonEmptyString(value.status.name) ? value.status.name : effectInboxSchema.defaultStatus;
}

function selectPropertyName(value: NotionProperty | undefined) {
  if (value?.type !== "select" || !isJsonObject(value.select)) return null;
  return isNonEmptyString(value.select.name) ? value.select.name : null;
}

function urlPropertyValue(value: NotionProperty | undefined) {
  return value?.type === "url" && isNonEmptyString(value.url) ? value.url : null;
}

function datePropertyValue(value: NotionProperty | undefined) {
  if (value?.type !== "date" || !isJsonObject(value.date)) return null;
  return isNonEmptyString(value.date.start) ? value.date.start : null;
}

function plainText(items: RichText[]) {
  return items.map((item) => item.plain_text ?? "").join("").trim();
}

function richTextArray(value: unknown): RichText[] {
  return Array.isArray(value) ? (value as RichText[]) : [];
}

function extractUrls(text: string) {
  return text.match(urlPattern) ?? [];
}

function extractLocalPaths(text: string) {
  return text.match(localPathPattern) ?? [];
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isJsonObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function unexpectedPropertyWarnings(page: NotionPage) {
  const warnings: string[] = [];

  for (const [key, config] of Object.entries(effectInboxSchema.fields)) {
    const value = page.properties[config.notionName];
    if (!value) {
      warnings.push(`Missing Notion property: ${config.notionName}`);
      continue;
    }

    const expectedType =
      richTextFieldKeys.includes(key as (typeof richTextFieldKeys)[number]) ? "rich_text" : config.notionType;
    if (value.type !== expectedType) {
      warnings.push(`Unexpected type for ${config.notionName}: expected ${expectedType}, got ${value.type}`);
    }
  }

  return warnings;
}

async function parsePage(page: NotionPage): Promise<ParsedEffectInboxPage> {
  const body = await readPageBody(page.id);
  const effectName = titlePropertyText(property(page, "effectName"));
  const status = statusPropertyName(property(page, "status"));
  const category = selectPropertyName(property(page, "category"));
  const sourceUrl = urlPropertyValue(property(page, "sourceUrl"));
  const description = richTextPropertyText(property(page, "description"));
  const note = richTextPropertyText(property(page, "note"));
  const syncNote = richTextPropertyText(property(page, "syncNote"));
  const websiteDescription = composeWebsiteDescription(description, sourceUrl);
  const derivedNote = note || sourceNameFromUrl(sourceUrl);
  const websiteNote = composeWebsiteNote(derivedNote, sourceUrl);
  const needsGeneratedName = isPlaceholderEffectName(effectName);
  const descriptionLinks = unique(extractUrls(websiteDescription));
  const localPaths = unique([...extractLocalPaths(description), ...body.localPaths]);
  const warnings = unexpectedPropertyWarnings(page);

  if (!category) {
    warnings.push("Category is empty.");
  } else if (!isKnownNotionCategory(category)) {
    warnings.push(`Category "${category}" is not in the current website category map.`);
  }

  if (needsGeneratedName) {
    warnings.push("Effect Name is empty or placeholder; future sync must generate an English display name.");
  }

  if (!sourceUrl && !description && !body.text.length && !body.media.length && !body.links.length) {
    warnings.push("Source URL, Description, and page body are all empty.");
  }

  if (localPaths.length) {
    warnings.push(`Local path references need manual review: ${localPaths.join(", ")}`);
  }

  if (body.truncated) {
    warnings.push("Page body reading was truncated at the configured depth or block limit.");
  }

  return {
    id: page.id,
    notionUrl: page.url ?? "",
    effectName,
    needsGeneratedName,
    status,
    category,
    websiteCategory: websiteCategorySlugForNotionCategory(category),
    sourceUrl,
    description,
    websiteDescription,
    descriptionLinks,
    note,
    websiteNote,
    derivedNote,
    syncedAt: datePropertyValue(property(page, "syncedAt")),
    syncNote,
    body,
    warnings
  };
}

function printParsedPage(page: ParsedEffectInboxPage, index: number) {
  console.log(`\n#${index + 1} ${page.effectName || "(name pending)"}`);
  console.log(`Page: ${page.notionUrl || page.id}`);
  console.log(`Status: ${page.status}`);
  console.log(`Category: ${page.category ?? "(empty)"}${page.websiteCategory ? ` -> ${page.websiteCategory}` : ""}`);
  console.log(`Source URL: ${page.sourceUrl ?? "(empty)"}`);
  console.log(`Derived note: ${page.derivedNote}`);
  console.log(`Website note: ${page.websiteNote.replace(/\n/g, " | ")}`);
  console.log(`Synced At: ${page.syncedAt ?? "(empty)"}`);
  console.log(`Description chars: ${page.description.length}`);
  console.log(`Website description chars: ${page.websiteDescription.length}`);
  console.log(
    `Website description source line: ${
      page.sourceUrl ? `${effectInboxSchema.descriptionSourcePrefix} ${page.sourceUrl}` : "(not added)"
    }`
  );
  console.log(`Description links: ${page.descriptionLinks.length ? page.descriptionLinks.join(", ") : "(none)"}`);
  console.log(`Body text blocks: ${page.body.text.length}`);
  console.log(`Body links: ${page.body.links.length ? page.body.links.join(", ") : "(none)"}`);
  console.log(
    `Body media: ${
      page.body.media.length
        ? page.body.media.map((item) => `${item.type}${item.url ? `:${item.url}` : ""}`).join(", ")
        : "(none)"
    }`
  );
  console.log(`Sync Note: ${page.syncNote || "(empty)"}`);

  if (page.warnings.length) {
    console.log("Warnings:");
    for (const warning of page.warnings) {
      console.log(`  - ${warning}`);
    }
  } else {
    console.log("Warnings: none");
  }
}

async function main() {
  loadLocalEnv();
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const dataSourceId = await resolveDataSourceId();
  const pages = await queryReadyPages(dataSourceId, options.limit);
  const parsedPages = [];

  for (const page of pages) {
    parsedPages.push(await parsePage(page));
  }

  console.log("Notion Effect Inbox dry run");
  console.log(`Data source: ${dataSourceId}`);
  console.log(`Read filter: ${effectInboxSchema.fields.status.notionName} = ${effectInboxSchema.statuses.ready}`);
  console.log(`Matched records: ${parsedPages.length}`);
  console.log("Write mode: disabled");

  parsedPages.forEach(printParsedPage);

  const warningCount = parsedPages.reduce((count, page) => count + page.warnings.length, 0);
  console.log(`\nSummary: ${parsedPages.length} ready record(s), ${warningCount} warning(s).`);
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
