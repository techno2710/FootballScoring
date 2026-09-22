let outTimer = document.getElementById("out-timer");
let outInfo = document.getElementById("out-infotext");

let outNameA = document.getElementById("out-scorebug-name-A");
let outNameB = document.getElementById("out-scorebug-name-B");
let outPointsA = document.getElementById("out-scorebug-points-A");
let outPointsB = document.getElementById("out-scorebug-points-B");

let outIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("out-next");
    const prevBtn = document.getElementById("out-prev");

    nextBtn.addEventListener("click", () => printOutGroupData(true));
    prevBtn.addEventListener("click", () => printOutGroupData(false));

    const t = setInterval(() => {
        if (Array.isArray(GLOBAL_GROUP_DATA) && GLOBAL_GROUP_DATA.length > 0) {
            clearInterval(t);
            printOutGroupData();
        }
    }, 50);
});

function printOutGroupData(mode)
{
    if(GLOBAL_GROUP_DATA === null)
    {
        return;
    }
    const outTeamNames  = document.querySelectorAll(".out-team-name");
    const outTeamPoints = document.querySelectorAll(".out-team-points");

    console.log("SELEKTOREN");
    console.log(outTeamNames);
    console.log(outTeamPoints);
    console.log(GLOBAL_GROUP_DATA);

    console.log(outIndex);
    console.log(GLOBAL_GROUP_DATA.length);
    if(mode === true && outIndex < GLOBAL_GROUP_DATA.length-1)
    {
        outIndex++;
    }
    if(mode === false && outIndex > 0)
    {
        outIndex--;
    }

    console.log(GLOBAL_GROUP_DATA);

    for(var i=0; i<6; i++)
    {
        if(!GLOBAL_GROUP_DATA[outIndex][i])
        {
            outTeamNames[i].textContent = "-";
            outTeamPoints[i].textContent = "-";
            continue;
        }
        outTeamNames[i].textContent = GLOBAL_GROUP_DATA[outIndex][i].teamname;
        outTeamPoints[i].textContent = GLOBAL_GROUP_DATA[outIndex][i].punkte;
    }

    switch(outIndex)
    {
        case(0):
            document.getElementById("out-group").textContent = "Gruppe A";
            break;
        case(1):
            document.getElementById("out-group").textContent = "Gruppe B";
            break;
        case(2):
            document.getElementById("out-group").textContent = "Gruppe C";
            break;
        case(3):
            document.getElementById("out-group").textContent = "Gruppe D";
            break;
        case(4):
            document.getElementById("out-group").textContent = "Gruppe E";
            break;
        case(5):
            document.getElementById("out-group").textContent = "Gruppe F";
            break;
    }
}