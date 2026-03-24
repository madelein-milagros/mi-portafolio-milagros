// ==================== ANIMACIÓN DE BARRAS DE PROGRESO ====================
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        
        // Solo animar si la barra está visible en pantalla
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 200);
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };
        
        // Validar datos
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // Mostrar mensaje de éxito (simulado)
        // En un caso real, aquí enviarías los datos a un servidor
        console.log('Datos del formulario:', formData);
        
        // Simular envío
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de red (1.5 segundos)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mostrar mensaje de éxito
        alert(`¡Gracias ${formData.name}! Tu mensaje ha sido enviado. Te contactaré pronto.`);
        
        // Resetear formulario
        contactForm.reset();
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // En un caso real, descomenta esto para enviar a un backend:
        /*
        try {
            const response = await fetch('https://tu-api.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            } else {
                alert('Error al enviar el mensaje. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión. Inténtalo de nuevo más tarde.');
        }
        */
    });
}

// ==================== SCROLL SUAVE PARA ANCLAS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== BOTÓN VOLVER ARRIBA ====================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #66a5ad;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        box-shadow: 0 4px 15px rgba(102, 165, 173, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.backgroundColor = '#5a949c';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.backgroundColor = '#66a5ad';
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
}

// Crear botón al cargar
window.addEventListener('load', createBackToTopButton);