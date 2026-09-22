// TIMER
let startSeconds = 0;
let seconds = 0;
let countdownTimer = null;

function updateTimeDisplay() {
    const min = String(Math.floor(seconds / 60)).padStart(2,"0");
    const sec = String(seconds % 60).padStart(2,"0");
    document.getElementById("time").textContent = `${min}:${sec}`;
    outTimer.textContent = `${min}:${sec}`;
}


async function loadStartTime() {
    try {
        const res = await fetch("controls/startTime.txt");
        const text = await res.text();
        startSeconds = parseInt(text) || 0;  // Fallback auf 0
        seconds = startSeconds;
        updateTimeDisplay(); // sofort Anzeige aktualisieren
    } catch (err) {
        console.error("Fehler beim Laden der Startzeit:", err);
    }
}

function handleStart(event) {
    event.preventDefault();
    if (countdownTimer) return;
    countdownTimer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        } else {
            seconds--;
            updateTimeDisplay();
        }
    }, 1000);
}

function handleStop(event) {
    event.preventDefault();
    clearInterval(countdownTimer);
    countdownTimer = null;
}

function handleReset(event) {
    event.preventDefault();
    clearInterval(countdownTimer);
    countdownTimer = null;
    seconds = startSeconds;
    updateTimeDisplay();
}

document.getElementById("startBtn").onclick = handleStart;
document.getElementById("stopBtn").onclick = handleStop;
document.getElementById("resetBtn").onclick = handleReset;

loadStartTime();