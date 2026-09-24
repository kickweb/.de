// KICKWEB – Retro navigation + contact form
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.getElementById('contactForm');
const statusBox = document.getElementById('formStatus');
const submitButton = document.getElementById('submitButton');

if (form && statusBox && submitButton) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    statusBox.className = 'form-status';
    statusBox.textContent = 'SENDE ANFRAGE ...';
    submitButton.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) {
      statusBox.className = 'form-status success';
      statusBox.textContent = 'DANKE!';
      form.reset();
      submitButton.disabled = false;
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/kickweb.de@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      statusBox.className = 'form-status success';
      statusBox.innerHTML = '✓ ANFRAGE GESENDET – DANKE!<br><span>Wir melden uns unter der angegebenen E-Mail-Adresse.</span>';
      form.reset();
    } catch (error) {
      console.error('KICKWEB form error:', error);
      statusBox.className = 'form-status error';
      statusBox.innerHTML = '✕ SENDEN NICHT MÖGLICH.<br><span>Bitte direkt an <a href="mailto:kickweb.de@gmail.com">kickweb.de@gmail.com</a> schreiben.</span>';
    } finally {
      submitButton.disabled = false;
    }
  });
}
