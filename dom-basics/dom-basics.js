const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);
const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "One of a series of random pictures of scenery, objects, places, or people.")
document.body.appendChild(newImage);

// const newSection = document.createElement("section");
// const newH2 = document.createElement("h2");
// newH2.innerText = "CSE 121b";
// newSection.appendChild(newH2);
// const newP = document.createElement("p");
// newP.innerText = "Welcome to Javascript Language";
// newSection.appendChild(newP)
// document.body.appendChild(newSection);

const newSection = document.createElement("section");
newSection.innerHTML = "<h2>CSE 121b</h2><p>Welcome to Javascript Language</p>"
document.body.appendChild(newSection);
