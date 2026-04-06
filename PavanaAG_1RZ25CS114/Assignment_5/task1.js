const p1 = new Promise(resolve => setTimeout(() => resolve("User loaded"), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Orders loaded"), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("Products loaded"), 3000));

Promise.all([p1, p2, p3])
    .then(results => {
        results.forEach(result => console.log(result));
    })
    .catch(error => console.log(error));