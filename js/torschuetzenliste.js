let allPlayers = [];
let pagedPlayers = [];
let currentPageTOR = 0;

const PAGE_SIZE_TOR = 15;
const TOR_AUTO_DELAY = 10000;

let torAutoInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-tor");
    const wrapper = document.querySelector(".anim-wrapper-tor");

    wrapper.classList.remove("active-tor");

    toggleBtn.addEventListener("click", () => {
        const active = wrapper.classList.toggle("active-tor");

        if (active) {
            startTorAutoplay();
        } else {
            stopTorAutoplay();
        }
    });
});

function startTorAutoplay() {
    stopTorAutoplay();

    currentPageTOR = 0;
    renderPageTOR();

    torAutoInterval = setInterval(nextTorPage, TOR_AUTO_DELAY);
}

function stopTorAutoplay() {
    clearInterval(torAutoInterval);
    torAutoInterval = null;
}

function nextTorPage() {
    animateTorFade(() => {
        if (currentPageTOR < pagedPlayers.length - 1) {
            currentPageTOR++;
            renderPageTOR();
        } else {
            stopTorAutoplay();
            document
                .querySelector(".anim-wrapper-tor")
                ?.classList.remove("active-tor");
        }
    });
}

function initTorListe() {
    if (!Array.isArray(playerTAB)) return;

    // 🔁 Spaltennamen normalisieren
    const normalizedPlayers = playerTAB.map(p => ({
        spielername: p.Spielername,
        teamname: p.Mannschaftsname,
        toranzahl: Number(p.Toranzahl)
    }));

    const baseData = Array.isArray(teamTAB)
        ? innerJoin(
            normalizedPlayers,
            teamTAB,
            "teamname",
            "teamname",
            (player, team) => ({
                ...player,
                gruppe: team.gruppe,
                punkte: Number(team.punkte),
                organisation: team.organisation,
                _goals: Number(player.toranzahl)
            })
        )
        : normalizedPlayers;

    allPlayers = baseData.map(p => ({
        ...p,
        _goals: Number(p.toranzahl)
    }));

    allPlayers = sortByKey(allPlayers, "_goals", "desc");

    assignRanks(allPlayers);
    paginatePlayers();
    renderPageTOR();
}

function assignRanks(players) {
    let lastGoals = null;
    let lastRank = 0;

    players.forEach((player, index) => {
        if (player._goals === lastGoals) {
            player._rank = lastRank;
        } else {
            player._rank = index + 1;
            lastRank = player._rank;
            lastGoals = player._goals;
        }
    });
}

function paginatePlayers() {
    pagedPlayers = [];

    for (let i = 0; i < allPlayers.length; i += PAGE_SIZE_TOR) {
        pagedPlayers.push(allPlayers.slice(i, i + PAGE_SIZE_TOR));
    }
}

function animateTorFade(callback) {
    const items = document.querySelectorAll(
        '.anim-item-tor[class*="group"]:not(.group0)'
    );

    items.forEach(el => el.classList.add("fade"));

    setTimeout(callback, 300);

    setTimeout(() => {
        items.forEach(el => el.classList.remove("fade"));
    }, 650);
}

function renderPageTOR() {
    const wrapper = document.querySelector(".anim-wrapper-tor");
    if (!wrapper || !pagedPlayers[currentPageTOR]) return;

    const rows = wrapper.querySelectorAll("tr");
    let index = 0;

    rows.forEach(row => {
        const rank = row.querySelector(".circle");
        const cells = row.querySelectorAll(
            ".anim-item-tor:not(.group0) .ellipse"
        );
        const goals = row.querySelector(".torpoints-width .ellipse");

        if (!rank || cells.length < 2 || !goals) return;

        const player = pagedPlayers[currentPageTOR][index];

        if (!player) {
            rank.classList.add("invisible");
            cells.forEach(c => c.classList.add("invisible"));
            goals.classList.add("invisible");
            return;
        }

        rank.classList.remove("gradient-borange", "gradient-orange", "gradient-blue");
        cells[0].classList.remove("football-hak-right", "football-htl-right", "football-hak-htl-right");
        cells[1].classList.remove("football-hak-right", "football-htl-right", "football-hak-htl-right");
        switch (pagedPlayers[currentPageTOR][index++].organisation)
        {
            case("HTL"):
                rank.classList.add("gradient-blue");
                cells[0].classList.add("football-htl-right");
                cells[1].classList.add("football-htl-right");
                break;
            case("HAK"):
                rank.classList.add("gradient-orange");
                cells[0].classList.add("football-hak-right");
                cells[1].classList.add("football-hak-right");
                break;
            default:
                rank.classList.add("gradient-borange");
                cells[0].classList.add("football-hak-htl-right");
                cells[1].classList.add("football-hak-htl-right");
        }
        rank.classList.add("gradient-blue");
        rank.textContent = player._rank;
        cells[0].textContent = player.spielername;
        cells[1].textContent = player.teamname;
        goals.textContent = player.toranzahl;

        rank.classList.remove("invisible");
        cells.forEach(c => c.classList.remove("invisible"));
        goals.classList.remove("invisible");
    });
}