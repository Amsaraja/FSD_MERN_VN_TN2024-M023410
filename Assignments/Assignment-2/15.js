let expenses = [2000, 1500, 3500, 4000];

function totalExpenses(exp) {
    let total = 0;
    for (let i = 0; i < exp.length; i++) {
        total += exp[i];
    }
    console.log("Total Money Spent: ₹" + total);
}

totalExpenses(expenses);
