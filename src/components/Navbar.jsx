import { useState } from "react";
import { FileCheck2, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Analyze Resume", href: "#analyze" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 border-b border-pine-100 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold text-pine-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-pine-700 text-white"><FileCheck2 className="h-5 w-5" /></span>
          ATS Resume Checker
        </a>
        <ul className="hidden gap-7 text-sm font-medium sm:flex">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="text-ink/70 hover:text-pine-700">{l.label}</a></li>
          ))}
        </ul>
        <button type="button" className="sm:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="space-y-1 border-t border-pine-100 px-5 py-3 sm:hidden">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">{l.label}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}
