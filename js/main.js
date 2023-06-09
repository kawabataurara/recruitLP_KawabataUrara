'use strict'; {
  // ハンバーガーメニュー
  const header = document.getElementById('js-header');
  const menu = document.getElementById('js-btn');
  menu.addEventListener('click', () => {
    header.classList.toggle('open');
  });
  const headerChange = document.getElementById("js-header");
  window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerChange.classList.add('changed');
    } else {
      headerChange.classList.remove('changed');
    }
  });
  // スムーススクロール
  const headerHeight = document.querySelector('header').offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      const target = document.getElementById(href.replace('#', ''));
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
  // トップボタン
  const observerShowScrollTopBtn = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const scrollTopBtn = document.getElementById("page-top");
      if (e.isIntersecting) {
        setTimeout(function () {
          scrollTopBtn.style.opacity = 0;
        }, 1);
        scrollTopBtn.classList.add('is-hide');
      } else {
        setTimeout(function () {
          scrollTopBtn.style.opacity = 1;
        }, 1);
        scrollTopBtn.classList.remove('is-hide');
      }
    }
  });
  observerShowScrollTopBtn.observe(document.getElementById('js-main'));
  const image = document.getElementsByClassName('thumbnail');
  new simpleParallax(image, {
    orientation: 'down',
    scale: 1.4,
    overflow: true,
    delay: 0,
  });
  // infographicのAPI
  const targets = document.querySelectorAll('.js-fadeIn');

  function callback(entries, obs) {
    console.log(entries);
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }
  const options = {
    threshold: 0,
    rootMargin: '0px 0px'
  };
  const observer = new IntersectionObserver(callback, options);
  targets.forEach(target => {
    observer.observe(target);
  });
}
