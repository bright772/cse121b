/* LESSON 3 - Programming Tasks */

/* Profile Object  */
    // Declare a new object literal variable named myProfile to hold information about yourself and assign an empty object to the variable.
let myProfile = {};

    // Add a property to this object literal named name and set its value to be your name as a string.
myProfile["name"] = "Myeongseon";
myProfile.name += " Lee";

    // Add a property named photo. Set its value to be an image's path and name (one used in Programming Task 2) as a string.
myProfile["photo"] = "images/family_picture_med.jpg";

    // Add a property named favoriteFoods. Set its value to be an array of your favorite foods as strings.
const favoriteFoodArray = new Array(
    "kimchi", 
    "gimchi jjigae",
    "ssiraegi-guk",
    "miyeok-guk",
    "gimchi boggeum bap",
    "freshly baked bread",
    "fish", 
);
myProfile.favoriteFoods = favoriteFoodArray;

    // Add a property named hobbies. Set its value to be an array of your hobbies as strings.
myProfile["hobbies"] = [
    "buying food", 
    "talking with friends", 
    "visiting family", 
]

/* Populate Profile Object with placesLived objects */
    // Add a property named placesLived. Set its value to be an empty array.
myProfile.placesLived = [];

    // Using code outside of the myProfile definition, add an item to the placesLived array where this new item itself is an object with two properties: place and length and for each of these properties, add appropriate values as strings.
myProfile["placesLived"].push(
    {
        place: "Jeong-eup, South Korea", 
        length: "25 years", 
    }
)

    // Add additional object literals with appropriate values to the placesLived array for each place you have lived.
myProfile["placesLived"].push(
    {
        place: "Jeonju, South Korea", 
        length: "15 years", 
    }
)

myProfile["placesLived"].push(
    {
        place: "Utah, U.S.", 
        length: "6 years", 
    }
)

/* DOM Manipulation - Output */
/* Name */
    // Assign the value of the name property of the myProfile object to the HTML element with an ID of name.
document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */
    // Assign the value of the photo property as the src attribute of the HTML <img> with an ID of photo.
document.getElementById("photo").setAttribute("src", myProfile["photo"]); // Remember, there is dot notation to directly set the attribute: document.getElementById("something").attribute = something.

    // Assign the value of the name property as the alt attribute of the HTML <img> with an ID of photo.
document.querySelector("#photo").setAttribute("alt", myProfile.name);

/* Favorite Foods List*/
    // For each favorite food in the favoriteFoods property,
    // create an HTML <li> element,
    // place the value of the favoriteFoods array element into the textContent of this new li element, and then
    // append this new <li> element with content as a child of the HTML <ul> element with an ID of favorite-foods.
function addFoods(food) {
    const liElement = document.createElement("li");
    liElement.textContent = food;
    document.getElementById("favorite-foods").appendChild(liElement);
}

myProfile["favoriteFoods"].forEach((food) => addFoods(food));

/* Hobbies List */
    // Repeat the previous process of creating a list of items for each hobby in the hobbies property of the object and appending each item to the HTML <ul> element with an ID of hobbies.
myProfile.hobbies.forEach(function (hobby) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;
    document.querySelector("#hobbies").appendChild(liElement);
    }
);

/* Places Lived DataList */
    // For each object in the placesLived property:
    // Create an HTML <dt> element and put its place property in the <dt> element.
    // Create an HTML <dd> element and put its length property in the <dd> element.
myProfile["placesLived"].forEach((placeLivedObject) => {
    const dtElement = document.createElement("dt");
    const ddElement = document.createElement("dd");
    dtElement.textContent = placeLivedObject["place"];
    ddElement.innerHTML = placeLivedObject.length;
    // Append the HTML <dt> and <dd> elements created above to the HTML <dl> element with an ID of places-lived.
    document.getElementById("places-lived").appendChild(dtElement);
    document.getElementById("places-lived").appendChild(ddElement);
    }
);
