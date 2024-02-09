const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;

async function getPokemon(url, doThis) {
    const response = await fetch(url);
    // console.log(response);
    // check to see if the fetch was successful
    if (response.ok) {
        // the API will send us JSON... but we need to 
        // convert the response before we can use it.
        // .json() also returns a promise... so we 
        // await it as well.
        // console.log(response);
        const data = await response.json();
        // execute the callback
        doThis(data);
    }
}
function doStuff(data) {
    results = data;
    const outputElement = document.querySelector("#output");
    const html = `<h2>${results.name}</h2>
                  <img src="${results.sprites.front_default}" alt="Image of ${results.name}">`;
    outputElement.innerHTML = html;
    console.log("first: ", results);
}

// async function getPokemonList(urlList) {
//     const response = await fetch(urlList);
//     if (response.ok) {
//         const data = await response.json();
//         doStuffList(data);
//     }
// }

function compare(a, b) {
    if (a.name > b.name) {
        return 1;
    } else if (a.name < b.name) {
        // a and b different but unchanged (already in the correct order)
        return -1;
    } else return 0; // a and b are equal
}

function sortPokemon(list) {
    let sortedList = list.sort(compare);
    return sortedList;
}

function doStuffList(data) {
    console.log(data);
    const pokeListElement = document.querySelector("#outputList");
    let pokeList = data.results;
    // let counter = 0;
    // sort our list before outputting it
    pokeList = sortPokemon(pokeList);
    pokeList.forEach((currentItem) => {
        console.log(currentItem);
        // const html = `<li>${currentItem.name}</li>`;
        const html = `<li data-url="${currentItem.url}">${currentItem.name}</li>`
                    // <img src="${currentItem.name}" alt="Image of ${currentItem.name}">`;
        pokeListElement.innerHTML += html;
        // counter++;
        }
    )
    console.log("first: ", pokeList);
}

getPokemon(url, doStuff);
console.log("second: ", results);
// Notice that by just passing a different callback function in,
// we can completely change what happens when the data comes back.
getPokemon(urlList, doStuffList);
