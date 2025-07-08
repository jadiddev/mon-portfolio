document.addEventListener('DOMContentLoaded', function() {
    // 1. Mettre à jour l'année courante dans le pied de page
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Gérer le menu de navigation responsive (hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Ajoute/retire la classe pour l'animation du hamburger
        });

        // Ferme le menu quand un lien est cliqué (utile sur mobile)
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                // Seulement si le menu est actif, le ferme
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // 3. Gérer le bouton "Retour en haut de page"
    const backToTopButton = document.getElementById("backToTopBtn");

    // Afficher ou cacher le bouton selon le défilement
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) { // Apparait après 300px de défilement
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Remonter en haut de page au clic
    if (backToTopButton) {
        backToTopButton.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Pour un défilement doux
            });
        });
    }

    // Optionnel : Animation d'apparition des sections (un peu plus avancé)
    // Utile pour rendre le site plus dynamique au défilement
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Quand 20% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Ajoute une classe pour l'animation
                observer.unobserve(entry.target); // Cesse d'observer une fois l'animation déclenchée
            }
        });
    }, observerOptions);

    // Observer les sections à animer
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section'); // Ajoute une classe de base
        observer.observe(section);
    });

    // Styles pour l'animation (à ajouter à style.css)
    // .fade-in-section {
    //     opacity: 0;
    //     transform: translateY(20px);
    //     transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    // }
    //
    // .fade-in-section.fade-in {
    //     opacity: 1;
    //     transform: translateY(0);
    // }
});