// DOM Elements
const displayPrevOperation = document.querySelector('.prev-operation');
const displayCurrentOperation = document.querySelector('.current-operation');
const buttons = document.querySelectorAll('.btn');

let prevOperand = '';
let currentOperand = '';
let operation = null;

// Update the display
function updateDisplay() {
    displayCurrentOperation.textContent = currentOperand || '0';
    displayPrevOperation.textContent = operation 
        ? `${prevOperand} ${operation}` 
        : '';
}

// Handle number button clicks
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
}

// Handle operator button clicks
function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (prevOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    prevOperand = currentOperand;
    currentOperand = '';
}

// Perform the computation
function compute() {
    let result;
    const prev = parseFloat(prevOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    } 

    // Round the result to 5 decimal places if it's a number
    currentOperand = 
    result === "Error" ? result : Math.round(result * 100000) / 100000;

    operation = null;
    prevOperand = '';
}

// Clear all inputs
function clearAll() {
    prevOperand = '';
    currentOperand = '';
    operation = null;
}

// Delete the last character
function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

// Add event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number-btn')) {
            appendNumber(button.textContent);
        } else if (button.classList.contains('operator-btn')) {
            chooseOperation(button.textContent);
        } else if (button.classList.contains('equals-btn')) {
            compute();
        } else if (button.classList.contains('btn-clear')) {
            clearAll();
        } else if (button.classList.contains('btn-delete')) {
            deleteLast();
        }
        updateDisplay();
    });
});
