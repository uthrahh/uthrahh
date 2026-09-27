"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { SearchIcon } from "@/components/icons";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { NAV_SECTIONS } from "@/components/navSections";

type Command = {
  id: string;
  group: "Jump to" | "Projects" | "Actions" | "Links";
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

const PaletteContext = createContext<() => void>(() => {});

export function useCommandPalette() {
  return useContext(PaletteContext);
}

/** Toggles the site theme and tells every ThemeToggle to re-sync. */
export function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteContext.Provider value={show}>
      {children}
      {open ? <Palette onClose={() => setOpen(false)} /> : null}
    </PaletteContext.Provider>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openProject = useProjectModal();
  const openResume = useResumeModal();
  const pathname = usePathname();
  const router = useRouter();

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => {
      onClose();
      if (pathname !== "/") router.push(`/#${id}`);
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const ext = (href: string) => () => {
      onClose();
      window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      ...NAV_SECTIONS.map((s) => ({
        id: `go-${s.id}`,
        group: "Jump to" as const,
        label: s.label,
        hint: "section",
        run: go(s.id),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects" as const,
        label: p.title,
        hint: p.categories[0],
        keywords: `${p.summary} ${p.technologies.join(" ")}`,
        run: () => {
          onClose();
          openProject(p.slug);
        },
      })),
      {
        id: "a-email",
        group: "Actions",
        label: copied ? "Copied!" : `Copy email (${site.email})`,
        keywords: "contact mail",
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => {
              setCopied(true);
              window.setTimeout(onClose, 700);
            },
            () => {
              window.location.href = `mailto:${site.email}`;
            }
          );
        },
      },
      ...(site.resumeAvailable
        ? [
            {
              id: "a-resume",
              group: "Actions" as const,
              label: "Open resume",
              keywords: "cv",
              run: () => {
                onClose();
                openResume();
              },
            },
          ]
        : []),
      {
        id: "a-theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        keywords: "dark mode light mode appearance",
        run: () => {
          toggleTheme();
          onClose();
        },
      },
      { id: "l-github", group: "Links", label: "GitHub", hint: "github.com/uthrahh", run: ext(site.github) },
      { id: "l-linkedin", group: "Links", label: "LinkedIn", hint: "in/uthrah-rk", run: ext(site.linkedin) },
      { id: "l-substack", group: "Links", label: "Substack", hint: "@uthrahhh", run: ext(site.substack) },
    ];
  }, [copied, onClose, openProject, openResume, pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Focus management + scroll lock while open.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function onKeyDown(e: ReactKeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  }

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-paper-raised shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon size={16} className="text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Jump to a section, open a project, copy email…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={filtered[cursor] ? `cmd-${filtered[cursor].id}` : undefined}
            className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">esc</kbd>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-ink-faint">No matches for “{query}”</li>
          ) : null}
          {filtered.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {header ? (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-faint">
                    {header}
                  </p>
                ) : null}
                <button
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === cursor}
                  data-index={i}
                  type="button"
                  onMouseMove={() => setCursor(i)}
                  onClick={() => c.run()}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === cursor ? "bg-accent-soft text-ink" : "text-ink-muted"
                  }`}
                >
                  <span className="truncate">{c.label}</span>
                  {c.hint ? (
                    <span className="shrink-0 font-mono text-[11px] text-ink-faint">{c.hint}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[11px] text-ink-faint">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto">⌘K / Ctrl K</span>
        </div>
      </div>
    </div>
  );
}
