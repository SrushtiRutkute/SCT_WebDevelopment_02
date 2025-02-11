let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let isRunning = false;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapsBtn = document.getElementById("clearLapsBtn");
const lapTimesList = document.getElementById("lapTimes");

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startPauseBtn.innerText = "PAUSE";
        timer = setInterval(updateTime, 10);
    } else {
        isRunning = false;
        startPauseBtn.innerText = "START";
        clearInterval(timer);
    }
}

function updateTime() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    minutesDisplay.innerText = formatTime(minutes);
    secondsDisplay.innerText = formatTime(seconds);
    millisecondsDisplay.innerText = formatMilliseconds(milliseconds);
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startPauseBtn.innerText = "START";
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    minutesDisplay.innerText = "00";
    secondsDisplay.innerText = "00";
    millisecondsDisplay.innerText = "00";

    lapTimesList.innerHTML = "";
}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

function formatMilliseconds(value) {
    return (value / 10).toFixed(0).padStart(2, "0");
}

function recordLap() {
    if (isRunning) {
        const lapItem = document.createElement("li");
        lapItem.innerText = formatTime(minutes) + ":" + formatTime(seconds) + ":" + formatMilliseconds(milliseconds);
        lapTimesList.appendChild(lapItem);
    }
}

function clearLaps() {
    lapTimesList.innerHTML = "";
}

startPauseBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
clearLapsBtn.addEventListener("click", clearLaps);