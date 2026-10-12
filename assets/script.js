document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });
    document.querySelectorAll(".nav-drop > a").forEach(link => {
      link.addEventListener("click", event => {
        if (window.matchMedia("(max-width: 760px)").matches) {
          const parent = link.parentElement;
          if (!parent.classList.contains("expanded")) {
            event.preventDefault();
            parent.classList.add("expanded");
          }
        }
      });
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      if (!link.parentElement.classList.contains("nav-drop")) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    }));
  }

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".project-card").forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  document.querySelectorAll(".faq-list details").forEach(detail => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        document.querySelectorAll(".faq-list details").forEach(other => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
