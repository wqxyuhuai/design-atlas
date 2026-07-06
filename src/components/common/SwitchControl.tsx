interface SwitchControlProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const switchEase = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function SwitchControl({ checked, label, onChange }: SwitchControlProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`group inline-flex shrink-0 items-center rounded-full outline-none transition-transform duration-300 ${switchEase} active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-atlas-accent/45`}
      aria-label={`${label} ${checked ? "on" : "off"}`}
      aria-pressed={checked}
    >
      <span className={`relative h-6 w-11 overflow-hidden rounded-full bg-black ring-1 transition-shadow duration-300 ${switchEase} ${checked ? "ring-atlas-accent/28" : "ring-white/[0.06]"}`}>
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full bg-[linear-gradient(135deg,#cbe882_0%,#b7d075_100%)] transition-opacity duration-300 ${switchEase} ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          aria-hidden="true"
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-[0_1px_4px_rgb(0_0_0_/_0.32)] transition-transform duration-300 ${switchEase} will-change-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
