// DATALOADER
let groupA = "0";
let groupB = "0";
let infoText = "Broadcast by SZ-Funkt";
let playerTAB = null;
let gameTAB = null;
let teamTAB = null;
let creditsTAB = null;
let games = null;
let games_index = 0;
let manual_override = false;

let dataLoaded = false;

const dataLock = {
    players: false,
    teams: false,
    games: false
};

const STATIC_RELOAD_INTERVAL = 10000;
const DYNAMIC_RELOAD_INTERVAL = 500;

async function loadStaticData() {
    if (dataLock.players || dataLock.teams || dataLock.games) {
        console.warn("Stammdaten-Reload übersprungen (Lock aktiv)");
        return;
    }
    try {
        playerTAB = await loadCSV("controls/PlayerScores/output/generated/table-players.csv");
        teamTAB = await loadCSV("controls/PlayerScores/output/tables/table-teams.csv");
        creditsTAB = await loadCSV("controls/table-credits.csv");

        initTorListe();
        initCREListe();
        initGroupTable();
        plantTree();

        dataLoaded = true;
    } catch (err) {
        console.error("Fehler beim Laden der Stammdaten:", err);
    }
}

async function loadDynamicData() {
    if(manual_override === false)
    {
        try {
            const getTimer = await fetch("controls/startTime.txt");
            const getInfoText = await fetch("controls/infographics.txt");
            gameTAB = await loadCSV("controls/PlayerScores/output/tables/table-games.csv");

            const timerText = await getTimer.text();
            infoText = await getInfoText.text();

            const newStartSeconds = parseInt(timerText) || 0;
            if (!countdownTimer && newStartSeconds !== startSeconds) {
                startSeconds = newStartSeconds;
                seconds = startSeconds;
                updateTimeDisplay();
            }
        } catch (err) {
            console.error("Fehler beim Laden der dynamischen Daten:", err);
        }
    }

    fetchGameTable();
    renderScores();
    applyMode();
}


loadStaticData();

setInterval(loadStaticData, STATIC_RELOAD_INTERVAL);
setInterval(loadDynamicData, DYNAMIC_RELOAD_INTERVAL);

function fetchGameTable()
{
    if(manual_override === false)
    {
        if (!Array.isArray(gameTAB) || !Array.isArray(teamTAB)) {
            console.warn("gameTAB oder teamTAB ist kein Array oder noch nicht geladen");
            games = [];
            return;
        }


        const teamLookup = new Map(
            teamTAB.map(t => [t.teamname, t])
        );


        games = gameTAB.flatMap(row => {
            const teamA = teamLookup.get(row.teamnameA);
            const teamB = teamLookup.get(row.teamnameB);


            if (!teamA || !teamB) return [];

            return [
                {
                    teamA: row.teamnameA,
                    teamB: row.teamnameB,
                    pointsA: Number(row.punkteA),
                    pointsB: Number(row.punkteB),
                    organisationA: teamA.organisation,
                    organisationB: teamB.organisation,
                    mode: row.modus
                }
            ];
        });
        document.getElementById("infoEllipse").textContent = infoText;
        outInfo.textContent = infoText;
        console.log("DATA FETCHED");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("next-game");

    btn.addEventListener("click", () => {
        changeGame(true);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("prev-game");

    btn.addEventListener("click", () => {
        changeGame(false);
    });
});

function changeGame(mode)
{
    console.info("BEFORE: " + games_index);
    if(mode === true && games_index < games.length-1)
    {
        games_index++;
    }
    if(mode === false && games_index !== 0)
    {
        games_index--;
    }
    console.info("AFTER: " + games_index);
}

function renderScores() {
    document.getElementById('teamA').textContent = games[games_index].teamA;
    document.getElementById('scoreA').textContent = games[games_index].pointsA;
    document.getElementById('teamB').textContent = games[games_index].teamB;
    document.getElementById('scoreB').textContent = games[games_index].pointsB;

    document.getElementById('elfmeterA').textContent = games[games_index].teamA;
    document.getElementById('elfmeterB').textContent = games[games_index].teamB;

    document.getElementById('teamAEndstand').textContent = games[games_index].teamA;
    document.getElementById('teamBEndstand').textContent = games[games_index].teamB;
    document.getElementById('scoreAEndstand').textContent = games[games_index].pointsA;
    document.getElementById('scoreBEndstand').textContent = games[games_index].pointsB;

    outNameA.textContent = games[games_index].teamA;
    outNameB.textContent = games[games_index].teamB;
    outPointsA.textContent = games[games_index].pointsA;
    outPointsB.textContent = games[games_index].pointsB;


    if(!games[games_index+1])
    {
        document.getElementById('comingUp1Ateam').classList.add("invisible");
        document.getElementById('comingUp1Bteam').classList.add("invisible");
        document.getElementById('comingUp1Aorg').classList.add("invisible");
        document.getElementById('comingUp1Borg').classList.add("invisible");
        document.getElementById('vs1').classList.add("invisible");
        return;
    }
    document.getElementById('comingUp1Ateam').textContent = games[games_index+1].teamA;
    document.getElementById('comingUp1Bteam').textContent = games[games_index+1].teamB;
    if(!games[games_index+2])
    {
        document.getElementById('comingUp2Ateam').classList.add("invisible");
        document.getElementById('comingUp2Bteam').classList.add("invisible");
        document.getElementById('comingUp2Aorg').classList.add("invisible");
        document.getElementById('comingUp2Borg').classList.add("invisible");
        document.getElementById('vs2').classList.add("invisible");
        return;
    }
    document.getElementById('comingUp2Ateam').textContent = games[games_index+2].teamA;
    document.getElementById('comingUp2Bteam').textContent = games[games_index+2].teamB;
    if(!games[games_index+3])
    {
        document.getElementById('comingUp3Ateam').classList.add("invisible");
        document.getElementById('comingUp3Bteam').classList.add("invisible");
        document.getElementById('comingUp3Aorg').classList.add("invisible");
        document.getElementById('comingUp3Borg').classList.add("invisible");
        document.getElementById('vs3').classList.add("invisible");
        return;
    }
    document.getElementById('comingUp3Ateam').textContent = games[games_index+3].teamA;
    document.getElementById('comingUp3Bteam').textContent = games[games_index+3].teamB;
    specialChangeComingUp();
    plantTree();
}