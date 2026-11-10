import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import "./commandPalette.css";
import { cvPdf } from "../../assets";
import { useTheme } from "../../context/ThemeContext";
import { contactEmail } from "../../data/contact";
import { navLinks } from "../../data/navigation";
import { socialLinks } from "../../data/socialLinks";

interface Command {
  id: string;
  label: string;
  group: string;
  icon: string;
  keywords?: string;
  run: () => void;
}

const TOAST_MS = 2000;
const isMac = /mac/i.test(navigator.platform);

const downloadCv = (): void => {
  const link = document.createElement("a");
  link.href = cvPdf;
  link.download = "nadia-romanchuk-frontend-developer.pdf";
  link.click();
};

const CommandPalette = () => {
  const { theme, toggleTheme } = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState("");

  const commands = useMemo<Command[]>(() => {
    const copyEmail = async () => {
      try {
        await navigator.clipboard.writeText(contactEmail);
        setToast("Email copied");
      } catch {
        setToast(contactEmail);
      }
    };

    return [
      ...navLinks.map((link) => ({
        id: link.id,
        label: `Go to ${link.label}`,
        group: "Navigate",
        icon: link.icon,
        run: () => document.querySelector(link.href)?.scrollIntoView(),
      })),
      {
        id: "copy-email",
        label: "Copy email",
        group: "Actions",
        icon: "bx bx-copy",
        keywords: `mail contact ${contactEmail}`,
        run: copyEmail,
      },
      {
        id: "download-cv",
        label: "Download CV",
        group: "Actions",
        icon: "bx bx-download",
        keywords: "resume pdf",
        run: downloadCv,
      },
      {
        id: "toggle-theme",
        label: `Switch to ${theme === "light" ? "dark" : "light"} theme`,
        group: "Actions",
        icon: theme === "light" ? "bx bx-moon" : "bx bx-sun",
        keywords: "dark light mode color",
        run: () => toggleTheme(),
      },
      ...socialLinks.map((link) => ({
        id: link.id,
        label: `Open ${link.label}`,
        group: "Links",
        icon: link.icon,
        run: () => window.open(link.href, "_blank", "noreferrer"),
      })),
    ];
  }, [theme, toggleTheme]);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.keywords ?? ""}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
  }, [commands, query]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      setQuery("");
      setActiveIndex(0);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const runCommand = (command?: Command): void => {
    if (!command) return;
    setOpen(false);
    // Wait for the dialog to leave the top layer so scrolling and view transitions see the page.
    window.requestAnimationFrame(() => command.run());
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(results[activeIndex]);
    }
  };

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>): void => {
    if (event.target === dialogRef.current) setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="command-trigger"
        aria-label="Open command menu"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={() => setOpen(true)}
      >
        <i className="bx bx-search"></i>
        <kbd className="command-trigger__keys">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="command"
        aria-label="Command menu"
        onClose={() => setOpen(false)}
        onClick={handleBackdropClick}
      >
        <div className="command__panel">
          <div className="command__search">
            <i className="bx bx-search"></i>
            <input
              className="command__input"
              type="text"
              placeholder="Type a command or search…"
              value={query}
              autoFocus
              role="combobox"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={
                results[activeIndex] ? `command-${results[activeIndex].id}` : undefined
              }
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <kbd className="command__key">esc</kbd>
          </div>

          <div ref={listRef} id="command-list" className="command__list" role="listbox">
            {results.length === 0 && (
              <p className="command__empty">No results for “{query}”</p>
            )}
            {results.map((command, index) => (
              <div key={command.id} role="presentation">
                {command.group !== results[index - 1]?.group && (
                  <p className="command__group">{command.group}</p>
                )}
                <div
                  id={`command-${command.id}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected={index === activeIndex}
                  className="command__item"
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => runCommand(command)}
                  onKeyDown={undefined}
                >
                  <i className={`${command.icon} command__icon`}></i>
                  {command.label}
                  <i className="bx bx-subdirectory-left command__enter"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="command__footer">
            <span><kbd className="command__key">↑</kbd><kbd className="command__key">↓</kbd> navigate</span>
            <span><kbd className="command__key">↵</kbd> select</span>
          </div>
        </div>
      </dialog>

      {toast && (
        <p className="command-toast" role="status">
          <i className="bx bx-check"></i>
          {toast}
        </p>
      )}
    </>
  );
};

export default CommandPalette;
