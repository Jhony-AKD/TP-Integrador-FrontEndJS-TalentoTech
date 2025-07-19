document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.contact-form');
  const success = document.querySelector('.form-success');
  const error = document.querySelector('.form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        success.style.display = 'block';
        error.style.display = 'none';
        form.reset();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (err) {
      success.style.display = 'none';
      error.style.display = 'block';
    }
  });
});
