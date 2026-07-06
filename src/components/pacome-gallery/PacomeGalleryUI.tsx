export type GalleryMode = "spiral" | "list";

export function PacomeGalleryUI({ mode, onModeChange }: { mode: GalleryMode; onModeChange: (mode: GalleryMode) => void }) {
  return (
    <div className="pacome-gallery__mode-toggle" aria-label="Gallery mode">
      <button type="button" className={mode === "spiral" ? "is-active" : ""} onClick={() => onModeChange("spiral")}>
        spiral
      </button>
      <span className="pacome-gallery__dot" aria-hidden="true" />
      <button type="button" className={mode === "list" ? "is-active" : ""} onClick={() => onModeChange("list")}>
        list
      </button>
    </div>
  );
}
