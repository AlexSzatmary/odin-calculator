const OPS = "+-*/".split("");
let a = 0;
let op;
let b;

function isStartingB() {
  return op !== undefined && b === undefined;
}

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
    // case "=":
    //   return divide(a, b);
    //   break;
    // case "AC":
    //   return divide(a, b);
    //   break;
    default:
      return "OOF";
      break;
  }
}

function handle_input(key) {
  disp = document.querySelector("#display");
  if ("0" <= key && key <= "9") {
    if (isStartingB()) {
      disp.textContent = key;
      b = +key;
    } else if (disp.textContent === "0") {
      disp.textContent = key;
    } else {
      disp.textContent += key;
    }
  } else if (OPS.includes(key)) {
    if (op !== undefined) {
      // an op is already entered
      handle_input("=");
      op = key;
    } else {
      a = disp.textContent;
      op = key;
    }
  } else if (key == ".") {
    // TODO
  } else if (key == "=") {
    if (op !== undefined && b !== undefined) {
      console.log("=");
      console.log(a, op, b);
      a = operate(+a, op, +disp.textContent);
      disp.textContent = a;
      op = undefined;
      b = undefined;
      console.log(a, op, b);
    }
  } else if (key == "AC") {
    disp.textContent = "0";
    a = 0;
    op = undefined;
    b = undefined;
  }
}

for (const btn of document.querySelectorAll("button")) {
  btn.addEventListener("click", () => handle_input(btn.id));
}
