/*Fetching data from API*/
async function dataFetching() {
    let data = await fetch("http://localhost:5678/api/works");
    let response = await data.json();
    const imagesSources = [];
    const captionContent = [];
    const worksCategories = [];

    response.forEach(element => {
        imagesSources.push(element.imageUrl);
        captionContent.push(element.title);
        worksCategories.push(element.categoryId);
    });

    createGalleryElements(imagesSources, captionContent);
    filterByCategory(worksCategories);
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

/* Categories filter */
async function filterByCategory(worksCategories) {
    let categoriesData = await fetch("http://localhost:5678/api/categories");
    let responseCategories = await categoriesData.json();
    const categoryId = [];
    const categoryName = [];
    const filtersWrap = document.getElementById("filters");

    responseCategories.forEach(element => {
        categoryId.push(element.id);
        categoryName.push(element.name);
    });


    for (let i = 0; i < categoryId.length; i++) {
        const filtersElements = document.createElement("li");

        filtersElements.className = "filtersElements";
        filtersElements.textContent = categoryName[i];
        filtersWrap.appendChild(filtersElements);
    }
}