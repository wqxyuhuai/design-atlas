import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-atlas-canvas text-atlas-ink">
      <Header />
      <main className="min-h-[calc(100dvh-64px)]">{children}</main>
    </div>
  );
}
