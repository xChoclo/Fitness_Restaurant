const darkMode = document.querySelector('.modo-oscuro');



document.addEventListener("DOMContentLoaded", function () {


    var swiper1 = new Swiper(".mySwiper-1", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 700,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    var swiper2 = new Swiper(".mySwiper-2", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            520: { slidesPerView: 2 },
            950: { slidesPerView: 3 }
        }
    });

    let tabInput = document.querySelectorAll(".tabInput");

    tabInput.forEach(function (input) {
        input.addEventListener('change', function () {
            let id = input.value; // Usa `value` si estás usando <input value="1">, por ejemplo
            let thisSwiper = document.getElementById('swiper' + id);
            if (thisSwiper && thisSwiper.swiper) {
                thisSwiper.swiper.update();
            }
        });
    });



    // Mostrar premium
    // const premiumBtn = document.getElementById("premium-icon");
    // const premiumModal = document.getElementById("premium-modal");

    // if (premiumBtn && premiumModal) {
    //     premiumBtn.addEventListener("click", () => {
    //         premiumModal.style.display = "block";
    //     });
    // }
});


    if (darkMode) {
        darkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode-variables');
            darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
            darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
        });
    }