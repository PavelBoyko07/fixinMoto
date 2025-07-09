/**
 * Скрипт управления модальными окнами и автозаполнением формы услуги
 *
 * 1. openModal(modalId) / closeModal(modalId)
 *    — Открывает/закрывает модалку по ID, добавляя/удаляя классы 'active' и блокируя скролл страницы.
 *
 * 2. Обработчики событий:
 *    — Открытие окна отзывов (#cases_btn) и заказа услуги ([data-btn-service])
 *    — Закрытие по кнопке и клику вне контента модального окна
 *
 * 3. Отправка формы (#orderForm)
 *    — Блокирует стандартную отправку, выводит alert, закрывает модалку и сбрасывает форму
 *
 * 4. Автозаполнение выпадающего списка услуг (#orderService)
 *    — Проходит по .services-list__item, вытаскивает текст из .services-list__name,
 *      создаёт <option> и вставляет в <select>, сохранив первую "Выберите услугу"
 *
 * 5. Автовыбор услуги при клике по карточке
 *    — Каждая кнопка "Подробнее" получает data-index
 *    — При открытии модалки нужный <option> автоматически выбирается в <select>
 */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const reviewOpenBtn = document.getElementById('cases_btn');
  const reviewCloseBtn = document.getElementById('closeModal');
  reviewOpenBtn?.addEventListener('click', () => openModal('reviewModal'));
  reviewCloseBtn?.addEventListener('click', () => closeModal('reviewModal'));

  const orderCloseBtn = document.getElementById('closeServiceModal');
  document.querySelectorAll('[data-btn-service]').forEach(btn => {
    btn.addEventListener('click', () => openModal('serviceModal'));
  });
  orderCloseBtn?.addEventListener('click', () => closeModal('serviceModal'));

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  const form = document.getElementById('orderForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Ожидайте дальнейшей связи через указанный вами номер телефона');
    closeModal('serviceModal');
    form.reset();
  });

  const serviceSelect = document.getElementById('orderService');
  const serviceItems = document.querySelectorAll('.services-list__item');
  if (serviceSelect && serviceItems.length > 0) {
    const firstOption = serviceSelect.querySelector('option');
    serviceSelect.innerHTML = '';
    serviceSelect.appendChild(firstOption);

    serviceItems.forEach((item, i) => {
      const nameBlock = item.querySelector('.services-list__name');
      const option = document.createElement('option');
      if (nameBlock) {
        option.value = `service-${i}`;
        option.textContent = nameBlock.textContent.trim();
        serviceSelect.appendChild(option);
      }

      const btn = item.querySelector('[data-btn-service]');
      if (btn) {
        btn.dataset.serviceIndex = i;
        btn.addEventListener('click', () => {
          openModal('serviceModal');
          serviceSelect.value = `service-${i}`;
        });
      }
    });
  }
});