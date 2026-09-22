//ENDSTAND

// Animation Controls-endstand
const animWrapperEndstand = document.getElementById("animEndstand");
const animItemsEndstand = animWrapperEndstand.querySelectorAll(".anim-item-endstand");

function handleEndstandToggle() {
    const isActive = animWrapperEndstand.classList.toggle("active");
    if (isActive) {
        animItemsEndstand.forEach((el, index) => {
            el.style.transitionDelay = (index * 0.15) + "s";
        });
    } else {
        animItemsEndstand.forEach((el) => {
            el.style.transitionDelay = "0s";
        });
    }
}

document.getElementById("endstandToggle").onclick = handleEndstandToggle;