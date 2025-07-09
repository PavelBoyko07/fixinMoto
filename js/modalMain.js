/**
 * Скрипт управления модальным окном для оформления заявки на услугу
 *
 * 1. openModal(modalId) / closeModal(modalId)
 *    — Открывает/закрывает модалку по ID, добавляя/удаляя классы 'active' и блокируя скролл страницы.
 *
 * 2. Обработчики событий:
 *    — Открытие окна заказа услуги через дата-атрибут ([data-btn-modal-order])
 *    — Закрытие по кнопке и клику вне контента модального окна
 *
 * 3. Отправка формы
 *    — Блокирует стандартную отправку, выводит alert, закрывает модалку и сбрасывает форму
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
  const orderCloseBtn = document.getElementById('closeOrderModal');
  document.querySelectorAll('[data-btn-modal-order]').forEach(btn => {
    btn.addEventListener('click', () => openModal('orderModal'));
  });

  orderCloseBtn?.addEventListener('click', () => closeModal('orderModal'));

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
      }
    });
  });

  document.getElementById('orderForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Ожидайте дальнейшей связи через указанный вами номер телефона');
    closeModal('orderModal');
    e.target.reset();
  });
});