const buttons = document.querySelectorAll("button");
const display = document.getElementById("input");
let isEqualButtonPressed = false;

document.addEventListener("keydown", (event) => {
    const key = event.key;
    const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ".", "/", "*", "-", "+", "%"];

    if (validKeys.includes(key)) {
        event.preventDefault();
        handleButtonClick(key);
    }
    if (key === "Enter") {
        event.preventDefault();
        handleButtonClick("=");
    }
    if (key === "Backspace") {
        event.preventDefault();
        handleButtonClick("CE");
    }
    if (key === "Escape") {
        event.preventDefault();
        handleButtonClick("C");
    }
});

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        handleButtonClick(event.currentTarget.dataset.key);
    });
});

function handleButtonClick(buttonText) {
    const lastChar = display.value.slice(-1);
    const operator = ["*", "/", "-", "+"];

    if (isEqualButtonPressed && !["C", "CE",
        "=", "*", "/", "-", "+", "%", "."].includes(buttonText)) {
        return;
    }

    if (buttonText === "C") {
        display.value = "";
        isEqualButtonPressed = false;
    } else if (buttonText === "CE") {
        if (isEqualButtonPressed) {
            return;
        }
        display.value = display.value.slice(0, -1);
    } else if (buttonText === "=") {
        try {
            const result = new Function('return ' + display.value)();
            display.value = isFinite(result) ? result : 'Error';
        } catch (error) {
            display.value = 'Error';
        } finally {
            isEqualButtonPressed = true;
        }
    } else if (operator.includes(buttonText)) {
        if (!operator.includes(lastChar) && display.value !== "") {
            display.value += buttonText;
            isEqualButtonPressed = false;
        }
    } else if (buttonText === "%") {
        if (!["%"].includes(lastChar) && display.value !== "") {
            display.value += buttonText;
            isEqualButtonPressed = false;
        }
    } else if (buttonText === ".") {
        if (display.value.indexOf(".") === -1) {
            display.value += buttonText;
            isEqualButtonPressed = false;
        }
    } else if (buttonText === "+/-") {
        if (display.value.charAt(0) === "-") {
            display.value = display.value.slice(1);
        } else {
            display.value = "-" + display.value;
        }
    } else {
        display.value += buttonText;
        isEqualButtonPressed = false;
    }
}

