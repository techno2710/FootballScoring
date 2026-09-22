document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-top3");
    const wrapper = document.querySelector(".anim-wrapper-top3");

    btn.addEventListener("click", () => {
        wrapper.classList.toggle("active-top3");
    });
});

document.getElementById("top1-in").addEventListener("input", e => {
    document.getElementById("top1-out").textContent = e.target.value;
});

document.getElementById("top2-in").addEventListener("input", e => {
    document.getElementById("top2-out").textContent = e.target.value;
});

document.getElementById("top3-in").addEventListener("input", e => {
    document.getElementById("top3-out").textContent = e.target.value;
});