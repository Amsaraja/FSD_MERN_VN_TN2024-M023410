// Take marks input
const prompt = require("prompt-sync")();
let marks = parseInt(prompt("Enter marks (0–100):"));

// Grade calculation
if (marks >= 90 && marks <= 100) {
    console.log("Grade: A");
} 
else if (marks >= 75 && marks < 90) {
    console.log("Grade: B");
}
else if (marks >= 50 && marks < 75) {
    console.log("Grade: C");
}
else if (marks >= 0 && marks < 50) {
    console.log("Grade: F");
}
else {
    console.log("Invalid marks entered!");
}

// Take age input
let age = parseInt(prompt("Enter age:"));

// Ternary operator
let status = (age >= 18) ? "Adult" : "Minor";

console.log("You are:", status);
