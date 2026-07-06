export type InspirationCategory =
  | "backgrounds"
  | "text"
  | "navigation"
  | "media"
  | "components"
  | "layouts"
  | "interactions"
  | "tools";

export interface InspirationItem {
  slug: string;
  title: string;
  category: InspirationCategory;
  url: string;
  screenshot?: string;
  note: string;
  createdAt?: string;
}
