import Swup from 'swup';
const swup = new Swup();


function init() {
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