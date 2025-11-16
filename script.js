document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const fab = document.getElementById("backToTop") || document.getElementById("fab");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    // Theme toggle with View Transitions API
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        if (themeToggle) themeToggle.innerHTML = `<i class="material-icons-round">light_mode</i>`;
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            // Use View Transitions API if supported
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    toggleTheme();
                });
            } else {
                toggleTheme();
            }
        });
    }

    function toggleTheme() {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        if (themeToggle) {
            themeToggle.innerHTML = `<i class="material-icons-round">${
                isDark ? "light_mode" : "dark_mode"
            }</i>`;
        }
    }

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll(".nav-link");
        navLinkItems.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    }

    // Navbar scroll effect with passive listeners for performance
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            if (navbar) navbar.classList.add("scrolled");
            if (fab) fab.classList.add("show");
        } else {
            if (navbar) navbar.classList.remove("scrolled");
            if (fab) fab.classList.remove("show");
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // FAB scroll to top
    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Enhanced Intersection Observer with better thresholds
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
                // Add stagger effect
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("[data-aos]").forEach((element) => {
        observer.observe(element);
    });

    // Performance: Use passive event listeners for scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href !== "#" && href !== "#home") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // Parallax effect on hero shapes (if on home page)
    const heroShapes = document.querySelectorAll(".hero-shape");
    if (heroShapes.length > 0) {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, { passive: true });
    }

    // Timeline scroll animations (if on history page)
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timelineItems.length > 0 && "IntersectionObserver" in window) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger effect
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px"
        });

        timelineItems.forEach((item) => {
            timelineObserver.observe(item);
        });
    }

    // Feature tags interaction
    const featureTags = document.querySelectorAll(".feature-tag");
    featureTags.forEach(tag => {
        tag.addEventListener("mouseenter", () => {
            tag.style.transform = "translateY(-2px) scale(1.05)";
        });
        tag.addEventListener("mouseleave", () => {
            tag.style.transform = "";
        });
    });

    // Performance: Lazy load images if needed
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }

    // Add loading animation complete
    document.body.classList.add("loaded");
});
