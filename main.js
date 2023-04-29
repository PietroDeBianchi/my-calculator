// Get the calculator element from the HTML and the display input
const calculator = document.querySelector("#calculator");
const display = document.querySelector("input[name='display']");

// Set initial values for operands, operator, and result
let firstOperand = null;
let operator = null;
let secondOperand = null;
let result = null;

// Get all the buttons on the calculator and add event listeners to each button
const buttons = calculator.querySelectorAll("input[type='button']");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Get the value of the button that was clicked
        const value = button.value;
        // Switch statement to determine which operation to perform based on the button value
        switch (value) {
            case "AC":
                // If AC button is clicked, clear the display and reset the values of operands, operator, and result
                clearDisplay();
                break;
            case "DEL":
                // If DEL button is clicked, delete the last character from the display
                deleteLastChar();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                // If an operator button is clicked, set the operator value and store the first operand in the firstOperand variable
                setOperator(value);
                break;
            case "=":
                // If the equal sign is clicked, calculate the result of the expression
                calculateResult();
                break;
            default:
                // If a number or decimal point is clicked, append it to the display
                appendChar(value);
                break;
        }
    });
});

// Function to clear the display and reset the values of operands, operator, and result
function clearDisplay() {
    display.value = "";
    firstOperand = null;
    operator = null;
    secondOperand = null;
    result = null;
};

// Function to delete the last character from the display
function deleteLastChar() {
    display.value = display.value.slice(0, -1);
};

// Function to set the operator and store the first operand
function setOperator(value) {
    if (firstOperand === null) {
        // If the first operand is null, store the current display value in the firstOperand variable and set the operator
        firstOperand = Number(display.value);
        operator = value;
        display.value = "";
    } else {
        // If the first operand is not null, store the current display value in the secondOperand variable and calculate the result using the firstOperand, operator, and secondOperand
        secondOperand = Number(display.value);
        result = operate(firstOperand, operator, secondOperand);
        display.value = result;
        firstOperand = result;
        operator = value;
        secondOperand = null;
        result = null;
    }
};

// Function to calculate the result of the expression using the firstOperand, operator, and secondOperand
function calculateResult() {
    secondOperand = addCommasToNumber(display.value);
    result = operate(firstOperand, operator, secondOperand);
    display.value = addCommasToNumber(result);
    firstOperand = result;
    operator = null;
    secondOperand = null;
};


// Function to append a character to the display
function appendChar(value) {
    display.value += value;
};

// Function to perform the arithmetic operation using the two operands and the operator
function operate(num1, operator, num2) {
    num1 = num1.toString().replace(/,/g, '');
    num2 = num2.toString().replace(/,/g, '');

    switch (operator) {
        case "+":
            return Number(num1) + Number(num2);
        case "-":
            return Number(num1) - Number(num2);
        case "*":
            return Number(num1) * Number(num2);
        case "/":
            return Number(num1) / Number(num2);
    }
};



function appendChar(value) {
    // Remove any commas from the displayed value
    const displayedValue = display.value.replace(/,/g, '');

    // Append the new value and add commas back to the displayed value
    const newValue = displayedValue + value;
    display.value = addCommasToNumber(newValue);
};

function addCommasToNumber(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
}
