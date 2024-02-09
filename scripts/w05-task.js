/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
const templeList = [];

/* async displayTemples Function */
const displayTemples = (array) => {
    array.forEach(templeElement => {
        const newArticleElement = document.createElement("article");
        const newH3Element = document.createElement("h3");
        newH3Element.textContent(templeElement["templeName"]);
        const newImgElement = document.createElement("img");
        newImgElement.setAttribute("src", templeElement["imageUrl"]);
        newImgElement.alt = templeElement.location;
        newArticleElement.appendChild(newH3Element);
        newArticleElement.appendChild(newImgElement);
        templesElement.appendChild(newArticleElement);
    });
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    if (response.ok) {
        const data = await response.json();
        data.forEach((temple) => {
            templeList.add(temple);
        })
    }
}

/* reset Function */


/* filterTemples Function */


getTemples();

/* Event Listener */
