document.addEventListener("DOMContentLoaded", function() {
    let authToken = sessionStorage.getItem('authToken');
    let displayModify = document.getElementById("modify");
    let filters = document.querySelector(".filters");

    if (authToken) {
        displayModify.style.display = "flex";
        filters.style.display = "none";
    }
})