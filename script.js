document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const fab = document.getElementById("fab");
    const navbar = document.getElementById("navbar");

    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.innerHTML = `<i class="material-icons-round">light_mode</i><div class="ripple"></div>`;
    }

    themeToggle.addEventListener("click", (e) => {
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        const rect = themeToggle.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";
        themeToggle.appendChild(ripple);

        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggle.innerHTML = `<i class="material-icons-round">${
            isDark ? "light_mode" : "dark_mode"
        }</i><div class="ripple"></div>`;

        setTimeout(() => ripple.remove(), 600);
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
            fab.classList.add("show");
        } else {
            navbar.classList.remove("scrolled");
            fab.classList.remove("show");
        }
    });

    fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("aos-animate");
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("[data-aos]").forEach((element) => {
        observer.observe(element);
    });

    document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mouseenter", function (e) {
            const ripple = document.createElement("div");
            ripple.className = "btn-ripple";
            const rect = this.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left + "px";
            ripple.style.top = e.clientY - rect.top + "px";
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const cards = document.querySelectorAll(".feature-card, .principle-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".cursor-dot, .cursor-outline");
    if (circles.length > 0 && window.innerWidth > 768) {
        circles.forEach((circle) => {
            circle.style.left = coords.x + "px";
            circle.style.top = coords.y + "px";
        });

        window.addEventListener("mousemove", (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        function animateCursor() {
            let x = coords.x;
            let y = coords.y;
            circles.forEach((circle, index) => {
                circle.style.left = x - 12 + "px";
                circle.style.top = y - 12 + "px";
                circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
                const nextCircle = circles[index + 1] || circles[0];
                x += (parseFloat(nextCircle.style.left) - x) * 0.3;
                y += (parseFloat(nextCircle.style.top) - y) * 0.3;
            });
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
});
