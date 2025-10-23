Digital Time Capsule (Simple JavaScript Full-Stack)

A simple web application allowing users to register, log in, and write messages (time capsules) to be viewed in the future. Capsules are stored per user in a MongoDB database.

This version uses a simple Node.js/Express backend and a single HTML file frontend with vanilla JavaScript and Tailwind CSS.

Features

User registration and login (basic, insecure).

Create time capsules with a message and a future reveal date.

View a list of sealed capsules associated with the logged-in user.

Data persistence using MongoDB.

Futuristic UI theme with an animated starfield background.

Technology Stack

Frontend: HTML, CSS (Tailwind CSS via CDN), Vanilla JavaScript (fetch API)

Backend: Node.js, Express.js

Database: MongoDB (using the official mongodb driver)

Other: cors Node.js package for handling Cross-Origin Resource Sharing.

File Structure

timeCapsule/
├── backend/ <-- Node.js Backend Code
│ ├── node_modules/ <-- Installed dependencies (created by npm install)
│ ├── package.json <-- Project definition and dependencies
│ ├── package-lock.json <-- Lockfile for dependency versions
│ └── server.js <-- Main backend server logic (Express, MongoDB connection)
│
└── frontend/ <-- HTML Frontend Code
└── index.html <-- Single HTML file containing structure, styling, and client-side JS

Prerequisites

Node.js and npm: Download and install from nodejs.org.

MongoDB: A running MongoDB instance. You can install it locally or use a cloud service like MongoDB Atlas. Ensure the server is running.

Setup and Running

You need to run the backend server and open the frontend file separately.

1. Set up the Backend:

Open a terminal or command prompt.

Navigate to the backend directory:

cd path/to/your/project/backend_simple

Install the necessary dependencies (only needs to be done once):

npm install

2. Start the Backend Server:

Make sure your MongoDB server is running.

In the same terminal (inside backend_simple), run:

node server.js

You should see messages indicating the server is running and connected to MongoDB (e.g., Simple backend server running at http://localhost:8080).

Keep this terminal open.

3. Run the Frontend:

Navigate to the frontend_simple directory in your file explorer.

Double-click the index.html file (or right-click and "Open with" your preferred browser).

The application should now open in your browser and connect to the running backend.

Important Notes

Security: This version is highly simplified for learning purposes. It does not implement secure password hashing or session management. Passwords are stored and compared in plain text. Do not use this for any real-world application.

Email Sending: This version does not actually send emails when capsules are due. That functionality would need to be added to the backend (e.g., using a library like Nodemailer and a scheduled job runner).
