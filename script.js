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
    const theme = savedTheme || "light"; // ✅ always light by default for first-time visitors
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

/* ===================== SCROLL REVEAL ===================== */
/* Progressive enhancement: we only add the hiding class (.reveal) from JS,
   so if JS is disabled all content stays fully visible. */
document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = document.querySelectorAll(
    ".hero-right, .about-layout, .edu-box, .research-box, .solar-system, .contact-info-upper-container, #research > .section__text__p1, #research > .title, #journey > .section__text__p1, #journey > .title, #contact > .section__text__p1, #contact > .title"
  );

  if (prefersReduced || !("IntersectionObserver" in window)) return;

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  revealTargets.forEach(el => io.observe(el));
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