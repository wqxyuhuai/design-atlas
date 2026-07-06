#!/usr/bin/env node
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const categories = ["backgrounds", "text", "navigation", "media", "video-browser", "components", "layouts", "interactions", "tools"];

function printHelp() {
  console.log(`Verify a Design Atlas effect entry.

Usage:
  npm run verify-effect -- backgrounds/beams
  npm run verify-effect -- --category backgrounds --slug beams

This script checks local registry consistency and prints the browser checklist.
Run npm run lint and npm run build after the local checks pass.
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
      if (next && !next.startsWith("--")) {
        options[key] = next;
        index += 1;
      }
      continue;
    }

    positional.push(value);
  }

  if (positional[0]?.includes("/")) {
    const [category, slug] = positional[0].split("/");
    return { help: Boolean(options.help), category: options.category ?? category, slug: options.slug ?? slug };
  }

  return {
    help: Boolean(options.help),
    category: options.category ?? positional[0],
    slug: options.slug ?? positional[1]
  };
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function scanFiles(directory, extensions, results = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scanFiles(entryPath, extensions, results);
      continue;
    }
    if (extensions.some((extension) => entry.name.endsWith(extension))) {
      results.push(entryPath);
    }
  }
  return results;
}

async function fileContains(filePath, needles) {
  const text = await readFile(filePath, "utf8");
  return needles.some((needle) => text.includes(needle));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  if (!options.category || !options.slug) {
    console.error("Missing category or slug.");
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (!categories.includes(options.category)) {
    console.error(`Invalid category "${options.category}". Use one of: ${categories.join(", ")}.`);
    process.exitCode = 1;
    return;
  }

  const cwd = process.cwd();
  const categoryFile = path.join(cwd, "src", "data", "effects", `${options.category}.ts`);
  const publicDir = path.join(cwd, "public", "effects", options.category, options.slug);
  const contentDir = path.join(cwd, "src", "content", "effects", options.category, options.slug);
  const metaFile = path.join(contentDir, "meta.ts");
  const indexFile = path.join(contentDir, "index.ts");
  const sourceFiles = await scanFiles(path.join(cwd, "src"), [".ts", ".tsx"]);
  const slugNeedles = [`slug: "${options.slug}"`, `slug: '${options.slug}'`, `slug: \`${options.slug}\``];
  const categoryNeedles = [
    `category: "${options.category}"`,
    `category: '${options.category}'`,
    `category: \`${options.category}\``
  ];

  const checks = [];
  checks.push({
    label: `Category file exists: src/data/effects/${options.category}.ts`,
    pass: await exists(categoryFile)
  });

  checks.push({
    label: `Final effect folder exists: src/content/effects/${options.category}/${options.slug}`,
    pass: await exists(contentDir)
  });

  checks.push({
    label: `Effect meta exists: src/content/effects/${options.category}/${options.slug}/meta.ts`,
    pass: await exists(metaFile)
  });

  checks.push({
    label: `Effect index exists: src/content/effects/${options.category}/${options.slug}/index.ts`,
    pass: await exists(indexFile),
    optional: true
  });

  checks.push({
    label: "Slug is present in meta.ts or src data/content files",
    pass:
      ((await exists(metaFile)) && (await fileContains(metaFile, slugNeedles))) ||
      (await Promise.all(sourceFiles.map((file) => fileContains(file, slugNeedles)))).some(Boolean)
  });

  checks.push({
    label: "meta.ts category matches the parent folder",
    pass: (await exists(metaFile)) ? await fileContains(metaFile, categoryNeedles) : false
  });

  checks.push({
    label: `Public asset folder exists: public/effects/${options.category}/${options.slug}`,
    pass: await exists(publicDir),
    optional: true
  });

  const failedRequired = checks.filter((check) => !check.pass && !check.optional);
  for (const check of checks) {
    const marker = check.pass ? "OK" : check.optional ? "NOTE" : "FAIL";
    console.log(`${marker} ${check.label}`);
  }

  console.log("");
  console.log("Browser checklist:");
  console.log(`  - Open /workbench/${options.category}/${options.slug}?tab=preview`);
  console.log("  - Preview is nonblank at desktop and mobile widths.");
  console.log("  - Hover or interaction behavior works without layout shift.");
  console.log("  - Controls update the preview and URL params correctly.");
  console.log("  - Copy Prompt returns enough context to recreate the effect.");
  console.log("  - If status is implemented, reusable component path and code tab are accurate.");
  console.log("");
  console.log("Finish with:");
  console.log("  npm run lint");
  console.log("  npm run build");

  if (failedRequired.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
