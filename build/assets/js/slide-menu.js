function openSlideMenu() {
  document.getElementById('menu').style.width = '300px';
  document.getElementById('menu').style.opacity = '1';
  document.getElementById('content').style.marginLeft = '300px';
  document.getElementById('hamburger').style.opacity = '0.1';
  document.getElementById('hl').style.opacity = '0';
}
function closeSlideMenu() {
  document.getElementById('menu').style.width = '0';
  document.getElementById('menu').style.opacity = '0';
  document.getElementById('content').style.marginLeft = '0';
  document.getElementById('hamburger').style.opacity = '0.9';
  document.getElementById('hl').style.opacity = '1';
}