const toggle = document.querySelector(".toggle");
const screen = document.querySelector("#screen");
const box = document.querySelector(".box");

// Toggle UI (optional)
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  document.body.classList.toggle("dark");
});

let screenValue = "0";
let justCalculated = false; // ⭐ result ke baad state

box.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const buttonText = button.textContent;

  /* ---------- NUMBER ---------- */
  if (!action && !isNaN(buttonText)) {
    if (justCalculated) {
      screenValue = buttonText;
      justCalculated = false;
    } else {
      screenValue = screenValue === "0" ? buttonText : screenValue + buttonText;
    }
    updateScreen();
    return;
  }

  /* ---------- CLEAR ---------- */
  if (action === "clear") {
    screenValue = "0";
    justCalculated = false;
    updateScreen();
    return;
  }

  /* ---------- DELETE ---------- */
  if (action === "delete") {
    if (justCalculated) {
      screenValue = "0";
      justCalculated = false;
    } else {
      screenValue = screenValue.slice(0, -1);
      if (screenValue === "") screenValue = "0";
    }
    updateScreen();
    return;
  }

  /* ---------- DECIMAL ---------- */
if (action === "decimal") {

  // agar result ke baad decimal press hua
  if (justCalculated) {
    screenValue = "0.";
    justCalculated = false;
    updateScreen();
    return;
  }

  // last operator ke baad ka number nikaalo
  const parts = screenValue.split(/[\+\-\*\/]/);
  const lastNumber = parts[parts.length - 1];

  // agar current number me already decimal hai
  if (lastNumber.includes(".")) return;

  // agar last character operator hai
  const lastChar = screenValue.slice(-1);
  if ("+-*/".includes(lastChar)) {
    screenValue += "0.";
  } else {
    screenValue += ".";
  }

  updateScreen();
  return;
}


  /* ---------- OPERATORS ---------- */
  if (["add", "subtract", "multiply", "divide"].includes(action)) {
    const lastChar = screenValue.slice(-1);
    if ("+-*/".includes(lastChar)) return;

    const operatorMap = {
      add: "+",
      subtract: "-",
      multiply: "*",
      divide: "/",
    };

    screenValue += operatorMap[action];
    justCalculated = false;
    updateScreen();
    return;
  }

  /* ---------- PERCENTAGE ---------- */
if (action === "percent") {

  // agar result ke baad % dabaya
  if (justCalculated) {
    screenValue = String(Number(screenValue) / 100);
    justCalculated = false;
    updateScreen();
    return;
  }

  // expression ko todna (last operator dhundhne ke liye)
  const match = screenValue.match(/([\+\-\*\/])(\d+\.?\d*)$/);

  // case 1: single number (50 %)
  if (!match) {
    screenValue = String(Number(screenValue) / 100);
    updateScreen();
    return;
  }

  // case 2: operator ke saath (200 + 10 %)
  const operator = match[1];
  const percentValue = Number(match[2]);

  const baseValue = Number(
    screenValue.slice(0, screenValue.lastIndexOf(operator))
  );

  let result;

  if (operator === "+" || operator === "-") {
    result = baseValue * (percentValue / 100);
  } else if (operator === "*") {
    result = percentValue / 100;
  } else if (operator === "/") {
    result = percentValue / 100;
  }

  screenValue =
    baseValue + operator + result;

  updateScreen();
  return;
}


if (action === "equal") {
  const lastChar = screenValue.slice(-1);
  if ("+-*/".includes(lastChar)) return;

  try {
    let result = Function(`"use strict"; return (${screenValue})`)();

    // 🔥 FIX FOR DECIMAL PRECISION
    result = Number.isInteger(result)
      ? result
      : parseFloat(result.toFixed(10));

    screenValue = String(result);
    justCalculated = true;
  } catch {
    screenValue = "Error";
  }

  updateScreen();
}

  
});

/* ---------- SCREEN UPDATE ---------- */
function updateScreen() {
  screen.value = screenValue;

  // font resize for long numbers
  if (screen.value.length > 12) {
    screen.classList.add("long");
  } else {
    screen.classList.remove("long");
  }

  // auto scroll right
  screen.scrollLeft = screen.scrollWidth;
}
