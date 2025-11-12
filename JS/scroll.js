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

      $label.text(percent + '%');
      $labelV.text(percent + '%');

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


$(document).ready(function() {
  const $copyBtn = $('#copyBtn');
  const $promoText = $('#promoText');
  const $tooltip = $('#copyTooltip');
  const $icon = $copyBtn.find('.copy_icon');

  $copyBtn.on('click', function() {
    const text = $promoText.text();
    navigator.clipboard.writeText(text);

    $icon.text('✅');
    $tooltip.addClass('show');

    setTimeout(() => {
      $icon.text('📋');
      $tooltip.removeClass('show');
    }, 2000);
  });
});
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById("scrollProgressBar").style.width = progress + "%";
});
