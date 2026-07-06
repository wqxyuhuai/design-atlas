import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

interface ColorPickerControlProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const colorSwatches = [
  "#8B5CF6",
  "#7C3AED",
  "#6366F1",
  "#4F83F1",
  "#5AB6D6",
  "#52B788",
  "#99D12F",
  "#EABF31",
  "#F18422",
  "#E75043",
  "#D84E8B",
  "#E55266",
  "#F5F5F7",
  "#98A2B3",
  "#000000"
];

const hexColorPattern = /^#[0-9a-f]{6}$/i;

interface HsvColor {
  h: number;
  s: number;
  v: number;
}

function normalizeHex(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("#") ? trimmed.toUpperCase() : `#${trimmed.toUpperCase()}`;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string) {
  const safeHex = hexColorPattern.test(hex) ? hex : "#B7D075";
  const value = safeHex.slice(1);

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function hexToHsv(hex: string): HsvColor {
  const { r, g, b } = hexToRgb(hex);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === red) {
      h = 60 * (((green - blue) / delta) % 6);
    } else if (max === green) {
      h = 60 * ((blue - red) / delta + 2);
    } else {
      h = 60 * ((red - green) / delta + 4);
    }
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: max === 0 ? 0 : delta / max,
    v: max
  };
}

function hsvToHex({ h, s, v }: HsvColor) {
  const chroma = v * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const match = v - chroma;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = chroma;
    g = x;
  } else if (h < 120) {
    r = x;
    g = chroma;
  } else if (h < 180) {
    g = chroma;
    b = x;
  } else if (h < 240) {
    g = x;
    b = chroma;
  } else if (h < 300) {
    r = x;
    b = chroma;
  } else {
    r = chroma;
    b = x;
  }

  return rgbToHex((r + match) * 255, (g + match) * 255, (b + match) * 255);
}

function pointFromEvent(event: ReactPointerEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = clamp((event.clientX - rect.left) / rect.width);
  const y = clamp((event.clientY - rect.top) / rect.height);

  return { x, y };
}

export function ColorPickerControl({ id, label, value, onChange }: ColorPickerControlProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const safeValue = hexColorPattern.test(value) ? value.toUpperCase() : "#B7D075";
  const [draft, setDraft] = useState(safeValue);
  const hsv = hexToHsv(safeValue);
  const hueColor = hsvToHex({ h: hsv.h, s: 1, v: 1 });

  useEffect(() => {
    setDraft(safeValue);
  }, [safeValue]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => window.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  function commitHex(nextDraft = draft) {
    const nextValue = normalizeHex(nextDraft);

    if (!hexColorPattern.test(nextValue)) {
      setDraft(safeValue);
      return;
    }

    onChange(nextValue);
  }

  function updateSaturationValue(event: ReactPointerEvent<HTMLDivElement>) {
    const { x, y } = pointFromEvent(event);
    onChange(hsvToHex({ h: hsv.h, s: x, v: 1 - y }));
  }

  function updateHue(event: ReactPointerEvent<HTMLDivElement>) {
    const { x } = pointFromEvent(event);
    onChange(hsvToHex({ ...hsv, h: x * 360 }));
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-atlas-canvas p-1.5 transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-atlas-accent/45"
          aria-label={`Pick ${label}`}
          aria-expanded={open}
        >
          <span
            className="h-full w-full rounded-full ring-1 ring-white/10"
            style={{ backgroundColor: safeValue }}
          />
        </button>
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(event) => {
            const nextDraft = normalizeHex(event.target.value);
            setDraft(nextDraft);
            if (hexColorPattern.test(nextDraft)) {
              onChange(nextDraft);
            }
          }}
          onBlur={() => commitHex()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commitHex(event.currentTarget.value);
              event.currentTarget.blur();
            } else if (event.key === "Escape") {
              setDraft(safeValue);
              event.currentTarget.blur();
            }
          }}
          className="h-10 w-full rounded-full bg-atlas-canvas px-4 text-[14px] font-normal uppercase tracking-[-0.01em] text-atlas-muted outline-none transition focus:ring-2 focus:ring-atlas-accent/45"
        />
      </div>

      {open ? (
        <div className="absolute left-0 top-12 z-50 w-[min(640px,calc(100vw-2rem))] rounded-[18px] border border-white/[0.10] bg-black p-4 shadow-[0_24px_70px_rgb(0_0_0_/_0.58)]">
          <div
            role="slider"
            aria-label={`${label} saturation and brightness`}
            aria-valuetext={safeValue}
            tabIndex={0}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              updateSaturationValue(event);
            }}
            onPointerMove={(event) => {
              if (event.buttons === 1) {
                updateSaturationValue(event);
              }
            }}
            className="relative h-44 overflow-hidden rounded-[10px] outline-none ring-1 ring-white/[0.08] focus:ring-2 focus:ring-atlas-accent/45"
            style={{
              backgroundColor: hueColor,
              backgroundImage:
                "linear-gradient(90deg, #ffffff, rgb(255 255 255 / 0)), linear-gradient(0deg, #000000, rgb(0 0 0 / 0))"
            }}
          >
            <span
              className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0_/_0.45)]"
              style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
            />
          </div>

          <div
            role="slider"
            aria-label={`${label} hue`}
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(hsv.h)}
            tabIndex={0}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              updateHue(event);
            }}
            onPointerMove={(event) => {
              if (event.buttons === 1) {
                updateHue(event);
              }
            }}
            className="relative mt-3 h-5 rounded-full outline-none ring-1 ring-white/[0.08] focus:ring-2 focus:ring-atlas-accent/45"
            style={{
              background:
                "linear-gradient(90deg, #ff3b30, #ffcc00, #a6ff2e, #5ff878, #5ac8fa, #0a00ff, #bf5af2, #ff2d55, #ff3b30)"
            }}
          >
            <span
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0_/_0.45)]"
              style={{ left: `${(hsv.h / 360) * 100}%`, backgroundColor: hueColor }}
            />
          </div>

          <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {colorSwatches.map((swatch) => {
              const active = safeValue === swatch;

              return (
                <button
                  key={`picker-${swatch}`}
                  type="button"
                  onClick={() => onChange(swatch)}
                  className={`h-8 w-8 rounded-[7px] transition hover:scale-105 ${
                    active ? "ring-2 ring-atlas-accent ring-offset-2 ring-offset-black" : "ring-1 ring-white/[0.08]"
                  }`}
                  style={{ backgroundColor: swatch }}
                  aria-label={`Use ${swatch}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
