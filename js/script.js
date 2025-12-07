$(document).ready(function() {

  //Hero IMG
  function initChangeSavanaImg() {
  const images = [
    "assets/savanaimg1.png",
    "assets/savanaimg2.png",
    "assets/savanaimg3.png"
  ];
  let currentIndex = 0;

  $("#Savana-img").click(function() {
    const img = $(this);
    currentIndex = (currentIndex + 1) % images.length;

    img.fadeOut(200, function() {
      img.attr("src", images[currentIndex]).fadeIn(100, function() {
        img.animate({ top: "-15px" }, 150)  
           .animate({ top: "0px" }, 150); 
      });
    });
  });
}


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
  
  // Nav bar menu 
  function initActiveNav() {    
    const currentPath = window.location.pathname;
    $("#navbar .nav-link").each(function () {
    const linkPath = $(this).attr("href");
    if (linkPath === currentPath || linkPath === currentPath.split("/").pop()) {
      $(this).addClass("active"); 
    } else {
      $(this).removeClass("active");
    }
  });
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

    // saves changes
    if (localStorage.getItem("theme") === "dark") {
      $("body").addClass("dark");
      $("#darkToggle").html('<i data-lucide="moon"></i>');
    } else {
      $("body").removeClass("dark");
      $("#darkToggle").html('<i data-lucide="sun"></i>');
    }
    lucide.createIcons();

    $("#darkToggle").click(function() {
      const body = $("body");

      body.addClass("transition-on-toggle");

      body.toggleClass("dark");

      if (body.hasClass("dark")) {
        $("#darkToggle").html('<i data-lucide="moon"></i>');
        localStorage.setItem("theme", "dark");
      } else {
        $("#darkToggle").html('<i data-lucide="sun"></i>');
        localStorage.setItem("theme", "light");
      }

      lucide.createIcons();
      setTimeout(() => body.removeClass("transition-on-toggle"), 300);
    });
  }



  // Initialize functions 
  initChangeSavanaImg()
  initHeroTyping();
  initActiveNav(); 
  initProjectFiltering();
  initDarkToggle();

});
