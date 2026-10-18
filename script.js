
/* ==============================
   NOVAWEB STUDIO — INTERACTIONS
   ============================== */

document.documentElement.classList.add("js-ready");

// Automatically update the copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  // Close the menu when a navigation link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu if the visitor clicks outside it
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // Close the menu when switching to desktop layout
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    // Small stagger effect for consecutive service and process cards
    if (
      element.classList.contains("service-card") ||
      element.classList.contains("process-card")
    ) {
      element.style.transitionDelay = `${(index % 4) * 80}ms`;
    }

    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* ==============================
   SCROLL PROGRESS SLIDER
   ============================== */

const progressBar = document.getElementById("scroll-progress-bar");

function updateScrollProgress() {
    if (!progressBar) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
        progressBar.style.width = "0%";
        return;
    }

    const scrollPercentage =
        (window.scrollY / scrollableHeight) * 100;

    progressBar.style.width =
        `${Math.min(100, Math.max(0, scrollPercentage))}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});
document.addEventListener("DOMContentLoaded", function () {
    const message = document.getElementById("form-message");
    const form = document.getElementById("send-message-form");

    if (window.location.hash === "#thank-you" && message) {
        message.hidden = false;

        if (form) {
            form.style.display = "none";
        }

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();
