//Music player for sound design page
var waltz = "./assets/audio/waltz.wav";
var ghost = "./assets/audio/ghost.wav";
var books = "./assets/audio/books.wav";
var train = "./assets/audio/train.wav";
var tube = "./assets/audio/tube.mp3";
var tunes = [waltz, ghost, books, train, tube];
var fillBar = '';
var lastClicked = 'word';
var sound = new Audio();

function playOrPauseSong(d) {
    var d = d;
    if (isNaN(lastClicked)) {
        console.log("not a number");
    } else if(sound.currentTime !== 0 && d == lastClicked) {
        console.log("song is playing");
    } else {
        resetSong(lastClicked);
    };
    if (lastClicked !== d) {
        sound = new Audio();
    };
    lastClicked = d;
    var i = tunes[d];
    if (sound.readyState == 0) {
        sound = new Audio(i);
        sound.play();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/pause.png');
        sound.addEventListener('timeupdate', function () {
            fillBar = document.getElementById("fill" + d);
            var position = sound.currentTime / sound.duration;
            fillBar.style.width = position * 100 + '%';
        });
    } else if (sound.readyState == 4 && sound.paused) {
        sound.play();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/pause.png');
    } else {
        sound.pause();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
    }
}

function resetSong(d) {
    sound.pause();
    sound.currentTime = 0;
    document.querySelector('#s' + lastClicked + ' img').setAttribute('src', './assets/img/play.png');
    document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
}