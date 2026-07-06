import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] items-center justify-center p-6">
      <div className="max-w-md rounded-[18px] bg-atlas-surface1 p-8">
        <h1 className="text-[28px] font-semibold leading-[1.14] tracking-[-0.01em] text-atlas-ink">This page does not exist.</h1>
        <p className="mt-3 text-[17px] leading-[1.47] tracking-[-0.01em] text-atlas-subtle">
          Return to the effect overview and choose a category or workbench effect.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex h-11 items-center rounded-full bg-atlas-accent px-5 text-[15px] font-normal tracking-[-0.01em] text-atlas-accentInk transition hover:bg-atlas-accentHover"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
