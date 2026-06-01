document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loader Smooth Handling
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 500);
    });

    setTimeout(() => {
        if(loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }, 2000);

    // 2. Sticky Navbar & Active Tracking
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 220)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // 3. Mobile Navigation Hamburger Menu
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinksContainer = document.querySelector(".nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        navLinksContainer.classList.toggle("mobile-active");
        const icon = mobileMenuBtn.querySelector("i");
        icon.className = navLinksContainer.classList.contains("mobile-active") ? "fas fa-times" : "fas fa-bars";
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("mobile-active");
            mobileMenuBtn.querySelector("i").className = "fas fa-bars";
        });
    });

    // 4. Fixed & Fluid FAQ Accordion Bug Solution
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Tutup semua panel lain dengan animasi bersih
            faqItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-answer").style.maxHeight = null;
            });

            // Jalankan toggle untuk elemen yang diklik
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 5. Advanced Order Gateway Engine (Modal System)
    const orderModal = document.getElementById("orderModal");
    const closeModal = document.getElementById("closeModal");
    const modalTargetText = document.getElementById("modalServiceTarget");
    const waAdmin1Btn = document.getElementById("waAdmin1");
    const waAdmin2Btn = document.getElementById("waAdmin2");

    // Data Routing Configuration
    const admin1Phone = "6285600484370"; // dikz
    const admin2Phone = "62895355121060"; // raynoxz

    document.querySelectorAll(".order-trigger-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const serviceName = button.getAttribute("data-service");
            
            // Set teks nama layanan di modal
            modalTargetText.innerText = serviceName;

            // Generate template chat WhatsApp otomatis
            const encodedText = encodeURIComponent(`Halo Admin Milwing Store, saya ingin melakukan pemesanan untuk layanan premium: [ ${serviceName} ]. Mohon info detail pembayarannya.`);
            
            waAdmin1Btn.href = `https://wa.me/${admin1Phone}?text=${encodedText}`;
            waAdmin2Btn.href = `https://wa.me/${admin2Phone}?text=${encodedText}`;

            // Munculkan Modal dengan animasi transisi
            orderModal.classList.add("open");
            document.body.style.overflow = "hidden"; // Mencegah scrolling latar belakang
        });
    });

    const runCloseModalLogic = () => {
        orderModal.classList.remove("open");
        document.body.style.overflow = "auto";
    };

    closeModal.addEventListener("click", runCloseModalLogic);
    orderModal.addEventListener("click", (e) => {
        if(e.target === orderModal) runCloseModalLogic();
    });

    // 6. Smooth Scroll Reveal Pipeline
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

    revealElements.forEach(element => revealObserver.observe(element));

    // 7. Micro-interaction: Mouse Card Move Lights
    const cards = document.querySelectorAll(".service-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });
});
