# Notion Effect Inbox Sync

This document is the source of truth for reading the Notion Effect Inbox and preparing Design Atlas effect additions. Future sync scripts must follow these rules instead of reinterpreting the Notion fields.

## Scope

- Source database: Notion Effect Inbox.
- First phase: configuration, field mapping, page-body reading, and dry-run checks only.
- The dry run may read Notion pages and block children.
- The dry run must not write website data, create effect files, change UI, or update Notion properties.

## Environment

Use environment variables for all Notion connection values:

- `NOTION_TOKEN`: Notion internal integration secret.
- `NOTION_EFFECT_INBOX_DATABASE_ID`: Notion database id for the Effect Inbox.
- `NOTION_EFFECT_INBOX_DATA_SOURCE_ID`: Optional Notion data source id. If omitted, scripts may retrieve the database and use its first data source.
- `NOTION_API_VERSION`: Optional Notion API version. Default to `2026-03-11`.

Local secrets may be stored in `.env.local` or `.env`. Do not commit real tokens.

## Field Mapping

The centralized code mapping lives in `src/lib/notion/effectInboxSchema.ts`.

| Notion field | Type | Required | Read rule | Write rule |
| --- | --- | --- | --- | --- |
| `Effect Name` | Title | No | Use as the display name when it has meaningful content. Empty values or `暂无` mean sync must generate an English website name from Source URL, Description, and page body. | When sync succeeds and `Effect Name` was empty or `暂无`, write the generated English name back to Notion. Do not overwrite human-filled names. |
| `Status` | Status | No | Only records with `Status = 待新增` are eligible. Empty status is treated as `待完善` and skipped. | On successful sync, set to `已新增`. On failure, keep `待新增`. |
| `Category` | Select | Recommended | Map to the website's left-side category. Existing values: `Backgrounds`, `Text`, `Navigation`, `Media`, `Components`, `Layouts`, `Interactions`, `Tools`. New Notion category values are allowed and should trigger future website category support before publish. | Do not modify during dry run. |
| `Source URL` | URL | No | Use as a reference source when present. | Do not modify. |
| `Description` | Text | No | Use for effect details, cautions, multiple reference links, archive paths, and local project paths. Extract all URLs as references. Local paths are human-only references. When producing the website description, always append `source: <Source URL>` as a new line if `Source URL` is filled. If `Source URL` is empty, do not append a source line. | Do not modify during dry run. Future sync writes the composed website description to website data, not necessarily back to Notion. |
| `Note` | Text | No | Maps to the website `note` field. If empty, derive from Source URL domain; if unavailable, use `Internal Project`. When producing the website note, always append `source: <Source URL>` as a new line if `Source URL` is filled. | Future sync writes the composed note into website data, not necessarily back to Notion. |
| `Synced At` | Date | No | Empty means not yet synced. Existing values are informational during dry run. | On successful sync, write the current timestamp. |
| `Sync Note` | Text | No | Read for previous sync diagnostics. | On successful sync, write a short result. On failure, write a clear reason and do not change Status. |

## Status Flow

- `待完善`: Skip. The record needs human completion.
- Empty Status: Treat as `待完善` and skip.
- `待新增`: Read and validate. This is the only status queried by the dry-run command.
- `已新增`: Skip. The record is already represented in the site.

Future write-enabled sync must follow this flow:

1. Read only records with `Status = 待新增`.
2. Validate required information and page body references.
3. If the website addition succeeds, set `Status = 已新增`, set `Synced At` to the current time, and write a short `Sync Note`.
4. If the sync fails, keep `Status = 待新增`, leave `Synced At` unchanged, and write a `Sync Note` that explains the failure.
5. Never batch-change Notion statuses without explicit confirmation.

## Effect Name Backfill

When `Effect Name` is empty or `暂无`, sync must generate a concise English display name and write it back to the Notion title after a successful website sync.

- Prefer the last meaningful Source URL path segment, converted from kebab case to title case, for example `/animations/image-trail` -> `Image Trail`.
- If `Source URL` is empty, inspect Description and page body text/links for the first usable URL and derive the name from that URL.
- If no usable URL exists, derive a short English title from the clearest Description or page body summary.
- Do not overwrite a non-empty human-filled `Effect Name`.
- Backfills may also be applied to already-synced records when the generated website name is known and the Notion title is still empty or `暂无`.
- Record the backfill in `Sync Note` when it happens.

## Page Body Reading

Every Notion page body is an important reference source. Scripts should read page blocks directly; do not model the body as a database property.

Possible body content:

- Screenshots.
- GIFs.
- Screen recordings or videos.
- Supplemental links.
- Supplemental explanation.
- Local project paths.

Reference priority:

1. Visual content in the page body.
2. Supplemental links and text in the page body.
3. `Source URL`.
4. `Description`.

If both Source URL and page body content exist, inspect the page body first. If the body includes multiple images or videos, first determine whether they represent different states of the same effect; do not split them into multiple effects automatically.

Local file paths in Description or page body are human references only. Do not assume they are reachable online or usable by a server-side sync process.

## Website Description Composition

The website-facing `description` value is composed from Notion `Description` plus `Source URL`.

- If `Source URL` is filled, append a separate line: `source: <Source URL>`.
- If Notion `Description` is empty and `Source URL` is filled, the website description should be only `source: <Source URL>`.
- If `Source URL` is empty, use Notion `Description` as-is and do not add a source line.
- If the exact `source: <Source URL>` line is already present, do not duplicate it.
- Keep this composition centralized in `src/lib/notion/effectInboxSchema.ts`.

## Website Note Composition

The website-facing `note` value is composed from Notion `Note` plus `Source URL`.

- If Notion `Note` is empty, first derive the note from the source domain, for example `React Bits`.
- If `Source URL` is filled, append a separate line: `source: <Source URL>`.
- If `Source URL` is empty, use the Notion or derived note as-is and do not add a source line.
- If the exact `source: <Source URL>` line is already present, do not duplicate it.
- Keep this composition centralized in `src/lib/notion/effectInboxSchema.ts`.

## Demo Brand And Source Attribution

Preview/demo UI must use `Design Atlas` as the visible brand or product name.

- Do not show third-party source names such as `React Bits` inside effect previews, demo navigation, hero copy, cards, control examples, generated placeholder text, reusable prompts, or front-facing implementation descriptions.
- Source attribution belongs in `Notes`, `sourceUrl`, and the appended `source: <Source URL>` line only.
- `Notes` may keep the derived source name, for example `React Bits`, followed by `source: <Source URL>`.
- When adapting a reference site, rewrite visible demo copy into neutral Design Atlas-owned copy. Do not copy the source site's brand, marketing copy, or product name into the demo unless the user explicitly approves it for that entry.
- Sync scripts and manual imports must normalize front-facing prompt, description, visual style, motion logic, tags, and demo content to avoid presenting the source brand as part of the Design Atlas effect.

## Placeholder Image Assets

When an effect preview or demo needs placeholder imagery, use the project-local world masterpiece placeholder set instead of abstract gradients, external hotlinked images, or files outside the repository.

- Source folder for the original local materials: `E:\OneDrive\Design files sync\AI\Proj. design atlas\Materials\world_masterpieces_20_downloader\output`.
- Committed/public asset folder: `public/placeholders/world-masterpieces`.
- Central code mapping: `src/data/placeholderImages.ts`.
- Components should import `placeholderImagesForEffect` or `worldMasterpiecePlaceholders` from `src/data/placeholderImages.ts` instead of hardcoding individual placeholder paths.
- Placeholder cards should use real images with restrained treatment: object-fit cover, subtle border, radius, and enough contrast for blur/fade effects to be judged.
- Do not reference the original `Materials` path from runtime code; copy needed assets into `public/placeholders/world-masterpieces` so the site can be uploaded and deployed independently.
- Keep `manifest.json` with the copied placeholder assets for source traceability.

## Dry Run Requirements

The dry-run command is:

```bash
npm run effects:inbox:check
```

It must:

- Connect to Notion using environment variables.
- Query only `Status = 待新增`.
- Read each matching page's database properties.
- Read each matching page's body blocks.
- Output parsed fields, the composed website description, derived values, reference links, media counts, local path hints, and validation warnings.
- Avoid writing website files.
- Avoid modifying Notion records.

## Validation Rules

Dry run should warn when:

- `Category` is empty.
- `Category` is not one of the current website categories.
- Effect name is empty or `暂无`; this is allowed, but future sync must auto-generate an English display name.
- `Source URL`, `Description`, and page body are all empty.
- Description or page body contains local paths that need manual review.
- Notion returns an unexpected property type for a mapped field.

Dry run should not fail only because optional fields are empty. It should fail only for connection errors, missing required environment variables, Notion API errors, or unreadable response shapes.

## Category Handling

Current website categories:

- `Backgrounds` -> `backgrounds`
- `Text` -> `text`
- `Navigation` -> `navigation`
- `Media` -> `media`
- `Components` -> `components`
- `Layouts` -> `layouts`
- `Interactions` -> `interactions`
- `Tools` -> `tools`

Future sync should use existing categories directly. If Notion contains a new category, website category support must be added before the new category is shown. Frontend category lists should hide categories that have no `已新增` effects.

## Safety

- Do not change existing website UI for this inbox integration phase.
- Do not delete existing website data.
- Do not sync records with `Status = 待完善`, empty Status, or `Status = 已新增`.
- Do not batch-update Notion records without confirmation.
- Do not write real Notion tokens into source files.
- Reuse the centralized schema mapping for all Notion property names and status values.
