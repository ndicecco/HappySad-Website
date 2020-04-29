import Swup from 'swup';
const swup = new Swup();

function init() {
  if (document.querySelector('#past-productions')) {
    //musicbox code
    //sounds
    const playArray = document.querySelectorAll('.play'); 
    const restartArray = document.querySelectorAll('.restart'); 
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
    const spineArray = [waltz, ghost, books, train, tube, wobble]
    const danceArray = [jenga, whale, uptown]
    const bestArray = [jingle, halls, away]
    const dissArray = [oceans]
    let fillBar = '';
    let lastClicked = 'word';
    let lastReset = 'word';
    let sound = new Audio();

    //add event listeners to all the musicbox buttons
    function addListeners() {
      for (let j = 0; j < playArray.length; j++) {
        playArray[j].addEventListener("click", playOrPauseSong);
      }
      for (let j = 0; j < restartArray.length; j++) {
        restartArray[j].addEventListener("click", resetSong);
      }
      console.log(playArray);
      console.log(restartArray);
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function playOrPauseSong(d) {
      //d is the id of the controller that was just clicked
      var d = d;
      console.log(d.target.parentElement.id);
      if (isNaN(lastClicked)) {
        //checks to see if this is the first sound you've clicked since loading the page
        //if it is, great! Move on to loading the sound
      } else if (sound.currentTime !== 0 && d == lastClicked && lastReset !== d) {
        //checks if a sound is mid playback AND the sound controller you just clicked is the same as the last one you clicked AND the last reset used is also part of this controller
        //if so, great! Move on to loading the sound
      } else if (sound.currentTime == 0 && d == lastClicked && lastReset == d) {
        //checks if the loaded sound has been reset to 0 AND what you just clicked is the same controller as lastClicked AND what you last reset is the same controller
        //if so, great! Move on to loading the sound
      } else if (sound.currentTime !== 0 && d == lastClicked && lastReset == d && sound.paused == false) {
        //checks if the loaded sound is mid playback AND the justClicked is the same controller as lastClicked AND as lastReset AND the song is not currently paused
        //in this case, you have reset this controller but you played the sound again, so you're probably trying to pause the song
        sound.pause();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
        return;
      } else if (sound.currentTime !== 0 && d == lastClicked && d == lastReset && sound.paused == true) {
        //checks if the loaded sound is mid playback AND the last button you clicked is the same as the last one you reset AND the sound is paused
        //you're probably trying to play the sound you paused after resetting it at least once
        sound.play();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/pause.png');
        return;
      } else {
        //if none of the above is true, then you must have interacted with the play button of a new controller, so we should reset the sound of whatever controller was last used
        resetSong(lastClicked);
      };
      //check if the lastClicked is not the same as what was just clicked
      if (lastClicked !== d) {
        //if true, load a new Audio
        sound = new Audio();
      };
      //set lastClicked to what was just clicked
      //this may be broken now that I've changed what d is
      lastClicked = d;
      if(d.target.parentElement.id == "s0") {
        //if Spine was clicked, load a song from that show
        console.log("Spine");
        var num = getRandomInt(spineArray.length);
        var i = spineArray[num];
      } else if (d.target.parentElement.id == "s6") {
        //if Dancing Lessons was clicked, load a song from that show
        console.log("Dancing Lessons");
        var num = getRandomInt(danceArray.length);
        var i = danceArray[num];
      } else if (d.target.parentElement.id == "s11") {
        //if Dissection was clicked, load a song from that show
        console.log("Dissection");
        var num = getRandomInt(dissArray.length);
        var i = dissArray[num];
      } else if (d.target.parentElement.id == "s11") {
        //if Dissection was clicked, load a song from that show
        console.log("Dissection");
        var num = getRandomInt(dissArray.length);
        var i = dissArray[num];
      } else {
        //default
        return;
      }
      if (sound.readyState == 0) {
        sound = new Audio(i);
        sound.play();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/pause.png');
        sound.addEventListener('timeupdate', function () {
          fillBar = document.getElementById("fill" + d);
          var position = sound.currentTime / sound.duration;
          fillBar.style.width = position * 100 + '%';
        });
      } else if (sound.readyState == 4 && sound.paused) {
        sound.play();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/pause.png');
      } else {
        sound.pause();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
      }
    }

    function resetSong(d) {
      //d is the id of the controller that was just clicked
      lastReset = d;
      if (lastClicked !== lastReset) {
        return;
      }
      if (lastClicked == lastReset) {}
      clearFills();
      sound.pause();
      sound.currentTime = 0;
      document.querySelector('#s' + lastClicked + ' img').setAttribute('src', './assets/img/play.png');
      document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
    }

    function clearFills() {
      for (let i = 0; i < tunes.length; i++) {
        var fillBar = document.getElementById("fill" + i);
        fillBar.style.width = 0;
      };
    }
    //call addListeners
    addListeners();
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