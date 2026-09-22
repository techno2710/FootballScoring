document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-coming");
    const wrapper = document.querySelector(".anim-wrapper-coming");

    btn.addEventListener("click", () => {
        wrapper.classList.toggle("active-coming");
    });
});