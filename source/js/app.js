import Swup from 'swup';
const swup = new Swup();

function init() {
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
  if (document.querySelector('#paperwork')) {
    //Paperwork Gallery
    const bigBox = document.querySelector('.bigbox');
    const bigPaper = document.querySelector('.bigpaper img');
    const bigPaperDiv = document.querySelector('.bigpaper');
    const docArray = document.querySelectorAll('.paper img');
    const blurBox = document.querySelector('.blur');
    const wrapper = document.querySelector('.wrapper');
    const screenWidth = window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth;
    let paperSource = '';

    function addListeners() {
      for (let j = 0; j < docArray.length; j++) {
        docArray[j].addEventListener("click", embiggen);
      }
    }

    function embiggen() {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
      paperSource = this.getAttribute('src');
      bigPaper.src = paperSource;
      bigBox.style.display = 'inherit';

      if (bigPaper.naturalWidth > bigPaper.naturalHeight) {
        console.log(' ' + bigPaper.naturalWidth + ' ' + bigPaper.naturalHeight);
        console.log(' ' + bigPaper.clientWidth + ' ' + bigPaper.clientHeight);
      }
      if (screenWidth <= 690) {
        console.log(screenWidth);
        bigBox.style.minWidth = '0px';
        bigBox.style.width = screenWidth + 'px';
        bigPaperDiv.style.border = 'none';
        wrapper.classList.add('.blur');
        bigBox.addEventListener("click", shrink);
        return;
      }
      blurBox.style.display = 'inherit';
      blurBox.addEventListener("click", shrink);
    }

    function shrink() {
      bigBox.style.display = 'none';
      if (screenWidth <= 690) {
        bigBox.removeEventListener("click", shrink);
        return;
      }
      blurBox.style.display = 'none';
      blurBox.removeEventListener("click", shrink);
    }

    addListeners();
    //end Paperwork Gallery
  }
}

//initialize scripts
init();

// this event runs for every page view after initial load
swup.on('contentReplaced', init);