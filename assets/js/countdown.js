/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Countdown Timer Component
 * 
 * Contador animado hasta la fecha del matrimonio
 * ============================================================
 */

(function() {
    'use strict';

    const CONFIG = window.WEDDING_CONFIG || {};
    const weddingDate = new Date(CONFIG.couple?.weddingDate || '2026-10-10T17:30:00');
    const updateInterval = CONFIG.countdown?.updateInterval || 1000;

    // Referencias a elementos DOM
    const els = {
        days: document.getElementById('countdown-days'),
        hours: document.getElementById('countdown-hours'),
        minutes: document.getElementById('countdown-minutes'),
        seconds: document.getElementById('countdown-seconds'),
    };

    /**
     * Actualiza el contador con animación suave
     */
    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            // El día llegó 🎉
            if (els.days) els.days.textContent = '0';
            if (els.hours) els.hours.textContent = '00';
            if (els.minutes) els.minutes.textContent = '00';
            if (els.seconds) els.seconds.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Actualizar con animación de fade
        updateElement(els.days, days);
        updateElement(els.hours, hours.toString().padStart(2, '0'));
        updateElement(els.minutes, minutes.toString().padStart(2, '0'));
        updateElement(els.seconds, seconds.toString().padStart(2, '0'));
    }

    /**
     * Actualiza un elemento con efecto de transición suave
     */
    function updateElement(element, newValue) {
        if (!element) return;

        const currentValue = element.textContent;
        if (currentValue !== String(newValue)) {
            element.style.opacity = '0.5';
            element.style.transform = 'scale(0.95)';
            element.style.transition = 'all 0.2s ease';

            requestAnimationFrame(() => {
                element.textContent = newValue;
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            });
        }
    }

    /**
     * Inicializa el contador
     */
    function initCountdown() {
        updateCountdown();
        setInterval(updateCountdown, updateInterval);
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdown);
    } else {
        initCountdown();
    }
})();
