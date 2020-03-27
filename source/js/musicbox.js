//Music player for sound design page
var waltz = "./assets/audio/waltz.wav"
var fillBar = document.getElementById("fill");
var sound = new Audio("./assets/audio/waltz.wav");

function playOrPauseSong() {
    if (sound.paused) {
        sound.play();
        document.querySelector('#play img').setAttribute('src', './assets/img/pause.png');
    } else {
        sound.pause();
        document.querySelector('#play img').setAttribute('src', './assets/img/play.png');
    }
}

sound.addEventListener('timeupdate', function () {

    var position = sound.currentTime / sound.duration;

    fillBar.style.width = position * 100 + '%';
});
