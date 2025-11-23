
let name = "Amsaraja";   // You can replace this with any name

// 1. Print greeting message
let message = `Hello, ${name}! Welcome to JavaScript.`;
console.log(message);

// 2. Convert the name to uppercase
let upperName = name.toUpperCase();
console.log("Uppercase Name:", upperName);

// 3. Check if the message has more than 10 characters
if (message.length > 10) {
    console.log("The message has more than 10 characters.");
} else {
    console.log("The message has 10 or fewer characters.");
}

// 4. Check if message contains the word "JavaScript"
if (message.includes("JavaScript")) {
    console.log("The message contains the word 'JavaScript'.");
} else {
    console.log("The message does NOT contain the word 'JavaScript'.");
}
