/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Main Entry Point
 * 
 * Inicializa todos los componentes y librerías
 * ============================================================
 */

(function() {
    'use strict';

    const CONFIG = window.WEDDING_CONFIG || {};
    const animConfig = CONFIG.animations || {};

    /**
     * Inicializa Lucide Icons
     */
    function initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            // Retry si Lucide aún no está cargado
            setTimeout(initIcons, 100);
        }
    }

    /**
     * Inicializa AOS (Animate On Scroll)
     */
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: animConfig.aosDuration || 800,
                easing: animConfig.aosEasing || 'ease-out-cubic',
                once: animConfig.aosOnce !== false,
                offset: animConfig.aosOffset || 50,
                disable: function() {
                    // Desactivar en dispositivos con prefers-reduced-motion
                    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                }
            });
        }
    }

    /**
     * Inicializa todo
     */
    function init() {
        initIcons();
        initAOS();
        initCarousel();

        // Re-inicializar iconos después de que AOS modifique el DOM
        document.addEventListener('aos:in', () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        console.log('%c💕 Constanza & Fernando', 'font-size: 20px; font-weight: bold; color: #a83461;');
        console.log('%cInvitación digital cargada correctamente', 'font-size: 12px; color: #7B746C;');
    }

    /**
     * Inicializa carrusel simple
     */
    function initCarousel() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            const slides = track ? track.children : [];
            const prevBtn = carousel.querySelector('.carousel-btn-prev');
            const nextBtn = carousel.querySelector('.carousel-btn-next');
            const dotsContainer = carousel.querySelector('.carousel-dots');
            if (!track || !slides.length) return;

            let currentIndex = 0;
            const totalSlides = slides.length;
            let autoplayInterval;

            const updateCarousel = () => {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                if (dotsContainer) {
                    Array.from(dotsContainer.children).forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }
            };

            const goTo = (index) => {
                currentIndex = (index + totalSlides) % totalSlides;
                updateCarousel();
            };

            const next = () => goTo(currentIndex + 1);
            const prev = () => goTo(currentIndex - 1);

            if (nextBtn) nextBtn.addEventListener('click', next);
            if (prevBtn) prevBtn.addEventListener('click', prev);

            if (dotsContainer) {
                Array.from(slides).forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
                    dot.addEventListener('click', () => goTo(index));
                    dotsContainer.appendChild(dot);
                });
            }

            const startAutoplay = () => {
                stopAutoplay();
                autoplayInterval = setInterval(next, 2500);
            };

            const stopAutoplay = () => {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            };

            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
            carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
            carousel.addEventListener('touchend', startAutoplay);

            startAutoplay();
            updateCarousel();
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
