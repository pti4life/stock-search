import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-border bg-background/95 mb-4">
      <div className="container py-2 flex items-center justify-between">
        <Link className="text-xl md:text-2xl" href="/">
          Stock search app
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
