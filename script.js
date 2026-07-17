const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const navLinks = navigation.querySelectorAll("a");
const filters = document.querySelectorAll(".filter");
const papers = document.querySelectorAll(".paper");
const searchInput = document.querySelector("#research-search");
const noResults = document.querySelector("#no-results");

let activeFilter = "all";

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );
  navigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMenu();
  }
});

function updateResearch() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  papers.forEach((paper) => {
    const categories = paper.dataset.category.split(" ");
    const text = `${paper.dataset.search} ${paper.textContent}`.toLowerCase();
    const matchesFilter =
      activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = !query || text.includes(query);
    const visible = matchesFilter && matchesSearch;

    paper.hidden = !visible;
    if (visible) {
      visibleCount += 1;
    }
  });

  noResults.hidden = visibleCount > 0;
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;
    filters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    updateResearch();
  });
});

searchInput.addEventListener("input", updateResearch);
document.querySelector("#year").textContent = new Date().getFullYear();
