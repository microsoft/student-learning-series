const navLinks = document.querySelector(".nav-links");
const navbarCollapse = document.querySelector("#navbarNav");
const navbarToggler = document.querySelector(".navbar-toggler");
const navToggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector("#theme-toggle");

const themeStorageKey = "portfolio-theme";
const savedTheme = localStorage.getItem(themeStorageKey);
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = savedTheme || preferredTheme;

document.documentElement.setAttribute("data-theme", initialTheme);
document.documentElement.setAttribute("data-bs-theme", initialTheme);

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
    document.documentElement.setAttribute("data-bs-theme", nextTheme);
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

const rotator = document.querySelector("[data-rotator]");
if (rotator) {
  const slides = Array.from(rotator.querySelectorAll("[data-rotator-slide]"));
  const dots = Array.from(rotator.querySelectorAll("[data-rotator-dot]"));
  const rotationToggle = rotator.querySelector("[data-rotator-toggle]");
  let currentIndex = 0;
  let timerId;
  let isPaused = false;

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
    if (
      isPaused ||
      rotator.matches(":focus-within") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    stopRotation();
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

  if (rotationToggle) {
    rotationToggle.addEventListener("click", () => {
      isPaused = !isPaused;
      rotationToggle.textContent = isPaused ? "Play slideshow" : "Pause slideshow";
      rotationToggle.setAttribute(
        "aria-label",
        isPaused ? "Resume automatic slideshow" : "Pause automatic slideshow"
      );
      if (isPaused) {
        stopRotation();
      } else {
        startRotation();
      }
    });
  }

  rotator.addEventListener("mouseenter", stopRotation);
  rotator.addEventListener("mouseleave", startRotation);
  rotator.addEventListener("focusin", stopRotation);
  rotator.addEventListener("focusout", (event) => {
    if (!rotator.contains(event.relatedTarget)) {
      startRotation();
    }
  });
  showSlide(0);
  startRotation();
}

const renderPostList = async (list) => {
  const response = await fetch(list.dataset.postSource);
  if (!response.ok) {
    throw new Error(`Unable to load blog posts: ${response.status}`);
  }

  const posts = await response.json();
  const limit = Number.parseInt(list.dataset.postLimit, 10);
  const visiblePosts = Number.isNaN(limit) ? posts : posts.slice(0, limit);
  const postPrefix = list.dataset.postPrefix || "";

  visiblePosts.forEach((post) => {
    const article = document.createElement("article");
    article.className = "blog-card";

    const heading = document.createElement(list.dataset.postLimit ? "h3" : "h2");
    const link = document.createElement("a");
    link.href = `${postPrefix}${post.url}`;
    link.textContent = post.title;
    heading.append(link);

    const date = document.createElement("p");
    date.className = "meta";
    date.textContent = post.date;

    const summary = document.createElement("p");
    summary.textContent = post.summary;

    article.append(heading, date, summary);
    list.append(article);
  });
};

document.querySelectorAll("[data-post-list]").forEach((list) => {
  renderPostList(list).catch((error) => console.error(error));
});
