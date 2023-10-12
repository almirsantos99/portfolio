window.onload = function() {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', '/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

  const header = document.getElementById('header');
  const anchors = document.querySelectorAll('a[href^="#"]');
  const project_images = document.querySelectorAll('.project-autoscroll');

  headerFixed();

  anchors.forEach(function(el) {
    el.addEventListener("click", function(ev) {
      ev.preventDefault();
      smoothScroll(el);
    });
  });

  project_images.forEach(function(el) {
    el.addEventListener('mouseenter', function(ev) {
      projectAutoScroll(el, ev);
    });

    el.addEventListener('mouseleave', function(ev) {
      projectAutoScroll(el, ev);
    });
  });

  window.addEventListener("scroll", headerFixed);

  function smoothScroll(el) {
    var anchor = document.querySelector(el.getAttribute('href'));
    var anchorPaddingTop = parseFloat(window.getComputedStyle(anchor).getPropertyValue('padding-top'));
    var anchorOffset = anchor.offsetTop + anchorPaddingTop;

    window.scroll({
      behavior: 'smooth',
      top: anchorOffset - 64,
    });
  }

  function headerFixed() {
    document.onscroll = function() {
      // Header fixed class
      if(window.scrollY > 0) {
        if(!header.classList.contains('header-fixed')) {
            header.classList.add('header-fixed');
        }
      } else {
        header.classList.remove('header-fixed');
      }
    }
  }

  function projectAutoScroll(el, ev) {
    if(ev.type == "mouseenter") {
      var parentHeight = el.parentElement.offsetHeight;
      var elHeight = el.offsetHeight;
      var translatePercentage = parseFloat( ( parentHeight / elHeight ) * 100 ).toFixed(2) - 100;
      el.style.transform = 'translateY('+translatePercentage+'%)';
    } else {
      el.style.transform = 'translateY(0%)';
    }
  }
}
