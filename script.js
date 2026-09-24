// KICKWEB – Retro navigation + working contact form for GitHub Pages
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const data = new FormData(contactForm);
    const verein = String(data.get('verein') || '').trim();
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();

    if (!verein || !name || !email) {
      formStatus.textContent = 'BITTE ALLE PFLICHTFELDER AUSFÜLLEN.';
      formStatus.className = 'form-status error';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'WIRD GESENDET ...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch('https://formsubmit.co/ajax/kickweb.de@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      const result = await response.json();

      if (!response.ok || result.success !== 'true' && result.success !== true) {
        throw new Error('Formular konnte nicht gesendet werden.');
      }

      contactForm.reset();
      formStatus.textContent = '✓ ANFRAGE GESENDET! Wir melden uns schnellstmöglich.';
      formStatus.className = 'form-status success';
    } catch (error) {
      formStatus.textContent = 'FEHLER BEIM SENDEN. Bitte schreibe direkt an kickweb.de@gmail.com.';
      formStatus.className = 'form-status error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'ANFRAGE SENDEN ▶';
    }
  });
}
