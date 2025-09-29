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
          $(this)
            .stop(true, true)
            .fadeIn(300)
            .css({ opacity: 0, top: "30px" })
            .animate({ opacity: 1, top: "0px" }, 500);
        } else {
          $(this).stop(true, true).fadeOut(300);
        }
      });
    });

   // card animation 
    $(".project-card").hover(
      function() {
        $(this).stop(true).animate(
          { top: "-10px" },
          300
        );
        $(this).css("box-shadow", "0 12px 24px rgba(0,0,0,0.3)");
      },
      function() {
        $(this).stop(true).animate(
          { top: "0px" },
          300
        );
        $(this).css("box-shadow", "0 4px 12px rgba(0,0,0,0.1)");
      }
    );
  }

  // Dark toggle
  function initDarkToggle() {
    lucide.createIcons();

    $("#darkToggle").click(function() {
      $("body").toggleClass("dark");

      if ($("body").hasClass("dark")) {
        $("#darkToggle").html('<i data-lucide="moon"></i>');
      } else {
        $("#darkToggle").html('<i data-lucide="sun"></i>');
      }

      lucide.createIcons();
    });
  }

  // Initialize functions 
  initHeroTyping();
  initProjectFiltering();
  initDarkToggle();

});
