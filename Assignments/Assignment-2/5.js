// Create an array of 5 numbers
let numbers = [10, 25, 7, 40, 18];

// Calculate the sum
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}
console.log("Sum of numbers:", sum);

// Find the largest number
let largest = numbers[0];
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
        largest = numbers[i];
    }
}
console.log("Largest number:", largest);
