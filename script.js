function toggleMenu(forceClose = false) {
  const menu = document.getElementById("menuLinks");
  const btn = document.getElementById("hamburgerBtn");
  if (!menu || !btn) return;

  if (forceClose) menu.classList.remove("open");
  else menu.classList.toggle("open");

  const isOpen = menu.classList.contains("open");
  btn.setAttribute("aria-expanded", String(isOpen));
}

/* Hook button */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("menuLinks");

  if (btn) btn.addEventListener("click", () => toggleMenu());

  /* Close when clicking a link */
  if (menu) {
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => toggleMenu(true));
    });
  }

  /* Close when clicking outside */
  document.addEventListener("click", (e) => {
    if (!menu || !btn) return;
    const clickedInside = menu.contains(e.target) || btn.contains(e.target);
    if (!clickedInside) toggleMenu(true);
  });

  /* Close on ESC */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(true);
  });

  /* ===================== THEME TOGGLE ===================== */
  const themeButtons = Array.from(document.querySelectorAll(".theme-toggle"));
  const themeKey = "preferredTheme";

  const getSavedTheme = () => localStorage.getItem(themeKey);
  const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const getCurrentTheme = () => document.body.classList.contains("dark-mode") ? "dark" : "light";

  const updateThemeButtons = (theme) => {
    themeButtons.forEach(button => {
      const icon = theme === "dark" ? "☀️" : "🌙";
      const label = theme === "dark" ? "Light" : "Dark";
      button.querySelector(".theme-toggle__icon").textContent = icon;
      button.querySelector(".theme-toggle__label").textContent = label;
      button.setAttribute("aria-label", `Switch to ${label} mode`);
    });
  };

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    updateThemeButtons(theme);
  };

  const setTheme = (theme) => {
    applyTheme(theme);
    localStorage.setItem(themeKey, theme);
  };

  const initTheme = () => {
    const savedTheme = getSavedTheme();
    const theme = savedTheme || getSystemTheme();
    applyTheme(theme);
  };

  initTheme();

  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  });
});

/* ===================== RESEARCH FILTERS ===================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const researchCards = document.querySelectorAll(".research-box");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    researchCards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
      const show = (filter === "all") || tags.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
});