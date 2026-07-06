export type GalleryMode = "spiral" | "list";

export function PacomeGalleryUI({ mode, onModeChange }: { mode: GalleryMode; onModeChange: (mode: GalleryMode) => void }) {
  return (
    <>
      <a className="pacome-gallery__logo" href="/" aria-label="Back to Design Atlas">
        <span className="pacome-gallery__logo-face" />
      </a>

      <div className="pacome-gallery__mode-toggle" aria-label="Gallery mode">
        <button type="button" className={mode === "spiral" ? "is-active" : ""} onClick={() => onModeChange("spiral")}>
          spiral
        </button>
        <span className="pacome-gallery__dot" aria-hidden="true" />
        <button type="button" className={mode === "list" ? "is-active" : ""} onClick={() => onModeChange("list")}>
          list
        </button>
      </div>

      <button className="pacome-gallery__menu" type="button">
        menu
        <span aria-hidden="true" />
      </button>

      <div className="pacome-gallery__showreel" aria-hidden="true">
        <img src="/demo/pacome-gallery/yellow-orb.png" alt="" />
      </div>

      <button className="pacome-gallery__sound" type="button" aria-label="Toggle sound">
        <span />
      </button>
    </>
  );
}
