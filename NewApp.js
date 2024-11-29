console.log('Hello');

let currentSong = new Audio()
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    songs = []

    for (let i = 0; i < as.length; i++) {
        const element = as[i]
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    //playlist songs
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML += `<li><img src="Images/music.svg" alt="">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Piyush</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img src="Images/play_btn.svg" alt="">
                                </div></li>`;
    }

    // //Play the 1st song
    // var audio = new Audio(songs[0]);
    // //audio.play()

    // audio.addEventListener("loadeddata", () => {
    //    console.log(audio.duration, audio.currentSrc ,audio.currentTime)
    // })

    //Event listener for each songs
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    // return songs
}


const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + decodeURI(track)
    if (!pause) {
        currentSong.play()
        play.src = "pause_btn.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

// async function displayAlbums() {
//     let a = await fetch(`http://127.0.0.1:5500/songs/`)
//     let response = await a.text();

//     let div = document.createElement("div")
//     div.innerHTML = response;

//     let anchors = div.getElementsByTagName("a")
//     Array.from(anchors).forEach(async e => {
//         if (e.href.includes("/songs")) {
//             let folder = e.href.split("/").slice(-2)[0]

//             //data of the folder
//             let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
//             let response = await a.json();
//             console.log(response)
//         }
//     })
// }

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer")

    let array = Array.from(anchors)
    for (let i = 0; i < array.length; i++) {
        const e = array[i];

        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/songs/")[1].split("/")[0];

            let infoUrl = `http://127.0.0.1:5500/songs/${folder}/info.json`;

            // Fetch the info.json file
            let infoResponse = await fetch(infoUrl);
            let infoData = await infoResponse.json();

            cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg height="50px" width="50px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path style="fill:#0000;"
                                        d="M128.048,34.395C187.248,0.218,256.213-8.855,322.234,8.826 C388.256,26.52,443.431,68.864,477.607,128.05c34.176,59.199,43.25,128.165,25.569,194.186 c-17.694,66.021-60.039,121.196-119.224,155.373c-39.439,22.771-83.196,34.39-127.539,34.39c-22.225,0-44.596-2.918-66.647-8.821 c-66.021-17.694-121.196-60.039-155.373-119.224C0.217,324.754-8.857,255.789,8.824,189.768 C26.519,123.746,68.863,68.571,128.048,34.395z M477.434,315.334c15.842-59.146,7.715-120.93-22.904-173.96 S374.478,50.424,315.333,34.568c-19.746-5.29-39.799-7.901-59.705-7.901c-39.719,0-78.919,10.406-114.254,30.805 C88.356,88.091,50.422,137.524,34.566,196.669c-15.842,59.146-7.715,120.93,22.904,173.96s80.051,90.951,139.197,106.806 c59.146,15.842,120.93,7.715,173.96-22.904S461.578,374.48,477.434,315.334z">
                                    </path>
                                    <path style="fill:#ff9900;"
                                        d="M454.53,141.374c30.619,53.03,38.747,114.814,22.904,173.96 c-15.856,59.146-53.776,108.578-106.806,139.197s-114.814,38.747-173.96,22.904C137.522,461.58,88.089,423.659,57.47,370.629 s-38.747-114.814-22.904-173.96c15.856-59.146,53.79-108.578,106.806-139.197c35.336-20.399,74.535-30.805,114.254-30.805 c19.906,0,39.959,2.612,59.705,7.901C374.478,50.424,423.911,88.344,454.53,141.374z M410.92,153.14 c5.823-4.504,6.889-12.884,2.385-18.694C381.62,93.501,333.973,66,282.608,58.978c-7.288-0.999-14.017,4.104-15.003,11.405 c-0.999,7.288,4.104,14.004,11.392,15.003c44.516,6.076,85.781,29.913,113.229,65.368c2.625,3.398,6.569,5.17,10.553,5.17 C405.63,155.924,408.495,155.018,410.92,153.14z M392.719,256.002c0-10.086-5.21-19.107-13.937-24.143l-164.526-95.001 c-8.741-5.037-19.16-5.037-27.887,0c-8.727,5.05-13.95,14.07-13.95,24.157V350.99c0,10.086,5.223,19.107,13.95,24.157 c4.357,2.518,9.154,3.771,13.937,3.771c4.797,0,9.58-1.252,13.95-3.771l164.526-95.001 C387.509,275.109,392.719,266.088,392.719,256.002z">
                                    </path>
                                    <g>
                                        <path style="fill:#0000;"
                                            d="M413.305,134.446c4.504,5.809,3.438,14.19-2.385,18.694c-2.425,1.879-5.29,2.785-8.141,2.785 c-3.984,0-7.928-1.772-10.553-5.17c-27.448-35.456-68.713-59.292-113.229-65.368c-7.288-0.999-12.391-7.715-11.392-15.003 c0.986-7.302,7.715-12.405,15.003-11.405C333.973,66,381.62,93.501,413.305,134.446z">
                                        </path>
                                        <path style="fill:#0000;"
                                            d="M378.782,231.859c8.727,5.037,13.937,14.057,13.937,24.143s-5.21,19.107-13.937,24.143 l-164.526,95.001c-4.37,2.518-9.154,3.771-13.95,3.771c-4.783,0-9.58-1.252-13.937-3.771c-8.727-5.05-13.95-14.07-13.95-24.157 V161.014c0-10.086,5.223-19.107,13.95-24.157c8.727-5.037,19.147-5.037,27.887,0L378.782,231.859z M366.071,256.002 c0-0.719-0.413-0.959-0.613-1.066l-164.526-95.001c-0.133-0.067-0.333-0.187-0.613-0.187c-0.173,0-0.386,0.053-0.626,0.187 c-0.626,0.36-0.626,0.839-0.626,1.079V350.99c0,0.24,0,0.72,0.626,1.079c0.613,0.346,1.039,0.107,1.239,0l164.526-95.001 C365.658,256.961,366.071,256.721,366.071,256.002z">
                                        </path>
                                    </g>
                                    <path style="fill:#f9e293;"
                                        d="M365.458,254.936c0.2,0.107,0.613,0.346,0.613,1.066c0,0.719-0.413,0.959-0.613,1.066 l-164.526,95.001c-0.2,0.107-0.626,0.346-1.239,0c-0.626-0.36-0.626-0.839-0.626-1.079V161.014c0-0.24,0-0.72,0.626-1.079 c0.24-0.133,0.453-0.187,0.626-0.187c0.28,0,0.48,0.12,0.613,0.187L365.458,254.936z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="Playlist Songs">
                        <h2>${infoData.title}</h2>
                        <p>${infoData.description}</p>
                    </div>`
        }
    }

    //Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        })
    })
}


async function main() {

    //List of songs
    await getSongs("songs/Mysongs")
    playMusic(songs[0], true)

    //All albums
    displayAlbums()

    //Event listener for play 
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause_btn.svg"
        }
        else {
            currentSong.pause()
            play.src = "play_btn.svg"
        }
    })

    //Event listener for time update
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    //Event listener for seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    //Event Listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    //Event Listener for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    //Event Listener for previous song
    previous.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    //Event Listener for next song
    next.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    //Event listener for volume btn
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

}

main()