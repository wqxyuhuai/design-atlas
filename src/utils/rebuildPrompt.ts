import type { InspirationItem } from "../types/inspiration";

export function generateRebuildPrompt(item: InspirationItem) {
  return [
    "## Rebuild this reference as a Design Atlas effect",
    "",
    "Category:",
    item.category,
    "",
    "Reference:",
    item.url,
    "",
    "Note:",
    item.note,
    "",
    "Task:",
    "Rebuild this reference as an original reusable React effect for Design Atlas.",
    "",
    "Requirements:",
    "- Do not copy source code from the reference.",
    "- Recreate the visual and interaction idea with an original implementation.",
    "- Follow the Design Atlas Apple style guide.",
    "- Add configurable controls if useful.",
    "- Prepare preview, code, prompt, notes, and source fields."
  ].join("\n");
}
