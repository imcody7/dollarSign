document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startBtn = document.getElementById('startBtn');
    const introContainer = document.querySelector('.intro-container');
    const playerContainer = document.getElementById('playerContainer');
    const logo = document.getElementById('logo');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const trackTitle = document.getElementById('trackTitle');
    const albumName = document.getElementById('albumName');
    const albumArt = document.getElementById('albumArt');
    const playlistEl = document.getElementById('playlist');

    // State
    let isPlaying = false;
    let currentTrackIndex = 0;

    // Playlist with local files and album art
    const playlist = [
        { title: "I Guess", artist: "KR$NA", album: "Single", url: "audio/i_guess.mp3", art: "images/I_Guess_Krsna.jpg" },
        { title: "Joota Japani", artist: "KR$NA ft. Umair", album: "Single", url: "audio/joota_japani.mp3", art: "images/Joota_Japani_KRsNA.webp" },
        { title: "No China", artist: "Raftaar ft. KR$NA", album: "Hard Drive Vol. 1", url: "audio/no_china.mp3", art: "images/No_China.jpg" },
        { title: "Woh Raat", artist: "Raftaar ft. KR$NA", album: "Single", url: "audio/woh_raat.mp3", art: "images/maina-art.png" },
        { title: "Freeverse Feast", artist: "KR$NA", album: "Single", url: "audio/Freeverse_Feast.mp3", art: "images/Freeverse_Feast_Krsna.jpg" },
        { title: "Prarthna", artist: "KR$NA Prod. Bharg", album: "Far From Over", url: "audio/PRARTHANA.mp3", art: "images/far-from-over.webp" },
        { title: "Some Of Us", artist: "KR$NA ft. AR Praisly", album: "Far From Over", url: "audio/SOME-PEOPLE.mp3", art: "images/far-from-over.webp" },
        { title: "Wanna Know", artist: "KR$NA", album: "Far From Over", url: "audio/WANNA-KNOW.mp3", art: "images/far-from-over.webp" },
        { title: "Still Standing", artist: "KR$NA", album: "Far From Over", url: "audio/STILL-STANDING.mp3", art: "images/far-from-over.webp" },
        { title: "Hola Amigos", artist: "KR$NA ft. Seedhe Maut, Umair", album: "Far From Over", url: "audio/Hola_Amigos.mp3", art: "images/far-from-over.webp" },
        { title: "Khatta Flow", artist: "Seedhe Maut ft. KR$NA", album: "Lunch Break", url: "audio/khatta-flow.mp3", art: "images/lunch-break-khatta.webp" },
        { title: "Kaha Tak", artist: "KR$NA", album: "Time Will Tell", url: "audio/Kaha-Tak.mp3", art: "images/time_will_tell.jpg" },
        { title: "NGL", artist: "KR$NA ft. Talha Yunus", album: "Time Will Tell", url: "audio/NGL.mp3", art: "images/time_will_tell.jpg" },
        { title: "Been a While", artist: "KR$NA ft. Talha Anjum", album: "Time Will Tell", url: "audio/Been-a-While.mp3", art: "images/time_will_tell.jpg" },
        { title: "Bag", artist: "DIVINE ft. KR$NA", album: "Single", url: "audio/Bag.mp3", art: "images/Bag.jpg" },
        { title: "Say My Name", artist: "KR$NA", album: "Single", url: "audio/Say_My_Name_Hindi.mp3", art: "images/Say_My_Name.jpg" },
        { title: "No Cap", artist: "KR$NA", album: "Single", url: "audio/No_Cap.mp3", art: "images/No_Cap_KRSNA.jpg" },
        { title: "Living Legend", artist: "KR$NA ft. Rashmeet Kaur", album: "Still Here", url: "audio/khatta-flow.mp3", art: "images/Living_Legend" },
        { title: "Blowing Up", artist: "KR$NA", album: "Single", url: "audio/Blowing_Up.mp3", art: "images/Blowing_up_Krsna.jpg" },
        { title: "OG", artist: "KR$NA", album: "Single", url: "audio/OG.mp3", art: "images/OG_Krsna.jpg" },
        { title: "Roll Up", artist: "KR$NA ft. Badshah", album: "Still Here", url: "audio/Roll_Up.mp3", art: "images/Roll_Up.jpg" },
        { title: "No Losses", artist: "KR$NA", album: "Single", url: "audio/No_Losses.mp3", art: "images/No_Losses.jpg" },
        { title: "Zaruri Nahi", artist: "Karma ft. KR$NA", album: "MYP", url: "audio/Zaruri_Nahi.mp3", art: "images/Zaruri_Nahi.jpg" },
        { title: "YKWIM", artist: "Karan Aujla ft. KR$NA", album: "Single", url: "audio/Ykwim.mp3", art: "images/Ykwim.jpg" },
        { title: "Fall Off Extended", artist: "KR$NA", album: "Still Here", url: "audio/fall-off.mp3", art: "images/fall-off.jpeg" },
    



 ];

    // Intro animation and player reveal
    startBtn.addEventListener('click', () => {
        logo.classList.add('moved');
        introContainer.classList.add('hidden');
        playerContainer.classList.add('active');
        loadAndPlay(0);
    });

    // Render playlist
    function renderPlaylist() {
        playlistEl.innerHTML = '';
        playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = index === currentTrackIndex ? 'active' : '';
            li.innerHTML = `
                <div class="song-info">
                    <span class="song-title">${track.title}</span>
                    <span class="song-artist">${track.artist}</span>
                </div>
                <span class="song-duration">--:--</span>
            `;
            li.addEventListener('click', () => loadAndPlay(index));
            playlistEl.appendChild(li);
        });
    }

    // Load track
    function loadTrack(index) {
        currentTrackIndex = (index < 0) ? playlist.length - 1 : (index >= playlist.length) ? 0 : index;
        const track = playlist[currentTrackIndex];
    
        audioPlayer.src = track.url;
        trackTitle.textContent = 'Loading...';
        albumName.textContent = `${track.artist} - ${track.album}`;  // Corrected this line
        albumArt.src = track.art;
    
        document.querySelectorAll('.playlist li').forEach((item, i) => {
            item.className = i === currentTrackIndex ? 'active' : '';
        });
    }
    

    // Play track
    function playTrack() {
        audioPlayer.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            document.querySelector('.music-card').classList.add('is-playing');
        }).catch(err => console.error('Play error:', err));
    }

    // Pause track
    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.music-card').classList.remove('is-playing');
    }

    // Load and play
    function loadAndPlay(index) {
        loadTrack(index);
        playTrack();
    }

    // Format time
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
    prevBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex - 1));
    nextBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex + 1));

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        audioPlayer.volume = volume;
        volumeIcon.className = fas `${volume > 0.5 ? 'fa-volume-up' : volume > 0 ? 'fa-volume-down' : 'fa-volume-mute'}`;
    });

    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        if (!isNaN(duration)) {
            progress.style.width = `${(currentTime / duration) * 100}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        trackTitle.textContent = playlist[currentTrackIndex].title;
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('ended', () => loadAndPlay(currentTrackIndex + 1));
    audioPlayer.addEventListener('error', () => {
        console.error('Audio error:', audioPlayer.error.message);
        trackTitle.textContent = 'Error loading track';
    });

    // Initialize
    renderPlaylist();
});