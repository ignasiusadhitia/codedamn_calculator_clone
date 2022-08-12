const calculator = {
  displayValue: "0" /*holds the current value of the display*/,
  firstOperand: null /*holds the first operand*/,
  waitingForSecondOperand: false /*is true if the user is waiting for a second operand*/,
  operator: null /*holds the operator*/,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;

  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;

    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateCalculatorDisplay() {
  const calculatorDisplay = document.getElementById("calculatorDisplay");
  calculatorDisplay.innerText = calculator.displayValue;
}

updateCalculatorDisplay();

const calculatorButtons = document.getElementById("calculatorButtonsContainer");
calculatorButtons.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateCalculatorDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateCalculatorDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateCalculatorDisplay();
    return;
  }

  if (target.classList.contains("delete")) {
    if (calculator.displayValue.length > 1) {
      calculator.displayValue = calculator.displayValue.slice(0, -1);
    } else {
      calculator.displayValue = "0";
    }

    updateCalculatorDisplay();
    return;
  }

  inputDigit(target.value);
  updateCalculatorDisplay();
});
