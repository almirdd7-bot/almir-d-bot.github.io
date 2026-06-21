// =====================================
// LIGHTBOX MODAL
// =====================================

function abrirLightbox(src, alt) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    
    lightbox.classList.add("show");
    img.src = src;
    caption.textContent = alt;
    
    document.body.style.overflow = "hidden";
}

function fecharLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

// Fechar ao clicar fora da imagem
document.addEventListener("click", (e) => {
    const lightbox = document.getElementById("lightbox");
    if (e.target === lightbox) {
        fecharLightbox();
    }
});

// Fechar com ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharLightbox();
    }
});


// =====================================
// SCROLL REVEAL SIMPLES
// =====================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".section, .card, .melhoria, .galeria-item, .melhoria-categoria")
    .forEach(el => observer.observe(el));


// =====================================
// MENU ATIVO
// =====================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");

        }

    });

});


// =====================================
// BOTÃO VOLTAR AO TOPO
// =====================================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

topButton.title = "Voltar ao topo";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        topButton.classList.add("visible");

    } else {

        topButton.classList.remove("visible");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


// =====================================
// EFEITO PARALLAX HERO
// =====================================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    let offset = window.pageYOffset;

    hero.style.backgroundPositionY = offset * 0.4 + "px";

});


// =====================================
// CONTADORES RESULTADOS
// =====================================

function animateCounter(element, target) {

    let current = 0;

    const increment = target / 80;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.textContent = Math.floor(current);

    }, 20);

}

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const target = parseInt(
                entry.target.getAttribute("data-target")
            );

            animateCounter(entry.target, target);

            counterObserver.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


// =====================================
// EFEITO HOVER SUAVE NOS CARDS
// =====================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = -(y - centerY) / 25;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

});


// =====================================
// LOADING SCREEN
// =====================================

window.addEventListener("load", () => {

    const loader = document.createElement("div");

    loader.id = "loader";

    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-circle"></div>
            <p>Carregando Projeto...</p>
        </div>
    `;

    document.body.appendChild(loader);

    setTimeout(() => {

        loader.classList.add("fade-out");

        setTimeout(() => {

            loader.remove();

        }, 1000);

    }, 1200);

});


// =====================================
// SMOOTH SCROLL PARA NAVEGAÇÃO
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
