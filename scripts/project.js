// Fetch function from the Wiktionary API.
async function getHanjaFromHangeul(hangeulSyllable) {
    try {
        // Object to store characters and meanings.
        const hanjaObject = {};

        const encodedHangeul = encodeURIComponent(hangeulSyllable); // Without this, the later encodeURIComponent() command only handles the punctuation marks.
        let urlVariable = `https://en.wiktionary.org/w/api.php?action=query&format=json&prop=revisions&titles=${encodedHangeul}&rvprop=content&rvslots=*`;
        // urlVariable = "https://en.wiktionary.org/w/api.php?action=query&format=json&prop=revisions&titles=%EA%B3%BC&rvprop=content&rvslots=*"; // using e.g. "gwa" 과

        // Without encoding, the address isn't found by corsproxy.org.  Encoded, it would look like this:
        // urlVariable = "https%3A%2F%2Fen.wiktionary.org%2Fw%2Fapi.php%3Faction%3Dquery%26format%3Djson%26prop%3Drevisions%26titles%3D%EA%B3%BC%26rvprop%3Dcontent";

        // Use a third-party CORS (Cross-Origin Resource Sharing) proxy service.
        // urlVariable = "http://corsproxy.org/?" + encodeURIComponent(urlVariable);
        // Or try:
        // urlVariable = "https://cors-anywhere.herokuapp.com/" + encodeURIComponent(urlVariable); // this is temporary
        urlVariable = "https://api.allorigins.win/raw?url=" + encodeURIComponent(urlVariable);



        // Get response.
        // Response is only the response headers: type (cors), url, redirected (true/false), status (200/400), ok (true/false)
        const response = await fetch(urlVariable);
        if (!response.ok) {
            throw new Error("The network response had a problem.");
        }

        // Make it JSON.
        // Logging this only shows "PromiseState: fulfilled, PromiseResult: Object".
        const data = await response.json();

        // Get hanja from response.  The structure is like this:
        // batchcomplete, query, pages, (number), revisions, 0 (first element), slots, main, (all text)
        // The page number is always different.
        const pageId = Object.keys(data.query.pages)[0]; // The number is the first element of pages.
        const content = data.query.pages[pageId].revisions[0].slots.main["*"];

        // console.log(content);
        extractHanja(content, hanjaObject);

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    };
};

// Extract hanja from the text content.
function extractHanja(responseJsonDataText, hanjaObj) {
    try {
        let index = 0;
        let etymologyIndex = responseJsonDataText.indexOf("===Etymology", index);

        // Loop through the text to find these sections.
        while (etymologyIndex !== -1) {
            // Check for "{{ko-etym-sino|" after "===Etymology".
            // IndexOf() returns the position of the first occurrence of a case-sensitive value, or -1 if not found.
            // The second parameter is the starting position or default 0.
            const koEtymSinoIndex = responseJsonDataText.indexOf("{{ko-etym-sino|", etymologyIndex);
            if (koEtymSinoIndex !== -1) {
                // Get any single character after "{{ko-etym-sino|".
                const hanja = responseJsonDataText[koEtymSinoIndex + 15]; // (The length of "{{ko-etym-sino|".)
                let meaning;

                const nounIndex = responseJsonDataText.indexOf("====Noun====", koEtymSinoIndex);
                const numberSignIndex = responseJsonDataText.indexOf("#", nounIndex);
                if (nounIndex !== -1 && numberSignIndex !== -1) {
                    // Find the position of "{", the end of the line, or the end of the string (the same as .length).
                    const curlyBracketIndex = responseJsonDataText.indexOf('{{', numberSignIndex);
                    const endOfLineIndex = responseJsonDataText.indexOf('\n', numberSignIndex);
                    const endOfStringIndex = responseJsonDataText.length;
                    
                    // Find the end index from the nearest "{" or new line.
                    // const endIndex = curlyBracketIndex !== -1 && (endOfLineIndex === -1 || curlyBracketIndex < endOfLineIndex) ? curlyBracketIndex : endOfLineIndex;
                    // Find the end index from the nearest "{", new line, or end of string (in case there is no new line or { ).
                    const endIndex = Math.min(curlyBracketIndex !== -1 ? curlyBracketIndex : endOfStringIndex, endOfLineIndex !== -1 ? endOfLineIndex : endOfStringIndex);

                    // Extract the substring between "#" and the end index.
                    meaning = responseJsonDataText.substring(numberSignIndex + 1, endIndex).trim(); // Skip the "#".
                    
                    // Remove square brackets from the meaning.
                    meaning = meaning.replace(/\[|\]/g, '');
                }

                // Prevent duplicates by adding characters and meanings to a key-value object.
                addHanja(hanjaObj, hanja, meaning);
                }

            // Find the next "===Etymology" section.
            index = etymologyIndex + 1; // This advances the last found index forward and searches for Etymology again.
            etymologyIndex = responseJsonDataText.indexOf("===Etymology", index);
        }
        // for (let key in hanjaObj) { console.log(`${key}: ${hanjaObj[key]}`); }

        index = 0;
        let times = 0;
        let koHanjaReadingIndex = responseJsonDataText.indexOf("{{ko-hanja-reading|", index);
        while (koHanjaReadingIndex !== -1 && times <= 7) {
            // Check for any single character after "{{ko-hanja-reading|" when followed by "|[[", until the next "]]|".
            const hangeulReadingIndex = responseJsonDataText.indexOf("|[[", koHanjaReadingIndex + 19); // (This is the length of "{{ko-hanja-reading|".)
            if (hangeulReadingIndex !== -1) {
                const hanja = responseJsonDataText[hangeulReadingIndex - 1]; // Go back to the preceding character.
                // Get any characters that come before the next "]]|".
                let meaning;
                const endBracketIndex = responseJsonDataText.indexOf("]]|", hangeulReadingIndex);
                if (endBracketIndex !== -1) {
                    meaning = responseJsonDataText.substring(hangeulReadingIndex + 3, endBracketIndex); // Add these for the |[[ length.
                }
                addHanja(hanjaObj, hanja, meaning);
            }
            // Find the next "{{ko-hanja-reading|" section.
            index = koHanjaReadingIndex + 1;
            koHanjaReadingIndex = responseJsonDataText.indexOf("{{ko-hanja-reading|", index);
            times += 1;
        }

        // Set up the HTML.
        const outputElement = document.getElementById("hanjaOutput");
        // If you don't want them to pile up... clear it first.
        outputElement.innerHTML = "";

        for (let key in hanjaObj) {
            // console.log(`${key}: ${hanjaObj[key]}`);

            // Make a <p> to hold each pair.
            const paragraphElement = document.createElement("p");
            paragraphElement.setAttribute("style", "background-color: #eee;");
            // Make a <span> for the character.
            const characterSpanElement = document.createElement("span");
            characterSpanElement.textContent = key + ": ";
            // Make a <span> for the meaning.
            const meaningSpanElement = document.createElement("span");
            meaningSpanElement.textContent = hanjaObj[key];
            // Append the elements to the <p>.
            paragraphElement.appendChild(characterSpanElement);
            paragraphElement.appendChild(meaningSpanElement);
            // Append the <p> to the output.
            outputElement.appendChild(paragraphElement);
        }

    } catch (error) {
        console.error("Hanja not found. ", error);
    }
}

// Function to add a key/value pair only if the key doesn't already exist.
function addHanja(hanjaObject, key, value) {
    if (!(key in hanjaObject)) {
        hanjaObject[key] = value;
    }
}

// Set up a button.
const buttonElement = document.querySelector("#submitButton");

// Make a validating message.
const errorMessage = document.querySelector("#errorMessage");

// Add an event listener for input validation.
buttonElement.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    // Get the user input.
    const hangeulInputElement = document.querySelector("#hangeulInputField");
    let userInput = hangeulInputElement.value;
    // Validate the user input.
    if (!userInput) {
        errorMessage.textContent = "Please enter a hangeul syllable."; // If empty input.  This is prevented by the "required" attribute in the HTML.
    } else {
        userInput = userInput.trim(); // This trims any whitespace from the front and back of user input.
        if (!/^[\uac00-\ud7af]+$/.test(userInput)) { // A regular expression matching Unicode characters within the range of hangeul syllables (between 가 (U+AC00) and 힣 (U+D7AF), excluding non-syllable characters(? verify this)).  "+" matches one or more occurrences of the characters within the range. "$" matches the end of the string.
        // .Test() is a method of regular expression objects to test (returning true/false) whether a string matches a pattern.
            errorMessage.textContent = "Invalid input. Please enter a valid hangeul syllable."; // If non-Hangeul input.
        } else {
            errorMessage.textContent = "Valid hangeul syllable: " + userInput; // If valid hangeul input.
            getHanjaFromHangeul(userInput);
        }}
    }
)

// // Unicode escape sequence for 學.
// const unicodeEscapeSequence = "\\u5b78";
// // Parse the Unicode escape sequence to get the actual character.
// const actualCharacter = String.fromCharCode(parseInt(unicodeEscapeSequence.substr(2), 16));
// console.log(actualCharacter); // This should show 學.
