const toggle = document.querySelector(".toggle");
const screen = document.querySelector("#screen");
const box = document.querySelector(".box");

// Toggle for UI (optional)
toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
});

let screenValue = "";
let currentOperator = "";
let preveousValue = "";

// Event delegation for button clicks

box.addEventListener("click", (e) => {
    const button = e.target.closest("button");


    if (!button) return; // Ignore clicks outside buttons
    const action = button.dataset.action;
    const buttonText = button.textContent;

    if (!action && !isNaN(buttonText)) {
      if (screenValue === "0") {
        screenValue = buttonText;
      } else {
        screenValue += buttonText;
      }
      screen.value = screenValue;
      return;
    }

    if (action === "delete") {
        screenValue = screenValue.slice(0, -1);
        if (screenValue === "") screenValue = "0";
        screen.value = screenValue;
        return;
    }

    if (action === "clear") {
        screenValue = "0";
        screen.value = screenValue;
        return;
    }

    if (action === "decimal") {
        if (!screenValue.includes(".")) {
            screenValue += ".";
            screen.value = screenValue;
        }        
        return;
    }

    if (action === "add" ||
         action === "substract" || 
         action === "multiply" ||
        action === "divide"
    ) {
        if (screenValue === "") return;

        const lastChar = screenValue.slice(-1);

        if ("+-*/".includes(lastChar)) return;

        const operatorMap = {
            add : "+",
            substract : "-",
            multiply : "*",
            divide : "/"
        };

        screenValue += operatorMap[action];
        screen.value = screenValue;
        return;
    }

    if (action === "equal") {
        if (screenValue === "") return;

        const lastChar = screenValue.slice(-1);
        if ("+-*/".includes(lastChar)) return;

        try {
            let result = eval(screenValue);
        screenValue = String(result);
        screen.value = screenValue;
         } catch {
            screenValue = "Error";
            screen.value = screenValue;

         }
    }


});

