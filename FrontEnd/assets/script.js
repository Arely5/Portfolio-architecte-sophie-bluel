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
        figure.className = "figure-gallery";
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

        filtersElements.addEventListener("click", () => filterByCategory(filtersElements));
    });
}

createCategoryElement();

function filterByCategory(filtersElements) {
    const filtersId = filtersElements.getAttribute("data-id");
    const figures = document.querySelectorAll(".figure-gallery");

    figures.forEach(figure => {
        const figureId = figure.getAttribute("data-id");
        const allFilter = document.getElementById("allCategories");

        document.querySelectorAll(".filtersElements").forEach(filter => {
            filter.classList.remove("selectedFilter");
        })

        filtersElements.classList.add("selectedFilter");

        allFilter.addEventListener("click", function () {
            figure.style.display = 'block';
            allFilter.textContent = "why?";
        })

        if (figureId === filtersId) {
            figure.style.display = 'block';
        } else {
            figure.style.display = 'none';
        }
    });
}