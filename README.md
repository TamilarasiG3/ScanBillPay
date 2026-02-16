💳 ScanBillPay – QR Code Bill Payment (Frontend)

ScanBillPay is a simple frontend web application that allows users to scan a QR code using their device camera, automatically fetch bill details, and simulate the payment process.

This project is built using HTML, CSS, and JavaScript and is designed for learning and demonstration purposes.

🚀 Features

📷 Scan QR Code using device camera

🔍 Auto-detect bill number from QR

🧾 Display bill details (static/demo data)

💰 Pay Now button

✅ Payment success simulation

📱 Responsive design

🎨 Clean UI without using images

🛠️ Technologies Used

HTML5

CSS3

JavaScript (Vanilla JS)

html5-qrcode library (for QR scanning)

📂 Project Structure
ScanBillPay/
│
├── index.html
├── style.css
├── script.js
└── README.md

⚙️ How to Run the Project

Clone the repository:

git clone https://github.com/your-username/ScanBillPay.git


Open the project folder.

Open index.html in your browser
OR
Use Live Server in VS Code.

Allow camera permission when prompted.

💡 How It Works

User clicks Start Scan.

Camera opens and scans QR code.

QR contains a bill number (Example: BILL12345).

Bill details are displayed.

User clicks Pay Now.

Payment success message appears (simulation only).

📦 Example QR Data

The QR code should contain:

BILL12345


or

{"billNumber":"BILL12345"}

🎯 Project Purpose

Practice frontend development

Learn QR code integration

Understand DOM manipulation

Build interactive UI

Create a mini project for portfolio

🔒 Disclaimer

This project does not process real payments.
All payment actions are simulated for educational purposes only.

🔮 Future Improvements

Backend integration

Real payment gateway

User login system

Payment history tracking

QR code generation

📄 License

This project is open-source and available under the MIT License.
