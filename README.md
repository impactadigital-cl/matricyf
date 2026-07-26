# 💕 Constanza & Fernando — Invitación Digital de Matrimonio

Una invitación digital de lujo, diseñada con una estética editorial europea y experiencia mobile-first. Desarrollada con HTML5, Tailwind CSS, JavaScript ES6 y animaciones suaves.

![Preview](assets/images/hero-couple.jpg)

---

## ✨ Características

- **Diseño Mobile First** — Optimizado para móviles, tablet y desktop
- **Glassmorphism sutil** — Transparencias y blur elegantes
- **Paleta romántica** — Tonos cálidos inspirados en invitaciones de lujo
- **Animaciones suaves** — AOS, parallax, contador animado, hover effects
- **Carrusel infinito** — Autoplay de fotos con pausa al hover
- **Formularios inteligentes** — Campos condicionales, validación, drag & drop
- **Accesibilidad** — ARIA labels, navegación por teclado, alto contraste
- **SEO optimizado** — Meta tags, Open Graph, lazy loading

---

## 📁 Estructura del Proyecto

```
constanza-fernando-wedding/
├── index.html              # Página principal
├── README.md               # Este archivo
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos personalizados
│   ├── js/
│   │   ├── config.js       # Configuración centralizada
│   │   ├── carousel.js     # Carrusel de fotos
│   │   ├── countdown.js    # Contador animado
│   │   ├── navigation.js   # Navbar, menú móvil, parallax
│   │   ├── forms.js        # Formularios y validación
│   │   └── main.js         # Punto de entrada
│   ├── images/             # Fotos de la pareja
│   │   ├── hero-couple.jpg
│   │   ├── story-1.jpg
│   │   ├── story-2.jpg
│   │   └── footer-couple.jpg
│   └── icons/
│       └── favicon.svg     # Favicon
```

---

## 🚀 Cómo usar

### 1. Clonar o descargar

```bash
git clone https://github.com/tu-usuario/constanza-fernando-wedding.git
cd constanza-fernando-wedding
```

### 2. Abrir en VS Code

```bash
code .
```

### 3. Personalizar

Edita el archivo `assets/js/config.js` para modificar:

- Nombres de los novios
- Fecha del matrimonio
- Email de contacto
- Ubicaciones (Google Maps)
- Links de pago para regalos
- Fotos del carrusel

### 4. Reemplazar fotos

Coloca tus fotos en `assets/images/` con los nombres:
- `hero-couple.jpg` — Foto principal del hero
- `story-1.jpg` — Primera foto editorial
- `story-2.jpg` — Segunda foto editorial
- `footer-couple.jpg` — Foto del footer

> Las fotos actuales son placeholders de Unsplash. Se cargarán automáticamente si no reemplazas los archivos.

### 5. Ver en navegador

Abre `index.html` directamente en tu navegador, o usa una extensión como **Live Server** en VS Code.

---

## 🎨 Personalización Rápida

### Cambiar colores

Edita `index.html` en la sección `tailwind.config`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#a83461',      // Color principal
                'secondary': '#E78352',    // Color secundario
                'accent': '#8C5A3C',       // Acento
                'bg-main': '#F8F5EF',      // Fondo
                'text-main': '#4A423D',    // Texto principal
                'text-sec': '#7B746C',     // Texto secundario
            }
        }
    }
}
```

### Cambiar tipografías

Las fuentes se cargan desde Google Fonts en `<head>`:

- **Headings**: Cormorant Garamond
- **Subtítulos**: Playfair Display
- **Cuerpo**: Poppins

### Cambiar ubicaciones

En `assets/js/config.js`:

```javascript
locations: {
    ceremony: {
        name: 'Nombre de la Iglesia',
        mapUrl: 'https://maps.google.com/?q=TU+UBICACION',
        time: '17:30',
    },
    reception: {
        name: 'Nombre del Centro de Eventos',
        mapUrl: 'https://maps.google.com/?q=TU+UBICACION',
        time: '19:00',
    }
}
```

### Configurar links de pago para regalos

```javascript
gifts: {
    gerberas: {
        paymentUrl: 'https://mpago.la/XXXXX', // Link de Mercado Pago
    }
}
```

---

## 📱 Responsive

| Dispositivo | Breakpoint | Estado |
|-------------|-----------|--------|
| Mobile      | < 768px   | ✅ Prioridad |
| Tablet      | 768px     | ✅ Optimizado |
| Desktop     | > 1024px  | ✅ Optimizado |

---

## ♿ Accesibilidad

- Contraste WCAG AA en todos los textos
- Labels visibles en todos los inputs
- Navegación completa por teclado
- ARIA labels en elementos interactivos
- Soporte para `prefers-reduced-motion`
- Soporte para `prefers-contrast: high`

---

## 🛠️ Tecnologías

- **HTML5** — Semántica y accesible
- **Tailwind CSS** — Utilidades rápidas (CDN)
- **JavaScript ES6** — Módulos nativos
- **AOS** — Animaciones on-scroll
- **Lucide Icons** — Iconos vectoriales
- **Google Fonts** — Tipografías premium

---

## 📄 Licencia

Este proyecto es personal y privado. Uso exclusivo para la boda de Constanza & Fernando.

---

Hecho con ❤️ para el día más importante de nuestras vidas.
