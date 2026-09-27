// Runs before paint to avoid a flash of the wrong theme. Reads a stored
// preference; falls back to the OS setting via CSS if nothing is stored.
const THEME_SCRIPT = `
(function () {
  // Opt into reveal-on-scroll before first paint (no flash of content that
  // then hides). Without JS this never runs, so content just stays visible.
  document.documentElement.classList.add("js-reveal");
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
