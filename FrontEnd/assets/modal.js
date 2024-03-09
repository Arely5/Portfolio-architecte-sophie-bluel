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

/* Open second modal window */
let addPicture = document.getElementById("add-picture-button");
let arrowLeft = document.getElementById("back-first-modal-window");

addPicture.addEventListener('click', function OpenSecondModalWindow(event) {
    let secondModalWindow = document.querySelector(".second-modal-window");
    let firstModalWindow = document.querySelector(".modal-window");

    secondModalWindow.style.display = "flex";
    firstModalWindow.style.display = "none";
})

arrowLeft.addEventListener('click', function GoBackModal(event) {
    let secondModalWindow = document.querySelector(".second-modal-window");
    let firstModalWindow = document.querySelector(".modal-window");

    secondModalWindow.style.display = "none";
    firstModalWindow.style.display = "flex";
})