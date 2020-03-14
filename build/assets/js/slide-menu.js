function openSlideMenu() {
    document.getElementById('menu').style.width = '250px';
    document.getElementById('menu').style.opacity = '1';
    document.getElementById('content').style.marginLeft = '250px';
    document.getElementById('hamburger').style.opacity = '0.1';
    
  }
function closeSlideMenu() {
    document.getElementById('menu').style.width = '0';
    document.getElementById('menu').style.opacity = '0';
    document.getElementById('content').style.marginLeft = '0';
    document.getElementById('hamburger').style.opacity = '0.9';
  }