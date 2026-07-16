/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Carousel Component
 * 
 * Carrusel horizontal infinito con autoplay
 * ============================================================
 */

(function() {
    'use strict';

    const CONFIG = window.WEDDING_CONFIG || {};
    const images = CONFIG.carouselImages || [];

    /**
     * Inicializa el carrusel con las imágenes configuradas
     */
    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;

        // Limpiar contenido existente
        track.innerHTML = '';

        // Crear slides (duplicados para loop infinito)
        const allImages = [...images, ...images];

        allImages.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'flex-shrink-0 w-[280px] md:w-[350px] rounded-3xl overflow-hidden shadow-sm';
            slide.setAttribute('role', 'img');
            slide.setAttribute('aria-label', `Foto de recuerdo ${(index % images.length) + 1}`);

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Recuerdo ${(index % images.length) + 1}`;
            img.className = 'w-full h-[380px] md:h-[450px] object-cover';
            img.loading = 'lazy';

            // Manejar errores de carga
            img.onerror = function() {
                this.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80';
            };

            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();
