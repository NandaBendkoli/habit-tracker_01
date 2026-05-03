🚀 Habit Tracker App

A full-stack Habit Tracker web application built using Node.js, Express, MongoDB, and EJS.
Users can create, track, toggle, and manage their daily habits with authentication support.

📌 Features
🔐 User Authentication (Register & Login with JWT)
👤 User Profile Page
➕ Create Habits
📊 Track Daily Habit Completion
🔁 Toggle Habit Status (Done / Not Done)
🗑 Soft Delete Habit (isDeleted flag)
📅 Daily Logs Tracking
🎨 Server-side rendering using EJS
🛡 Protected Routes using Middleware
🛠 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Frontend: EJS, Bootstrap
Authentication: JWT (JSON Web Token)
Other Tools: bcrypt, dotenv, cookie-parser
📂 Project Structure
habit-tracker_01/
│
├── src/
│   ├── controller/
│   │   ├── user.controller.js
│   │   └── habit.controller.js
│   │
│   ├── model/
│   │   ├── user.model.js
│   │   ├── habit.model.js
│   │   └── counter.model.js
│   │
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── habit.route.js
│   │   └── index.js
│   │
│   ├── Middleware/
│   │   └── middleware.js
│   │
│   ├── utils/
│   │   └── index.js
│   │
│   ├── views/
│   │   ├── dashboard.ejs
│   │   ├── profile.ejs
│   │   ├── login.ejs
│   │   ├── signup.ejs
│   │   └── layout.ejs
│   │
│   └── images/
│
├── index.js
├── .env
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
2️⃣ Install dependencies
npm install
3️⃣ Setup environment variables

Create a .env file:

PORT=8000
MONGO_URI=your_mongodb_connection_string
secreteKey=your_jwt_secret
4️⃣ Run the server
npm run dev

Server will run at:

http://localhost:8000
🔑 API Routes
👤 User Routes
Method	Route	Description
POST	/createUser	Register user
POST	/loginUser	Login user
GET	/profile	Get user profile
📌 Habit Routes
Method	Route	Description
POST	/habit/createHabit	Create habit
GET	/habit/dashboard	View dashboard
POST	/habit/toggle/	Toggle habit
POST	/habit/delete/	Soft delete habit
🧠 Key Concepts Used
MVC Architecture
Middleware (JWT verification)
RESTful Routing
Server-side Rendering (EJS)
Soft Delete Pattern (isDeleted)
MongoDB Relations via userId
🚀 Future Improvements
✏️ Edit Habit Feature
📊 Weekly Analytics
📱 Responsive UI Enhancements
🔄 AJAX-based UI (No page reload)
🗂 Trash / Restore Deleted Habits
☁️ Profile Image Upload (Cloudinary)
👨‍💻 Author

Nanda
Full Stack Developer (Node.js | MongoDB | Express)

⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
