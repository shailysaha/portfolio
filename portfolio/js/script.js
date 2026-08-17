// ==================== MOBILE MENU ====================
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-link");

if (menuButton && navLinks) {
    const menuIcon = menuButton.querySelector("i");

    menuButton.addEventListener("click", function () {
        const menuIsOpen = navLinks.classList.toggle("show-menu");
        menuIcon.classList.toggle("fa-bars", !menuIsOpen);
        menuIcon.classList.toggle("fa-xmark", menuIsOpen);
    });

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show-menu");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });
}

// ==================== NAVIGATION ====================
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");

function updateNavigation() {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }

    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

// ==================== TYPING ANIMATION ====================
const typingText = document.getElementById("typingText");
const jobTitles = [
    "Web Designer",
    "CSE Student"
];

if (typingText) {
    let titleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentTitle = jobTitles[titleIndex];
        characterIndex += isDeleting ? -1 : 1;
        typingText.textContent = currentTitle.substring(0, characterIndex);

        let typingSpeed = isDeleting ? 60 : 100;

        if (!isDeleting && characterIndex === currentTitle.length) {
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % jobTitles.length;
            typingSpeed = 400;
        }

        window.setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// ==================== DARK/LIGHT MODE ====================
const themeButton = document.getElementById("themeButton");

function setTheme(theme) {
    const darkThemeEnabled = theme === "dark";
    document.body.classList.toggle("dark-theme", darkThemeEnabled);

    if (themeButton) {
        const themeIcon = themeButton.querySelector("i");
        themeIcon.classList.toggle("fa-moon", !darkThemeEnabled);
        themeIcon.classList.toggle("fa-sun", darkThemeEnabled);
        themeButton.setAttribute(
            "aria-label",
            darkThemeEnabled ? "Use light theme" : "Use dark theme"
        );
    }
}

setTheme(localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light");

if (themeButton) {
    themeButton.addEventListener("click", function () {
        const nextTheme = document.body.classList.contains("dark-theme")
            ? "light"
            : "dark";

        localStorage.setItem("portfolio-theme", nextTheme);
        setTheme(nextTheme);
    });
}

// ==================== PROJECT FILTER ====================
const projectFilterButtons = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.project;

        projectFilterButtons.forEach(function (filterButton) {
            filterButton.classList.toggle("active", filterButton === button);
        });

        projectCards.forEach(function (card) {
            const shouldShow =
                selectedCategory === "all" ||
                selectedCategory === card.dataset.category;

            card.classList.toggle("hide-project", !shouldShow);
        });
    });
});

document.querySelectorAll('.project-card a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        alert("The project link will be added after the project is published.");
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const characterCount = document.getElementById("characterCount");

function showInputError(input, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    input.classList.add("input-error");
    if (errorElement) errorElement.textContent = message;
}

function removeInputError(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    input.classList.remove("input-error");
    if (errorElement) errorElement.textContent = "";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (messageInput && characterCount) {
    messageInput.addEventListener("input", function () {
        if (messageInput.value.length > 500) {
            messageInput.value = messageInput.value.substring(0, 500);
        }

        characterCount.textContent = `${messageInput.value.length} / 500`;
    });
}

if (contactForm && nameInput && emailInput && subjectInput && messageInput) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let formIsValid = true;

        if (nameInput.value.trim().length < 2) {
            showInputError(nameInput, "nameError", "Please enter at least 2 characters.");
            formIsValid = false;
        } else {
            removeInputError(nameInput, "nameError");
        }

        if (!isValidEmail(emailInput.value.trim())) {
            showInputError(emailInput, "emailError", "Please enter a valid email address.");
            formIsValid = false;
        } else {
            removeInputError(emailInput, "emailError");
        }

        if (subjectInput.value.trim().length < 3) {
            showInputError(subjectInput, "subjectError", "Please enter a subject.");
            formIsValid = false;
        } else {
            removeInputError(subjectInput, "subjectError");
        }

        if (messageInput.value.trim().length < 10) {
            showInputError(messageInput, "messageError", "Your message must contain at least 10 characters.");
            formIsValid = false;
        } else {
            removeInputError(messageInput, "messageError");
        }

        if (formIsValid) {
            const formAction = contactForm.getAttribute("action");

            if (!formAction || formAction.includes("xxxxxxxx")) {
                alert("Add your Formspree endpoint to the form action before publishing.");
                return;
            }

            contactForm.submit();
        }
    });
}
