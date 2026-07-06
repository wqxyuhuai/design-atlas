import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { firstEffectByCategory } from "../../registry/getEffect";
import { workbenchPath } from "../../utils/routes";

const firstBackground = firstEffectByCategory("backgrounds");

function navClass(isActive: boolean) {
  return clsx(
    "inline-flex h-9 items-center rounded-full px-4 text-[13px] tracking-[-0.01em] transition",
    isActive
      ? "bg-atlas-surface4 font-medium text-atlas-ink"
      : "font-normal text-atlas-subtle hover:bg-atlas-surface2 hover:text-atlas-muted"
  );
}

export function Header() {
  const location = useLocation();
  const workbenchHref = firstBackground ? workbenchPath("backgrounds", firstBackground.slug) : "/";
  const workbenchActive = location.pathname === "/" || location.pathname.startsWith("/workbench");

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.24] bg-[rgb(0_0_0_/_0.40)] backdrop-blur-[22px] backdrop-saturate-[180%]">
      <div className="relative mx-auto grid h-16 w-full max-w-[1760px] grid-cols-[16px_minmax(0,1fr)] items-center md:grid-cols-[72px_180px_220px_minmax(0,1fr)] xl:grid-cols-[96px_180px_220px_minmax(0,1180px)_84px] 2xl:grid-cols-[120px_180px_220px_minmax(0,1180px)_60px]">
        <NavLink
          to="/"
          className="col-start-2 flex items-center gap-2.5 pl-4 text-[15px] font-medium tracking-[-0.01em] text-atlas-ink md:col-start-2 md:pl-6"
        >
          <img src="/logo.svg" alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
          Design Atlas
        </NavLink>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
          <NavLink to={workbenchHref} className={navClass(workbenchActive)}>
            Workbench
          </NavLink>
          <NavLink to="/inspiration" className={({ isActive }) => navClass(isActive)}>
            Inspiration
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
