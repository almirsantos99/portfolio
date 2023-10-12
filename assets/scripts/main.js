window.onload = function() {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', '/particles.json');

  const header = document.getElementById('header');
  const mobile_nav_open = document.getElementById('mobile_nav_open');
  const mobile_nav_close = document.getElementById('mobile_nav_close');
  const mobile_nav = document.getElementById('mobile_nav');
  const anchors = document.querySelectorAll('a[href^="#"]');
  const project_images = document.querySelectorAll('.project-autoscroll');

  mobile_nav_open.addEventListener('click', toggleNavMobile);
  mobile_nav_close.addEventListener('click', toggleNavMobile);
  let mobile_nav_childs = mobile_nav.querySelectorAll('a');
  mobile_nav_childs.forEach(function(el) {
    el.addEventListener("click", toggleNavMobile);
  });

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

  function toggleNavMobile() {
    mobile_nav.classList.toggle('hidden');
  }

  function smoothScroll(el) {
    var anchor = document.querySelector(el.getAttribute('href'));
    var anchorPaddingTop = parseFloat(window.getComputedStyle(anchor).getPropertyValue('padding-top'));
    var headerHeight = header.offsetHeight + 20;
    var anchorOffset = anchor.offsetTop + anchorPaddingTop - headerHeight;

    window.scroll({
      behavior: 'smooth',
      top: anchorOffset,
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
