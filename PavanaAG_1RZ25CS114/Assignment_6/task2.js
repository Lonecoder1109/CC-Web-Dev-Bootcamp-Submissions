const p1 = new Promise(resolve => setTimeout(() => resolve("User loaded"), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Orders loaded"), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("Products loaded"), 3000));

async function runAll() {
    const r1 = await p1;
    console.log(r1);

    const r2 = await p2;
    console.log(r2);

    const r3 = await p3;
    console.log(r3);

    console.log("All done!");
}

runAll();