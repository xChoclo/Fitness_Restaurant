(function() {
  const TIMEOUT = 5000; // milisegundos

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toasts = Array.from(container.querySelectorAll('.toast'));

    toasts.forEach(toast => {
      // Auto-remover tras TIMEOUT
      setTimeout(() => {
        toast.classList.add('exit');
        toast.addEventListener('animationend', () => {
          if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
          }
        });
      }, TIMEOUT);

      // Cerrar manual
      const btnClose = toast.querySelector('.close');
      if (btnClose) {
        btnClose.addEventListener('click', () => {
          toast.classList.add('exit');
          toast.addEventListener('animationend', () => {
            if (toast.parentElement) {
              toast.parentElement.removeChild(toast);
            }
          });
        });
      }
    });
  });
})();
