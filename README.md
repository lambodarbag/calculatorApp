🧮 Calculator App (Neumorphic UI)

A modern Calculator Web App built using HTML, CSS, and Vanilla JavaScript with a clean neumorphic design and proper calculator logic.

✨ Features

➕➖✖️➗ Basic arithmetic operations

🟢 Smart = behavior (no unwanted concatenation)

🧹 AC (clear all) & DEL (delete last digit)

🔢 Decimal support

🎨 Neumorphic UI design

🖱️ Event delegation for better performance

🔘 Toggle animation (UI purpose)

🛠️ Tech Stack

HTML5

CSS3

JavaScript (Vanilla)

Font Awesome

Google Fonts (Montserrat)

📁 Project Structure
calculator/
│
├── index.html
├── styles.css
├── script.js
└── README.md

🧠 Logic Highlights

Uses data-action attributes for operators

closest("button") to detect clicks correctly

Guard clauses (return) to prevent invalid input

justCalculated flag to handle result state

Prevents multiple operators together

⚙️ How It Works

Numbers update the display

Operators are validated before adding

= evaluates the expression

After calculation:

Number press → starts new input

Operator press → continues calculation

DEL removes last character

AC resets everything

🚀 How to Run

Clone the repository

git clone https://github.com/your-username/calculator.git


Open index.html in your browser

⚠️ Note

eval() is used for learning purposes only

Not recommended for production apps

🔮 Future Improvements

Keyboard support

Remove eval() (custom parser)

Dark / Light mode

Mobile optimization

👨‍💻 Author

Ayushman
Frontend Developer (Learning & Building 🚀)

⭐ Support

If you like this project, give it a ⭐ on GitHub!
