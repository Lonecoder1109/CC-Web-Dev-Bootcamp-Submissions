function divideAsync(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("Cannot divide by zero!");
        } else {
            resolve(a / b);
        }
    });
}

async function safeDivide(a, b) {
    try {
        const result = await divideAsync(a, b);
        console.log("Result:", result);
    } catch (error) {
        console.log("Error:", error);
    }
}

// Test cases
safeDivide(10, 2);
safeDivide(10, 0);