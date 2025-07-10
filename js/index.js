/**
 * Файл главной страницы - инициализация плагина для воспроизведения видео, а также двух слайдеров
 * Анимация слайдера допилена также здесь для того, чтобы топорно она не воспроизводилась (прерывисто).
 * Сделан специальный интервал в 6 секунд для баннера
 */

Fancybox.bind("[data-fancybox]", {});

new Swiper('.news__swiper', {
  spaceBetween: 15,
  navigation: {
    prevEl: '.news__btn--prev',
    nextEl: '.news__btn--next',
  },
  breakpoints: {
    1100: {
      slidesPerView: 3,
    },
    620: {
      slidesPerView: 2,
    },
    300: {
      autoHeight: true,
      slidesPerView: 1
    }
  }
});

new Swiper('.reviews__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 18,
  autoHeight: true,
  loop: true,
  speed: 600,
  navigation: {
    prevEl: '.reviews__btn--prev',
    nextEl: '.reviews__btn--next'
  },
});

function animateBanner() {
  const banner = document.querySelector('.banner');
  const title = document.querySelector('.banner__title');
  const text = document.querySelector('.banner__text');
  const btn = document.querySelector('.banner__btn');

  banner.classList.remove('animate');
  title.classList.remove('animate');
  text.classList.remove('animate');
  btn.classList.remove('animate');

  setTimeout(() => {
    banner.classList.add('animate');
    title.classList.add('animate');
    text.classList.add('animate');
    btn.classList.add('animate');
  }, 50);
}

animateBanner();

setInterval(animateBanner, 6000);