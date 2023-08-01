let expression = "";
let theme = "light-mode";
let operationsLog = [];

function appendNumber(number) {
  expression += number;
  updateScreen();
}

for (let i = 0; i <= 9; i++) {
  document.getElementById(`number${i}`).addEventListener('click', function() { appendNumber(i); });
}

function appendOperator(operator) {
  if (expression !== '') {
    if (operators.includes(expression[expression.length - 1]) && !(operator === '-' && expression[expression.length - 1] === 'x')) {
      expression = expression.slice(0, expression.length - 1) + operator;
    } else {
      expression += operator;
    }
  updateScreen();
  }
}

const operators = ['%', '/', 'x', '-', '+'];
for (let j = 1; j <= 5; j++) {
  document.getElementById(`operator${j}`).addEventListener('click', () => appendOperator(operators[j-1]));
}

function appendDecimal() {
  expression += ".";
  updateScreen();
}

document.getElementById('decimal').addEventListener('click', appendDecimal);

function toggleSign() {
  if (expression !== "") {
    if (expression[0] === "-") {
      expression = expression.slice(1);
    } else {
      expression = "-" + expression;
    }
    updateScreen();
  }
}

document.getElementById('toggleSign').addEventListener('click', toggleSign);

function reset() {
  expression = "";
  updateScreen();
}

document.getElementById('resetBtn').addEventListener('click', reset);

function calculate() {
  if (expression !== ''){
    const result = eval(expression.replaceAll('x', '*'));
    expression = result.toString();
    updateScreen();
    logOperation(expression);
  }
}

document.getElementById('calculate').addEventListener('click', calculate);

function updateScreen() {
  document.getElementById("result").value = expression;
}

function toggleTheme() {
  const calculator = document.querySelector("body");
  if (theme === "light-mode") {
    theme = "dark-mode";
    calculator.classList.remove("light-mode");
    calculator.classList.add("dark-mode");
  } else {
    theme = "light-mode";
    calculator.classList.remove("dark-mode");
    calculator.classList.add("light-mode");
  }
}

function logOperation(operation) {
  operationsLog.push(operation);
  const logList = document.getElementById("logList");
  const listItem = document.createElement("li");
  listItem.textContent = operation;
  logList.appendChild(listItem);
}

updateScreen();