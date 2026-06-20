// =========================
// FUNKCJA ZMIANY JĘZYKA
// =========================
function setLanguage(lang) {
  if (!translations[lang]) return;

  // Teksty
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });

  // TITLE
  const titleEl = document.querySelector("title");
  if (titleEl) {
    const titleKey = titleEl.getAttribute("data-i18n-title");
    if (titleKey && translations[lang][titleKey]) {
      titleEl.textContent = translations[lang][titleKey];
    }
  }

  // ALT
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (translations[lang][key]) el.alt = translations[lang][key];
  });

  // PLACEHOLDER
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  // Atrybut lang w <html>
  document.documentElement.lang = lang;

  localStorage.setItem("lang", lang);
}



// =========================
// PARALLAX
// =========================
function handleParallax() {
  const header = document.querySelector(".header-container");
  if (!header) return;

  const scrollY = window.scrollY;
  const speed = 0.35;

  header.style.backgroundPosition = `center ${scrollY * speed}px`;
}

function initParallax() {
  const header = document.querySelector(".header-container");
  if (!header) return;

  if (window.innerWidth > 1024) {
    window.addEventListener("scroll", handleParallax);
  } else {
    window.removeEventListener("scroll", handleParallax);
    header.style.backgroundPosition = "center 0px";
  }
}



// =========================
// START STRONY
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.body;

  // Fade-ready
  setTimeout(() => wrapper.classList.add("fade-ready"), 50);

  // Automatyczny język
  const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2);
  const defaultLang = browserLang === "de" ? "de" : "pl";
  const savedLang = localStorage.getItem("lang") || defaultLang;

  setLanguage(savedLang);

  // Obsługa przycisków języka
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");

      if (localStorage.getItem("lang") === lang) return;

      wrapper.classList.remove("fade-soft-out", "fade-soft-in");
      wrapper.classList.add("fade-soft-out");

      setTimeout(() => {
        setLanguage(lang);
        wrapper.classList.remove("fade-soft-out");
        wrapper.classList.add("fade-soft-in");

        setTimeout(() => wrapper.classList.remove("fade-soft-in"), 500);
      }, 500);
    });
  });

  // Parallax
  initParallax();
});



// =========================
// REAKCJA NA ZMIANĘ ROZMIARU
// =========================
window.addEventListener("resize", initParallax);


// =========================
// HAMBURGER MENU
// =========================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // blokada scrolla
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Zamknij menu po kliknięciu w link
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});