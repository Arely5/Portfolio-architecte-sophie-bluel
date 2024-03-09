/* Display edition mode */
document.addEventListener("DOMContentLoaded", function() {
    let authToken = sessionStorage.getItem('authToken');
    let displayModify = document.getElementById("modify");
    let filters = document.querySelector(".filters");
    let header = document.querySelector("header");
    let editionBanner = document.getElementById("edition-banner");
    let logOut = document.getElementById("login-link");

    logOut.addEventListener('click', function(event) {
        sessionStorage.removeItem('authToken');
    })

    if (authToken) {
        displayModify.style.display = "flex";
        filters.style.display = "none";
        header.style.marginTop = "95px";
        editionBanner.style.display = "flex";
        logOut.innerText = "logout";
    }
})

/* Open and close modal window */
let modifyButton = document.getElementById("modify-button");
let closeSign = document.getElementById("close-modal-window");

modifyButton.addEventListener('click', function openModalWindow(event) {
    let modalWindowWrap = document.getElementById("modal-window-wrap");

    modalWindowWrap.style.display = "flex";
})

closeSign.addEventListener('click', function closeModalWindow(event) {
    let modalWindowWrap = document.getElementById("modal-window-wrap");

    modalWindowWrap.style.display = "none";
})