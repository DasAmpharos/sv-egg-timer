let mark = null;
let running = false;
let lastUpdate = null;
let timerHandle = -1;

let eggElapsed = 0;
let totalElapsed = 0;

const timerBtn = document.getElementById("timerBtn");
const resetBtn = document.getElementById("resetBtn");
const eggRemainingLbl = document.getElementById("eggRemainingLbl");
const totalRemainingLbl = document.getElementById("totalRemainingLbl");

const levelUp = new Audio("/audio/LevelUp.wav");
const receivedEgg = new Audio("/audio/ReceivedEgg.wav");

const EGG_DURATION = 2 * 60000;
const SANDWICH_DURATION = 30 * 60000;

function start() {
    running = true;
    lastUpdate = Date.now();
    timerHandle = window.setInterval(tick, 1000);
    timerBtn.textContent = "Stop"
}

function stop() {
    running = false;
    window.clearInterval(timerHandle);
    timerBtn.textContent = "Start";
    tick();
}

function reset() {
    eggElapsed = 0;
    totalElapsed = 0;
    lastUpdate = Date.now();

    eggRemainingLbl.value = formatTime(EGG_DURATION - eggElapsed);
    totalRemainingLbl.value = formatTime(SANDWICH_DURATION - totalElapsed);
}

function tick() {
    const now = Date.now();
    const delta = now - lastUpdate;
    lastUpdate = now;

    eggElapsed += delta;
    totalElapsed += delta;
    if (eggElapsed >= EGG_DURATION) {
        receivedEgg.play();
        eggElapsed -= EGG_DURATION;
    }
    if (totalElapsed >= SANDWICH_DURATION) {
        levelUp.play();
        stop();
        return;
    }

    eggRemainingLbl.value = formatTime(EGG_DURATION - eggElapsed);
    totalRemainingLbl.value = formatTime(SANDWICH_DURATION - totalElapsed);
}

function formatTime(milliseconds) {
    let asSeconds = Math.round(milliseconds / 1000);
    let minutesPart = Math.floor(asSeconds / 60);
    let secondsPart = (asSeconds % 60).toString().padStart(2, '0');
    return `${minutesPart}:${secondsPart}`;
}

timerBtn.onclick = () => (!running ? start : stop)();
resetBtn.onclick = reset;
reset();