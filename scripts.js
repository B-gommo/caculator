function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(operator, a, b) {
    if (operator === '+') {
        return Number.isInteger(add(a, b)) ? add(a, b) : add(a, b).toFixed(4);
    } else if (operator === '-') {
        return Number.isInteger(subtract(a, b)) ? subtract(a, b) : subtract(a, b).toFixed(4);
    } else if (operator === '*') {
        return Number.isInteger(multiply(a, b)) ? multiply(a, b) : multiply(a, b).toFixed(4);
    } else if (operator === '/') {
        if (b === '0') {
            buttons.forEach(button => {
                button.disabled = true;
            })
            return "Are you trying to break me? You can't devide by zero friend."
        } else {
            return Number.isInteger(divide(a, b)) ? divide(a, b) : divide(a, b).toFixed(4);
        }
    }
}

function clears() {
    operator = undefined;
    prevOperator = undefined;
    prevButton = undefined;
    displayValue = undefined;
    firstValue = undefined;
    secondValue = undefined;
    sum = undefined;
    display.innerText = '';
    upperDisplay.innerText = '';
    sumDisplay.innerText = '';
    buttons.forEach(button => {
        button.disabled = false;
    })
}

let operator;
let prevOperator;
let displayValue;
let firstValue;
let secondValue;
let sum;

const main = document.getElementById('main');
const upperDisplay = document.getElementById('upper-display');
const sumDisplay = document.getElementById('sum-display');
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.disable');
const numberButtons = document.querySelectorAll('.num');
const decimalPoint = document.getElementById('decimal');
const math = document.querySelectorAll('.math');
const addition = document.getElementById('addition');
const subtraction = document.getElementById('subtraction');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

addition.onclick = () => operator = '+';
subtraction.onclick = () => operator = '-';
multiplication.onclick = () => operator = '*';
division.onclick = () => operator = '/';
clear.onclick = () => clears();


numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', function (e) {
        display.innerText += numberButton.innerText;
        displayValue = display.innerText;
    })
});

decimalPoint.addEventListener('click', function (e) {
    const hasDecimal = display.innerText.replace(/[^.]/g, '');
    if (hasDecimal[0] !== '.') {
        display.innerText += decimalPoint.innerText;
        displayValue = display.innerText;
    } else {
        return;
    }
})

let prevButton;

math.forEach(operatorButton => {
    operatorButton.addEventListener('click', function (e) {
        /*if (display.innerText === '') {
            return;
        }*/
        if (prevButton === undefined) {
            console.log('if');
            prevButton = e.target;
        } else if (e.target === prevButton) {     /// Eureka!! Need to pop code in to construct upper display and run operate with the correct operator
            console.log('else if');               /// base this off if the operator button is the same or different from previous.
        } else {
            console.log('else');
            prevButton = e.target;
        }
        /*const runningCalc = upperDisplay.innerText.replace(/[^+-/\*]/g, '');
        const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
        prevOperator = runningCalc[runningCalc.innerText.length-1];
        sum = operate(prevOperator, sum, secondValue);
        sumDisplay.innerText = sum + operator;
        

        display.innerText = '';
        if (removeEqual[0] !== '=') {
            upperDisplay.innerText += displayValue + ' ' + e.target.innerText;
        } else {
            upperDisplay.innerText = upperDisplay.innerText.slice(0, -1) + ' ' + e.target.innerText;
        }*/
    })
});

equals.addEventListener('click', function (e) {
    if (upperDisplay.innerText === '') {
        return;
    }
    const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
    if (removeEqual[0] !== '=') {
        if (display.innerText === '') {
            display.innerText = sum;
            sumDisplay.innerText = '';
            upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + '=';
        } else {
            secondValue = displayValue;
            display.innerText = operate(operator, sum, secondValue);
            upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + operator;
            upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
            sumDisplay.innerText = '';
        }
    } else {
        return;
    }
})


