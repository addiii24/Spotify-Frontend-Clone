// Song list (update with your actual file names and details)
const songs = [
  {
    title: "Saiyaara",
    artist: "Tanishk Bagchi, Faheem Abdullah, Arslan Nizami, Irshad Kamil",
    file: "Songs/Barbaad Saiyaara 128 Kbps.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02a7e251b543c77a6ed356dfbe"
  },
  {
    title: "Sahiba",
    artist: "Aditya Rikhari",
    file: "Songs/Sahiba - (Raag.Fm).mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e020a47bbe7141fdfe0eb2cdba7"
  },
  {
    title: "Monica",
    artist: "Anirudh Ravichander, Asal Kolaar, Vishnu Edavan",
    file: "Songs/Monica-MassTamilan.dev.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e0225fa8e214ad888b7d291f25e"
  },
  {
    title: "Mere Murshid Mere Yaara",
    artist: "Vishal Mishra, SALMAN Ali, Jaani",
    file: "Songs/Mere Murshid Mere Yaara - (Raag.Fm).mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e024158732b9fa29d31b13f1bb9"
  },
  {
    title: "Sirra",
    artist: "Guru Randhawa, Kiran Bajwa, Rony Ajnali",
    file: "Songs/Sirra - Guru Randhawa.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02bd7e1592d75a9ad8d211debd"
  },
  {
    title: "Dhun",
    artist: "Mithoon, Arijit Singh",
    file: "Songs/Dhun Saiyaara 128 Kbps.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02781faf59a3cb980fe3b493f8"
  },
  {
    title: "Bas Ek Dhun",
    artist: "Shreya Ghosal, Jubin Nautiyal, Javed-Mohsin, Rashmi Virag",
    file: "Songs/Bas Ek Dhadak - (Raag.Fm).mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e0259803e4a4a30dcf55464d882"
  },
  {
    title: "Barbad",
    artist: "The Rish, Jubin Nautiyal",
    file: "Songs/Title Track Saiyaara 128 Kbps.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02148a06ae24e68c088d8d2954"
  },
  {
    title: "Ehsaas",
    artist: "Fahim Abdullah, Duha Shah, Vaibhav Pani, Hyder Dar",
    file: "Songs/Ehsaas Faheem Abdullah 128 Kbps.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02e80fd38e3f7025158e40a3ae"
  },
  {
    title: "Heer",
    artist: "Ali&Shjr, Haider Ali, Ali Raza",
    file: "Songs/Heer Haider Ali 128 Kbps.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02096e2a4581cab7a4bba393c3"
  },
  {
    title: "Together",
    artist: "Shubh",
    file: "Songs/Together - Shubh.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02f78ef2cf0e69e27c41bbe127"
  }
];

let currentSong = 0;
let isPlaying = false;
let isLoop = false;
let isShuffle = false;
let audio = new Audio();

// DOM elements
const playBtn = document.querySelector('img[alt="play button"]');
const nextBtn = document.querySelector('img[alt="next button"]');
const prevBtn = document.querySelector('img[alt="previous button"]');
const shuffleBtn = document.querySelector('img[alt=""]'); // first blank alt is shuffle
const loopBtn = document.querySelector('img[alt=""]:nth-of-type(5)'); // fifth blank alt is loop
const songInfo = document.querySelector('.songinfo');
const songTime = document.querySelector('.songtime');
const cardImages = document.querySelectorAll('.card img');
const playbar = document.querySelector('.playbar');

// Add cover image and controls to playbar
let coverImg = document.createElement('img');
coverImg.className = 'playbar-cover';
coverImg.style.width = '48px';
coverImg.style.height = '48px';
coverImg.style.objectFit = 'cover';
coverImg.style.borderRadius = '8px';
coverImg.style.marginRight = '12px';
let controlsDiv = document.createElement('div');
controlsDiv.className = 'playbar-controls';
controlsDiv.style.display = 'flex';
controlsDiv.style.alignItems = 'center';
controlsDiv.style.gap = '8px';

// Mute/volume controls
let muteBtn = document.createElement('button');
muteBtn.textContent = '🔇';
muteBtn.className = 'mute-btn';
let volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = 0;
volumeSlider.max = 1;
volumeSlider.step = 0.01;
volumeSlider.value = 1;
volumeSlider.style.width = '80px';
controlsDiv.appendChild(muteBtn);
controlsDiv.appendChild(volumeSlider);

// Seek bar
let seekBar = document.createElement('input');
seekBar.type = 'range';
seekBar.min = 0;
seekBar.max = 100;
seekBar.value = 0;
seekBar.className = 'seek-bar';
seekBar.style.width = '180px';
controlsDiv.appendChild(seekBar);

// Insert cover and controls in playbar
playbar.insertBefore(coverImg, playbar.firstChild);
playbar.appendChild(controlsDiv);

// Wrap song info
songInfo.style.whiteSpace = 'nowrap';
songInfo.style.overflow = 'hidden';
songInfo.style.textOverflow = 'ellipsis';
songInfo.style.maxWidth = '180px';

// Toggle effect for playbar buttons
function toggleActive(btn) {
  btn.classList.toggle('active');
  setTimeout(() => btn.classList.remove('active'), 200);
}

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songInfo.textContent = `${song.title} - ${song.artist}`;
  coverImg.src = song.cover;
  updateTimerBar(0, audio.duration || 0);
  seekBar.value = 0;
}

function playSong() {
  audio.play();
  isPlaying = true;
  updatePlaybar();
  toggleActive(playBtn);
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  updatePlaybar();
  toggleActive(playBtn);
}

function nextSong() {
  if (isShuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  playSong();
  toggleActive(nextBtn);
}

function prevSong() {
  if (isShuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
  }
  loadSong(currentSong);
  playSong();
  toggleActive(prevBtn);
}

function toggleLoop() {
  isLoop = !isLoop;
  audio.loop = isLoop;
  toggleActive(loopBtn);
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  toggleActive(shuffleBtn);
}

function updatePlaybar() {
  if (isPlaying) {
    playBtn.style.opacity = 1;
  } else {
    playBtn.style.opacity = 0.5;
  }
}

function updateTimerBar(current, duration) {
  if (!isPlaying || !audio.src) {
    songTime.textContent = '';
    seekBar.value = 0;
    return;
  }
  let min = Math.floor(current / 60);
  let sec = Math.floor(current % 60);
  let minT = Math.floor(duration / 60);
  let secT = Math.floor(duration % 60);
  songTime.textContent = `${min}:${sec.toString().padStart(2, '0')} / ${minT}:${secT.toString().padStart(2, '0')}`;
  seekBar.value = duration ? (current / duration) * 100 : 0;
}

audio.addEventListener('timeupdate', () => {
  updateTimerBar(audio.currentTime, audio.duration);
});

seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔈' : '🔇';
  toggleActive(muteBtn);
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('ended', () => {
  if (isLoop) {
    playSong();
  } else {
    nextSong();
  }
});

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
shuffleBtn.addEventListener('click', toggleShuffle);
loopBtn.addEventListener('click', toggleLoop);

cardImages.forEach((img, idx) => {
  img.addEventListener('click', () => {
    currentSong = idx;
    loadSong(currentSong);
    playSong();
  });
});

// Initial state
loadSong(currentSong);
updatePlaybar();


