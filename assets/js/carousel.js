/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Fade Carousel Component
 *
 * Carrusel de fotos con autoplay de 1.3s y efecto fade
 * ============================================================
 */

(function() {
    'use strict';

    const carousels = document.querySelectorAll('.fade-carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-fade-slide');
        if (!slides.length) return;

        let currentIndex = 0;
        let autoplayInterval;

        const updateCarousel = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        };

        const next = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const startAutoplay = () => {
            stopAutoplay();
            autoplayInterval = setInterval(next, 1300);
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

        updateCarousel();
        startAutoplay();
    });
})();
