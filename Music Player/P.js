const songs = [
    {
        name: "Song 1",
        info: "Artist 1 - Album 1",
        src: "audio/mpeg1.mp3",
        img: "media/img1.jpg"
    },
    {
        name: "Song 2",
        info: "Artist 2 - Album 2",
        src: "audio/mpeg2.mp3",
        img: "media/img2.jpg"
    },
    {
        name: "Song 3",
        info: "Artist 3 - Album 3",
        src: "audio/mpeg3.mp3",
        img: "media/img3.jpg"
    }
];

let currentIndex = 0;

const audio = document.getElementById('song');
const musicName = document.getElementById('music-name');
const musicInfo = document.getElementById('music-info');
const songImg = document.getElementById('song-img');

const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

function loadSong(index) {
    const song = songs[index];
    musicName.textContent = song.name;
    musicInfo.textContent = song.info;
    audio.src = song.src;
    songImg.src = song.img + "?t=" + new Date().getTime();  
    audio.load();
}

// Function to toggle play/pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
    } else {
        audio.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    }
}

// Sync play/pause button with audio state
audio.addEventListener('play', () => {
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
});

audio.addEventListener('pause', () => {
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
});

// Play/pause button event listener
playButton.addEventListener('click', togglePlayPause);

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    console.log("Next Song:", songs[currentIndex].name, "Image:", songs[currentIndex].img);
    loadSong(currentIndex);
    audio.play();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
});

// Automatically play the next song when the current song ends
audio.addEventListener('ended', () => {
    nextButton.click();
});

// Load the first song initially
loadSong(currentIndex);