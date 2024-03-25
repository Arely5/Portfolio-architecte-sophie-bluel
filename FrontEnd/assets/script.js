/*Fetching data from API and creating gallery elements*/
async function dataFetching() {
    let data = await fetch("http://localhost:5678/api/works");
    let response = await data.json();
    const gallery = document.getElementById("gallery");

    gallery.innerHTML = "";

    response.forEach(element => {
        console.log("test");
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = element.imageUrl;
        figcaption.textContent = element.title;
        figure.className = "figure-gallery";
        figure.setAttribute("data-figure-id", element.id);
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
    const selectCategory = document.getElementById('categories-input');

    responseCategories.forEach(category => {
        const filtersElements = document.createElement("li");
        const selectOptions = document.createElement("option");

        filtersElements.className = "filtersElements";
        filtersElements.textContent = category.name;
        filtersElements.setAttribute("data-id", category.id);
        filtersWrap.appendChild(filtersElements);

        selectOptions.textContent = category.name;
        selectOptions.setAttribute("data-id", category.id);
        selectCategory.appendChild(selectOptions);


        filtersElements.addEventListener("click", () => filterByCategory(filtersElements));
    });

    const allFilter = document.getElementById("allCategories");
    allFilter.addEventListener("click", function () {
        const figures = document.querySelectorAll(".figure-gallery");
        const selectedFilter = document.querySelector(".selectedFilter");

        selectedFilter.classList.remove("selectedFilter");
        allFilter.classList.add("selectedFilter");     
        figures.forEach(figure => {
            figure.style.display = 'block';
        })
    })
}

createCategoryElement();

function filterByCategory(filtersElements) {
    const filtersId = filtersElements.getAttribute("data-id");
    const figures = document.querySelectorAll(".figure-gallery");
    const selectedFilter = document.querySelector(".selectedFilter");
    selectedFilter.classList.remove("selectedFilter");

    filtersElements.classList.add("selectedFilter");

    figures.forEach(figure => {
        const figureId = figure.getAttribute("data-id");

        if (figureId === filtersId) {
            figure.style.display = 'block';
        } else {
            figure.style.display = 'none';
        }
    });
}