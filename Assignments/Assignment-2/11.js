const prompt = require("prompt-sync")();
let choice = parseInt(prompt("Enter your choice (1, 2, or 3):"));

switch (choice) {
    case 1:
        console.log("Data Pack");
        break;

    case 2:
        console.log("Talktime");
        break;

    case 3:
        console.log("Validity Recharge");
        break;

    default:
        console.log("Invalid Choice");
}
