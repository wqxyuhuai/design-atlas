import type { EffectCategory } from "../types/effect";

export interface CategoryDefinition {
  slug: EffectCategory;
  label: string;
  description: string;
}

export const categories: CategoryDefinition[] = [
  {
    slug: "backgrounds",
    label: "Backgrounds",
    description: "Ambient surfaces, hero backdrops, light fields, grids, and texture systems."
  },
  {
    slug: "text",
    label: "Text",
    description: "Headline reveals, typographic motion, rich copy treatments, and text effects."
  },
  {
    slug: "navigation",
    label: "Navigation",
    description: "Product nav patterns, headers, rails, docks, menus, and active states."
  },
  {
    slug: "media",
    label: "Media",
    description: "Image lists, galleries, hover media systems, and visual presentation patterns."
  },
  {
    slug: "components",
    label: "Components",
    description: "Reusable interface fragments, product cards, command surfaces, and UI modules."
  },
  {
    slug: "layouts",
    label: "Layouts",
    description: "Page structures, content rhythms, section systems, and composition references."
  },
  {
    slug: "interactions",
    label: "Interactions",
    description: "Pointer, hover, scroll, and state transition references."
  },
  {
    slug: "tools",
    label: "Tools",
    description: "Small helper interfaces for design production and token exploration."
  }
];

const categoryAliases: Record<string, EffectCategory> = {
  "text-effects": "text",
  "image-lists": "media",
  "ui-components": "components"
};

export function normalizeEffectCategory(value: string | null | undefined): EffectCategory | undefined {
  if (!value) return undefined;
  if (categories.some((category) => category.slug === value)) return value as EffectCategory;
  return categoryAliases[value];
}

export function isEffectCategory(value: string | undefined): value is EffectCategory {
  return Boolean(normalizeEffectCategory(value) === value);
}
