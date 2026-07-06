#!/usr/bin/env node
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const categories = ["backgrounds", "text", "navigation", "media", "components", "layouts", "interactions", "tools"];
const statuses = ["reference", "draft", "implemented"];

function printHelp() {
  console.log(`Create a Design Atlas effect scaffold.

Usage:
  npm run new-effect -- --category backgrounds --slug grid-glow --title "Grid Glow"
  npm run new-effect -- backgrounds grid-glow "Grid Glow"

Options:
  --category <category>  One of: ${categories.join(", ")}
  --slug <slug>          URL-safe effect slug
  --title <title>        Display name
  --type <type>          Type filter label. Defaults to title.
  --status <status>      reference, draft, or implemented. Defaults to reference.
  --source <url>         Optional source URL for source.md
`);
}

function parseArgs(argv) {
  const options = {};
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--help" || value === "-h") {
      options.help = true;
      continue;
    }

    if (value.startsWith("--")) {
      const key = value.slice(2);
      const next = argv[index + 1];
      if (!next || next.startsWith("--")) {
        options[key] = true;
      } else {
        options[key] = next;
        index += 1;
      }
      continue;
    }

    positional.push(value);
  }

  return {
    help: Boolean(options.help),
    category: options.category ?? positional[0],
    slug: options.slug ?? positional[1],
    title: options.title ?? positional.slice(2).join(" "),
    type: options.type,
    status: options.status ?? "reference",
    source: options.source ?? ""
  };
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function camelCaseSlug(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, character) => character.toUpperCase());
}

function assertValidInput(options) {
  if (!options.category || !options.slug) {
    throw new Error("Missing category or slug.");
  }

  if (!categories.includes(options.category)) {
    throw new Error(`Invalid category "${options.category}". Use one of: ${categories.join(", ")}.`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and single hyphens only.");
  }

  if (!statuses.includes(options.status)) {
    throw new Error(`Invalid status "${options.status}". Use one of: ${statuses.join(", ")}.`);
  }
}

async function writeIfMissing(filePath, content) {
  try {
    await access(filePath);
    return false;
  } catch {
    await writeFile(filePath, content, "utf8");
    return true;
  }
}

function effectSnippet({ category, slug, title, type, status, source }) {
  const variableName = `${camelCaseSlug(slug)}Effect`;
  const sourceLine = source ? `  sourceUrl: "${source}",\n` : "";

  return `const ${variableName}: DesignEffect = {
  id: "${slug}",
  slug: "${slug}",
  title: "${title}",
  category: "${category}",
  type: "${type}",
  status: "${status}",
  description: "Short description of what this effect does.",
  tags: ["tag"],
  useCases: ["Reference preview"],
${sourceLine}  screenshot: "/effects/${category}/${slug}/screenshot.jpg",
  note: "Capture what is worth preserving and what should be avoided.",
  prompt: "Recreate ${title} as a reusable web design effect."
};`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  try {
    assertValidInput(options);
  } catch (error) {
    console.error(error.message);
    console.error("");
    printHelp();
    process.exitCode = 1;
    return;
  }

  const title = options.title || titleFromSlug(options.slug);
  const type = options.type || title;
  const cwd = process.cwd();
  const publicDir = path.join(cwd, "public", "effects", options.category, options.slug);
  const contentDir = path.join(cwd, "src", "content", "effects", options.category, options.slug);

  await mkdir(publicDir, { recursive: true });
  await mkdir(contentDir, { recursive: true });

  const files = [
    [path.join(publicDir, ".gitkeep"), ""],
    [
      path.join(contentDir, "prompt.md"),
      `# ${title} Prompt\n\nRecreate ${title} as a reusable web design effect.\n\n## Must Preserve\n\n- \n\n## Avoid\n\n- \n`
    ],
    [
      path.join(contentDir, "notes.md"),
      `# ${title} Notes\n\n## What Works\n\n- \n\n## Reuse Notes\n\n- \n\n## Verification\n\n- \n`
    ],
    [path.join(contentDir, "source.md"), `# ${title} Source\n\n${options.source || "Source URL or local capture note goes here."}\n`]
  ];

  const written = [];
  const skipped = [];
  for (const [filePath, content] of files) {
    const didWrite = await writeIfMissing(filePath, content);
    (didWrite ? written : skipped).push(path.relative(cwd, filePath));
  }

  console.log(`Created scaffold for ${title}`);
  if (written.length) console.log(`Written:\n${written.map((file) => `  - ${file}`).join("\n")}`);
  if (skipped.length) console.log(`Already existed:\n${skipped.map((file) => `  - ${file}`).join("\n")}`);
  console.log("");
  console.log(`Add this record to src/data/effects/${options.category}.ts:`);
  console.log("");
  console.log(effectSnippet({ ...options, title, type }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
