let allCredits = [];
let pagedCredits = [];
let currentPageCRE = 0;

const PAGE_SIZE_CRE = 15;
const CRE_AUTO_DELAY = 10000;

let creAutoInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-credits");
    const wrapper = document.querySelector(".anim-wrapper-credits");

    wrapper.classList.remove("active-credits");

    toggleBtn.addEventListener("click", () => {
        const active = wrapper.classList.toggle("active-credits");

        if (active) {
            startCREAutoplay();
        } else {
            stopCREAutoplay();
        }
    });
});

function startCREAutoplay() {
    stopCREAutoplay();

    currentPageCRE = 0;
    renderPageCRE();

    creAutoInterval = setInterval(nextCREPage, CRE_AUTO_DELAY);
}

function stopCREAutoplay() {
    clearInterval(creAutoInterval);
    creAutoInterval = null;
}

function nextCREPage() {
    animateCREFade(() => {
        if (currentPageCRE < pagedCredits.length - 1) {
            currentPageCRE++;
            renderPageCRE();
        } else {
            stopCREAutoplay();
            document
                .querySelector(".anim-wrapper-credits")
                ?.classList.remove("active-credits");
        }
    });
}

function initCREListe() {
    if (!Array.isArray(creditsTAB)) return;

    allCredits = sortByKey(creditsTAB, "gruppe", "asc");
    console.info(creditsTAB);
    console.info(allCredits)

    paginateCredits();
    renderPageCRE();
}

function paginateCredits() {
    pagedCredits = [];

    for (let i = 0; i < allCredits.length; i += PAGE_SIZE_CRE) {
        pagedCredits.push(allCredits.slice(i, i + PAGE_SIZE_CRE));
    }

    console.info(pagedCredits);
}

function animateCREFade(callback) {
    const items = document.querySelectorAll(
        '.anim-item-credits[class*="group"]:not(.group0)'
    );

    items.forEach(el => el.classList.add("fade"));

    setTimeout(callback, 300);

    setTimeout(() => {
        items.forEach(el => el.classList.remove("fade"));
    }, 650);
}

function renderPageCRE() {
    const wrapper = document.querySelector(".anim-wrapper-credits");
    if (!wrapper || !pagedCredits[currentPageCRE]) return;


    const rows = wrapper.querySelectorAll("tr");
    let dataIndex = 0;

    rows.forEach(row => {
        const circle = row.querySelector(".circle");
        const ellipse = row.querySelector(".ellipse");

        if (!circle || !ellipse) return;

        const person = pagedCredits[currentPageCRE][dataIndex];

        // Reset
        circle.classList.remove("gradient-blue", "gradient-orange", "gradient-borange", "invisible");
        ellipse.classList.remove(
            "football-hak-right",
            "football-htl-right",
            "football-hak-htl-right",
            "invisible"
        );

        if (!person) {
            circle.classList.add("invisible");
            ellipse.classList.add("invisible");
            ellipse.textContent = "";
            return;
        }

        ellipse.innerHTML = person.name + " |&nbsp;<span class='bold'>" + person.gruppe + "</span>";

        switch (person.organisation) {
            case "HTL":
                circle.classList.add("gradient-blue");
                ellipse.classList.add("football-htl-right");
                break;
            case "HAK":
                circle.classList.add("gradient-orange");
                ellipse.classList.add("football-hak-right");
                break;
            default:
                circle.classList.add("gradient-borange");
                ellipse.classList.add("football-hak-htl-right");
        }

        dataIndex++;
    });
}