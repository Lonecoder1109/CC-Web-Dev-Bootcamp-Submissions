let count = 0;

const intervalId = setInterval(() => {
    console.log("Tick...");
    count++;

    if (count === 5) {
        clearInterval(intervalId);
        console.log("Stopped!");
    }
}, 1000);