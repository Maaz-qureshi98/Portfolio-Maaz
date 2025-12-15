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
