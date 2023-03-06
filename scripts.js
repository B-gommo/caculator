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
        return Number.isInteger(add(a, b)) ? add(a, b) : Number(add(a, b).toFixed(4));
    } else if (operator === '-') {
        return Number.isInteger(subtract(a, b)) ? subtract(a, b) : Number(subtract(a, b).toFixed(4));
    } else if (operator === '*') {
        return Number.isInteger(multiply(a, b)) ? multiply(a, b) : Number(multiply(a, b).toFixed(4));
    } else if (operator === '/') {
        if (b === '0') {
            buttons.forEach(button => {
                button.disabled = true;
            })
            return "Are you trying to break me?"
        } else {
            return Number.isInteger(divide(a, b)) ? divide(a, b) : Number(divide(a, b).toFixed(4));
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
const clearEntry = document.getElementById('clear-entry');
const equals = document.getElementById('equals');

addition.onclick = () => operator = '+';
subtraction.onclick = () => operator = '-';
multiplication.onclick = () => operator = '*';
division.onclick = () => operator = '/';
clear.onclick = () => clears();
clearEntry.onclick = () => display.innerText = '';


numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', function (e) {
        const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
        if (removeEqual[0] !== '=') {
            display.innerText += numberButton.innerText;
            displayValue = display.innerText;
        } else {
            display.innerText += numberButton.innerText;
            displayValue = display.innerText;
            operator = undefined;
            prevOperator = undefined;
            prevButton = undefined;
            firstValue = undefined;
            secondValue = undefined;
            sum = undefined;
            upperDisplay.innerText = '';
            sumDisplay.innerText = '';
        }
    })
});

decimalPoint.addEventListener('click', function (e) {
    const hasDecimal = display.innerText.replace(/[^.]/g, '');
    const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
    if (hasDecimal[0] !== '.' && removeEqual[0] !== '=') {
        if (display.innerText === '') {
            display.innerText = 0 + decimalPoint.innerText;
            displayValue = display.innerText;
            console.log('you are in the top');
        } else {
            display.innerText += decimalPoint.innerText;
            displayValue = display.innerText;
            console.log('you are in the middle');
        }
    } else if (hasDecimal[0] !== '.' && removeEqual[0] === '=') {
        display.innerText = 0 + decimalPoint.innerText;
        displayValue = display.innerText;
        operator = undefined;
        prevOperator = undefined;
        prevButton = undefined;
        firstValue = undefined;
        secondValue = undefined;
        sum = undefined;
        upperDisplay.innerText = '';
        sumDisplay.innerText = '';
        console.log('you are in the bottom');
    } else {
        return;
    }
})

let prevButton;

math.forEach(operatorButton => {
    operatorButton.addEventListener('click', function (e) {
        if (prevButton === undefined) {
            console.log('if');
            if (display.innerText === '') {
                console.log('if return');
                return;
            } else {
                console.log('if - display not empty and prev button not defined')
                prevButton = e.target;
                firstValue = displayValue;
                upperDisplay.innerText += displayValue + ' ' + e.target.innerText;
                display.innerText = '';
            }

        } else if (e.target === prevButton) {
            if (display.innerText === '') {
                console.log(' prev operator the same and display empty');
                return;
            } else {
                console.log('else if - current operator not changed');
                secondValue = displayValue;
                upperDisplay.innerText += ' ' + displayValue + ' ' + e.target.innerText;
                display.innerText = '';
            }



        } else {
            console.log('else');
            if (display.innerText === '') {
                console.log('else - when display empty');
                prevButton = e.target;
                upperDisplay.innerText = upperDisplay.innerText.slice(0, -1) + ' ' + e.target.innerText;
                if (sum === undefined) {
                    return;
                } else {
                    sumDisplay.innerText = sum + ' ' + operator;
                }
                return;
            } else {
                console.log('else - when display NOT empty');
                secondValue = displayValue;
                prevButton = e.target;
                upperDisplay.innerText += ' ' + displayValue + ' ' + e.target.innerText;
                display.innerText = '';
            }
        }
        const runningCalc = upperDisplay.innerText.replace(/[^+-/\*]/g, '').replace(/[.]/g, '');
        const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
        if (runningCalc.length === 1) {
            console.log('1st running calc return');
            prevOperator = runningCalc[runningCalc.length - 1];
            return;
        } else {
            if (sum === undefined) {
                console.log('Additional running calc return - sum undefined');
                prevOperator = runningCalc[runningCalc.length - 2];
                sum = operate(prevOperator, firstValue, secondValue);
                sumDisplay.innerText = sum + ' ' + operator;
            } else {
                console.log('Additional running calc sum defined');
                prevOperator = runningCalc[runningCalc.length - 2];
                sum = operate(prevOperator, sum, secondValue);
                sumDisplay.innerText = sum + ' ' + operator;
            }
        }
    })
});

equals.addEventListener('click', function (e) {
    if (upperDisplay.innerText === '') {
        return;
    }
    prevButton = e.target;
    const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
    if (removeEqual[0] !== '=') {
        if (display.innerText === '') {
            console.log('here');
            if (sum === undefined) {
                sumDisplay.innerText = firstValue;
            } else {
                sumDisplay.innerText = sum;
            }
            upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + '=';
        } else {
            console.log('now here');
            if (sum === undefined) {
                console.log('now here 1');
                secondValue = displayValue;
                sumDisplay.innerText = operate(operator, firstValue, secondValue);
                sum = sumDisplay.innerText;
                upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + operator;
                upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
                display.innerText = '';
            } else {
                console.log('now here 2');
                secondValue = displayValue;
                sumDisplay.innerText = operate(operator, sum, secondValue);
                sum = sumDisplay.innerText;
                upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + operator;
                upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
                display.innerText = '';
            }
        }
    } else {
        return;
    }
})


