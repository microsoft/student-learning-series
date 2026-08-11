const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
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

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("open", !isExpanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });
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

const rotator = document.querySelector("[data-rotator]");
if (rotator) {
  const slides = Array.from(rotator.querySelectorAll("[data-rotator-slide]"));
  const dots = Array.from(rotator.querySelectorAll("[data-rotator-dot]"));
  let currentIndex = 0;
  let timerId;

  const showSlide = (nextIndex) => {
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const startRotation = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerId = window.setInterval(() => {
      showSlide(currentIndex + 1);
    }, 4500);
  };

  const stopRotation = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = undefined;
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopRotation();
      showSlide(index);
      startRotation();
    });
  });

  rotator.addEventListener("mouseenter", stopRotation);
  rotator.addEventListener("mouseleave", startRotation);
  showSlide(0);
  startRotation();
}
