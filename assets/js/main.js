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

        if (!audio || !playBtn || !playIcon) return;

        audio.volume = volumeSlider ? 0.5 : 0.5;

        const setVolume = (val) => {
            audio.volume = Math.max(0, Math.min(1, val));
            if (volumeSlider) volumeSlider.value = audio.volume;
        };

        if (volumeSlider) {
            volumeSlider.addEventListener('input', () => setVolume(parseFloat(volumeSlider.value)));
        }
        if (volumeDownBtn) {
            volumeDownBtn.addEventListener('click', () => setVolume((volumeSlider ? parseFloat(volumeSlider.value) : audio.volume) - 0.1));
        }
        if (volumeUpBtn) {
            volumeUpBtn.addEventListener('click', () => setVolume((volumeSlider ? parseFloat(volumeSlider.value) : audio.volume) + 0.1));
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
