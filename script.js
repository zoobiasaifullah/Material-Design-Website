document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const fab = document.getElementById("fab");
    const navbar = document.getElementById("navbar");

    // Theme toggle
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.innerHTML = `<i class="material-icons-round">light_mode</i>`;
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggle.innerHTML = `<i class="material-icons-round">${
            isDark ? "light_mode" : "dark_mode"
        }</i>`;
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
            fab.classList.add("show");
        } else {
            navbar.classList.remove("scrolled");
            fab.classList.remove("show");
        }
    });

    // FAB scroll to top
    fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("[data-aos]").forEach((element) => {
        observer.observe(element);
    });

    // Card hover effects
    const cards = document.querySelectorAll(".feature-card, .principle-card");
    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
});
