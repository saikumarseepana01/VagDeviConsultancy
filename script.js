// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".nav-links");
const navIcon = navToggle.querySelector("i");

navToggle.addEventListener("click", () => {
    const isVisible = primaryNav.getAttribute("data-visible") === "true";

    if (!isVisible) {
        openMenu();
    } else {
        closeMenu();
    }
});

// Close menu when a link is clicked
primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

function openMenu() {
    primaryNav.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
    navIcon.classList.replace("fa-bars", "fa-xmark");
    // Prevent background scrolling for accessibility
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    primaryNav.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
    navIcon.classList.replace("fa-xmark", "fa-bars");
    document.body.style.overflow = "";
}

// Counter Animation Logic
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// Intersection Observer to start counters when visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}