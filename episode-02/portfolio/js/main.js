const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  const setMenuState = (isOpen) => {
    navMenu.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });
}

// Email popup modal
const emailModal = document.getElementById("emailModal");
if (emailModal) {
  const triggers = document.querySelectorAll(".email-trigger");
  const addressEl = document.getElementById("emailAddress");
  const copyBtn = document.getElementById("copyEmailBtn");
  const mailBtn = document.getElementById("openMailBtn");
  const closers = emailModal.querySelectorAll("[data-close]");
  let lastFocused = null;
  let copyResetTimer;

  const resetCopy = () => {
    clearTimeout(copyResetTimer);
    copyBtn.textContent = "Copy";
    copyBtn.classList.remove("copied");
  };

  function closeModal() {
    emailModal.hidden = true;
    resetCopy();
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") closeModal();
  }

  const openModal = (email) => {
    if (email) {
      addressEl.textContent = email;
      mailBtn.href = "mailto:" + email;
    }
    lastFocused = document.activeElement;
    emailModal.hidden = false;
    copyBtn.focus();
    document.addEventListener("keydown", onKeydown);
  };

  const copyEmail = async () => {
    const email = addressEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* no-op */ }
      document.body.removeChild(ta);
    }
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(resetCopy, 2000);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger.dataset.email);
    });
  });
  copyBtn.addEventListener("click", copyEmail);
  closers.forEach((closer) => closer.addEventListener("click", closeModal));
}
