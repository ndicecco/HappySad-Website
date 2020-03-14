const hamburger = document.querySelector('.slide');

function openSlideMenu() {
    document.getElementById('menu').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
    hamburger.classList.toggle("open");
  }
function closeSlideMenu() {
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
  }