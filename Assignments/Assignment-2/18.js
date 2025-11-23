function startExam(callback) {
    setTimeout(() => {
        console.log("Exam started");
        callback();
    }, 1000);
}

function evaluateExam(callback) {
    setTimeout(() => {
        console.log("Evaluating answers");
        callback();
    }, 1500);
}

function declareResult() {
    setTimeout(() => {
        console.log("Result declared");
    }, 1000);
}

// Execute in correct order
startExam(() => {
    evaluateExam(() => {
        declareResult();
    });
});
