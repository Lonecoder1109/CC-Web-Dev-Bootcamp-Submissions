const p1 = new Promise(resolve => setTimeout(() => resolve("User loaded"), 1000));
const p2 = new Promise((_, reject) => setTimeout(() => reject("Server error"), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("Products loaded"), 3000));

Promise.allSettled([p1, p2, p3])
    .then(results => {
        results.forEach(result => {
            if (result.status === "fulfilled") {
                console.log("fulfilled -", result.value);
            } else {
                console.log("rejected  -", result.reason);
            }
        });
    });