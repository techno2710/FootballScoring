const infoWrapper = document.getElementById("animInfographic");
const infoItems = infoWrapper.querySelectorAll(".anim-item-infographic");

function handleInfoToggle() {
    const isActive = infoWrapper.classList.toggle("active");

    // Optionally stagger child animations
    infoItems.forEach((el, index) => {
        el.style.transitionDelay = isActive ? (index * 0.1) + "s" : "0s";
    });
}

document.getElementById("infoToogle").onclick = handleInfoToggle;