const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    inputRetrival();
});

function inputRetrival() {
    let inputEmail = document.getElementById("mail");
    let email = inputEmail.value;
    let regExEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    let isMailCorrect = regExEmail.test(email);
    let errorMessage = document.getElementById("error-message");

    if (isMailCorrect === true) {
        errorMessage.innerHTML = "";
    } else {
        errorMessage.innerHTML = "L'adresse e-mail n'est pas valide";
    }

    login();
}

function login() {
    let inputEmail = document.getElementById("mail");
    let email = inputEmail.value;
    let inputPassword = document.getElementById("password");
    let password = inputPassword.value;
    let postData = {
        email: email,
        password: password
    };

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Erreur lors de la requête: ' + response.statusText);
        }

        window.location.href = "index.html";

        return response.json;
    })
    .catch(error => {
        let errorMessage = document.getElementById("error-message");
        
        errorMessage.innerHTML = "Erreur dans l'adresse e-mail ou le mot de passe";
        console.error('Erreur: ' + error);
    });
}