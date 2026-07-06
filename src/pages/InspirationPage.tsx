import { ExternalLink, Image as ImageIcon, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CopyButton } from "../components/common/CopyButton";
import { inspirationItems } from "../content/inspiration/inspiration";
import type { InspirationCategory, InspirationItem } from "../types/inspiration";
import { generateRebuildPrompt } from "../utils/rebuildPrompt";

const categoryOptions: Array<{ value: InspirationCategory; label: string }> = [
  { value: "backgrounds", label: "Backgrounds" },
  { value: "text", label: "Text" },
  { value: "navigation", label: "Navigation" },
  { value: "media", label: "Media" },
  { value: "components", label: "Components" },
  { value: "layouts", label: "Layouts" },
  { value: "interactions", label: "Interactions" },
  { value: "tools", label: "Tools" }
];

function isInspirationCategory(value: string | null): value is InspirationCategory {
  return Boolean(value && categoryOptions.some((category) => category.value === value));
}

function domainFor(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function labelForCategory(category: InspirationCategory) {
  return categoryOptions.find((option) => option.value === category)?.label ?? category;
}

function matchesSearch(item: InspirationItem, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return [item.title, item.note, item.url, labelForCategory(item.category)]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

export function InspirationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCategory = isInspirationCategory(searchParams.get("category"))
    ? searchParams.get("category")
    : "all";

  const filteredItems = useMemo(
    () =>
      inspirationItems.filter((item) => {
        const categoryMatches = selectedCategory === "all" || item.category === selectedCategory;
        return categoryMatches && matchesSearch(item, searchQuery);
      }),
    [searchQuery, selectedCategory]
  );

  function selectCategory(category: InspirationCategory | "all") {
    if (category === "all") {
      setSearchParams({});
      return;
    }
    setSearchParams({ category });
  }

  return (
    <main className="min-h-[calc(100dvh-64px)] bg-atlas-surface2">
      <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-14">
        <header className="max-w-3xl">
          <h1 className="text-[44px] font-semibold leading-[1.08] tracking-[-0.018em] text-atlas-ink md:text-[56px]">
            Inspiration
          </h1>
          <p className="mt-4 text-[17px] font-normal leading-[1.47] tracking-[-0.01em] text-atlas-subtle">
            Temporary references, screenshots, and notes waiting to become Design Atlas effects.
          </p>
        </header>

        <section className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Category filter">
            <button
              type="button"
              onClick={() => selectCategory("all")}
              className={`h-10 rounded-full px-4 text-[14px] font-normal tracking-[-0.01em] transition active:scale-95 ${
                selectedCategory === "all"
                  ? "bg-atlas-ink text-atlas-canvas"
                  : "bg-black text-atlas-subtle hover:bg-atlas-surface3 hover:text-atlas-ink"
              }`}
            >
              All
            </button>
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => selectCategory(category.value)}
                className={`h-10 rounded-full px-4 text-[14px] font-normal tracking-[-0.01em] transition active:scale-95 ${
                  selectedCategory === category.value
                    ? "bg-atlas-ink text-atlas-canvas"
                    : "bg-black text-atlas-subtle hover:bg-atlas-surface3 hover:text-atlas-ink"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:max-w-[320px]">
            <span className="sr-only">Search inspiration</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-atlas-tertiary"
              strokeWidth={1.8}
            />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search references"
              className="h-11 w-full rounded-full border border-white/[0.06] bg-black px-11 text-[15px] font-normal tracking-[-0.01em] text-atlas-ink outline-none transition placeholder:text-atlas-tertiary focus:border-atlas-accent/50"
            />
          </label>
        </section>

        <section className="mt-7 space-y-3" aria-label="Inspiration list">
          {filteredItems.map((item) => (
            <article
              key={item.slug}
              className="grid gap-5 rounded-[18px] bg-black p-4 md:grid-cols-[220px_minmax(0,1fr)] md:p-5 xl:grid-cols-[240px_minmax(0,1fr)_220px]"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-atlas-surface2">
                {item.screenshot ? (
                  <img
                    src={item.screenshot}
                    alt={`${item.title} screenshot`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_48%_32%,rgb(255_255_255_/_0.12),transparent_34%),linear-gradient(135deg,#202224,#050506)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-atlas-tertiary">
                      <ImageIcon aria-hidden="true" size={20} strokeWidth={1.7} />
                    </div>
                  </div>
                )}
              </div>

              <div className="min-w-0 self-center">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.012em] text-atlas-ink">
                    {item.title}
                  </h2>
                  <span className="rounded-full bg-atlas-surface2 px-3 py-1 text-[12px] font-normal tracking-[-0.01em] text-atlas-muted">
                    {labelForCategory(item.category)}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-[15px] font-normal leading-[1.5] tracking-[-0.01em] text-atlas-muted">
                  {item.note}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-normal tracking-[-0.01em] text-atlas-tertiary">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 transition hover:text-atlas-ink"
                  >
                    {domainFor(item.url)}
                    <ExternalLink aria-hidden="true" size={13} strokeWidth={1.8} />
                  </a>
                  {item.createdAt ? <span>{item.createdAt}</span> : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-center xl:justify-end">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-atlas-surface2 px-4 text-[14px] font-normal tracking-[-0.01em] text-atlas-muted transition hover:bg-atlas-surface3 hover:text-atlas-ink active:scale-95"
                >
                  <ExternalLink aria-hidden="true" size={15} strokeWidth={1.8} />
                  Open Link
                </a>
                <CopyButton value={item.url} label="Copy Link" compact />
                <CopyButton value={generateRebuildPrompt(item)} label="Copy Prompt" compact />
              </div>
            </article>
          ))}
        </section>

        {filteredItems.length === 0 ? (
          <div className="mt-7 rounded-[18px] bg-black p-8 text-center">
            <p className="text-[17px] font-normal tracking-[-0.01em] text-atlas-ink">No references found.</p>
            <p className="mt-2 text-[15px] font-normal leading-[1.5] text-atlas-subtle">
              Try another category or search term.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
