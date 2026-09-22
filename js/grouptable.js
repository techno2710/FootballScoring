let GLOBAL_GROUP_DATA = null;

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-grouptable");
    const wrapper = document.querySelector(".anim-wrapper-groups");

    btn.addEventListener("click", () => {
        wrapper.classList.toggle("active-groups");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-grouptable-points");
    const wrapper = document.querySelector(".anim-wrapper-groups-points");

    btn.addEventListener("click", () => {
        wrapper.classList.toggle("active-groups-points");
    });
});

function initGroupTable() {
    if (!Array.isArray(teamTAB)) return;
    teamTAB.forEach(t => {
        t.punkte = Number(t.punkte) || 0;
    });

    const groupedObj = groupBy(teamTAB, "gruppe");

    const dataGrouped = Object.keys(groupedObj)
        .sort()
        .map(gruppe =>
            sortByKey(groupedObj[gruppe], "punkte", "desc")
        );

    renderWithPoints(dataGrouped);
    renderOverwiev(dataGrouped);
    GLOBAL_GROUP_DATA = dataGrouped;
    return dataGrouped;
}

function renderOverwiev(dataGrouped)
{
    if (!Array.isArray(dataGrouped)) return;

    const groups = ["A", "B", "C", "D", "E", "F"];

    const teamsByGroupNoPoints = {
        A: [], B: [], C: [], D: [], E: [], F: []
    };

    dataGrouped.forEach(groupArray => {
        if (!Array.isArray(groupArray) || groupArray.length === 0) return;
        const g = groupArray[0].gruppe;
        if (teamsByGroupNoPoints[g]) {
            teamsByGroupNoPoints[g] = groupArray;
        }
    });

    groups.forEach(group => {
        const teams = teamsByGroupNoPoints[group];

        const circlesNP = document.querySelectorAll(`.anim-wrapper-groups .circle.stack-${group}`);
        const names = document.querySelectorAll(`.anim-wrapper-groups .stack-${group} .ellipse`);


        circlesNP.forEach(el => {
            el.classList.add("invisible");
            el.classList.remove("gradient-orange", "gradient-blue", "gradient-borange");
            el.textContent = "";
        });

        names.forEach(el => {
            el.classList.add("invisible");
            el.classList.remove(
                "football-hak-right",
                "football-htl-right",
                "football-hak-htl-right"
            );
        });


        if (teams.length === 0) return;

        // ✅ Header
        names[0]?.classList.remove("invisible");

        teams.forEach((team, index) => {
            const row = index + 1;
            if (!names[row] || !circlesNP[row]) return;

            circlesNP[row].classList.remove("invisible");

            names[row].classList.remove("invisible");

            names[row].textContent  = team.teamname;

            switch (team.organisation) {
                case "HAK":
                    circlesNP[row].classList.add("gradient-orange");
                    names[row].classList.add("football-hak-right");
                    break;
                case "HTL":
                    circlesNP[row].classList.add("gradient-blue");
                    names[row].classList.add("football-htl-right");
                    break;
                default:
                    circlesNP[row].classList.add("gradient-borange");
                    names[row].classList.add("football-hak-htl-right");
            }
        });
    });
}

function renderWithPoints(dataGrouped) {
    if (!Array.isArray(dataGrouped)) return;

    const groups = ["A", "B", "C", "D", "E", "F"];


    const teamsByGroup = {
        A: [], B: [], C: [], D: [], E: [], F: []
    };

    dataGrouped.forEach(groupArray => {
        if (!Array.isArray(groupArray) || groupArray.length === 0) return;
        const g = groupArray[0].gruppe;
        if (teamsByGroup[g]) {
            teamsByGroup[g] = groupArray;
        }
    });

    // sammelt alle Drittplatzierten
    const thirdPlaces = [];

    dataGrouped.forEach(group => {
        if (!Array.isArray(group) || group.length < 3) return;

        const third = group[2]; // Platz 3 (0-basiert)
        if (!third) return;

        thirdPlaces.push(third);
    });


    thirdPlaces.sort((a, b) => b.punkte - a.punkte);

    thirdPlaces.sort((a, b) => b.punkte - a.punkte);

    const cutoffPoints = thirdPlaces[1]?.punkte ?? -Infinity;

    const bestThirds = thirdPlaces.filter(
        t => t.punkte >= cutoffPoints
    );

    groups.forEach(group => {
        const teams = teamsByGroup[group];

        const circles = document.querySelectorAll(`.anim-wrapper-groups-points .circle.stack-${group}`);
        const names = document.querySelectorAll(`.anim-wrapper-groups-points .name-width.stack-${group} .ellipse`);
        const points = document.querySelectorAll(`.anim-wrapper-groups-points .points-width.stack-${group} .ellipse`);


        circles.forEach(el => {
            el.classList.add("invisible");
            el.classList.remove("gradient-orange", "gradient-blue", "gradient-borange");
            el.textContent = "";
        });

        names.forEach(el => {
            el.classList.add("invisible");
            el.classList.remove(
                "football-hak-right",
                "football-htl-right",
                "football-hak-htl-right"
            );
        });

        points.forEach(el => el.classList.add("invisible"));


        if (teams.length === 0) return;

        // ✅ Header
        names[0]?.classList.remove("invisible");
        points[0]?.classList.remove("invisible");

        let lastPoints = null;
        let lastRank = 0;

        teams.forEach((team, index) => {
            const row = index + 1;
            if (!names[row] || !points[row] || !circles[row]) return;

            let rank;
            if (team.punkte === lastPoints) {
                rank = lastRank;
            } else {
                rank = row;
            }
            lastPoints = team.punkte;
            lastRank = rank;

            circles[row].classList.remove("invisible");
            circles[row].textContent = rank;

            names[row].classList.remove("invisible");
            points[row].classList.remove("invisible");

            names[row].textContent  = team.teamname;
            points[row].textContent = team.punkte ?? 0;

                switch (team.organisation) {
                    case "HAK":
                        circles[row].classList.add("gradient-orange");
                        names[row].classList.add("football-hak-right");
                        break;
                    case "HTL":
                        circles[row].classList.add("gradient-blue");
                        names[row].classList.add("football-htl-right");
                        break;
                    default:
                        circles[row].classList.add("gradient-borange");
                        names[row].classList.add("football-hak-htl-right");
                }

            const isThirdPlace = rank === 3;

            const isQualifiedThird =
                isThirdPlace &&
                bestThirds.some(t => t.teamname === team.teamname);

            if ((rank > 3 || (isThirdPlace && !isQualifiedThird ) || team.qualified === "NQ") && team.qualified) {
                circles[row].classList.add("gradient-red");
                names[row].classList.add("font-bold-red");
                points[row].classList.add("font-bold-red");
            }
        });
    });
}