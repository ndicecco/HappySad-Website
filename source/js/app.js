import Swup from 'swup';
const swup = new Swup();

//GSAP Animations
var tl = gsap.timeline();
tl.from(".headline", {duration: 2, opacity: 0}, "0.8");
tl.from(".grid-item-1", {duration: 1, x: -5, y: -5, opacity: 0}, 0);
tl.from(".grid-item-2", {duration: 1, x: 5, y: -5, opacity: 0}, 0.2);
tl.from(".grid-item-3", {duration: 1, x: -5, y: 5, opacity: 0}, 0.4);
tl.from(".grid-item-4", {duration: 1, x: 5, y: 5, opacity: 0}, 0.6);