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
        return sum = add(a, b);
    } else if (operator === '-') {
        return sum = subtract(a, b);
    } else if (operator === '*') {
        return sum = multiply(a, b);
    } else if (operator === '/') {
        return sum = divide(a, b);
    }
}

function clears() {
    operator = '';
    displayValue = '';
    firstValue = '';
    secondValue = '';
    sum ='';
    display.innerText = '';
    upperDisplay.innerText = '';

}

let operator;
let displayValue;
let firstValue;
let secondValue;
let sum;

const main = document.getElementById('main');
const upperDisplay = document.getElementById('upper-display');
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.num');
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


buttons.forEach(numberButton => {
    numberButton.addEventListener('click', function (e) {
        display.innerText += numberButton.innerText;
        displayValue = display.innerText;
    })

});

math.forEach(operatorButton => {
    operatorButton.addEventListener('click', function (e) {
        if (isNaN(firstValue)) {
            firstValue = displayValue;
        } else {
            secondValue = displayValue;
            sum = operate(operator, firstValue, secondValue);
            firstValue = sum;
        }
        display.innerText = '';
        upperDisplay.innerText += (upperDisplay.childNodes !== true) ? displayValue + ' ' + e.target.innerText:secondValue + ' ' + e.target.innerText ;
    })

});

equals.addEventListener('click', function (e) {
    secondValue = displayValue;
    display.innerText = operate(operator, firstValue, secondValue);
    upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
})


