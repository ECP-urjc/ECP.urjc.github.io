// THE LAST CURE - ECP
// JavaScript de la web

document.addEventListener("DOMContentLoaded", function () {

    // NAVBAR: cambia de aspecto al hacer scroll

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


    // MENÚ MÓVIL

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


    // NAVBAR ACTIVA SEGÚN LA SECCIÓN

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


    // MODALES DEL PORTFOLIO

    const portfolioCards = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
    const modalCloseButtons = document.querySelectorAll(".modal-close");


    //abrir modal
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


    //cerrar modal con botón X
    modalCloseButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modal = button.closest(".modal");

            if (modal) {
                modal.classList.remove("is-open");
                document.body.classList.remove("modal-open");
            }

        });

    });


    //cerrar modal haciendo click fuera
    modals.forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                modal.classList.remove("is-open");
                document.body.classList.remove("modal-open");

            }

        });

    });


    //cerrar modal pulsando ESC
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            modals.forEach(function (modal) {
                modal.classList.remove("is-open");
            });

            document.body.classList.remove("modal-open");

        }

    });


    //abrir tarjetas con ENTER o ESPACIO

    portfolioCards.forEach(function (card) {

        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                card.click();

            }

        });

    });


    // FORMULARIO DE CONTACTO

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
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
                });

                const data = await response.json();

                if (data.success) {
                    message.textContent = "¡Mensaje enviado! Te responderemos pronto.";
                    message.classList.add("is-success");
                    contactForm.reset();
                } else {
                    throw new Error(data.message || "Error al enviar");
                }

            } catch (error) {
                console.error(error);
                message.textContent = "No se ha podido enviar. Escríbenos a ecpurjc@gmail.com.";
                message.classList.add("is-error");
            } finally {
                submitButton.disabled = false;
            }

        });

    }

});

// MOTION: progreso de scroll, revelados, parallax del logo e inclinación de tarjetas
(function () {
    "use strict";

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Barra de progreso (indicador funcional, también con movimiento reducido)
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var heroMedia = document.querySelector(".hero-media");
    var ticking = false;

    function frame() {
        ticking = false;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";

        if (heroMedia && !reduce.matches) {
            heroMedia.style.setProperty("--py", Math.min(window.scrollY, window.innerHeight) * 0.08);
        }
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(frame);
        }
    }, { passive: true });
    frame();

    // Sin movimiento o sin IntersectionObserver: todo queda visible
    if (reduce.matches || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js");

    var SELECTOR = ".section-title, .section-divider, .subtitle, .card, .portfolio-card, .cuadro, .video-container, .table-wrap, .game-screen, .tag-list li, .contact-form, .contact-mail";
    var targets = document.querySelectorAll(SELECTOR);

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (el) {
        var siblings = Array.prototype.filter.call(el.parentElement.children, function (child) {
            return child.matches(SELECTOR);
        });
        el.style.setProperty("--i", Math.min(siblings.indexOf(el), 6));
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    // Inclinación sutil y luz que sigue al cursor (solo con ratón)
    if (finePointer.matches) {
        document.querySelectorAll(".card").forEach(function (card) {

            card.addEventListener("pointermove", function (event) {
                var r = card.getBoundingClientRect();
                var x = (event.clientX - r.left) / r.width;
                var y = (event.clientY - r.top) / r.height;

                card.style.setProperty("--mx", (x * 100) + "%");
                card.style.setProperty("--my", (y * 100) + "%");
                card.style.setProperty("--rx", ((0.5 - y) * 5) + "deg");
                card.style.setProperty("--ry", ((x - 0.5) * 5) + "deg");
            });

            card.addEventListener("pointerleave", function () {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });

        });
    }
})();



// PANTALLA DE LA DEMO + TARJETAS QUE GIRAN EN TÁCTIL
(function () {
    "use strict";

    var screen = document.querySelector(".game-screen");

    if (screen) {
        var stage = screen.querySelector(".game-stage");
        var play = screen.querySelector(".game-play");
        var fs = screen.querySelector(".game-fs");

        play.addEventListener("click", function () {
            var embed = screen.getAttribute("data-embed");

            // Sin embed configurado: abre la página del juego en itch.io
            if (!embed) {
                window.open(screen.getAttribute("data-itch"), "_blank", "noopener");
                return;
            }

            var frame = document.createElement("iframe");
            frame.src = embed;
            frame.title = "THE LAST CURE";
            frame.allow = "fullscreen; autoplay; gamepad";
            frame.allowFullscreen = true;

            stage.replaceChildren(frame);
            screen.classList.add("is-playing");
        });

        fs.addEventListener("click", function () {
            var request = stage.requestFullscreen || stage.webkitRequestFullscreen;
            if (request) request.call(stage);
        });
    }

    // En pantallas táctiles no hay hover: un toque gira la tarjeta
    if (window.matchMedia("(hover: none)").matches) {
        document.querySelectorAll(".flip-card").forEach(function (card) {
            card.addEventListener("click", function () {
                card.classList.toggle("is-flipped");
            });
        });
    }
})();