// ============================================================
// Año dinámico en el footer
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Menú móvil
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Terminal — secuencia de "inicio de sesión" tipeada
// ============================================================
const terminalBody = document.getElementById('terminalBody');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const script = [
  { type: 'prompt', text: 'whoami' },
  { type: 'out',    text: 'irvin_gonzalez' },
  { type: 'prompt', text: 'cat roles.txt' },
  { type: 'out',    text: '> Backend Developer\n> Analista de Datos\n> Especialista en Ciberseguridad' },
  { type: 'prompt', text: 'status --sistema' },
  { type: 'out',    text: '[OK] servidores estables\n[OK] datos validados\n[OK] perímetro seguro' },
  { type: 'prompt', text: '_', cursor: true }
];

function typeLine(el, text, speed) {
  return new Promise(resolve => {
    if (prefersReducedMotion) {
      el.textContent += text;
      resolve();
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  for (const line of script) {
    const lineEl = document.createElement('div');

    if (line.type === 'prompt') {
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
      promptSpan.textContent = '$ ';
      lineEl.appendChild(promptSpan);
      terminalBody.appendChild(lineEl);

      if (line.cursor) {
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal__cursor';
        lineEl.appendChild(cursorSpan);
        await new Promise(r => setTimeout(r, 250));
      } else {
        await typeLine(lineEl, line.text, 45);
        await new Promise(r => setTimeout(r, 220));
      }
    } else {
      const outSpan = document.createElement('span');
      outSpan.className = 'out';
      lineEl.appendChild(outSpan);
      terminalBody.appendChild(lineEl);
      await typeLine(outSpan, line.text, 12);
      await new Promise(r => setTimeout(r, 260));
    }
  }
}

runTerminal();

// ============================================================
// Barras de habilidades — se llenan al entrar en el viewport
// ============================================================
const bars = document.querySelectorAll('.bar__fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const level = fill.getAttribute('data-level') || '0';
      fill.style.width = level + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

bars.forEach(bar => barObserver.observe(bar));

// ============================================================
// Nav — resaltado sutil de fondo al hacer scroll
// ============================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'rgba(212,175,55,0.35)';
  } else {
    nav.style.borderBottomColor = '';
  }
});
