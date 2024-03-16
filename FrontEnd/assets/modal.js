/* Display edition mode */
document.addEventListener("DOMContentLoaded", function() {
    let authToken = sessionStorage.getItem('authToken');
    const displayModify = document.getElementById("modify");
    const filters = document.querySelector(".filters");
    const header = document.querySelector("header");
    const editionBanner = document.getElementById("edition-banner");
    const logOut = document.getElementById("login-link");

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
const modifyButton = document.getElementById("modify-button");
const closeSign = document.querySelectorAll(".close-modal-window");
const modalWindowWrap = document.getElementById("modal-window-wrap");
let galleryItems = document.getElementById("gallery");

function openModal() {
    let modalGallery = document.querySelector(".modal-gallery");
    let clonedGalleryItems = galleryItems.cloneNode(true);

    clonedGalleryItems.querySelectorAll('figcaption').forEach(function(figcaption) {
        figcaption.parentNode.removeChild(figcaption);
    })
    clonedGalleryItems.querySelectorAll('img').forEach(function(img) {
        let deleteIconContainer = document.createElement("div");
        let deleteIcon = document.createElement("img");

        img.classList.add("modal-gallery-img");
        deleteIcon.src = "./assets/icons/trash-can-solid.svg";
        deleteIconContainer.classList.add("delete-icone-container");

        deleteIconContainer.appendChild(deleteIcon);
        img.parentNode.appendChild(deleteIconContainer);
    })

    modalGallery.innerHTML = '';

    modalGallery.appendChild(clonedGalleryItems);

    const deleteIconButtons = document.querySelectorAll(".delete-icone-container");

    deleteIconButtons.forEach(function(deleteIconButton) {
        deleteIconButton.addEventListener('click', function() {
            let figureId = this.parentNode.parentNode.getAttribute('data-figure-id');
            let galleryFigureToDelete = document.querySelector(`figure[data-figure-id="${figureId}"]`);
            let authToken = sessionStorage.getItem('authToken');

            fetch(`http://localhost:5678/api/works/${figureId}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    this.parentNode.remove();
                    if (galleryFigureToDelete) {
                        galleryFigureToDelete.remove();
                    }
                    console.log('Bien supp');
                } else {
                    console.log("Nope");
                }
            })
            .catch(error => {
                console.log("Erreur:", error);
            })
        })
    })

    modalWindowWrap.style.display = "flex";
}

function closeModal() {
    modalWindowWrap.style.display = "none";
}

modifyButton.addEventListener('click', openModal);

closeSign.forEach(function(closeSign) {
    closeSign.addEventListener('click', closeModal);
})

modalWindowWrap.addEventListener('click', function(event) {
    if (event.target === modalWindowWrap) {
        closeModal();
    }
});

/* Open second modal window */
const addPicture = document.getElementById("add-picture-button");
const arrowLeft = document.getElementById("back-first-modal-window");
const secondModalWindow = document.querySelector(".second-modal-window");
const firstModalWindow = document.querySelector(".modal-window");

function openSecondModal() {
    secondModalWindow.style.display = "flex";
    firstModalWindow.style.display = "none";
}

function goBackModal() {
    secondModalWindow.style.display = "none";
    firstModalWindow.style.display = "flex";
}

addPicture.addEventListener('click', openSecondModal);

arrowLeft.addEventListener('click', goBackModal);

/* Delete works on modal */

