import Swup from 'swup';
const swup = new Swup();

function init() {
  if (document.querySelector('#portfolio-selector')) {
    const navArray = document.querySelectorAll('.portfolio-menu a');
    const btnContainer = document.querySelector('.portfolio-menu');
    const btns = btnContainer.getElementsByClassName('port-btn');
    const showArray = document.querySelectorAll('.show');
    const smArray = document.querySelectorAll('.sm');
    const pmArray = document.querySelectorAll('.pm');
    const sdArray = document.querySelectorAll('.sd');
    const pwGallery = document.querySelector('#paperwork-gallery');
    const pastPro = document.querySelector('#past-productions-title');

    let justClicked = '';

    //hide the paperwork gallery
    pwGallery.style.display = 'none';

    function addListeners() {
      for (let j = 0; j < navArray.length; j++) {
        navArray[j].addEventListener("click", showMe);
      }
    }

    function showMe() {
      //grab the id and class of whatever was just clicked
      justClicked = this.id;


      // Loop through the nav and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      }

      gsap.to('#paperwork-gallery', {
        duration: 1,
        opacity: 0
      });
      //animate show grid items to 0 opacity
      gsap.to('.show', {
        duration: 1,
        opacity: 0,
        stagger: {
          grid: [7, 3],
          from: 11,
          ease: "power3.in",
          amount: 0.5
        },
        onComplete: switchIt,
        onCompleteParams: [justClicked]
      });

      function switchIt(justClicked) {
        //reset all of the show grid items to display: none
        for (var i = 0; i < showArray.length; i++) {
          showArray[i].style.display = 'none';
        }
        //make sure that past productions title is visible
        pastPro.style.opacity = '1';
        //hide the paperwork gallery
        pwGallery.style.display = 'none';
        //display based on which link was click
        switch (justClicked) {
          case 'all':
            for (var i = 0; i < showArray.length; i++) {
              showArray[i].style.display = 'initial';
            }
            gsap.to('.show', {
              duration: 1,
              opacity: 1
            });
            break;
          case 'sm':
            for (var i = 0; i < smArray.length; i++) {
              smArray[i].style.display = 'initial';
            }
            gsap.to('.sm', {
              duration: 1,
              opacity: 1
            });
            break;
          case 'pm':
            for (var i = 0; i < pmArray.length; i++) {
              pmArray[i].style.display = 'initial';
            }
            gsap.to('.pm', {
              duration: 1,
              opacity: 1
            });
            break;
          case 'sd':
            for (var i = 0; i < sdArray.length; i++) {
              sdArray[i].style.display = 'initial';
            }
            gsap.to('.sd', {
              duration: 1,
              opacity: 1
            });
            break;
          case 'pw':
            pastPro.style.opacity = '0';
            pwGallery.style.display = 'initial';
            gsap.to('#paperwork-gallery', {
              duration: 1,
              opacity: 1
            });
            break;

          default:
            break;
        }
      }


    }

    addListeners();
    //end of portfolio selector
  }
  if (document.querySelector('.papercon')) {
    //initialize baguetteBox
    baguetteBox.run('.papercon');
    //magnific pop-up
    $(document).ready(function () {
      $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
      });
    });
  }
  if (document.querySelector('#content')) {
    //sidebar slide menu
    const slideArray = document.querySelectorAll('.nav-links a');
    const close = document.querySelector('.close');
    const slide = document.querySelector('.slide a');

    function addListeners() {
      for (let j = 0; j < slideArray.length; j++) {
        slideArray[j].addEventListener("click", closeSlideMenu);
      }
      close.addEventListener("click", closeSlideMenu);
      slide.addEventListener("click", openSlideMenu);
    }

    function openSlideMenu() {
      document.getElementById('menu').style.width = '300px';
      document.getElementById('menu').style.opacity = '1';
      document.getElementById('content').style.marginLeft = '300px';
      document.getElementById('hamburger').style.opacity = '0.1';
      if (document.querySelector('#hl')) {
        document.getElementById('hl').style.opacity = '0';
      }
      if (document.querySelector('#hlhs')) {
        document.getElementById('hlhs').style.opacity = '0';
      }
    }

    function closeSlideMenu() {
      document.getElementById('menu').style.width = '0';
      document.getElementById('menu').style.opacity = '0';
      document.getElementById('content').style.marginLeft = '0';
      document.getElementById('hamburger').style.opacity = '0.9';
      if (document.querySelector('#hl')) {
        document.getElementById('hl').style.opacity = '1';
      }
      if (document.querySelector('#hlhs')) {
        document.getElementById('hlhs').style.opacity = '1';
      }
    }
    addListeners();
    //end sidebar slide menu
  }
  if (document.querySelector('#happynav')) {
    //happysad page navigation
    const navArray = document.querySelectorAll('#happynav a');
    let justClicked = '';
    let currentSection = '';

    function addListeners() {
      for (let j = 0; j < navArray.length; j++) {
        navArray[j].addEventListener("click", reveal);
      }
    }

    function reveal() {
      justClicked = this.hash;
      if (!currentSection) {
        //if currentSection is null, make it justClicked and display it
        currentSection = document.querySelector(justClicked);
        currentSection.style.display = 'inherit';
      } else if (currentSection !== justClicked) {
        //if currentSection equals anything else, make it disappear, then make it equal to what was justClicked and display that
        currentSection.style.display = 'none';
        currentSection = document.querySelector(justClicked);
        currentSection.style.display = 'inherit';
      } else {
        //did you just click on the section you've already displayed? Silly billy
        return;
      }
    }

    addListeners();
    //end HappyNav
  }

}

//initialize scripts after document loads
init();

// this event runs for every page view after initial load
swup.on('contentReplaced', init);