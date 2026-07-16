/**
 * ============================================================
 * CONSTANZA & FERNANDO — Wedding Invitation
 * Forms Component
 * 
 * Manejo de formularios: RSVP, canciones, mensajes
 * ============================================================
 */

(function() {
    'use strict';

    const CONFIG = window.WEDDING_CONFIG || {};
    const EMAIL = CONFIG.contact?.email || 'impactadigital.cl@gmail.com';

    /**
     * ========== RSVP FORM ==========
     */
    const rsvpForm = document.getElementById('rsvpForm');
    const asistenciaRadios = document.querySelectorAll('input[name="asistencia"]');
    const conditionalFields = document.getElementById('conditionalFields');
    const restriccionesRadios = document.querySelectorAll('input[name="restricciones"]');
    const alergiasField = document.getElementById('alergiasField');

    /**
     * Muestra u oculta campos condicionales según asistencia
     */
    function toggleConditionalFields() {
        const selected = document.querySelector('input[name="asistencia"]:checked');
        if (!selected) return;

        if (selected.value === 'si') {
            conditionalFields.classList.remove('hidden');
            conditionalFields.classList.add('block');

            // Animación de entrada
            conditionalFields.style.opacity = '0';
            conditionalFields.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                conditionalFields.style.transition = 'all 0.4s ease';
                conditionalFields.style.opacity = '1';
                conditionalFields.style.transform = 'translateY(0)';
            });
        } else {
            conditionalFields.classList.add('hidden');
            conditionalFields.classList.remove('block');
        }
    }

    /**
     * Muestra u oculta campo de alergias
     */
    function toggleAlergiasField() {
        const selected = document.querySelector('input[name="restricciones"]:checked');
        if (!selected) return;

        if (selected.value === 'si') {
            alergiasField.classList.remove('hidden');
            alergiasField.classList.add('block');
        } else {
            alergiasField.classList.add('hidden');
            alergiasField.classList.remove('block');
        }
    }

    // Event listeners para radio buttons
    asistenciaRadios.forEach(radio => {
        radio.addEventListener('change', toggleConditionalFields);
    });

    restriccionesRadios.forEach(radio => {
        radio.addEventListener('change', toggleAlergiasField);
    });

    /**
     * Valida un campo de formulario
     */
    function validateField(field, errorId) {
        const errorEl = document.getElementById(errorId);
        if (!field || !errorEl) return true;

        const isValid = field.checkValidity();

        if (!isValid) {
            errorEl.classList.remove('hidden');
            errorEl.classList.add('visible');
            field.classList.add('border-primary');
            field.classList.remove('border-lines');
        } else {
            errorEl.classList.add('hidden');
            errorEl.classList.remove('visible');
            field.classList.remove('border-primary');
            field.classList.add('border-lines');
        }

        return isValid;
    }

    /**
     * Envía el formulario RSVP por email
     */
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar campos requeridos
            const nombre = document.getElementById('nombre');
            const telefono = document.getElementById('telefono');
            const asistencia = document.querySelector('input[name="asistencia"]:checked');

            let isValid = true;

            isValid = validateField(nombre, 'nombre-error') && isValid;
            isValid = validateField(telefono, 'telefono-error') && isValid;

            if (!asistencia) {
                document.getElementById('asistencia-error').classList.remove('hidden');
                document.getElementById('asistencia-error').classList.add('visible');
                isValid = false;
            } else {
                document.getElementById('asistencia-error').classList.add('hidden');
            }

            if (!isValid) return;

            // Construir email
            const formData = new FormData(rsvpForm);
            let body = 'NUEVA CONFIRMACIÓN DE ASISTENCIA\n\n';
            body += 'Nombre: ' + (formData.get('nombre') || '') + '\n';
            body += 'Asistencia: ' + (formData.get('asistencia') || '') + '\n';
            body += 'Teléfono: ' + (formData.get('telefono') || '') + '\n';

            if (formData.get('asistencia') === 'si') {
                body += 'Restricciones: ' + (formData.get('restricciones') || 'no') + '\n';
                body += 'Alergias: ' + (formData.get('alergias') || 'Ninguna') + '\n';
                body += 'Acompañante: ' + (formData.get('acompanante') || 'No') + '\n';
            }

            body += '\n---\nEnviado desde la invitación digital de Constanza & Fernando';

            const subject = encodeURIComponent('Confirmación de Asistencia - Constanza & Fernando');
            const mailtoLink = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + encodeURIComponent(body);

            window.location.href = mailtoLink;

            // Mostrar mensaje de confirmación
            showToast('¡Gracias! Se abrirá tu cliente de correo para confirmar.');
        });
    }

    /**
     * ========== SONG FORM ==========
     */
    const songForm = document.getElementById('songForm');

    if (songForm) {
        songForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cancion = document.getElementById('cancion');
            if (!cancion.value.trim()) return;

            const body = 'CANCIÓN RECOMENDADA\n\n';
            body += 'Canción: ' + cancion.value + '\n';
            body += '\n---\nEnviado desde la invitación digital de Constanza & Fernando';

            const subject = encodeURIComponent('Recomendación de Canción - Constanza & Fernando');
            const mailtoLink = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + encodeURIComponent(body);

            window.location.href = mailtoLink;

            showToast('¡Gracias por tu recomendación!');
            cancion.value = '';
        });
    }

    /**
     * ========== MESSAGE FORM ==========
     */
    const messageForm = document.getElementById('messageForm');
    const uploadArea = document.getElementById('uploadArea');
    const fotoInput = document.getElementById('foto');
    const filePreview = document.getElementById('filePreview');
    const previewImg = document.getElementById('previewImg');
    const removeFile = document.getElementById('removeFile');

    // File upload handlers
    if (uploadArea && fotoInput) {
        uploadArea.addEventListener('click', () => fotoInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        });

        fotoInput.addEventListener('change', () => {
            if (fotoInput.files.length) {
                handleFile(fotoInput.files[0]);
            }
        });
    }

    /**
     * Maneja la carga de archivos
     */
    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            showToast('Por favor selecciona una imagen válida', 'error');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB
            showToast('La imagen no debe superar los 10MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            filePreview.classList.remove('hidden');
            uploadArea.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    // Remove file handler
    if (removeFile) {
        removeFile.addEventListener('click', () => {
            fotoInput.value = '';
            filePreview.classList.add('hidden');
            uploadArea.classList.remove('hidden');
        });
    }

    // Message form submit
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const msgNombre = document.getElementById('msgNombre');
            const mensaje = document.getElementById('mensaje');

            let isValid = true;
            isValid = validateField(msgNombre, 'msgNombre-error') && isValid;
            isValid = validateField(mensaje, 'mensaje-error') && isValid;

            if (!isValid) return;

            const body = 'NUEVO MENSAJE PARA LOS NOVIOS\n\n' +
                'De: ' + msgNombre.value + '\n' +
                'Mensaje: ' + mensaje.value + '\n' +
                '\n---\nEnviado desde la invitación digital de Constanza & Fernando';

            const subject = encodeURIComponent('Mensaje para Constanza y Fernando');
            const mailtoLink = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + encodeURIComponent(body);

            window.location.href = mailtoLink;

            showToast('¡Gracias por tu mensaje!');
            msgNombre.value = '';
            mensaje.value = '';
            if (fotoInput) fotoInput.value = '';
            if (filePreview) filePreview.classList.add('hidden');
            if (uploadArea) uploadArea.classList.remove('hidden');
        });
    }

    /**
     * ========== TOAST NOTIFICATIONS ==========
     */
    function showToast(message, type = 'success') {
        // Remover toast anterior si existe
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast-notification fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-6 py-4 rounded-2xl font-body text-sm shadow-lg transition-all duration-300';
        toast.style.background = type === 'error' ? '#A94859' : '#C65A6D';
        toast.style.color = 'white';
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        document.body.appendChild(toast);

        // Animación de entrada
        requestAnimationFrame(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            requestAnimationFrame(() => {
                toast.style.transition = 'all 0.3s ease';
                toast.style.opacity = '1';
                toast.style.transform = 'translate(-50%, 0)';
            });
        });

        // Auto-remover después de 4 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Exponer función globalmente
    window.showToast = showToast;
})();
