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

const sectionNavItems = navLinks
  ? Array.from(navLinks.querySelectorAll('a[href^="#"]'))
      .map((link) => {
        const sectionId = link.getAttribute("href")?.slice(1);
        if (!sectionId) {
          return null;
        }

        const section = document.getElementById(sectionId);
        if (!section) {
          return null;
        }

        return { link, section };
      })
      .filter((item) => item !== null)
  : [];

if (sectionNavItems.length > 0) {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const siteHeader = document.querySelector(".site-header");

  const updateNavSectionProgress = () => {
    const viewportHeight = window.innerHeight;
    const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
    const marker = headerHeight + Math.min(viewportHeight * 0.35, 220);
    let activeItem = sectionNavItems[0];

    sectionNavItems.forEach((item) => {
      const sectionRect = item.section.getBoundingClientRect();
      const sectionHeight = Math.max(sectionRect.height, 1);
      const progress = clamp((marker - sectionRect.top) / sectionHeight, 0, 1);
      item.link.style.setProperty("--section-progress", `${Math.round(progress * 100)}%`);

      if (marker >= sectionRect.top && marker < sectionRect.bottom) {
        activeItem = item;
      }
    });

    const lastItem = sectionNavItems[sectionNavItems.length - 1];
    const isAtPageEnd =
      window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 1;

    if (isAtPageEnd) {
      activeItem = lastItem;
      lastItem.link.style.setProperty("--section-progress", "100%");
    } else if (lastItem.section.getBoundingClientRect().bottom <= marker) {
      activeItem = lastItem;
    }

    sectionNavItems.forEach((item) => {
      const isActive = item === activeItem;
      item.link.classList.toggle("is-active", isActive);
      item.link.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  let scrollTicking = false;
  const queueNavProgressUpdate = () => {
    if (scrollTicking) {
      return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateNavSectionProgress();
      scrollTicking = false;
    });
  };

  window.addEventListener("scroll", queueNavProgressUpdate, { passive: true });
  window.addEventListener("resize", queueNavProgressUpdate);
  window.addEventListener("hashchange", queueNavProgressUpdate);
  updateNavSectionProgress();
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
