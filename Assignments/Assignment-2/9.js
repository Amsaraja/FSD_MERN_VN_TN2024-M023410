let person1 = 300;
let person2 = 500;

let result = (person1 > person2)
    ? `Person 1 earns more by ₹${person1 - person2}`
    : (person2 > person1)
        ? `Person 2 earns more by ₹${person2 - person1}`
        : "Both earn the same amount";

console.log(result);
