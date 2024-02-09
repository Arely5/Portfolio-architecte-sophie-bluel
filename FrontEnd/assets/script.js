/*Fetching data from API*/
async function dataFetching() {
    let data = await fetch("http://localhost:5678/api/works");
    let response = await data.json();
    const imagesSources = [];
    const captionContent = [];

    response.forEach(element => {
        imagesSources.push(element.imageUrl);
        captionContent.push(element.title);
    });

    createGalleryElements(imagesSources, captionContent);
}

dataFetching();

/*Creating gallery elements*/
function createGalleryElements(imagesSources, captionContent) {
    const gallery = document.getElementById("gallery");

    for (let i = 0; i < imagesSources.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = imagesSources[i];
        figcaption.textContent = captionContent[i];
        
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}

/*figcaption.innerText = "Test";
img.src = "assets/images/abajour-tahina.png"; */