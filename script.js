// A página e seus projetos continuam acessíveis mesmo sem JavaScript.
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const mobile = window.matchMedia('(max-width: 760px)');

function setMenu(open, returnFocus = false) {
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav?.classList.toggle('active', open);
  if (nav) nav.inert = mobile.matches && !open;
  if (returnFocus) menuToggle?.focus();
}

document.documentElement.classList.add('js');
setMenu(false);
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
  setMenu(false);
  const target = document.getElementById(link.hash.slice(1));
  if (target && mobile.matches) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('click', event => {
  if (header && !header.contains(event.target)) setMenu(false);
});
nav?.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (mobile.matches && !header.contains(document.activeElement)) setMenu(false);
  });
});
mobile.addEventListener('change', () => setMenu(false));

function updateHeader() { header?.classList.toggle('scrolled', window.scrollY > 30); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('reveal-ready'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element); });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); document.querySelectorAll('.reveal-ready').forEach(el => el.classList.remove('reveal-ready')); }
  });
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const shareButton = document.getElementById('shareSite');
const shareStatus = document.getElementById('shareStatus');
const shareFallback = document.getElementById('shareFallback');
const shareUrl = document.getElementById('shareUrl');
// Compartilha sempre o endereço público, inclusive em prévias locais.
const publicSiteUrl = 'https://hugo-eight-mu.vercel.app/';
if (shareButton) {
  shareButton.hidden = false;
  shareButton.addEventListener('click', async () => {
    shareStatus.textContent = '';
    shareFallback.hidden = true;
    shareButton.disabled = true;
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: 'Hugo Strassa — Música & Audio Dev', url: publicSiteUrl });
          return;
        } catch (error) {
          if (error.name === 'AbortError') return;
        }
      }
      try {
        await navigator.clipboard.writeText(publicSiteUrl);
        shareStatus.textContent = 'Link copiado! Agora é só colar onde quiser.';
      } catch {
        shareFallback.hidden = false;
        shareUrl.focus();
        shareUrl.select();
        shareStatus.textContent = 'Selecione e copie o link abaixo.';
      }
    } finally {
      shareButton.disabled = false;
    }
  });
}
