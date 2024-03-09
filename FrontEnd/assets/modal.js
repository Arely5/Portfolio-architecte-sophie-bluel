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