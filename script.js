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
