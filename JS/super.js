// ================== SIDEBAR TOGGLE ==================
(function() {
  const burger = document.getElementById('burger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeSidebar');
  const sideLinks = sidebar.querySelectorAll('a');

  function open() {
    sidebar.classList.add('visible');
    overlay.classList.add('visible');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
  }

  function close() {
    sidebar.classList.remove('visible');
    overlay.classList.remove('visible');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
  }

  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = sidebar.classList.contains('visible');
    if (isOpen) close(); else open();
  });

  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  sideLinks.forEach(a => a.addEventListener('click', close));

  // Close on ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });

  // ===== Keyboard navigation inside sidebar (↑ ↓) =====
  sidebar.addEventListener('keydown', function(e) {
    const links = Array.from(sidebar.querySelectorAll('a'));
    const current = document.activeElement;
    let index = links.indexOf(current);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      index = (index + 1) % links.length;
      links[index].focus();
      animateFocus(links[index]);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      index = (index - 1 + links.length) % links.length;
      links[index].focus();
      animateFocus(links[index]);
    }

    if (e.key === 'Enter' && current.tagName === 'A') {
      current.click();
    }
  });
})();


// ================== DESKTOP MENU KEYBOARD NAVIGATION ==================
document.addEventListener('keydown', function(e) {
  const menuLinks = Array.from(document.querySelectorAll('.menu_links a'));
  const activeElement = document.activeElement;

  // === Если пользователь нажал Tab впервые (фокус не в меню) ===
  if (e.key === 'Tab' && !menuLinks.includes(activeElement)) {
    e.preventDefault();
    // Переносим фокус на первый пункт меню (например, Home)
    menuLinks[0].focus();
    animateFocus(menuLinks[0]);
    return;
  }

  // === Если фокус уже внутри меню ===
  if (menuLinks.includes(activeElement)) {
    let index = menuLinks.indexOf(activeElement);

    // --- Перемещение стрелками ---
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      index = (index + 1) % menuLinks.length;
      menuLinks[index].focus();
      animateFocus(menuLinks[index]);
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      index = (index - 1 + menuLinks.length) % menuLinks.length;
      menuLinks[index].focus();
      animateFocus(menuLinks[index]);
    }

    // --- ENTER активирует ссылку ---
    if (e.key === 'Enter' && activeElement.tagName === 'A') {
      activeElement.click();
    }

    // --- Tab циклично перемещается по меню ---
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift + Tab — назад
        index = (index - 1 + menuLinks.length) % menuLinks.length;
      } else {
        // Tab — вперёд
        index = (index + 1) % menuLinks.length;
      }
      menuLinks[index].focus();
      animateFocus(menuLinks[index]);
    }
  }
});




// ================== FOCUS ANIMATION ==================
function animateFocus(link) {
  link.classList.add('key-focus');
  setTimeout(() => link.classList.remove('key-focus'), 300);
}


// DATE
// Display current date and time
function updateTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  };
  document.getElementById('menuTime').textContent = now.toLocaleString('en-GB', options);
}
setInterval(updateTime, 1000);
updateTime();

// BUTTON
const welcomeButton = document.querySelector('.welcome_button');

// массив цветов для фона
const colors = ['#8E1616', '#e2dbdbff', '#FF8A00', '#4CAF50', '#1E90FF', '#FFD700','#ff09ceee'];

welcomeButton.addEventListener('mouseover', function() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  this.style.backgroundColor = randomColor;

  // менять цвет текста в зависимости от яркости фона
  const r = parseInt(randomColor.slice(1,3),16);
  const g = parseInt(randomColor.slice(3,5),16);
  const b = parseInt(randomColor.slice(5,7),16);
  const brightness = (r*299 + g*587 + b*114)/1000;
  this.style.color = (brightness > 155) ? '#111111' : '#EEEEEE';
});

// Scroll progress (jQuery) — performant using requestAnimationFrame
(function($){
  $(function(){
    const $win = $(window);
    const $doc = $(document);
    const $bar = $('#scrollProgressBar');
    const $barWrap = $('#scrollProgressWrap');
    const $barAfter = $bar.length ? $bar.get(0).querySelector('::after') : null; // not used directly
    const $barPseudo = $('#scrollProgressBar'); // we'll set width via jQuery/CSS var
    const $barV = $('#scrollProgressBarV');
    const $label = $('#scrollProgressLabel');
    const $labelV = $('#scrollProgressLabelV');

    let ticking = false;
    function updateProgress(){
      const scrollTop = $win.scrollTop();
      const docHeight = $doc.height() - $win.height();
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      $bar.attr('aria-valuenow', percent);
      $bar.css('--fill', percent + '%');
      if (!$bar.find('.fill').length) {
        $bar.append('<div class="fill" style="position:absolute;left:0;top:0;bottom:0;width:0;border-radius:999px;background:linear-gradient(90deg,#FF7A18,#FF4C4C 40%,#FFD54C 80%);box-shadow:0 6px 30px rgba(255,76,76,0.18);"></div>');
      }
      $bar.find('.fill').css({ width: percent + '%' });

      // VERTICAL
      if ($barV.length) {
        $barV.attr('aria-valuenow', percent);
        if (!$barV.find('.fillV').length) {
          $barV.append('<div class="fillV" style="position:absolute;left:0;right:0;bottom:0;height:0;border-radius:999px;background:linear-gradient(180deg,#1E90FF,#4CAF50 45%,#FF4C4C 100%);"></div>');
        }
        $barV.find('.fillV').css({ height: percent + '%' });
      }

      // labels
      $label.text(percent + '%');
      $labelV.text(percent + '%');

      // add class when near bottom
      if (percent >= 90) {
        $bar.parent().find('.progress-bar').addClass('filled');
        $barV.addClass('filled');
      } else {
        $bar.parent().find('.progress-bar').removeClass('filled');
        $barV.removeClass('filled');
      }

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    // initial
    requestTick();

    // bind events
    $win.on('scroll resize', requestTick);
  });
})(jQuery);

// ====== LOADING SPINNER ON SUBMIT (Task 6) ======
const consultBtn = document.querySelector('.welcome_button');

if (consultBtn) {
  consultBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Сохраняем оригинальный текст
    const originalText = consultBtn.textContent;

    // Меняем на "Please wait..." и спиннер
    consultBtn.innerHTML = `<span class="spinner"></span> Please wait…`;

    // Делаем кнопку неактивной
    consultBtn.disabled = true;
    consultBtn.style.pointerEvents = 'none';
    consultBtn.classList.add('loading');

    // Возвращаем в исходное состояние через 2.5 сек (имитация сервера)
    setTimeout(() => {
      consultBtn.innerHTML = originalText;
      consultBtn.disabled = false;
      consultBtn.style.pointerEvents = 'auto';
      consultBtn.classList.remove('loading');
    }, 2500);
  });
}

// ===== Animated Number Counters =====
(function() {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function animateCounter(el, target, duration, format, suffix) {
    if (reduceMotion || duration === 0) {
      el.textContent = format ? formatNumber(Math.round(target)) + (suffix || '') : Math.round(target) + (suffix || '');
      return;
    }

    const start = performance.now();
    const from = 0;
    const to = Number(target);

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = from + (to - from) * eased;
      const displayed = Math.round(current);
      el.textContent = format ? formatNumber(displayed) + (suffix || '') : displayed + (suffix || '');
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observerOptions = { threshold: 0.2 };
  const counters = document.querySelectorAll('.stat-value');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.target ? Number(el.dataset.target) : 0;
        const duration = el.dataset.duration ? Number(el.dataset.duration) : 1500;
        const format = el.dataset.format === "true";
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, duration, format, suffix);
        obs.unobserve(el); // чтобы не перезапускалось при повторной прокрутке
      }
    });
  }, observerOptions);

  counters.forEach(el => {
    el.textContent = '0';
    io.observe(el);
  });
})();


$(document).ready(function () {
  $('.contact_form').on('submit', function (e) {
    e.preventDefault();

    const $btn = $(this).find('button[type="submit"]');
    $btn.addClass('loading').text('Please wait...');
    $btn.prop('disabled', true);

    setTimeout(() => {
      $btn.removeClass('loading').text('Submit');
      $btn.prop('disabled', false);
      $('#notification').addClass('show');

      // скрыть уведомление через 3 секунды
      setTimeout(() => {
        $('#notification').removeClass('show');
      }, 3000);
    }, 2500);
  });
});






// === Contact Support Modal ===
const contactLink = document.querySelector('a[href="#"][data-support]');
const modal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");

// Если ссылка не имеет data-support, добавь её
document.querySelectorAll("footer a").forEach(link => {
  if (link.textContent.trim() === "Contact support") {
    link.setAttribute("data-support", "true");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});











 document.getElementById("copyPhone").addEventListener("click", function() {
    const phoneNumber = "+77079894995";
    navigator.clipboard.writeText(phoneNumber).then(() => {
      alert("📋 Номер скопирован: " + phoneNumber);
    }).catch(err => {
      console.error("Ошибка при копировании:", err);
    });
  });