/*Fetching data from API and creating gallery elements*/
async function dataFetching() {
    let data = await fetch("http://localhost:5678/api/works");
    let response = await data.json();
    const gallery = document.getElementById("gallery");

    response.forEach(element => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = element.imageUrl;
        figcaption.textContent = element.title;
        figure.setAttribute("data-id", element.categoryId);
        figure.setAttribute("alt", element.title);
        
        
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    });
}

dataFetching();

/* Categories filter */
async function createCategoryElement() {
    let categoriesData = await fetch("http://localhost:5678/api/categories");
    let responseCategories = await categoriesData.json();
    const filtersWrap = document.getElementById("filters");

    responseCategories.forEach(category => {
        const filtersElements = document.createElement("li");

        filtersElements.className = "filtersElements";
        filtersElements.textContent = category.name;
        filtersElements.setAttribute("data-id", category.id);
        filtersWrap.appendChild(filtersElements);

        filtersElements.addEventListener("click", filterByCategory);
        filterByCategory(filtersElements);
    });
}

createCategoryElement();

function filterByCategory(filtersElements, worksCategories ) {
    console.log("it works");
    /*utiliser  getAttribute*/
    /* Logique de comparaison */
}