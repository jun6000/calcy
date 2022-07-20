/*
TODO
enable click and type support (try using input instead of p)
cleanup code
*/

// Main
const box = document.getElementsByClassName("shell")[0];
const display = document.getElementById("displayText");
let exp = ["", ""];

// Input by clicking buttons
box.addEventListener("click", e => {
    if(display.textContent.length >= 36) display.textContent = "...";
    if(e.target) {
        if(exp[0] === "Error!") {
            exp = ["", ""];
            display.textContent = "";
        }
        if(e.target.matches("div.number")) {
            if(exp[1] === "ans" && exp[0] != "") {
                exp[0] = e.target.innerHTML;
                display.textContent = exp[0];
                exp[1] = "";
            }
            else {
                display.textContent += e.target.innerHTML;
                exp[0] += e.target.innerHTML;
            }
        }
        else if(e.target.matches("div.operator")) {
            display.textContent += e.target.innerHTML;
            exp[1] = "";
            if(e.target.id === "multiply") exp[0] += "*";
            else if(e.target.id === "divide") exp[0] += "/";
            else exp[0] += e.target.innerHTML;
        }
        else if(e.target.matches("div.allClear")) {
            display.textContent = "";
            exp = ["", ""];
        }
        else if(e.target.matches("div.equals")) {
            if(exp[0] !== "") {
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
    }
});

// Input from keyboard
document.addEventListener("keydown", e => {
    if(e.key === "Backspace") {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        exp[0] = display.textContent;
    }
    else if(e.key === "Enter") {
        if(exp[0] !== "") {
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
    else if(/^\d+$/.test(e.key) || e.key === ".") {
        if(exp[1] === "ans" && exp[0] != "") {
            exp[0] = e.key;
            display.textContent = exp[0];
            exp[1] = "";
        }
        else {
            display.textContent += e.key;
            exp[0] += e.key;
        }
    }
    else {
        exp[1] = "";
        if(e.key === "-") {
            display.textContent += e.key;
            exp[0] += e.key;
        }
        else if(e.key === "/") {
            const div = document.getElementById("divide");
            display.textContent += div.innerHTML;
            exp[0] += e.key;
        }
        // else if(e.key === "=" && e.shiftKey) {
        //     display.textContent += "+";
        //     exp[0] += "+";
        // }
        // else if(e.key === "8" && e.shiftKey) {
        //     const div = document.getElementById("multiply");
        //     display.textContent += div.innerHTML;
        //     exp[0] += "*";
        // }
    }
});