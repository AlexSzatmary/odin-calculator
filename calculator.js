const OPS = "+-*/".split("");
let a = 0;
let op;
let b;
concatDigits = false;

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

function operate(a, op, b) {
  switch (op) {
    case "+":
      console.log("+", a, b, add(a, b));
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    default:
      return "OOF";
      break;
  }
}

function handle_input(key) {
  disp = document.querySelector("#display");
  if ("0" <= key && key <= "9") {
    if (concatDigits) {
      disp.textContent += key;
    } else if (b !== undefined && !concatDigits) {
      disp.textContent = key;
      concatDigits = true;
      op = undefined;
      b = undefined;
    } else {
      disp.textContent = key;
      concatDigits = true;
    }
  } else if("." == key) {
    if (concatDigits && disp.textContent.includes(".")){
      // pass to not have multiple .
    } else if (concatDigits) {
      disp.textContent += key;
    } else if (b !== undefined && !concatDigits) {
      disp.textContent = "0.";
      concatDigits = true;
      op = undefined;
      b = undefined;
    } else {
      disp.textContent = "0.";
      concatDigits = true;
    }
  } else if (OPS.includes(key)) {
    if (op === undefined) {
      a = disp.textContent;
      op = key;
      concatDigits = false;
    } else {
      // an op is already entered
      console.log(op);
      console.log(a, op, b);
      a = operate(+a, op, +disp.textContent);
      disp.textContent = a;

      op = key;
      concatDigits = false;
      console.log(a, op, b);
    }
  } else if (key == "=") {
    if (op !== undefined && !concatDigits && b !== undefined) {
      console.log("=");
      console.log(a, op, b);
      a = operate(+a, op, +b);
      disp.textContent = a;
      // concatDigits = false;
      console.log(a, op, b);
    } else if (op !== undefined) {
      console.log("=");
      b = disp.textContent;
      console.log(a, op, +disp.textContent);
      a = operate(+a, op, +disp.textContent);
      disp.textContent = a;
      concatDigits = false;
      console.log(a, op, b);
    }
  } else if (key == "AC") {
    disp.textContent = "0";
    a = 0;
    op = undefined;
    b = undefined;
    concatDigits = false;
  }
}

for (const btn of document.querySelectorAll("button")) {
  btn.addEventListener("click", () => handle_input(btn.id));
}
