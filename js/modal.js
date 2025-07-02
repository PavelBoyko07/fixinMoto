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
    alert('Заявка отправлена!');
    closeModal('orderModal');
    e.target.reset();
  });

  document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Отзыв отправлен!');
    closeModal('reviewModal');
    e.target.reset();
  });
});