//SCOREBUG

const scores = {
    teamA: { name: 'Team Alpha', points: 0 },
    teamB: { name: 'Team Beta', points: 0 }
};

// Animation Controls-scorebug
const animWrapperScorebug = document.getElementById("animScorebug");
const animItemsScorebug = animWrapperScorebug.querySelectorAll(".anim-item-scorebug");

function handleScorebugToggle() {
    const isActive = animWrapperScorebug.classList.toggle("active");
    if (isActive) {
        animItemsScorebug.forEach((el, index) => {
            el.style.transitionDelay = (index * 0.15) + "s";
        });
    } else {
        animItemsScorebug.forEach((el) => {
            el.style.transitionDelay = "0s";
        });
    }
}

document.getElementById("scorebug-toggle").onclick = handleScorebugToggle;