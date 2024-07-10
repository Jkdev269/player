const startplay=document.getElementById("play-pause")
const startprev=document.getElementById("prev")
const startnext=document.getElementById("next")
const volumeup=document.getElementById('volumeUp')
const volumedown=document.getElementById('volumeDown')
const musictitle=document.getElementById('music_title')
const musicartist=document.getElementById('music_artist')
const musicimg=document.getElementById('cover')
const currentTimeDisplay = document.getElementById('currentTime'); // Display current time
const totalDurationDisplay = document.getElementById('totalDuration'); // Display total duration
const seekSlider = document.getElementById('seekSlider');
const rotatingImage = document.querySelector('#cover');
const songs=[
    {
        path:"music/01 Zihaal e Miskin (Video) Javed-Mohsin  Vishal Mishra, Shreya Ghoshal  Rohit Z, Nimrit A  Kunaal V.mp3",
        img:"img/01.jpg",
        title:"Zihaal e Miskin",
        artist:"Vishal Mishra"
    },
    {
        path:"music/02 Thoda Thoda Pyaar  Sidharth Malhotra,Neha SharmaStebin Ben,Nilesh Ahuja,KumaarZee Music Originals.mp3",
        img:"img/02.jpg",
        title:"Thoda Thoda Pyaar",
        artist:"Stebin Ben"
    },
    {
        path:"music/03 Tainu Khabar Nahi  Munjya  Sharvari, Abhay Verma Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya.mp3",
        img:"img/03.jpg",
        title:"Tainu Khabar Nahi",
        artist:"Arijit Singh"
    },
    {
        path:"music/04 Official Video_ Humnava Mere Song  Jubin Nautiyal  Manoj Muntashir  Rocky - Shiv  Bhushan Kumar.mp3",
        img:"img/04.jpg",
        title:"Humnava Mere Song",
        artist:"Jubin Nautiyal"
    },
    {
        path:"music/05 Chitthi Video Song  Feat. Jubin Nautiyal & Akanksha Puri  Kumaar  New Song 2019  T-Series.mp3",
        img:"img/05.jpg",
        title:"Chitthi",
        artist:"Jubin Nautiyal"
    }
    

]
let musicindex=0;
const music=new Audio(songs[musicindex].path);

function updateinfo(){
    musicimg.src=songs[musicindex].img;
    musictitle.innerText=songs[musicindex].title;
    musicartist.innerText=songs[musicindex].artist

}

// playing music
function playmusic(){
    if(music.paused){
        console.log("playsong")
        music.play()
        startplay.classList.replace('fa-play','fa-pause');
        updateinfo()
        rotatingImage.style.animationPlayState = 'running';
    }
}

//  pause music
function pausemusic(){
    if(!music.paused){
        console.log("pause song")
        music.pause();
        updateinfo()
        startplay.classList.replace('fa-pause','fa-play');
        updateinfo()
        rotatingImage.style.animationPlayState = 'paused'; 
    }
}

//  show timeing how much time increase current time 
function updateTimeDisplay() {
    const currentMinutes = Math.floor(music.currentTime / 60);
    const currentSeconds = Math.floor(music.currentTime % 60);
    const totalMinutes = Math.floor(music.duration / 60);
    const totalSeconds = Math.floor(music.duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalDurationDisplay.textContent = `${totalMinutes}:${totalSeconds}`;

    // Update seek slider value
    seekSlider.value = music.currentTime;
    seekSlider.max = music.duration;
}

function seekTo(seekValue) {
    music.currentTime = seekValue;
}

//  event listener of play and pause
startplay.addEventListener('click',()=>{
    if(music.paused){
        playmusic();
    }
    else{
    pausemusic();
}
})

// event listener of next song play
startnext.addEventListener('click',()=>{
    pausemusic()
    musicindex=(musicindex+1)%songs.length;
    music.src=songs[musicindex].path;
    playmusic();
})

// event listener of previous song play

startprev.addEventListener('click',()=>{
    pausemusic()
    musicindex=(musicindex-1)%songs.length;
    music.src=songs[musicindex].path;
    playmusic();
})

// event listener of nextsong automatic play
music.addEventListener('ended',()=>{
    pausemusic()
    musicindex=(musicindex+1)%songs.length;
    music.src=songs[musicindex].path;
    playmusic();
})

// event listener of volumeup increase
volumeup.addEventListener('click',() =>{
    if(music.volume < 1.0){
        music.volume = Math.min(1.0,music.volume + 0.1);
        console.log(`Volume increased to ${music.volume}`);
    }
})

// event listener of volumedown decrease
volumedown.addEventListener('click',()=>{
    if(music.volume > 0.0){
        music.volume = Math.max(0.0,music.volume - 0.1);
        console.log(`Volume decreased to ${music.volume}`);
    }
})

seekSlider.addEventListener('input', () => {
    seekTo(seekSlider.value);
});

music.addEventListener('timeupdate', () => {
    updateTimeDisplay();
});


