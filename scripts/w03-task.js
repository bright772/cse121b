/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
    return number1 + number2;
}

function addNumbers() {
    const augend = Number(document.getElementById("add1").value);
    const addend = Number(document.getElementById("add2").value);
    const sum = add(augend, addend);
    document.getElementById("sum").value = sum; // Do not omit .value here, or it will... what?  Rewrite the whole DOM node as a number?  Though it seems to work on IE.
}

const addNumbersButton = document.getElementById("addNumbers");
addNumbersButton.addEventListener("click", addNumbers);

/* Function Expression - Subtract Numbers */
const subtract = function(number1, number2) {
    return number1 - number2;
}

const subtractNumbers = function() {
    const minuend = Number(document.getElementById("subtract1").value);
    const subtrahend = Number(document.getElementById("subtract2").value);
    const difference = subtract(minuend, subtrahend);
    document.getElementById("difference").value = difference;
}

const subtractButtonElement = document.querySelector("#subtractNumbers");
subtractButtonElement.addEventListener("click", subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => {
    return number1 * number2;
}

const multiplyNumbers = () => {
    const multiplicand = Number(document.getElementById("factor1").value);
    const multiplier = Number(document.getElementById("factor2").value);
    const product = multiply(multiplicand, multiplier);
    document.getElementById("product").value = product;
}

const multiplyButtonElement = document.querySelector("#multiplyNumbers");
multiplyButtonElement.addEventListener("click", multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = function(number1, number2) {
    return number1 / number2;
}

const divideNumbers = () => {
    const dividend = parseFloat(document.getElementById("dividend").value);
    const divisor = parseFloat(document.querySelector("#divisor").value);
    const quotient = divide(dividend, divisor);
    document.querySelector("#quotient").value = quotient;
}

document.querySelector("#divideNumbers").addEventListener("click", divideNumbers);

/* Decision Structure */
document.getElementById("getTotal").addEventListener("click", () => {
    let subtotal = Number(document.querySelector("#subtotal").value);
    const isMember = document.getElementById("member"); // Don't use .value here.
    if (isMember.checked) {
        subtotal *= 0.85; // Members get 15% off.
    }
    subtotal = subtotal.toFixed(2); // .ToFixed() makes a string; parseFloat() makes it a number again.
    document.querySelector("#total").textContent = `$${subtotal}`;
})

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
const arrayVariable = [];
for (let i = 1; i < 14; i++) {
    arrayVariable.push(i);
}

document.getElementById("array").textContent = arrayVariable; // or .innerHTML; not .value!

/* Output Odds Only Array */
const oddArray = arrayVariable.filter(item => item % 2 !== 0); // The function should return a Boolean value.
document.querySelector("#odds").innerHTML = oddArray;

// Fix the strange-looking center alignment of #section3.
// document.addEventListener("DOMContentLoaded", function () {
//     // document.getElementById("section3").style.textAlign = "left"; // This doesn't work.
//     // document.getElementById("section3").style.alignItems = "flex-start"; // Give up.  I can't get the h2 centered again; some CSS is conflicting.
// });

/* Output Evens Only Array */
// const evenArray = arrayVariable.filter(item => item % 2 == 0);
// document.querySelector("#evens").innerHTML = evenArray;

// A more interesting way:
const evenArray = arrayVariable.filter(function (item) {
    return !oddArray.includes(item); // .Includes() returns a Boolean value, which .filter() uses to send or not send the array item.  So if the second array DOES include the item, this returns false and .filter() excludes it.
});
document.getElementById("evens").innerHTML = evenArray;

/* Output Sum of Org. Array */
const sumOfArray = arrayVariable.reduce((sum, item) => sum += item, 0); // You need those .reduce() inner parentheses.
document.querySelector("#sumOfArray").innerHTML = sumOfArray;

/* Output Multiplied by 2 Array */
const multipliedArray = arrayVariable.map(item => item * 2);
document.getElementById("multiplied").innerHTML = multipliedArray;

/* Output Sum of Multiplied by 2 Array */
const sumOfMultiplied = arrayVariable.map(item => item * 2).reduce((sum, item) => sum += item, 0);
document.getElementById("sumOfMultiplied").innerHTML = sumOfMultiplied;
