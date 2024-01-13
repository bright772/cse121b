// 🔍 Part 1 error
let userName = "Moroni"; // Changed from 'const' to 'let'.
console.log(`Username: ${userName}`);
userName = "Moronihah";
console.log(`Username: ${userName}`);

// 🔍 Part 2 error
const currentDateAndTime = Date(); // Changed from 'DateTime' to 'Date()'.
console.log(`It is now ${currentDateAndTime}`);

// 🔍 Part 3 error. The following statement calls a function named total that accepts any number of arguments and returns the sum. The returned value is stored in a variable named theTotal. 1-10 are the arguments.

let theTotal = total(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(`The total is ${theTotal}`);

// 'total' function declaration
function total(...theNumbers) { // The ellipsis is the rest/spread operator: packs parametric iterables into arrays, and spreads arrays into constituents.
	let sum = 0;
	for (let aNumber of theNumbers) { // Changed 'let X in Y' (taking indices) into 'let X of Y' (taking values).
		sum += aNumber * 1; // Why do we use * 1? It implicitly converts a string to a number.
	}
	return sum
}
