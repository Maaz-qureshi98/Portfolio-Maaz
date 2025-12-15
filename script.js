function toggleMenu() {
  const menuLinks = document.querySelector(".menu-links");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  menuLinks.classList.toggle("open");
  hamburgerIcon.classList.toggle("open");
}

/* ===================== RESEARCH FILTERS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".research-item");

  function setActive(btn){
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function applyFilter(filter){
    items.forEach(item => {
      const tags = (item.dataset.tags || "").toLowerCase();
      if (filter === "all") {
        item.classList.remove("hidden");
        return;
      }
      if (tags.includes(filter)) item.classList.remove("hidden");
      else item.classList.add("hidden");
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      setActive(btn);
      applyFilter(filter);
    });
  });
});
