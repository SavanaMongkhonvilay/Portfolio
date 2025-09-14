$(document).ready(function() {


// Hero typing
  function initHeroTyping() {
    const $typingElement = $(".hero-typing .text");
    const $cursor = $(".hero-typing .cursor");
    const titles = ["A Web Developer", "A UI/UX Designer", "An Advocate"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 120;
    const erasingSpeed = 80;
    const delayBetween = 1500;

    function type() {
      const currentTitle = titles[titleIndex];

      if (!isDeleting) {
        $typingElement.text(currentTitle.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentTitle.length) {
          isDeleting = true;
          setTimeout(type, delayBetween);
          return;
        }
      } else {
        $typingElement.text(currentTitle.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
        }
      }

      setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
    }

    function blinkCursor() {
      setInterval(function() {
        $cursor.css("visibility", $cursor.css("visibility") === "hidden" ? "visible" : "hidden");
      }, 500);
    }

    type();
    blinkCursor();
  }

// Nav Hover 

function initNavbarHover() {
  const $navbarLinks = $(".navbar-menu li a");
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();

  $navbarLinks.hover(
    function() { $(this).css('color', primaryColor); },
    function() { $(this).css('color', textColor); }
  );
}

// Project filtering 
  function initProjectFiltering() {
    const $filterBtns = $(".filter-btn");
    const $projectCards = $(".project-card");

    $filterBtns.click(function() {
      $filterBtns.removeClass('active');
      $(this).addClass('active');

      const filter = $(this).data('filter');

      $projectCards.each(function() {
        if (filter === 'all' || $(this).data('category') === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(300);
        }
      });
    });
  }

// intitizalize functions 
  initHeroTyping();
  initNavbarHover();
  initProjectFiltering();

});
