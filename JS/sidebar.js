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
// ===== Scroll Progress Bar (Top Only) =====
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  const progressBar = document.getElementById("scrollProgressBar");
  const progressLabel = document.getElementById("scrollProgressLabel");

  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }

  if (progressLabel) {
    progressLabel.textContent = Math.round(scrollPercent) + "%";
  }
});
