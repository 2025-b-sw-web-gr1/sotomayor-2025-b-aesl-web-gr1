let currentInput = '';
let previousInput = '';
let operation = undefined;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const subDisplay = document.getElementById('sub-display');

function updateDisplay() {
    display.value = currentInput || '0';
    
    // Formatear subtítulo
    if (operation != null) {
        let opSymbol = '';
        switch(operation) {
            case 'add': opSymbol = '+'; break;
            case 'subtract': opSymbol = '-'; break;
            case 'multiply': opSymbol = '×'; break;
            case 'divide': opSymbol = '÷'; break;
        }
        subDisplay.textContent = `${previousInput} ${opSymbol}`;
    } else {
        subDisplay.textContent = '';
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Evitar múltiples decimales
    if (number === '.' && currentInput.includes('.')) return;
    
    // Evitar ceros a la izquierda innecesarios
    if (number === '0' && currentInput === '0') return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput = currentInput.toString() + number.toString();
    }
    
    updateDisplay();
    showMessage('', ''); // Limpiar errores
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operation = op;
    previousInput = currentInput;
    shouldResetDisplay = true; // El próximo número limpiará la pantalla
    updateDisplay();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                showMessage('No es posible dividir por cero', 'error');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = undefined;
    previousInput = '';
    shouldResetDisplay = true; /* Permitir empezar nuevo número tras resultado */
    
    updateDisplay();
    showMessage('Resultado calculado', 'success');
}

function calculateSqrt() {
    if (currentInput === '') return;
    const current = parseFloat(currentInput);
    
    if (current < 0) {
        showMessage('No existe raíz de negativo', 'error');
        return;
    }
    
    currentInput = Math.sqrt(current).toString();
    shouldResetDisplay = true;
    updateDisplay();
    showMessage('Raíz cuadrada calculada', 'success');
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = undefined;
    shouldResetDisplay = false;
    updateDisplay();
    showMessage('', '');
}

function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
}

// Soporte de teclado físico
document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') calculateResult();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+') setOperation('add');
    if (e.key === '-') setOperation('subtract');
    if (e.key === '*') setOperation('multiply');
    if (e.key === '/') {
        e.preventDefault(); // Evitar búsqueda rápida en Firefox
        setOperation('divide');
    }
});