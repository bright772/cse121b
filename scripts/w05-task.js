/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
const templeList = [];

/* async displayTemples Function */
const displayTemples = (array) => {
    array.forEach(templeObject => {
        const newArticleElement = document.createElement("article");

        const newH3Element = document.createElement("h3");
        newH3Element.textContent = (templeObject["templeName"]);

        const newImgElement = document.createElement("img");
        newImgElement.setAttribute("src", templeObject["imageUrl"]);
        newImgElement.alt = templeObject.location;

        newArticleElement.appendChild(newH3Element);
        newArticleElement.appendChild(newImgElement);

        templesElement.appendChild(newArticleElement);
    });
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    console.log(response);
    if (response.ok) {
        const data = await response.json();
        data.forEach((temple) => {
            templeList.push(temple);
        })
    }
    displayTemples(templeList);
}

/* reset Function */
function reset() {
    // Erase everything in the division.
    templesElement.innerHTML = "";
    console.log(templesElement.innerHTML);
}

/* filterTemples Function */
function filterTemples(arrayOfTemples) {
    reset();
    const filter = document.getElementById("filtered");
    switch (filter.value) {
        case "utah":
            displayTemples(arrayOfTemples.filter((eachObjectInArray) => {
                return (
                    eachObjectInArray.templeName.includes("Utah") || 
                    eachObjectInArray.templeName.includes("Salt Lake") || 
                    eachObjectInArray.templeName.includes("Provo")
                    )
                }));
            break; //  
        case "notutah":
            displayTemples(arrayOfTemples.filter(temObj => {
                return (
                    !temObj.templeName.includes("Utah") && 
                    !temObj.templeName.includes("Salt Lake") && 
                    !temObj.templeName.includes("Provo")
                    )
                }));
            break;
        case "older":
            displayTemples(arrayOfTemples.filter(function(object) {
                dedicatedYear = parseInt(object["dedicated"].slice(0, 4));
                return dedicatedYear < 1950;
            }));
            break;
        case "all":
            displayTemples(arrayOfTemples);
        default:
            break;
    }
}

getTemples();

/* Event Listener */
const globalFilterElement = document.querySelector("#filtered");
globalFilterElement.addEventListener("change", ( () => { filterTemples(templeList) } ) );

/* Add more functionality */
const newOptionElement = globalFilterElement.createElement("option");
newOptionElement.setAttribute("value", "alphabetic");
newOptionElement.innerText = "Sort alphabetically";
globalFilterElement.appendChild(newOptionElement);
