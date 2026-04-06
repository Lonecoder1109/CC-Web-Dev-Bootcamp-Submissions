let count = 5;

const intervalId = setInterval(() => {
    console.log(count);
    count--;

    if (count < 0) {
        clearInterval(intervalId);
        console.log("Time's up!");
    }
}, 1000);