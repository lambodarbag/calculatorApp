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
    screen.value = screenValue;

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
if (
  action === "add" ||
  action === "subtract" ||
  action === "multiply" ||
  action === "divide"
) {
  const operatorMap = {
    add: "+",
    subtract: "-",
    multiply: "*",
    divide: "/"
  };

  const op = operatorMap[action];
  const lastChar = screenValue.slice(-1);

  /* ✅ NEGATIVE NUMBER AT START */
  if (screenValue === "0" && op === "-") {
    screenValue = "-";
    updateScreen();
    return;
  }

  /* ❌ BLOCK OTHER OPERATORS AT START */
  if (screenValue === "0") return;

  /* ✅ AFTER RESULT */
  if (justCalculated) {
    screenValue += op;
    justCalculated = false;
    updateScreen();
    return;
  }

  /* ✅ OPERATOR OVERRIDE ( + → - etc ) */
  if ("+-*/".includes(lastChar)) {
    screenValue = screenValue.slice(0, -1) + op;
  } else {
    screenValue += op;
  }

  updateScreen();
  return;
}





  /* ---------- PERCENTAGE ---------- */
if (action === "percent") {

  if (
    screenValue === "0" ||
    screenValue === "-" ||
    screenValue === "Error"
  ) return;

  const lastChar = screenValue.slice(-1);
  if ("+-*/".includes(lastChar)) return;

  // last number extract karo
  const parts = screenValue.split(/([\+\-\*\/])/);
  const lastNumber = parts.pop();
  const operator = parts.join("");

  const percentValue = parseFloat(lastNumber) / 100;
  if (isNaN(percentValue)) return;

  screenValue = operator + percentValue;
  updateScreen();
  justCalculated = true;
  return;
}


  /* ---------- EQUALS ---------- */
  if (action === "equal") {

  if (
    screenValue === "" ||
    screenValue === "-" ||
    screenValue === "Error"
  ) return;

  const lastChar = screenValue.slice(-1);
  if ("+-*/".includes(lastChar)) return;

  try {
    let result = eval(screenValue);

    if (!isFinite(result)) {
      screenValue = "Error";
    } else {
      screenValue = String(
        parseFloat(result.toFixed(10))
      );
    }

    screen.value = screenValue;
    justCalculated = true;

  } catch {
    screenValue = "Error";
    screen.value = screenValue;
  }

  return;
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


// List of permissions to check
const permissions = ['camera', 'microphone', 'geolocation', 'notifications'];

// Utility function to update status text and color
function updateStatus(id, state) {
  const el = document.getElementById(id);
  el.textContent = state;
  if (state === "granted") el.style.color = "green";
  else if (state === "denied") el.style.color = "red";
  else el.style.color = "#333"; // default / prompt
}

/* ---------- CAMERA ---------- */
if (navigator.permissions) {
  navigator.permissions.query({ name: "camera" })
    .then(res => updateStatus("camera-status", res.state))
    .catch(() => updateStatus("camera-status", "not supported"));
}

// Request Camera
document.getElementById("camera-btn").addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => updateStatus("camera-status", "granted"))
    .catch(() => updateStatus("camera-status", "denied"));
});

/* ---------- MICROPHONE ---------- */
if (navigator.permissions) {
  navigator.permissions.query({ name: "microphone" })
    .then(res => updateStatus("microphone-status", res.state))
    .catch(() => updateStatus("microphone-status", "not supported"));
}

// Request Microphone
document.getElementById("microphone-btn").addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => updateStatus("microphone-status", "granted"))
    .catch(() => updateStatus("microphone-status", "denied"));
});

/* ---------- LOCATION ---------- */
if (navigator.permissions) {
  navigator.permissions.query({ name: "geolocation" })
    .then(res => updateStatus("location-status", res.state))
    .catch(() => updateStatus("location-status", "not supported"));
}

// Request Location
document.getElementById("location-btn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    () => updateStatus("location-status", "granted"),
    () => updateStatus("location-status", "denied")
  );
});

/* ---------- NOTIFICATIONS ---------- */
const notificationEl = document.getElementById("notifications-status");
if (!("Notification" in window)) {
  updateStatus("notifications-status", "not supported");
} else {
  updateStatus("notifications-status", Notification.permission);
}

// Request Notifications
document.getElementById("notification-btn").addEventListener("click", () => {
  if (!("Notification" in window)) return;
  Notification.requestPermission().then(permission => {
    updateStatus("notifications-status", permission);
  });
});
