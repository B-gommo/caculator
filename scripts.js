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
        return add(a, b).toFixed(4);
    } else if (operator === '-') {
        return subtract(a, b).toFixed(4);
    } else if (operator === '*') {
        return multiply(a, b).toFixed(4);
    } else if (operator === '/') {
        return divide(a, b).toFixed(4);
    }

}

function clears() {
    operator = undefined;
    prevOperator = undefined;
    displayValue = undefined;
    firstValue = undefined;
    secondValue = undefined;
    sum = undefined;
    display.innerText = '';
    upperDisplay.innerText = '';
    sumDisplay.innerText = '';
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

decimalPoint.addEventListener('click', function(e) {
    const hasDecimal = display.innerText.replace(/[^.]/g, '');
    if(hasDecimal[0] !== '.'){
        display.innerText += decimalPoint.innerText;
        displayValue = display.innerText;
    } else {
        return;
    }   
})

math.forEach(operatorButton => {
    operatorButton.addEventListener('click', function (e) {
        if(display.innerText === '') {
            sumDisplay.innerText = sum + operator;
            prevOperator = e.target.innerText;
            return;
        }
        const runningCalc = upperDisplay.innerText.replace(/[^+-/\*]/g, '');
        const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
        prevOperator = runningCalc[runningCalc.length-1];
        if (isNaN(firstValue)) {
            firstValue = displayValue;
            sum = displayValue;
        } else {
            secondValue = displayValue;
            sum = operate(prevOperator, sum, secondValue);
            sumDisplay.innerText = sum + operator;
        }
        display.innerText = '';
        if(removeEqual[0] !== '='){
        upperDisplay.innerText += displayValue + ' ' + e.target.innerText;
        } else {
            upperDisplay.innerText = upperDisplay.innerText.slice(0, -1) + ' ' + e.target.innerText;
        }
    })
});

equals.addEventListener('click', function (e) {
    const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
    if(removeEqual[0] !== '='){
        secondValue = displayValue;
        display.innerText = operate(operator, sum, secondValue);
        upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
        sumDisplay.innerText = '';
        } else {
            return;
        }
})


