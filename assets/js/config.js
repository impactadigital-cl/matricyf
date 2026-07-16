/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Configuration File
 * 
 * Modifica estos valores para personalizar la invitación
 * ============================================================
 */

const WEDDING_CONFIG = {
    // ---------- Información de los novios ----------
    couple: {
        bride: 'Constanza',
        groom: 'Fernando',
        weddingDate: '2026-10-10T17:30:00',
        rsvpDeadline: '2026-09-01',
    },

    // ---------- Contacto ----------
    contact: {
        email: 'impactadigital.cl@gmail.com',
        phone: '+56 9 1234 5678', // Opcional: número de WhatsApp
    },

    // ---------- Ubicaciones (Google Maps URLs) ----------
    locations: {
        ceremony: {
            name: 'Nuestra Señora de Loreto',
            address: 'Dirección de la iglesia',
            mapUrl: 'https://maps.google.com/?q=Iglesia+Nuestra+Señora+de+Loreto',
            time: '17:30',
        },
        reception: {
            name: 'Centro de Eventos Nuestros Ángeles',
            address: 'Dirección del centro de eventos',
            mapUrl: 'https://maps.google.com/?q=Centro+de+Eventos+Nuestros+Angeles',
            time: '19:00',
        },
    },

    // ---------- Regalos (Links de pago) ----------
    gifts: {
        gerberas: {
            name: 'Ramo de Gerberas',
            price: 'CLP $50.000',
            paymentUrl: '#', // Reemplazar con link real (Mercado Pago, Flow, etc.)
        },
        tulipanes: {
            name: 'Ramo de Tulipanes',
            price: 'CLP $80.000',
            paymentUrl: '#',
        },
        lilium: {
            name: 'Ramo de Lilium',
            price: 'CLP $120.000',
            paymentUrl: '#',
        },
        rosas: {
            name: 'Ramo de Rosas',
            price: 'CLP $150.000',
            paymentUrl: '#',
        },
    },

    // ---------- Fotos del carrusel ----------
    // Reemplaza estas URLs con tus propias fotos
    carouselImages: [
        'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=600&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80',
    ],

    // ---------- Fotos principales ----------
    // Reemplaza con tus propias fotos
    images: {
        hero: 'assets/images/hero-couple.jpg',
        story1: 'assets/images/story-1.jpg',
        story2: 'assets/images/story-2.jpg',
        footer: 'assets/images/footer-couple.jpg',
    },

    // ---------- Fallback images (si las locales no cargan) ----------
    fallbackImages: {
        hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
        story1: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
        story2: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        footer: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    },

    // ---------- Animaciones ----------
    animations: {
        aosDuration: 800,
        aosEasing: 'ease-out-cubic',
        aosOnce: true,
        aosOffset: 50,
    },

    // ---------- Contador ----------
    countdown: {
        updateInterval: 1000, // milisegundos
    },
};

// Hacer disponible globalmente
window.WEDDING_CONFIG = WEDDING_CONFIG;
