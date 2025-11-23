const prompt = require("prompt-sync")();
let busNumber = parseInt(prompt("Enter the bus number:"));

if (busNumber % 2 === 0) {
    console.log("The bus goes to Route A (Even).");
} else {
    console.log("The bus goes to Route B (Odd).");
}
