# 🧮 Calculator App (Neumorphic UI)

A modern **Calculator Web App** built using **HTML, CSS, and Vanilla JavaScript** with a clean **neumorphic design** and smart calculator logic.

---

## ✨ Features

- ➕➖✖️➗ Basic arithmetic operations  
- 🟢 Smart `=` behavior (no unwanted concatenation after result)
- 🧹 **AC** (clear all) & **DEL** (delete last digit)
- 🔢 Decimal support
- 🎨 Neumorphic UI design
- 🖱️ Event delegation for better performance
- 🔘 Toggle animation (UI purpose)

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Font Awesome**
- **Google Fonts (Montserrat)**

---

## 📁 Project Structure

calculator/
│
├── index.html
├── styles.css
├── script.js
└── README.md


---

## 🧠 Logic Highlights

- Uses `data-action` attributes for operators
- `closest("button")` for correct click targeting
- Guard clauses (`return`) to prevent invalid input
- `justCalculated` flag to manage result state
- Prevents multiple operators together

---

## ⚙️ How It Works

1. Number buttons update the screen
2. Operator buttons are validated before appending
3. `=` evaluates the expression
4. After calculation:
   - Number press → starts new input
   - Operator press → continues calculation
5. DEL removes the last character
6. AC resets the calculator

---

## 🚀 How to Run

1. Clone the repository
```bash
git clone https://github.com/your-username/calculator.git

Open index.html in your browser

⚠️ Note

eval() is used for learning purposes only

Not recommended for production applications

🔮 Future Improvements

Keyboard input support

Remove eval() (custom calculation logic)

Dark / Light mode

Mobile responsiveness

👨‍💻 Author

AS
Frontend Developer 🚀

⭐ Support

If you like this project, give it a ⭐ on GitHub!


