//Music player for sound design page
var waltz = "./assets/audio/waltz.wav";
var ghost = "./assets/audio/ghost.wav";
var books = "./assets/audio/books.wav";
var train = "./assets/audio/train.wav";
var tube = "./assets/audio/tube.mp3";
var tunes = [waltz, ghost, books, train, tube];
var fillBar = '';
var lastClicked = 'word';
var lastReset = 'word';
var sound = new Audio();

function playOrPauseSong(d) {
    //d is the id of the controller that was just clicked
    var d = d;
    if (isNaN(lastClicked)) {
        //checks to see if this is the first sound you've clicked since loading the page
        //if it is, great! Move on to loading the sound
    } else if(sound.currentTime !== 0 && d == lastClicked && lastReset !== d) {
        //checks if a sound is mid playback AND the sound controller you just clicked is the same as the last one you clicked AND the last reset used is also part of this controller
        //if so, great! Move on to loading the sound
    } else if(sound.currentTime == 0 && d == lastClicked && lastReset == d) {
        //checks if the loaded sound has been reset to 0 AND what you just clicked is the same controller as lastClicked AND what you last reset is the same controller
        //if so, great! Move on to loading the sound
    } else if(sound.currentTime !== 0 && d == lastClicked && lastReset == d && sound.paused == false){
        //checks if the loaded sound is mid playback AND the justClicked is the same controller as lastClicked AND as lastReset AND the song is not currently paused
        //in this case, you have reset this controller but you played the sound again, so you're probably trying to pause the song
        sound.pause();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
        return;
    } else if(sound.currentTime !== 0 && d == lastClicked && d == lastReset && sound.paused == true){
        //checks if the loaded sound is mid playback AND the last button you clicked is the same as the last one you reset AND the sound is paused
        //you're probably trying to play the sound you paused after resetting it at least once
        sound.play();
        document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/pause.png');
        return;
    } else {
        //if none of the above is true, then you must have interacted with the play button of a new controller, so we should reset the sound of whatever controller was last used
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
    //d is the id of the controller that was just clicked
    lastReset = d;
    if(lastClicked !== lastReset){
        return;
    }
    if(lastClicked == lastReset){
    }
    clearFills();
    sound.pause();
    sound.currentTime = 0;
    document.querySelector('#s' + lastClicked + ' img').setAttribute('src', './assets/img/play.png');
    document.querySelector('#s' + d + ' img').setAttribute('src', './assets/img/play.png');
}

function clearFills() {
    for (let i = 0; i < tunes.length; i++) {
        var fillBar = document.getElementById("fill" + i);
        fillBar.style.width = 0;   
    };
}