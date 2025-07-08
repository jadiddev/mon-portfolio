document.addEventListener('DOMContentLoaded', function() {
    // 1. Mettre à jour l'année courante dans le pied de page
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Gérer le menu de navigation responsive (hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header'); // Pour gérer la couleur de fond au scroll si nécessaire

    if (hamburger && navLinks && header) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Anime l'icône du hamburger
            document.body.classList.toggle('no-scroll'); // Empêche le défilement du corps quand le menu est ouvert
        });

        // Ferme le menu quand un lien est cliqué (utile sur mobile)
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // 3. Gérer le bouton "Retour en haut de page"
    const backToTopButton = document.getElementById("backToTopBtn");

    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            backToTopButton.style.display = "flex"; // Utiliser flex pour centrer l'icône
        } else {
            backToTopButton.style.display = "none";
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Activer les animations des sections au défilement (Intersection Observer)
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // Le viewport est la racine
        rootMargin: '0px',
        threshold: 0.1 // L'élément devient visible quand 10% de sa surface est dans le viewport
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Arrête d'observer une fois l'animation déclenchée
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section'); // Assurez-vous que la classe de base est là
        sectionObserver.observe(section);
    });

    // 5. Mise en évidence du lien de navigation actif (Facultatif, mais très pro)
    const navLinksList = document.querySelectorAll('.nav-links li a');
    const sectionsList = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sectionsList.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajustement : si la section est visible sur au moins la moitié de l'écran
            if (pageYOffset >= sectionTop - sectionHeight / 2) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
});