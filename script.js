/*
TODO
enable hover effect when using keyboard input
*/

window.onload = init;

// Function definitions
function init() {
    const box = document.getElementsByClassName("shell")[0];
    const display = document.getElementById("displayText");
    let exp = ["", ""];

    box.addEventListener("click", e => { handleButtonClick(e, display, exp); }, false);
    document.addEventListener("keydown", e => { handleKeyDown(e, display, exp); }, false);
}

function handleButtonClick(e, display, exp) { // Input by clicking buttons
    if (e.target) {
        if (display.textContent.length >= 36) display.textContent = "..."; // Display overflow
        if (exp[0] === "Error!") clear(display, exp);
        if (e.target.matches("div.number")) inputNumber(e, display, exp, "click");
        else if (e.target.matches("div.operator")) inputOperator(e, display, exp, "click");
        else if (e.target.matches("div.allClear")) clear(display, exp);
        else if (e.target.matches("div.equals")) solve(display, exp);
    }
}

function handleKeyDown(e, display, exp) { // Input from keyboard
    if (display.textContent.length >= 36) display.textContent = "..."; // Display overflow
    if (exp[0] === "Error!") clear(display, exp);
    if (e.key === "Backspace") delLastChar(display, exp);
    else if (e.key === "Enter") solve(display, exp);
    else if (/^\d+$/.test(e.key) || e.key === ".") inputNumber(e, display, exp, "key");
    else if (/^[+\-*%/()]$/.test(e.key)) inputOperator(e, display, exp, "key");
}

function clear(display, exp) {
    exp[0] = "";
    exp[1] = "";
    display.textContent = "";
}

function inputNumber(e, display, exp, inputType) {
    let target = (inputType === "click") ? e.target.innerHTML : e.key;
    if (exp[1] === "ans" && exp[0] != "") {
        exp[0] = target;
        display.textContent = exp[0];
        exp[1] = "";
    }
    else {
        display.textContent += target;
        exp[0] += target;
    }
}

function inputOperator(e, display, exp, inputType) {
    exp[1] = "";
    if (inputType === "click") {
        display.textContent += e.target.innerHTML;
        if (e.target.id === "multiply") exp[0] += "*";
        else if (e.target.id === "divide") exp[0] += "/";
        else exp[0] += e.target.innerHTML;
    }
    else {
        if (e.key === "+" || e.key === "-"
            || e.key === "%" || e.key === "("
            || e.key === ")") display.textContent += e.key;
        else if (e.key === "*" || e.key === "/") {
            const opID = (e.key === "*") ? "multiply" : "divide";
            const div = document.getElementById(opID);
            display.textContent += div.innerHTML;
        }
        exp[0] += e.key;
    }
}

function solve(display, exp) {
    if (exp[0] !== "") {
        try {
            display.textContent = math.evaluate(exp[0]);
        }
        catch(e) {
            display.textContent = "Error!";
        }
        exp[0] = display.textContent;
        exp[1] = "ans";
    }
}

function delLastChar(display, exp) {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    exp[0] = display.textContent;
}