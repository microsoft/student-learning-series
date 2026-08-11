const navLinks = document.querySelector(".nav-links");
const navbarCollapse = document.querySelector("#navbarNav");
const navbarToggler = document.querySelector(".navbar-toggler");
const themeToggle = document.querySelector("#theme-toggle");

const themeStorageKey = "portfolio-theme";
const savedTheme = localStorage.getItem(themeStorageKey);
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = savedTheme || preferredTheme;

document.documentElement.setAttribute("data-theme", initialTheme);

if (themeToggle) {
  const syncThemeToggle = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle.dataset.mode = isDark ? "dark" : "light";
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };

  syncThemeToggle();

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
    syncThemeToggle();
  });
}

if (navLinks && navbarCollapse && navbarToggler && window.bootstrap?.Collapse) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      const isMobile = window.getComputedStyle(navbarToggler).display !== "none";
      const isMenuOpen = navbarCollapse.classList.contains("show");
      if (isMobile && isMenuOpen) {
        window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
}

if (window.bootstrap?.ScrollSpy) {
  window.bootstrap.ScrollSpy.getOrCreateInstance(document.body).refresh();
}

const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}
