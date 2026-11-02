// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top = mouseY - 6 + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX - 18) * 0.12;
  followerY += (mouseY - followerY - 18) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    follower.style.transform = 'scale(1.5)';
    follower.style.borderColor = 'rgba(12, 192, 168, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
    follower.style.borderColor = 'rgba(12, 192, 168, 0.4)';
  });
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => observer.observe(el));

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── PARALLAX ORBS ──
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.bg-orb-1').style.transform =
    `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)`;
  document.querySelector('.bg-orb-2').style.transform =
    `translate(${-scrollY * 0.03}px, ${-scrollY * 0.05}px)`;
});

// ── PHONE 3D TILT ──
document.querySelectorAll('.phone-frame').forEach(phone => {
  phone.addEventListener('mousemove', (e) => {
    const rect = phone.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    phone.style.transform =
      `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-12px)`;
  });
  phone.addEventListener('mouseleave', () => {
    phone.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    phone.style.transform = '';
    setTimeout(() => { phone.style.transition = ''; }, 600);
  });
});