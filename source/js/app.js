import Swup from 'swup';
const swup = new Swup();

function init() {
  //global variables
  let sound = new Audio();
  let currentIndex = 0;
  let currentId = '';

  //global functions


  //module-specific functions
  //to run when magnific-popup opens a page with a sound design player
  function openLightbox(thing) {
    //read-only variables
    const playArray = document.querySelectorAll('.play');
    const nextArray = document.querySelectorAll('.restart');
    const thisBox = thing;

    //sounds
    const waltz = "./assets/audio/waltz.wav";
    const ghost = "./assets/audio/ghost.wav";
    const books = "./assets/audio/books.wav";
    const train = "./assets/audio/train.wav";
    const tube = "./assets/audio/tube.mp3";
    const wobble = "./assets/audio/wobble.wav";
    const jenga = "./assets/audio/jenga.wav";
    const whale = "./assets/audio/whale.wav";
    const uptown = "./assets/audio/uptown.wav";
    const jingle = "./assets/audio/jingle.mp3";
    const halls = "./assets/audio/halls.mp3";
    const away = "./assets/audio/away.mp3";
    const oceans = "";
    const spineArray = [waltz, ghost, books, train, tube, wobble];
    const danceArray = [jenga, whale, uptown];
    const bestArray = [jingle, halls, away];
    const dissArray = [oceans];

    //variables
    let currentArray = spineArray;

    if (document.querySelector('#soundbox')) {
      //add event listeners to all the musicbox buttons
      function addListeners() {
        for (let j = 0; j < playArray.length; j++) {
          playArray[j].addEventListener("click", togglePlay);
        }
        for (let j = 0; j < nextArray.length; j++) {
          nextArray[j].addEventListener("click", nextSong);
        }
      }

      function preloadAudio() {
        var i = currentArray[currentIndex];
        sound = new Audio(i);
        sound.pause();
      }

      function setPlayIcons(icon) {
        //grab all the play buttons
        let playButtons = document.querySelectorAll('.play');
        //go through each icon and set it to the icon argument
        for (let i = 0; i < playButtons.length; i++) {
          let v = playButtons[i].id;
          //set the play button icon to the pause symbol
          document.querySelector('#' + v + ' img').setAttribute('src', './assets/img/' + icon + '.png');
        }
      }

      function setArray(w) {
        //set the currentArray to the correct array
        currentId = w.currItem.el[0].id;
        currentArray = whichArray(currentId);
      }

      function whichArray(d) {
        switch (d) {
          case 'spine':
          case 's0':
            return spineArray;
          case 'best':
          case 's3':
            return bestArray;
          case 'dance':
          case 's6':
            return danceArray;
          case 'diss':
          case 's11':
            return dissArray;
          default:
            console.log("array switcher broke")
            break;
        }
      }

      function togglePlay(e) {
        //add a listener to the escape button
        let escButton = document.querySelector('.mfp-close');
        escButton.addEventListener("click", escSound);
        //turn the play icon into a pause icon
        toggleIcon(e);
        //update the title
        updateTitle();
        //load the audio
        return sound.paused ? sound.play() : sound.pause();
      };

      function toggleIcon(e) {
        // d is the id of the controller that was just clicked
        let d = e.target.parentElement.id;
        return sound.paused ? document.querySelector('#' + d + ' img').setAttribute('src', './assets/img/pause.png') : document.querySelector('#' + d + ' img').setAttribute('src', './assets/img/play.png');
      }

      function nextSong(e) {
        //pause the current sound
        sound.pause();
        //add 1 to the current index
        currentIndex++;
        //if the current index now exceeds the length of the current array, set it back to 0
        if (currentIndex >= currentArray.length) {
          currentIndex = 0;
        }
        // load the new sound
        let i = currentArray[currentIndex];
        sound = new Audio(i);
        //play the new sound
        sound.play();
        //set play icons to
        setPlayIcons('pause');
        //update the title
        updateTitle();
      }

      function updateTitle() {
        // animate the title to 0 opacity
        gsap.to('.showtitle h4', {
          duration: 0.5,
          opacity: 0,
          onComplete: titleSwap
        });
        //change the title
        function titleSwap() {
          let element = document.querySelector(".showtitle h4");
          element.innerHTML = (currentIndex + 1) + " / " + (currentArray.length);
          //animate the new title back in
          gsap.to('.showtitle h4', {
            duration: 0.5,
            opacity: 1
          });
        }

      }

      function audioInit() {
        //call addListeners
        addListeners();
        setArray(thisBox);
        preloadAudio();
      }

      //initialize audio
      audioInit();

      //end of if(#soundbox) statement
    }
    //end of openLightbox function
  }

  //to run when mfp closes a page
  function escSound() {
    //set all the play button icons to play
    //grab all the play buttons
    let playButtons = document.querySelectorAll('.play');
    //go through each icon and set it to the icon argument
    for (let i = 0; i < playButtons.length; i++) {
      let v = playButtons[i].id;
      //set the play button icon to the pause symbol
      document.querySelector('#' + v + ' img').setAttribute('src', './assets/img/play.png');
    }
    //reset the title
    let element = document.querySelector(".showtitle h4");
    element.innerHTML = "Sound Design Samples";
    //pause the sound
    sound.pause();
    //reset the current sounds current time to 0
    sound.currentTime = 0;
    //reset the current index to 0
    currentIndex = 0;
  }

  if (document.querySelector('#portfolio-selector')) {
    //Portfolio Navigation
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

    //add event listeners to all the nav links
    function addListeners() {
      for (let j = 0; j < navArray.length; j++) {
        navArray[j].addEventListener("click", showMe);
      }
    }

    //function to hide the currently displayed portfolio items and to display the ones indicated by the selected nav link
    function showMe() {
      //grab the id and class of whatever was just clicked
      justClicked = this.id;
      let navClicked = this.parentElement.id
      // Loop through the nav and add the active class to the current/clicked button while removing it from all others
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      }


      // animate the paperwork gallery to 0 opacity
      gsap.to('#paperwork-gallery', {
        duration: 1,
        opacity: 0
      });
      //animate the full show grid to 0 opacity
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
      //after the show grid is at opacity 0, set it to display none and then set the selected portfolio to display initial
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
    //call function to add the event listeners
    addListeners();
    //end of portfolio selector
  }
  if (document.querySelector('.papercon')) {
    // pop-up gallery for the paperwork grid
    //initialize baguetteBox
    baguetteBox.run('.papercon');
  }
  if (document.querySelector('.showcon')) {
    // pop-up gallery for the show grid
    //initialize magnific pop-up
    $(document).ready(function () {
      $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true,
        callbacks: {
          open: function () {
            openLightbox(this);
          },
          close: function () {
            escSound();
          }
          // e.t.c.
        }
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