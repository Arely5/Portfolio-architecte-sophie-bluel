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
            let figureId = this.parentNode.getAttribute('data-figure-id');

            this.parentNode.remove();

            deleteWorks(figureId);
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

/* Delete works */
function deleteWorks(figureId) {
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
                    const galleryFigureToDelete = document.querySelector(`.figure-gallery[data-figure-id="${figureId}"]`);
                    galleryFigureToDelete.remove();
                    console.log('Bien supp');
                } else {
                    console.log("Nope");
                }
            })
            .catch(error => {
                console.log("Erreur:", error);
            })
        }

/* Add works */
let form = document.getElementById('add-work-form');
let workImage = null;
let workTitle = "";
let workCategories = "";

const inputImage = document.getElementById('add-image-input');
const inputTitle = document.getElementById('title-input');
const selectCategory = document.getElementById('categories-input');
const imageToPreview = document.getElementById("preview-image");
const addImageButton = document.getElementById("add-image-button");

inputImage.addEventListener('change', function(event) {
    let file = event.target.files[0];

    workImage = file;
    imageToPreview.src = URL.createObjectURL(file);
    imageToPreview.style.display = "block";
    addImageButton.style.visibility = "hidden";
})

inputTitle.addEventListener('input', function(event) {
    workTitle = event.target.value;
})

selectCategory.addEventListener('change', function(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    workCategories = selectedOption.getAttribute("data-id");
})


form.addEventListener('submit', function(event) {
    event.preventDefault();
    addWorks();
})


function addWorks() {
    let authToken = sessionStorage.getItem('authToken');

    let formData = new FormData();
    formData.append('image', workImage);
    formData.append('title', workTitle);
    formData.append('category', workCategories);

            fetch("http://localhost:5678/api/works", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    console.log("Projet bien ajouté!");
                } else {
                    console.log("Erreur lors de l'ajout: ", response.status);
                }
            })
            .catch(error => {
                console.log("Erreur:", error);
            })
        }