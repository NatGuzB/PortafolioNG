document.addEventListener('DOMContentLoaded', function() {
    // Animación menú o "Toggle"
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});


//Inicio viaje
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
     if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
    }
    }

  
function orbitPlanet(planetId, radius, duration) {
    anime({
        targets: `#${planetId}`,
        translateX: {
          value: function (_, i) {
            return radius;
          }
        },
        rotate: '1turn',
        duration: duration,
        easing: 'linear',
        loop: true,
        direction: 'normal',
        update: function(anim) {
          let angle = anim.progress / 100 * 2 * Math.PI;
          let planet = document.getElementById(planetId);
          planet.style.transform = `translate(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px)`;
        }
      });
}

    orbitPlanet('earth', 100, 8000);
    orbitPlanet('mars', 150, 12000);
    orbitPlanet('jupiter', 210, 20000);

document.getElementById('contactForm').addEventListener('submit', async function(e) {
   e.preventDefault(); 
            
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = document.getElementById('buttonText');
    const buttonIcon = document.getElementById('buttonIcon');
    const statusContainer = document.getElementById('statusContainer');
            

    submitBtn.disabled = true;
    buttonText.textContent = 'Enviando...';
    buttonIcon.innerHTML = '<div class="loading-spinner"></div>';
            
    showStatusMessage('Enviando tu mensaje...', 'loading');
            
            try {
              
                const response = await fetch('https://formspree.io/f/xblankbd', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showStatusMessage('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
                    form.reset();
                } else {
                    throw new Error('Error en el servidor');
                }
                
            } catch (error) {
                showStatusMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
            } finally {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    buttonText.textContent = 'Enviar Mensaje';
                    buttonIcon.innerHTML = '<i class="bi bi-rocket-takeoff"></i>';
                }, 1000);
            }
        });
        
        function showStatusMessage(message, type) {
            const statusContainer = document.getElementById('statusContainer');
            
            // Limpiar mensajes anteriores
            statusContainer.innerHTML = '';
            
            // Crear nuevo mensaje
            const messageDiv = document.createElement('div');
            messageDiv.className = `status-message ${type}-message`;
            messageDiv.textContent = message;
            
            // Agregar al contenedor
            statusContainer.appendChild(messageDiv);
            
            // Auto-ocultar después de 5 segundos (excepto mensajes de carga)
            if (type !== 'loading') {
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.style.opacity = '0';
                        setTimeout(() => {
                            if (messageDiv.parentNode) {
                                messageDiv.remove();
                            }
                        }, 300);
                    }
                }, 5000);
            }
        }