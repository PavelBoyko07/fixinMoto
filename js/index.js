Fancybox.bind("[data-fancybox]", {});

new Swiper('.news__swiper', {
  spaceBetween: 15,
  navigation: {
    prevEl: '.news__btn--prev',
    nextEl: '.news__btn--next',
  },
  breakpoints: {
    850: {
      slidesPerView: 3,
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