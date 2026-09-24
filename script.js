// KICKWEB – navigation + mailto contact form
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const verein = String(data.get('verein') || '').trim();
    const name = String(data.get('name') || ''').trim();
    const email = String(data.get('email') || ''').trim();
    const paket = String(data.get('paket') || ''').trim();
    const nachricht = String(data.get('nachricht') || ''').trim();

    const subject = `KICKWEB Anfrage – ${verein || "neuer Verein"}`;
    const body = [
      "Hallo KICKWEB,",
      "",
      `Verein: ${verein}`,
      `Ansprechpartner: ${name}`,
      `E-Mail: ${email}`,
      `Gewünschtes Paket: ${paket}`,
      "",
      "Nachricht:",
      nachricht,
      "",
      "Viele Grüße",
      name
    ].join("\n");

    const mailto = `mailto:kickweb.de@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
