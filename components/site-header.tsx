import { ThemeSwitcher } from "./theme-switcher";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-border bg-background/95 mb-4">
      <div className="container p-2 flex items-center justify-between">
        <span className="text-xl md:text-2xl">Stock search app</span>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
