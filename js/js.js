const keys = document.querySelectorAll(".button");
const display_input = document.querySelector(".input");
const display_output = document.querySelector(".output");
const display_secret_info = document.querySelector(".secret-info");
let input = "";
let output = "";
let previousResult = "";
let force_number = 0;
let currentDigitIndex = 0;
display_output.innerHTML = "0";

function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">x</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">÷</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == "(") {
            input_array[i] = `<span class="brackets">(</span>`;
        } else if (input_array[i] == ")") {
            input_array[i] = `<span class="brackets">)</span>`;
        } else if (input_array[i] == "%") {
            input_array[i] = `<span class="percent">%</span>`;
        }
    }

    return input_array.join("");
}
function CleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}

for (let button of keys) {
    const value = button.dataset.button;

    button.addEventListener('click', () => {
        display_output.innerHTML = "";

        if (output == "") {
            document.querySelector(".input").style.color = "white";
            document.querySelector(".input").style.fontSize = "3rem";
        }
        if (value !== "clear" && value !== "=" && value !== "+" && value !== "-" && value !== "/" && value !== "%" && value !== "schimbare-semn") {
            document.querySelector(".backspace").style.zIndex = "1";
        }
        if (value === "clear") {
            input = "";
            previousResult = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "0";
        }
        else if (value === "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);
        }
        else if (value == "==") {
            number_needed = force_number - (parseFloat(previousResult) || 0);
            display_output.innerHTML = force_number;
            document.querySelector(".secret-info").style.display = "none";
            document.querySelector(".backspace").style.zIndex = "-1";
            document.querySelector(".input").style.color = "#57575b";
            document.querySelector(".input").style.fontSize = "1.4rem";
        }
        else if (value === "=") {
            try {
                let result = eval(input);
                display_output.innerHTML = CleanOutput(result);
                previousResult = result;
                input = "";
            } catch (error) {
                display_output.innerHTML = "Error";
                previousResult = "";
            }
            document.querySelector(".backspace").style.zIndex = "-1";
            document.querySelector(".input").style.color = "#57575b";
            document.querySelector(".input").style.fontSize = "1.4rem";
        }
        else {
            if (previousResult !== "") {
                input = previousResult + value;
                previousResult = "";
            } else {
                input += value;
            }
            display_input.innerHTML = CleanInput(input);
        }

        if (document.querySelector(".backspace").click && input == "") {
            document.querySelector(".backspace").style.zIndex = "-1";
        }
    });
}

document.querySelector(".submit_button").onclick = function () {
    force_number = parseFloat(document.querySelector(".force-number").value) || 0;
    document.querySelector(".input-force-number").style.display = "none";
};
let number_needed = 0;
const secrete_button = document.querySelector(".history-button-wrapper");

let clickcount = 0;
let secret_number = 0;
secrete_button.addEventListener('click', () => {
    document.querySelector(".touch_no_button").style.display = "block";
    number_needed = force_number - (parseFloat(previousResult) || 0);
    secret_number = number_needed.toString().length;
    display_output.innerHTML = display_output.innerHTML + "+";

    display_secret_info.innerHTML = secret_number;
});

document.querySelector(".touch_no_button").onclick = function () {
    const digits = number_needed.toString().split("");

    if (currentDigitIndex < digits.length) {
        display_output.innerHTML += digits[currentDigitIndex];
        currentDigitIndex++;
    }

    clickcount++;

    if (clickcount == secret_number) {
        document.querySelector(".touch_no_button").style.display = 'none';
        document.querySelector(".copie").style.zIndex = '1';
    }
}
// Scroll to the end whenever the display input/output updates
function scrollToEnd(container) {
    container.scrollLeft = container.scrollWidth;
}
