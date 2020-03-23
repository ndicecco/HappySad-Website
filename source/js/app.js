//GSAP Animations
var tl = gsap.timeline();
tl.from(".headline", {duration: 2, opacity: 0}, "1.8");
tl.from(".grid-item-1", {duration: 0.5, x: -10, y: -10, opacity: 0}, 2);
tl.from(".grid-item-2", {duration: 0.5, x: 10, y: -10, opacity: 0}, 2.2);
tl.from(".grid-item-3", {duration: 0.5, x: -10, y: 10, opacity: 0}, 2.4);
tl.from(".grid-item-4", {duration: 0.5, x: -100, y: 10, opacity: 0}, 2.6);

