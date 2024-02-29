const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    login();
});

function login() {
    let inputEmail = document.getElementById("mail");
    let inputPassword = document.getElementById("password");
    let email = inputEmail.value;
    let password = inputPassword.value;
    let regExEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    let isMailCorrect = regExEmail.test(email);
    let errorMessage = document.getElementById("error-message");

    if (isMailCorrect === true) {
        errorMessage.innerHTML = "";
        console.log("bonne adresse mail");
    } else {
        errorMessage.innerHTML = "L'adresse e-mail n'est pas valide";
    }
}