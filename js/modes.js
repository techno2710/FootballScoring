//modes switcher
const toChangePointsA = document.getElementById('scoreA');
const toChangePointsB = document.getElementById('scoreB');
const toChangeFootballAScorebug = document.getElementById('teamA');
const toChangeFootballBScorebug = document.getElementById('teamB');

const toChangeFootballAElfmeter = document.getElementById('elfmeterA');
const toChangeFootballBElfmeter = document.getElementById('elfmeterB');
const extraCircleA = document.getElementById("circleAB");
const extraCircleB = document.getElementById("circleBB");

const toChangeEndstandTeamA = document.getElementById("teamAEndstand");
const toChangeEndstandTeamB = document.getElementById("teamBEndstand");
const toChangeEndstandScoreA = document.getElementById("scoreAEndstand");
const toChangeEndstandScoreB = document.getElementById("scoreBEndstand");

const toChangeOutPointsA = document.getElementById("out-scorebug-points-A");
const toChangeOutPointsB = document.getElementById("out-scorebug-points-B");

const toChangeOutOut = document.getElementById("out-mode");

const toChangeComingUpOrg = [
    {
        A: document.getElementById("comingUp1Aorg"),
        B: document.getElementById("comingUp1Borg")
    },
    {
        A: document.getElementById("comingUp2Aorg"),
        B: document.getElementById("comingUp2Borg")
    },
    {
        A: document.getElementById("comingUp3Aorg"),
        B: document.getElementById("comingUp3Borg")
    }
];

const toChangeComingUpTeam = [
    {
        A: document.getElementById("comingUp1Ateam"),
        B: document.getElementById("comingUp1Bteam")
    },
    {
        A: document.getElementById("comingUp2Ateam"),
        B: document.getElementById("comingUp2Bteam")
    },
    {
        A: document.getElementById("comingUp3Ateam"),
        B: document.getElementById("comingUp3Bteam")
    }
]

var current_mode = 0;
function applyMode() {

    switch(current_mode) {
        case(0): //Regulär
            changeColors();
            specialChangeComingUp();
            break;

        case(1): //Kleines Finale
            changeColors();
            toChangePointsA.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            toChangePointsB.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            extraCircleA.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            extraCircleB.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            toChangeEndstandScoreA.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            toChangeEndstandScoreB.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            toChangeOutOut.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            toChangeComingUpOrg.forEach(({ A, B }) => {
                A?.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
                B?.classList.remove("gradient-blue", "gradient-orange", "gradient-borange");
            });

            toChangePointsA.classList.add("gradient-silver");
            toChangePointsB.classList.add("gradient-silver");
            extraCircleA.classList.add("gradient-silver");
            extraCircleB.classList.add("gradient-silver");
            toChangeEndstandScoreA.classList.add("gradient-silver");
            toChangeEndstandScoreB.classList.add("gradient-silver");
            toChangeOutOut.classList.add("gradient-silver");
            toChangeComingUpOrg.forEach(({ A, B }) => {
                A?.classList.add("gradient-silver");
                B?.classList.add("gradient-silver");
            });
            break;

        case(2): //Großes Finale
            changeColors();
            toChangePointsA.classList.remove("gradient-silver");
            toChangePointsB.classList.remove("gradient-silver");
            extraCircleA.classList.remove("gradient-silver");
            extraCircleB.classList.remove("gradient-silver");
            toChangeEndstandScoreA.classList.remove("gradient-silver");
            toChangeEndstandScoreB.classList.remove("gradient-silver");
            toChangeOutOut.classList.remove("gradient-silver")
            toChangeComingUpOrg.forEach(({ A, B }) => {
                A?.classList.remove("gradient-silver");
                B?.classList.remove("gradient-silver");
            });

            toChangePointsA.classList.add("gradient-gold");
            toChangePointsB.classList.add("gradient-gold");
            extraCircleA.classList.add("gradient-gold");
            extraCircleB.classList.add("gradient-gold");
            toChangeEndstandScoreA.classList.add("gradient-gold");
            toChangeEndstandScoreB.classList.add("gradient-gold");
            toChangeOutOut.classList.add("gradient-gold");
            toChangeComingUpOrg.forEach(({ A, B }) => {
                A?.classList.add("gradient-gold");
                B?.classList.add("gradient-gold");
            });
            break;
    }
}

function changeColors()
{
    toChangePointsA.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    toChangePointsB.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    extraCircleA.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    extraCircleB.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    toChangeEndstandScoreA.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    toChangeEndstandScoreB.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    toChangeOutPointsA.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    toChangeOutPointsB.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    toChangeOutOut.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");

    toChangeComingUpOrg.forEach(({ A, B }) => {
        A?.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
        B?.classList.remove("gradient-gold", "gradient-silver", "gradient-blue", "gradient-orange", "gradient-borange");
    });

    toChangeFootballAScorebug.classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    toChangeFootballBScorebug.classList.remove("football-htl-left", "football-hak-left", "football-hak-htl-left");
    toChangeFootballAElfmeter.classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    toChangeFootballBElfmeter.classList.remove("football-htl-left", "football-hak-left", "football-hak-htl-left");
    toChangeEndstandTeamA.classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    toChangeEndstandTeamB.classList.remove("football-htl-left", "football-hak-left", "football-hak-htl-left");

    toChangeComingUpTeam.forEach(({ A, B }) => {
        A?.classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
        B?.classList.remove("football-htl-left", "football-hak-left", "football-hak-htl-left");
    });

    toChangeOutOut.classList.add("gradient-borange");


    switch (games[games_index].organisationA)
    {
        case("HTL"):
            toChangePointsA.classList.add("gradient-blue");
            extraCircleA.classList.add("gradient-blue");
            toChangeEndstandScoreA.classList.add("gradient-blue");
            toChangeOutPointsA.classList.add("gradient-blue");
            toChangeFootballAScorebug.classList.add("football-htl-right");
            toChangeFootballAElfmeter.classList.add("football-htl-right");
            toChangeEndstandTeamA.classList.add("football-htl-right");
            break;
        case("HAK"):
            toChangePointsA.classList.add("gradient-orange");
            extraCircleA.classList.add("gradient-orange");
            toChangeEndstandScoreA.classList.add("gradient-orange");
            toChangeOutPointsA.classList.add("gradient-orange");
            toChangeFootballAScorebug.classList.add("football-hak-right");
            toChangeFootballAElfmeter.classList.add("football-hak-right");
            toChangeEndstandTeamA.classList.add("football-hak-right");
            break;
        default:
            toChangePointsA.classList.add("gradient-borange");
            extraCircleA.classList.add("gradient-borange");
            toChangeEndstandScoreA.classList.add("gradient-borange");
            toChangeOutPointsA.classList.add("gradient-borange");
            toChangeFootballAScorebug.classList.add("football-hak-htl-right");
            toChangeFootballAElfmeter.classList.add("football-hak-htl-right");
            toChangeEndstandTeamA.classList.add("football-hak-htl-right");
            break;
    }

    switch (games[games_index].organisationB)
    {
        case ("HTL"):
            toChangePointsB.classList.add("gradient-blue");
            extraCircleB.classList.add("gradient-blue");
            toChangeEndstandScoreB.classList.add("gradient-blue");
            toChangeOutPointsB.classList.add("gradient-blue");
            toChangeFootballBScorebug.classList.add("football-htl-left");
            toChangeFootballBElfmeter.classList.add("football-htl-left");
            toChangeEndstandTeamB.classList.add("football-htl-left");
            break;
        case ("HAK"):
            toChangePointsB.classList.add("gradient-orange");
            extraCircleB.classList.add("gradient-orange");
            toChangeEndstandScoreB.classList.add("gradient-orange");
            toChangeOutPointsB.classList.add("gradient-orange");
            toChangeFootballBScorebug.classList.add("football-hak-left");
            toChangeFootballBElfmeter.classList.add("football-hak-left");
            toChangeEndstandTeamB.classList.add("football-hak-left");
            break;
        default:
            toChangePointsB.classList.add("gradient-borange");
            extraCircleB.classList.add("gradient-borange");
            toChangeEndstandScoreB.classList.add("gradient-borange");
            toChangeOutPointsA.classList.add("gradient-borange");
            toChangeFootballBScorebug.classList.add("football-hak-htl-left");
            toChangeFootballBElfmeter.classList.add("football-hak-htl-left");
            toChangeEndstandTeamB.classList.add("football-hak-htl-left");
            break;
    }
}

function specialChangeComingUp()
{
    var k = 0;
    var j = 0;
    for(var i=games_index+1; i<games_index+4;i++)
    {
        if(!games[i])
        {
            continue;
        }
        switch (games[i].organisationA)
        {
            case("HTL"):
                toChangeComingUpOrg[k].A.classList.add("gradient-blue");
                toChangeComingUpTeam[k].A.classList.add("football-htl-right");
                break;
            case("HAK"):
                toChangeComingUpOrg[k].A.classList.add("gradient-orange");
                toChangeComingUpTeam[k].A.classList.add("football-hak-right");
                break;
            default:
                toChangeComingUpOrg[k].A.classList.add("gradient-borange");
                toChangeComingUpTeam[k].A.classList.add("football-hak-htl-right");
                break;
        }
        k++;


        switch (games[i].organisationB)
        {
            case("HTL"):
                toChangeComingUpOrg[j].B.classList.add("gradient-blue");
                toChangeComingUpTeam[j].B.classList.add("football-htl-left");
                break;
            case("HAK"):
                toChangeComingUpOrg[j].B.classList.add("gradient-orange");
                toChangeComingUpTeam[j].B.classList.add("football-hak-left");
                break;
            default:
                toChangeComingUpOrg[j].B.classList.add("gradient-borange");
                toChangeComingUpTeam[j].B.classList.add("football-hak-htl-left");
                break;
        }
        j++;
    }
}

function changeMode() {
    current_mode++;
    if (current_mode > 2) current_mode = 0;
    applyMode();
}

document.getElementById("changeMode").onclick = changeMode;