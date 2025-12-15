/* ===================== HAMBURGER ===================== */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* ===================== LOGO TREE LINES (BOUNDARY-TO-BOUNDARY) ===================== */
function drawLogoTreeLines() {
  const tree = document.getElementById("logoTree");
  const svg = document.getElementById("treeSvg");
  if (!tree || !svg) return;

  svg.innerHTML = "";

  const treeRect = tree.getBoundingClientRect();
  const W = treeRect.width;
  const H = treeRect.height;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  function anchor(el, which) {
    const r = el.getBoundingClientRect();
    const left = r.left - treeRect.left;
    const right = r.right - treeRect.left;
    const top = r.top - treeRect.top;
    const bottom = r.bottom - treeRect.top;
    const cx = left + r.width / 2;
    const cy = top + r.height / 2;

    const out = 2; // boundary offset
    if (which === "bottom") return { x: cx, y: bottom + out };
    if (which === "top") return { x: cx, y: top - out };
    if (which === "left") return { x: left - out, y: cy };
    if (which === "right") return { x: right + out, y: cy };
    return { x: cx, y: cy };
  }

  const uw = document.getElementById("node-uw");
  const apple = document.getElementById("node-apple");
  const keysight = document.getElementById("node-keysight");
  const rogers = document.getElementById("node-rogers");
  if (!uw || !apple || !keysight || !rogers) return;

  const uwBottom = anchor(uw, "bottom");
  const appleTop = anchor(apple, "top");
  const keyTop = anchor(keysight, "top");
  const rogersTop = anchor(rogers, "top");

  // bus between apple and rogers, centered between UW and bottom row
  const busY = (uwBottom.y + keyTop.y) / 2;

  // line/dot helpers
  function line(x1, y1, x2, y2) {
    const L = document.createElementNS("http://www.w3.org/2000/svg", "line");
    L.setAttribute("x1", x1);
    L.setAttribute("y1", y1);
    L.setAttribute("x2", x2);
    L.setAttribute("y2", y2);
    L.setAttribute("stroke", "rgba(0,0,0,0.25)");
    L.setAttribute("stroke-width", "3");
    L.setAttribute("stroke-linecap", "round");
    svg.appendChild(L);
  }

  function dot(x, y) {
    const C = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    C.setAttribute("cx", x);
    C.setAttribute("cy", y);
    C.setAttribute("r", "4");
    C.setAttribute("fill", "#fff");
    C.setAttribute("stroke", "rgba(0,0,0,0.25)");
    C.setAttribute("stroke-width", "2");
    svg.appendChild(C);
  }

  // UW down to bus
  line(uwBottom.x, uwBottom.y, uwBottom.x, busY);

  // horizontal bus
  line(appleTop.x, busY, rogersTop.x, busY);

  // drops to nodes
  line(appleTop.x, busY, appleTop.x, appleTop.y);
  line(keyTop.x, busY, keyTop.x, keyTop.y);
  line(rogersTop.x, busY, rogersTop.x, rogersTop.y);

  // dots at junctions
  dot(uwBottom.x, busY);
  dot(appleTop.x, busY);
  dot(keyTop.x, busY);
  dot(rogersTop.x, busY);
}

window.addEventListener("load", drawLogoTreeLines);
window.addEventListener("resize", drawLogoTreeLines);

/* ===================== RESEARCH FILTERS ===================== */
(function initResearchFilters(){
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".research-box");
  if (!buttons.length || !cards.length) return;

  function setActive(btn){
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function applyFilter(filter){
    cards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      if (filter === "all") {
        card.style.display = "";
        return;
      }
      card.style.display = tags.includes(filter) ? "" : "none";
    });

    // hide/show the dividers right after filtering for clean look
    const dividers = document.querySelectorAll("#research .item-divider");
    dividers.forEach(hr => hr.style.display = "none");

    // re-enable divider only between visible cards
    const visible = Array.from(cards).filter(c => c.style.display !== "none");
    visible.forEach((c, idx) => {
      const hr = c.nextElementSibling;
      if (hr && hr.classList.contains("item-divider") && idx !== visible.length - 1) {
        hr.style.display = "";
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      setActive(btn);
      applyFilter(filter);
    });
  });

  // initial state
  applyFilter("all");
})();
