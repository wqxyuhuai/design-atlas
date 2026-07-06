export const componentCode = `import { LiquidTypographyLink } from "./LiquidTypographyLink";

export function LiquidTypographyLinkDemo() {
  const items = [
    "LIQUID TYPOGRAPHY",
    "MAGNETIC TITLE",
    "PROJECT LINK",
    "INTERACTIVE TYPE",
    "DISTORTED HOVER"
  ];

  return (
    <div className="liquidTypographyDemo">
      <div className="liquidTypographyDemo__list">
        {items.map((title, index) => (
          <LiquidTypographyLink
            key={title}
            title={title}
            index={String(index + 1).padStart(2, "0")}
            openLabel="OPEN"
          />
        ))}
      </div>
    </div>
  );
}`;

export const cssCode = `.liquidTypographyLink {
  --liquid-bg: #fff;
  --liquid-ink: #050505;
  --liquid-line: rgb(5 5 5 / 0.9);
  --liquid-opacity: 0;
  --mouse-x: 50%;
  --mouse-y: 50%;
  --label-x: 50%;
  --label-y: 78%;

  position: relative;
  display: block;
  width: 100%;
  min-height: clamp(76px, 10cqw, 140px);
  border: 0;
  border-bottom: 2px solid var(--liquid-line);
  background: var(--liquid-bg);
  color: var(--liquid-ink);
  cursor: pointer;
}

.liquidTypographyLink__textStack {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: clamp(20px, 4vw, 72px);
  overflow: hidden;
}

.liquidTypographyLink__titleWrap {
  position: relative;
  display: inline-block;
  max-width: calc(100% - 84px);
  overflow: hidden;
  font-size: clamp(36px, 8.4cqw, 76px);
  font-weight: 850;
  line-height: 0.86;
  letter-spacing: -0.055em;
  text-transform: uppercase;
  white-space: nowrap;
}

.liquidTypographyLink__hoverEraseMask,
.liquidTypographyLink__liquidLayer {
  position: absolute;
  inset: -4px 0;
  opacity: var(--liquid-opacity);
  pointer-events: none;
  mask-image: radial-gradient(ellipse 92px 34px at var(--mouse-x) var(--mouse-y), #000 0%, #000 58%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 92px 34px at var(--mouse-x) var(--mouse-y), #000 0%, #000 58%, transparent 80%);
}

.liquidTypographyLink__hoverEraseMask {
  z-index: 2;
  background: var(--liquid-bg);
}

.liquidTypographyLink__liquidSlice {
  position: absolute;
  inset: 4px 0;
  clip-path: inset(var(--slice-top) 0 var(--slice-bottom) 0);
  transform:
    translate3d(var(--slice-x, 0px), var(--slice-y, 0px), 0)
    skewX(var(--slice-skew, 0deg))
    scaleX(var(--slice-scale-x, 1));
}

.liquidTypographyLink__openLabel {
  position: absolute;
  color: var(--liquid-ink);
  font-size: 11px;
  font-weight: 800;
  opacity: var(--liquid-opacity);
  pointer-events: none;
  transform: translate3d(var(--label-x), var(--label-y), 0) translate(-50%, 0);
}

@media (prefers-reduced-motion: reduce) {
  .liquidTypographyLink__liquidLayer,
  .liquidTypographyLink__hoverEraseMask,
  .liquidTypographyLink__openLabel {
    display: none;
  }
}`;

export const code = componentCode;
