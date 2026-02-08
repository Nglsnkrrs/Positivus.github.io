const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});


document.querySelectorAll(".accordion__item").forEach(item => {
    const btn = item.querySelector(".accordion__btn");
    const content = item.querySelector(".accordion__content");
    const inner = item.querySelector(".accordion__content-inner");
    const symbol = item.querySelector(".accordion__symbol");

    btn.addEventListener("click", () => {
        const isOpen = item.dataset.open === "true";

        item.dataset.open = !isOpen;
        btn.setAttribute("aria-expanded", !isOpen);
        symbol.textContent = isOpen ? "+" : "−";

        if (!isOpen) {
            content.style.height = inner.scrollHeight + "px";
        } else {
            content.style.height = content.scrollHeight + "px";
            requestAnimationFrame(() => {
                content.style.height = "0px";
            });
        }
    });

    window.addEventListener("resize", () => {
        if (item.dataset.open === "true") {
            content.style.height = inner.scrollHeight + "px";
        }
    });
});

// Инициализация Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});
const list = document.querySelector('.testimonials__slider-list');
const slides = document.querySelectorAll('.testimonials__slider-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const pagination = document.querySelector('.pagination');

let index = 0; // индекс активного слайда
let slideWidth = slides[0].offsetWidth;
let gap = parseInt(getComputedStyle(slides[0]).marginRight) || 40; // gap между слайдами

// ---------- создаём пагинацию ----------
slides.forEach((_, i) => { const li = document.createElement('li'); const button = document.createElement('button'); button.dataset.index = i; button.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"> <path d="M7.0099 2.05941L14 0L11.9604 7.0099L14 14L7.0099 11.9604L0 14L2.05941 7.0099L0 0L7.0099 2.05941Z" fill="currentColor"/> </svg>`; button.addEventListener('click', () => { index = i; updateSlider(); }); li.appendChild(button); pagination.appendChild(li); });

const dots = pagination.querySelectorAll('button');

// ---------- функция обновления слайдера ----------
function updateSlider() {
    const viewportWidth = document.querySelector('.testimonials__viewport').offsetWidth;

    // Считаем сколько слайдов помещается полностью в кадре
    const slidesInView = Math.floor(viewportWidth / (slideWidth + gap));

    // Центрирование активного слайда
    let offset = (viewportWidth - slideWidth) / 2;

    // Сдвиг для первого и последнего слайда
    let maxIndex = slides.length - 1;
    let minOffset = 0;
    let maxOffset = -(slideWidth + gap) * maxIndex + viewportWidth - slideWidth;

    let transformX = -(slideWidth + gap) * index + offset;

    if (transformX > minOffset) transformX = minOffset;
    if (transformX < maxOffset) transformX = maxOffset;

    list.style.transform = `translateX(${transformX}px)`;

    // Обновление классов активного слайда и точек пагинации
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

    // Деактивация кнопок
    prev.classList.toggle('disabled', index === 0);
    next.classList.toggle('disabled', index === slides.length - 1);
}

// ---------- обработка кнопок ----------
prev.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateSlider();
    }
});

next.addEventListener('click', () => {
    if (index < slides.length - 1) {
        index++;
        updateSlider();
    }
});

// ---------- пересчёт ширины при изменении окна ----------
window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    gap = parseInt(getComputedStyle(slides[0]).marginRight) || 40;
    updateSlider();
});

// Инициализация
updateSlider();



document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact__form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Отменяем стандартную отправку формы

        let isValid = true; // Флаг валидности
        let errorMessages = [];

        // Проверка Name
        if (nameInput.value.trim() === "") {
            isValid = false;
            errorMessages.push("Please enter your name.");
        }

        // Проверка Email
        if (emailInput.value.trim() === "") {
            isValid = false;
            errorMessages.push("Please enter your email.");
        } else if (!validateEmail(emailInput.value)) {
            isValid = false;
            errorMessages.push("Please enter a valid email.");
        }

        // Проверка Message
        if (messageInput.value.trim() === "") {
            isValid = false;
            errorMessages.push("Please enter your message.");
        }

        // Если форма валидна
        if (isValid) {
            alert("Form submitted successfully!");
            form.submit(); // Можно отправить форму на сервер
        } else {
            alert(errorMessages.join("\n"));
        }
    });

    // Функция проверки email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});
