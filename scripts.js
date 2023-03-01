function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === '+') {
        add(a, b);
    } else if (operator === '-') {
        subtract(a, b);
    } else if (operator === '*') {
        multiply(a, b);
    } else if (operator === '/') {
        devide(a, b);
    }
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.num');
const add = document.getElementById('add');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const clear = document.getElementById('clear');

let displayValue;
buttons.forEach(button => {
    button.addEventListener('click', function(e){
        display.innerText += button.innerText;
        displayValue = display.innerText;
    })
    
});

console.log(displayValue);
