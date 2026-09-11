// ============ Año en el footer ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Nav: fondo al hacer scroll + menú móvil ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ Reveal al hacer scroll (sutil, una vez por elemento) ============
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// Entrada orquestada del hero al cargar
window.addEventListener('load', () => {
  document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 120 * i);
  });
});

// ============ Acordeón FAQ ============
document.querySelectorAll('.accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.accordion__trigger').forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      t.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// ============ Testimonios rotativos ============
const testimonials = [
  {
    quote: '"Antes perdíamos citas todo el tiempo por no contestar a tiempo. Ahora el sitio agenda solo y nosotros solo llegamos a trabajar."',
    author: '— Dueño de negocio de servicios'
  },
  {
    quote: '"Nos entregaron el sitio en las fechas que prometieron y siguen respondiendo cuando necesitamos un ajuste."',
    author: '— Encargada de comercio local'
  },
  {
    quote: '"La automatización de facturación nos quitó horas de trabajo administrativo cada semana."',
    author: '— Negocio de servicios profesionales'
  }
];
// TODO: reemplazar por testimonios reales de clientes antes de publicar

const quoteEl = document.getElementById('testimonial-quote');
const authorEl = document.getElementById('testimonial-author');
const dotsEl = document.getElementById('testimonial-dots');
let activeTestimonial = 0;

function renderTestimonial(i) {
  quoteEl.textContent = testimonials[i].quote;
  authorEl.textContent = testimonials[i].author;
  dotsEl.querySelectorAll('button').forEach((b, idx) => b.classList.toggle('is-active', idx === i));
}

testimonials.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
  dot.addEventListener('click', () => { activeTestimonial = i; renderTestimonial(i); });
  dotsEl.appendChild(dot);
});
renderTestimonial(0);

setInterval(() => {
  activeTestimonial = (activeTestimonial + 1) % testimonials.length;
  renderTestimonial(activeTestimonial);
}, 7000);

// ============ Formulario de contacto ============
// Requiere un endpoint real (Formspree, Web3Forms, etc). Ver README.md.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Enviando...';

  const placeholderAction = form.action.includes('REEMPLAZAR_ID');
  if (placeholderAction) {
    status.textContent = 'Falta configurar el servicio de envío del formulario (ver README.md).';
    return;
  }

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent = '¡Gracias! Te contactaremos pronto.';
      form.reset();
    } else {
      status.textContent = 'No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.';
    }
  } catch (err) {
    status.textContent = 'No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.';
  }
});

// ============ Chatbot de preguntas frecuentes (basado en reglas, sin IA en vivo) ============
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatBody = document.getElementById('chat-body');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatQuick = document.getElementById('chat-quick');

const faqBot = [
  {
    keys: ['pagina web profesional', 'página web profesional', 'que es una pagina web'],
    label: '¿Qué es una página web profesional?',
    answer: 'Es un sitio construido a la medida de tu negocio: rápido, adaptado a celular y con la información que tu cliente necesita para contactarte, no una plantilla genérica.'
  },
  {
    keys: ['lenguajes', 'tecnologias', 'tecnologías', 'con que trabajan'],
    label: '¿Con qué tecnologías trabajan?',
    answer: 'Usamos tecnologías web modernas (HTML, CSS, JavaScript, React) y las herramientas de automatización que mejor se adapten a tu negocio.'
  },
  {
    keys: ['renta', 'membresia', 'membresía', 'vitalicia'],
    label: '¿Renta o membresía vitalicia?',
    answer: 'En la renta pagas una cuota periódica e incluye mantenimiento. En la membresía vitalicia pagas una sola vez por el desarrollo y la propiedad del sitio; el mantenimiento se cotiza aparte.'
  },
  {
    keys: ['cuanto tiempo', 'cuánto tiempo', 'tiempo de entrega', 'cuando esta listo'],
    label: '¿Cuánto tiempo toma?',
    answer: 'Una página de presentación puede estar lista en 1-2 semanas. Un sistema con reservas, pagos o automatización toma más, según lo que definamos contigo.'
  },
  {
    keys: ['precio', 'costo', 'cuanto cuesta', 'cuánto cuesta'],
    label: '¿Cuánto cuesta?',
    answer: 'El costo depende del alcance del proyecto. Cuéntanos qué necesitas en el formulario de contacto o por WhatsApp y te enviamos una cotización.'
  }
];

function addBubble(text, who) {
  const p = document.createElement('p');
  p.className = `chat__bubble chat__bubble--${who}`;
  p.textContent = text;
  chatBody.appendChild(p);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function renderQuickReplies() {
  chatQuick.innerHTML = '';
  faqBot.forEach(item => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = item.label;
    b.addEventListener('click', () => {
      addBubble(item.label, 'user');
      addBubble(item.answer, 'bot');
    });
    chatQuick.appendChild(b);
  });
}
renderQuickReplies();

function findAnswer(text) {
  const normalized = text.toLowerCase();
  const match = faqBot.find(item => item.keys.some(k => normalized.includes(k)));
  return match ? match.answer : 'No tengo una respuesta lista para eso — escríbenos por WhatsApp o deja tu mensaje en el formulario de contacto y te respondemos directamente.';
}

chatToggle.addEventListener('click', () => {
  const isHidden = chatWindow.hasAttribute('hidden');
  if (isHidden) {
    chatWindow.removeAttribute('hidden');
    chatToggle.setAttribute('aria-expanded', 'true');
    chatInput.focus();
  } else {
    chatWindow.setAttribute('hidden', '');
    chatToggle.setAttribute('aria-expanded', 'false');
  }
});
chatClose.addEventListener('click', () => {
  chatWindow.setAttribute('hidden', '');
  chatToggle.setAttribute('aria-expanded', 'false');
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addBubble(text, 'user');
  addBubble(findAnswer(text), 'bot');
  chatInput.value = '';
});
