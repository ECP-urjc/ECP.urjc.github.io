// ============================================================
// XNOMBRE - ECP
// JavaScript de la web
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // NAVBAR: cambia de aspecto al hacer scroll
    // ========================================================

    const navbar = document.querySelector(".site-nav");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    // ========================================================
    // MENÚ MÓVIL
    // ========================================================

    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("is-open");

            // Cambia el icono de hamburguesa
            const icon = navToggle.querySelector("i");

            if (icon) {
                if (navMenu.classList.contains("is-open")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });


        // Cerrar menú al pulsar un enlace
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("is-open");

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    // ========================================================
    // NAVBAR ACTIVA SEGÚN LA SECCIÓN
    // ========================================================

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    if (sections.length > 0 && links.length > 0) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.getAttribute("id");

                        links.forEach(function (link) {

                            link.classList.remove("active");

                            if (link.getAttribute("href") === "#" + sectionId) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });

    }


    // ========================================================
    // MODALES DEL PORTFOLIO
    // ========================================================

    const portfolioCards = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
    const modalCloseButtons = document.querySelectorAll(".modal-close");


    // Abrir modal
    portfolioCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const modalId = card.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) {

                modal.classList.add("is-open");

                document.body.classList.add("modal-open");

            }

        });

    });


    // Cerrar modal con botón X
    modalCloseButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modal = button.closest(".modal");

            if (modal) {
                modal.classList.remove("is-open");
                document.body.classList.remove("modal-open");
            }

        });

    });


    // Cerrar modal haciendo click fuera
    modals.forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                modal.classList.remove("is-open");
                document.body.classList.remove("modal-open");

            }

        });

    });


    // Cerrar modal pulsando ESC
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            modals.forEach(function (modal) {
                modal.classList.remove("is-open");
            });

            document.body.classList.remove("modal-open");

        }

    });


    // ========================================================
    // ACCESIBILIDAD
    // Permite abrir tarjetas con ENTER o ESPACIO
    // ========================================================

    portfolioCards.forEach(function (card) {

        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                card.click();

            }

        });

    });


    // ========================================================
    // FORMULARIO DE CONTACTO
    // ========================================================

        const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        const message = contactForm.querySelector(".form-message");
        const submitButton = contactForm.querySelector("button[type='submit']");

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            message.className = "form-message";
            message.textContent = "Enviando...";
            submitButton.disabled = true;

            try {
                const response = await fetch("https://formsubmit.co/ajax/ecpurjc@gmail.com", {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    body: new FormData(contactForm)
                });

                const data = await response.json();

                if (response.ok && String(data.success) === "true") {
                    message.textContent = "¡Mensaje enviado! Te responderemos pronto.";
                    message.classList.add("is-success");
                    contactForm.reset();
                } else {
                    throw new Error("Respuesta no válida");
                }

            } catch (error) {
                message.textContent = "No se ha podido enviar. Inténtalo de nuevo o escríbenos a ecpurjc@gmail.com.";
                message.classList.add("is-error");
            } finally {
                submitButton.disabled = false;
            }

        });

    }

});