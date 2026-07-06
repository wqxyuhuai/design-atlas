export const effectInboxSchema = {
  databaseIdEnv: "NOTION_EFFECT_INBOX_DATABASE_ID",
  dataSourceIdEnv: "NOTION_EFFECT_INBOX_DATA_SOURCE_ID",
  tokenEnv: "NOTION_TOKEN",
  apiVersionEnv: "NOTION_API_VERSION",
  defaultApiVersion: "2026-03-11",
  supportedApiVersions: ["2021-05-11", "2021-05-13", "2021-08-16", "2022-02-22", "2022-06-28", "2025-09-03", "2026-03-11"],
  fields: {
    effectName: {
      notionName: "Effect Name",
      notionType: "title",
      role: "Effect display name"
    },
    status: {
      notionName: "Status",
      notionType: "status",
      role: "Inbox workflow state"
    },
    category: {
      notionName: "Category",
      notionType: "select",
      role: "Design Atlas category"
    },
    sourceUrl: {
      notionName: "Source URL",
      notionType: "url",
      role: "Primary source reference"
    },
    description: {
      notionName: "Description",
      notionType: "rich_text",
      role: "Reference notes and supplemental links"
    },
    note: {
      notionName: "Note",
      notionType: "rich_text",
      role: "Website note field"
    },
    syncedAt: {
      notionName: "Synced At",
      notionType: "date",
      role: "Successful sync timestamp"
    },
    syncNote: {
      notionName: "Sync Note",
      notionType: "rich_text",
      role: "Sync diagnostics"
    }
  },
  statuses: {
    incomplete: "待完善",
    ready: "待新增",
    synced: "已新增"
  },
  defaultStatus: "待完善",
  descriptionSourcePrefix: "source:",
  placeholderNames: ["", "暂无"],
  categories: [
    { notionName: "Backgrounds", websiteSlug: "backgrounds" },
    { notionName: "Text", websiteSlug: "text" },
    { notionName: "Navigation", websiteSlug: "navigation" },
    { notionName: "Media", websiteSlug: "media" },
    { notionName: "Components", websiteSlug: "components" },
    { notionName: "Layouts", websiteSlug: "layouts" },
    { notionName: "Interactions", websiteSlug: "interactions" },
    { notionName: "Tools", websiteSlug: "tools" }
  ]
} as const;

export type EffectInboxFieldKey = keyof typeof effectInboxSchema.fields;
export type EffectInboxStatus = (typeof effectInboxSchema.statuses)[keyof typeof effectInboxSchema.statuses];

export function isPlaceholderEffectName(value: string) {
  const normalized = value.trim();
  return effectInboxSchema.placeholderNames.includes(normalized as (typeof effectInboxSchema.placeholderNames)[number]);
}

export function websiteCategorySlugForNotionCategory(categoryName: string | null) {
  if (!categoryName) return null;
  return effectInboxSchema.categories.find((category) => category.notionName === categoryName)?.websiteSlug ?? null;
}

export function isKnownNotionCategory(categoryName: string | null) {
  return Boolean(websiteCategorySlugForNotionCategory(categoryName));
}

export function composeWebsiteDescription(description: string, sourceUrl: string | null) {
  const normalizedDescription = description.trim();
  if (!sourceUrl) return normalizedDescription;

  const sourceLine = `${effectInboxSchema.descriptionSourcePrefix} ${sourceUrl}`;
  if (!normalizedDescription) return sourceLine;

  return normalizedDescription.split(/\r?\n/).includes(sourceLine)
    ? normalizedDescription
    : `${normalizedDescription}\n${sourceLine}`;
}

export function composeWebsiteNote(note: string, sourceUrl: string | null) {
  const normalizedNote = note.trim();
  if (!sourceUrl) return normalizedNote;

  const sourceLine = `${effectInboxSchema.descriptionSourcePrefix} ${sourceUrl}`;
  if (!normalizedNote) return sourceLine;

  return normalizedNote.split(/\r?\n/).includes(sourceLine) ? normalizedNote : `${normalizedNote}\n${sourceLine}`;
}

export function notionApiVersionFromEnv(value: string | undefined) {
  if (value && effectInboxSchema.supportedApiVersions.includes(value as (typeof effectInboxSchema.supportedApiVersions)[number])) {
    return value;
  }

  return effectInboxSchema.defaultApiVersion;
}

export function sourceNameFromUrl(sourceUrl: string | null) {
  if (!sourceUrl) return "Internal Project";

  try {
    const hostname = new URL(sourceUrl).hostname.replace(/^www\./, "");
    const core = hostname.split(".").slice(0, -1).join(".") || hostname;
    const knownNames: Record<string, string> = {
      reactbits: "React Bits"
    };

    if (knownNames[core]) return knownNames[core];

    return core
      .split(/[-.]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  } catch {
    return "Internal Project";
  }
}

export function titleFromSourceUrl(sourceUrl: string | null) {
  if (!sourceUrl) return "";

  try {
    const pathname = new URL(sourceUrl).pathname;
    const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
    return lastSegment
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  } catch {
    return "";
  }
}

function titleFromText(value: string) {
  const firstLine = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);
  if (!firstLine) return "";

  const url = firstLine.match(/https?:\/\/[^\s"'<>]+/)?.[0] ?? null;
  const urlTitle = titleFromSourceUrl(url);
  if (urlTitle) return urlTitle;

  const title = firstLine
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return Array.from(title).every((char) => char.charCodeAt(0) <= 127) ? title : "";
}

export function generatedEffectNameForInbox(input: {
  currentName: string;
  sourceUrl: string | null;
  description?: string;
  bodyText?: string[];
}) {
  if (!isPlaceholderEffectName(input.currentName)) return input.currentName.trim();

  const sourceTitle = titleFromSourceUrl(input.sourceUrl);
  if (sourceTitle) return sourceTitle;

  const textTitle = titleFromText([input.description ?? "", ...(input.bodyText ?? [])].filter(Boolean).join("\n"));
  if (textTitle) return textTitle;

  return "";
}
