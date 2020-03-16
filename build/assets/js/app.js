import Highway from '@dogstudio/highway';
import Fade from './transition';

//GSAP Animations
var tl = gsap.timeline();
tl.from(".headline", {duration: 3, opacity: 0}, "0.5");
tl.from(".grid-item-1", {duration: 2, x: -50, y: -50, opacity: 0}, 0);
tl.from(".grid-item-2", {duration: 2, x: 50, y: -50, opacity: 0}, 0.2);
tl.from(".grid-item-3", {duration: 2, x: -50, y: 50, opacity: 0}, 0.4);
tl.from(".grid-item-4", {duration: 2, x: 50, y: 50, opacity: 0}, 0.6);

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});