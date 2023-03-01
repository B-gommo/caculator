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
        add(a, b);
    } else if (operator === '-') {
        subtract(a, b);
    } else if (operator === '*') {
        multiply(a, b);
    } else if (operator === '/') {
        divide(a, b);
    }
}

function clears() {
    operator = '';
    displayValue = '';
    firstValue = '';
    secondValue = '';
    display.innerText = '';
    const findCurrentCalcDisplay = document.getElementById('currentCalculation');
    findCurrentCalcDisplay.remove();

}

let operator;
let displayValue;
let firstValue;
let secondValue;

const main = document.getElementById('main');
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.num');
const math = document.querySelectorAll('.math');
const addition = document.getElementById('addition');
const subtraction = document.getElementById('subtraction');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

addition.onclick = () => operator = 'add';
subtraction.onclick = () => operator = 'subtract';
multiplication.onclick = () => operator = 'multiply';
division.onclick = () => operator = 'divide';
clear.onclick = () => clears();

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        display.innerText += button.innerText;
        displayValue = display.innerText;
    })
    
});

math.forEach(button => {
    button.addEventListener('click', function(e) {
        firstValue = displayValue;
        display.innerText = '';
        const currentCalculation = document.createElement('p');
        currentCalculation.innerText = firstValue + ' ' + e.target.innerText;
        currentCalculation.setAttribute('id', 'currentCalculation');
        main.insertBefore(currentCalculation, display);
    })
    
});

equals.addEventListener('click', function(e) {
    secondValue = displayValue;
    const findCurrentCalcDisplay = document.getElementById('currentCalculation');
    findCurrentCalcDisplay.innerText = findCurrentCalcDisplay.innerText + ' ' + secondValue + ' ' + '=';
    if (operator === 'add'){
        display.innerText = add(firstValue, secondValue);
    } else if (operator === 'subtract'){
        display.innerText = subtract(firstValue, secondValue);
    } else if (operator === 'multiply'){
        display.innerText = multiply(firstValue, secondValue);
    } else if (operator === 'divide'){
        display.innerText = divide(firstValue, secondValue);
    } 
})


