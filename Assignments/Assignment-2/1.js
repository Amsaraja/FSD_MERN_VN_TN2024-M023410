const prompt = require("prompt-sync")();
let num = parseInt(prompt("Enter a number:"));

// Even or Odd
if (num % 2 === 0) {
    console.log("The number is Even");
} else {
    console.log("The number is Odd");
}

// Positive, Negative, or Zero
if (num > 0) {
    console.log("The number is Positive");
} else if (num < 0) {
    console.log("The number is Negative");
} else {
    console.log("The number is Zero");
}

// Divisible by both 3 and 5
if (num % 3 === 0 && num % 5 === 0) {
    console.log("The number is divisible by both 3 and 5");
} else {
    console.log("The number is NOT divisible by both 3 and 5");
}
