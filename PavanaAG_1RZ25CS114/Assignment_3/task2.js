try {
    JSON.parse("not a number");
} catch (error) {
    console.log("Invalid JSON!");
} finally {
    console.log("Parsing attempt done.");
}