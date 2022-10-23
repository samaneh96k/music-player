const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const currentTimeElm = document.getElementById("current-time");
const durationElm = document.getElementById("duration");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
//music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design"
  },
  {
    name: "jacinto-2",
    displayName: "Electric Chill Machine(remix)",
    artist: "Jacinto Design"
  },
  {
    name: "jacinto-3",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design"
  },
  {
    name: "metric-1",
    displayName: "Electric Chill Machine",
    artist: "metric Design"
  }
];
//Check if Playing
let isPlaying = false;
//play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};
//pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

//Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
//update Dom

const loadSong = song => {
  title.textContent = song.displayName;
  artist.innerText = song.artist;
  music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    music.volume="0.1"
};
//Current Song
let songIndex = 0;
//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//On Load -Select First Song
loadSong(songs[songIndex]);
//Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //update progress bar width
    const progressPercent = currentTime / duration * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }

    //Delay switching duration Element
    if (durationSec) {
      durationElm.textContent = `${durationMin}:${durationSec}`;
    }
    //Calculate display for current
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    currentTimeElm.textContent = `${currentMin}:${currentSec}`;
  }
}
//Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = clickX / width * duration;
}
//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
