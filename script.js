function toggleMenu() {
  const menu = document.getElementById("menuLinks");
  if (!menu) return;
  menu.classList.toggle("open");
}

/* ===================== RESEARCH FILTERS ===================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const researchCards = document.querySelectorAll(".research-box");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    researchCards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = (filter === "all") || tags.includes(filter);

      card.classList.toggle("hidden", !show);
    });
  });

});
