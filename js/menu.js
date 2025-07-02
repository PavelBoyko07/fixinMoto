document.addEventListener('DOMContentLoaded', function () {
  const html = document.documentElement;
  const body = document.body;
  const menuBtn = document.querySelector('.menu-btn');
  const headerMobile = document.querySelector('.mobile-menu');
  const anchors = document.querySelectorAll('.header__link, .header__link.mobile');
  const allFocusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');

  function toggleMenu() {
    const isActive = menuBtn.classList.toggle('active');
    headerMobile.classList.toggle('active');
    html.classList.toggle('active');

    if (isActive) {
      // блокируем скрол при активном меню
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';

      // делает только нужные элементы доступными
      anchors.forEach(anchor => anchor.removeAttribute('tabindex'));
      allFocusableElements.forEach(element => {
        if (!headerMobile.contains(element) && element !== menuBtn) {
          element.setAttribute('tabindex', '-1');
        }
      });
    } else {
      // восстановить прокрутку
      html.style.overflow = '';
      body.style.overflow = '';

      // вернуть доступность всем
      anchors.forEach(anchor => anchor.setAttribute('tabindex', '-1'));
      allFocusableElements.forEach(element => {
        element.removeAttribute('tabindex');
      });
    }

    menuBtn.blur(); // убрать фокус с кнопки
  }

  function scrollToTarget(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      html.classList.remove('active');
      headerMobile.classList.remove('active');
      menuBtn.classList.remove('active');

      // восстановление исходного значения overflow, когда идёт скролл к меню
      html.style.overflow = '';
      body.style.overflow = '';
      anchors.forEach(anchor => anchor.setAttribute('tabindex', '-1'));
      allFocusableElements.forEach(element => {
        element.removeAttribute('tabindex');
      });

      setTimeout(() => {
        const targetOffset = targetSection.offsetTop - 25;
        window.scrollTo({top: targetOffset, behavior: 'smooth'});
      }, 700);
    }
  }

  function handleAnchorClick(event) {
    if (this.classList.contains('mobile')) {
      event.preventDefault();
      const href = this.getAttribute('href');
      const [, anchorId] = href.split('#');
      if (anchorId) {
        scrollToTarget('#' + anchorId);
      }
    }
  }

  // привязка событий к мобильному меню и кнопке
  if (menuBtn && headerMobile) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  for (const anchor of anchors) {
    anchor.addEventListener('click', handleAnchorClick);
    anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
  }
});