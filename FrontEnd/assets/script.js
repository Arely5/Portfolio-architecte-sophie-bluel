/*Fetching data from API*/
async function dataFetching() {
    let data = await fetch("http://localhost:5678/api/works");
    let response = await data.json();
    
    console.log(response);
}

dataFetching();

/*Creating gallery elements*/
const gallery = document.getElementById("gallery");
const figure = document.createElement("figure");
const img = document.createElement("img");
/*function createFigureElement () {

} */
const figcaption = document.createElement("figcaption");

gallery.appendChild(figure);
figure.appendChild(img);
figure.appendChild(figcaption);

/*figcaption.innerText = "Test";
img.src = "assets/images/abajour-tahina.png"; */