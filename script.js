const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("backToTop");
const darkModeToggle = document.getElementById("darkModeToggle");

// Scrollspy
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

// Back to top
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark Mode
function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove("dark");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem("darkMode", enabled);
}

const savedMode = localStorage.getItem("darkMode") === "true";
applyDarkMode(savedMode);

darkModeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyDarkMode(!isDark);
});
