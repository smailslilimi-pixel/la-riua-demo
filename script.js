'use strict';
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-menu');
const mobile = matchMedia('(max-width: 900px)');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  toggle.classList.toggle('open', open);
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  nav.inert = mobile.matches && !open;
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
mobile.addEventListener('change', () => setMenu(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
  if (e.key === 'Tab' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
    const links = nav.querySelectorAll('a');
    if (e.shiftKey && document.activeElement === toggle) { e.preventDefault(); links[links.length-1].focus(); }
    else if (!e.shiftKey && document.activeElement === links[links.length-1]) { e.preventDefault(); toggle.focus(); }
  }
});
setMenu(false);
const filters = [...document.querySelectorAll('.filter')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  document.querySelectorAll('[data-category]').forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category.toLocaleLowerCase('es') !== button.dataset.filter; });
  const count = document.querySelectorAll('.menu-item:not([hidden])').length;
  document.querySelector('#filter-status').textContent = `${count} platos · ${button.textContent}`;
}));
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  lightbox.querySelector('img').src = button.dataset.image;
  lightbox.querySelector('img').alt = button.querySelector('img').alt;
  lightbox.querySelector('p').textContent = button.querySelector('img').alt;
  lightbox.showModal();
}));
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('animate'); observer.observe(el); });
}
