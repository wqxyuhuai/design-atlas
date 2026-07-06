import { forwardRef } from "react";

type CursorBubbleProps = {
  label: string;
  className?: string;
  visible?: boolean;
};

export const CursorBubble = forwardRef<HTMLSpanElement, CursorBubbleProps>(function CursorBubble(
  { label, className = "", visible = false },
  ref
) {
  return (
    <span
      aria-hidden="true"
      className={["videoCursorBubble", visible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      ref={ref}
    >
      {label}
    </span>
  );
});
