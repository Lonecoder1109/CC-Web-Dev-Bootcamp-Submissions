function checkAge(age) {
    if (age <= 0) {
        throw new Error("Age must be a positive number!");
    }
    if (age < 18) {
        throw new Error("Too young! Must be 18 or above.");
    }
    console.log("Access granted!");
}

const ages = [25, 15, -1];

ages.forEach(age => {
    try {
        checkAge(age);
    } catch (error) {
        console.log("Error:", error.message);
    }
});