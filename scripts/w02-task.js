/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = "Myeong Seon Lee";
let currentYear = "2024";
let profilePicture = "images/family_picture_med.jpg";

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.querySelector("picture img"); /*Get the descendant.*/

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear; /*This would conflict with the similar line in Week 1's main.js, but this script tag in the HTML comes after and overrides it.  If it comes first and then is duplicated after, only the first one is applied. ???*/
imageElement.setAttribute("src", profilePicture); /*Put these things in quotation marks!  Don't say attribute=value!*/ /*To set the property directly: imageElement.src = profilePicture;*/
imageElement.setAttribute("alt", `Profile image of ${fullName}`)

/* Step 5 - Array */
const favoriteFoods = new Array("kimchi", "gimchi jjigae", "ssiraegi-guk", "miyeok-guk", "gimchi boggeum bap", "freshly baked bread"); /*Square bracket notation is more common: variable = [values].*/
// for (const food of favoriteFoods) {
//     foodElement.innerHTML += `&bull; ${food}<br>`; /*&bull; is a bullet point, in case you don't want <ul><li>.*/
// } /*Don't do this.  Show it step by step as in the assignment.*/
foodElement.innerHTML = favoriteFoods;
const anotherFavoriteFood = "fish";
favoriteFoods.push(anotherFavoriteFood); /*Add to the end.*/
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.shift(); /*Remove (and return) one from the start.*/
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.pop(); /*Remove (and return) one from the end.*/
foodElement.innerHTML += `<br>${favoriteFoods}`;
