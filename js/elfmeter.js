//ELFMETER

//Toggle
const animWrapperElfmeter = document.getElementById("animElfmeter");
const animItemsElfmeter = animWrapperScorebug.querySelectorAll(".anim-item-elfmeter");

function handlePenaltyToggle() {
    const isActive = animWrapperElfmeter.classList.toggle("active");
    if (isActive) {
        animItemsElfmeter.forEach((el, index) => {
            el.style.transitionDelay = (index * 0.15) + "s";
        });
    } else {
        animItemsElfmeter.forEach((el) => {
            el.style.transitionDelay = "0s";
        });
    }
}
document.getElementById("penalty-toggle").onclick = handlePenaltyToggle;

//Mechanics
const clickTimeout = 1000; // 1 Sekunde

const buttons = [
    { buttonId: "Ea1", circleId: "circleA1" },
    { buttonId: "Ea2", circleId: "circleA2" },
    { buttonId: "Ea3", circleId: "circleA3" },
    { buttonId: "Ea4", circleId: "circleA4" },
    { buttonId: "Ea5", circleId: "circleA5" },
    { buttonId: "Eb1", circleId: "circleB1" },
    { buttonId: "Eb2", circleId: "circleB2" },
    { buttonId: "Eb3", circleId: "circleB3" },
    { buttonId: "Eb4", circleId: "circleB4" },
    { buttonId: "Eb5", circleId: "circleB5" }
];

const buttonStates = new Map();

buttons.forEach(({ buttonId, circleId }) => {
    const button = document.getElementById(buttonId);
    const circle = document.getElementById(circleId);

    buttonStates.set(button, { clicks: 0, timer: null });

    button.addEventListener("click", () => {
        const state = buttonStates.get(button);

        state.clicks++;

        if (state.timer) clearTimeout(state.timer);

        state.timer = setTimeout(() => {
            if (state.clicks === 1) {
                circle.classList.remove("gradient-blue", "gradient-orange", "gradient-borange", "gradient-red", "gradient-silver", "gradient-gold");
            }
            else if (state.clicks === 2) {
                circle.classList.remove("gradient-blue", "gradient-orange", "gradient-borange", "gradient-red", "gradient-silver", "gradient-gold");
                if(current_mode === 0)
                {
                    if(circleId.includes("A"))
                    {
                        switch(games[games_index].organisationA)
                        {
                            case("HTL"):
                                circle.classList.add("gradient-blue");
                                break;
                            case("HAK"):
                                circle.classList.add("gradient-orange");
                                break;
                            default:
                                circle.classList.add("gradient-borange");
                        }
                    }
                    if(circleId.includes("B"))
                    {
                        switch(games[games_index].organisationB)
                        {
                            case("HTL"):
                                circle.classList.add("gradient-blue");
                                break;
                            case("HAK"):
                                circle.classList.add("gradient-orange");
                                break;
                            default:
                                circle.classList.add("gradient-borange");
                        }
                    }
                }
                if(current_mode === 1) {
                    circle.classList.add("gradient-silver");
                }
                if(current_mode === 2) {
                    circle.classList.add("gradient-gold");
                }
            }
            else if (state.clicks >= 3) {
                circle.classList.remove("gradient-blue", "gradient-orange", "gradient-borange", "gradient-red", "gradient-silver", "gradient-gold");
                circle.classList.add("gradient-red");
            }

            state.clicks = 0;
            state.timer = null;
        }, clickTimeout);
    });
});

document.getElementById("EBonusStart").onclick = () => {

    if (!extraCircleA || !extraCircleB) return;

    const isVisible = extraCircleA.classList.contains("num6");

    if (!isVisible) {
        // Add classes to show the circles
        extraCircleA.classList.add("num6", "anim-item-elfmeter");
        extraCircleB.classList.add("num6", "anim-item-elfmeter");
    } else {
        // Remove classes to hide the circles
        extraCircleA.classList.remove("num6", "anim-item-elfmeter");
        extraCircleB.classList.remove("num6", "anim-item-elfmeter");
    }

    void extraCircleA.offsetWidth;
    void extraCircleB.offsetWidth;
};


document.getElementById("EBonusA").onclick = () => {
    const circleA = document.getElementById("circleAB");
    if (circleA) {
        const current = parseInt(circleA.textContent.replace(/\D/g,'')) || 0;
        circleA.textContent = "+" + (current + 1);
    }
};


document.getElementById("EBonusB").onclick = () => {
    const circleB = document.getElementById("circleBB");
    if (circleB) {
        const current = parseInt(circleB.textContent.replace(/\D/g,'')) || 0;
        circleB.textContent = "+" + (current + 1);
    }
};

document.getElementById("EBonusR").onclick = () => {
    const circleA = document.getElementById("circleAB");
    const circleB = document.getElementById("circleBB");
    if (circleA) circleA.textContent = "+0";
    if (circleB) circleB.textContent = "+0";
};
