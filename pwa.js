if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/calculatorApp/sw.js")
      .then(reg => console.log("SW Registered:", reg))
      .catch(err => console.log("SW registration failed:", err));
  });
}
