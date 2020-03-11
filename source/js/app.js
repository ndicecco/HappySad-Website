//GSAP Animations
var tl = gsap.timeline();
tl.from(".banner img", {duration: 2, x: 300, y: 300, ease: "back.out(1.7)"}, 0.5);
tl.from(".headline", {duration: 2, opacity: 0}, "1.8");
tl.from(".grid-item-1", {duration: 2, x: -300, y: -300, opacity: 0}, 2);
tl.from(".grid-item-2", {duration: 2, x: 300, y: -300, opacity: 0}, 2.2);
tl.from(".grid-item-3", {duration: 2, x: -300, y: 300, opacity: 0}, 2.4);
tl.from(".grid-item-4", {duration: 2, x: 300, y: 300, opacity: 0}, 2.6);

