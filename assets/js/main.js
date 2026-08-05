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
     * Inicializa el reproductor de música vintage
     */
    function initMusicPlayer() {
        const audio = document.getElementById('weddingMusic');
        const playBtn = document.getElementById('musicPlayBtn');
        const playIcon = document.getElementById('musicPlayIcon');
        const volumeSlider = document.getElementById('musicVolume');
        const volumeDownBtn = document.getElementById('musicVolumeDown');
        const volumeUpBtn = document.getElementById('musicVolumeUp');
        const volumeFill = document.getElementById('volumeFill');
        const volumeIcon = document.getElementById('volumeIcon');
        const volumeThumb = document.getElementById('volumeThumb');

        if (!audio || !playBtn || !playIcon) return;

        var updateVolumeUI = function() {
            var val = parseFloat(volumeSlider.value);
            var percent = val;
            audio.volume = val / 100;
            if (volumeFill) volumeFill.style.width = percent + '%';
            if (volumeThumb) volumeThumb.style.left = percent + '%';
            if (!volumeIcon) return;
            if (percent === 0) {
                volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-.73-3.37-1.91-4.5l-1.42 1.42A6.5 6.5 0 0 0 14.5 12c0 1.08.32 2.07.84 2.85l1.42 1.42A8.95 8.95 0 0 1 16.5 12zM3 9v6h4l5 5V4L7 9H3z" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
            } else if (percent < 50) {
                volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3z"/>';
            } else if (percent < 80) {
                volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M12 9v6m-3-3l3-3m0 6l3-3"/>';
            } else {
                volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M12 9v6m-3-3l3-3m0 6l3-3"/><path d="M17 5v14"/>';
            }
        };

        if (volumeSlider) {
            volumeSlider.addEventListener('input', updateVolumeUI);
            audio.volume = parseFloat(volumeSlider.value) / 100;
        }
        if (volumeDownBtn) {
            volumeDownBtn.addEventListener('click', () => {
                var val = volumeSlider ? parseFloat(volumeSlider.value) : audio.volume * 100;
                val = Math.max(0, val - 10);
                if (volumeSlider) volumeSlider.value = val;
                audio.volume = val / 100;
                updateVolumeUI();
            });
        }
        if (volumeUpBtn) {
            volumeUpBtn.addEventListener('click', () => {
                var val = volumeSlider ? parseFloat(volumeSlider.value) : audio.volume * 100;
                val = Math.min(100, val + 10);
                if (volumeSlider) volumeSlider.value = val;
                audio.volume = val / 100;
                updateVolumeUI();
            });
        }

        playBtn.addEventListener('click', async () => {
            if (audio.paused) {
                await audio.play();
                playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
                playBtn.classList.add('playing');
            } else {
                audio.pause();
                playIcon.innerHTML = '<polygon points="6 4v16l13-8z"></polygon>';
                playBtn.classList.remove('playing');
            }
        });

        audio.addEventListener('ended', () => {
            playIcon.innerHTML = '<polygon points="6 4v16l13-8z"></polygon>';
            playBtn.classList.remove('playing');
        });

        updateVolumeUI();
    }

    /**
     * Inicializa todo
     */
    function init() {
        initIcons();
        initAOS();
        initMusicPlayer();

        // Re-inicializar iconos después de que AOS modifique el DOM
        document.addEventListener('aos:in', () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        console.log('%c💕 Constanza & Fernando', 'font-size: 20px; font-weight: bold; color: #a83461;');
        console.log('%cInvitación digital cargada correctamente', 'font-size: 12px; color: #7B746C;');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
