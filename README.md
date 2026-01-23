# mern-task-manager

🗂️ MERN Task Manager

A minimal MERN stack group task management application built for learning and practice, with a clean structure and real-world patterns.

🚀 Features

User registration & login

In-memory MongoDB (no setup required)

Group-based task management

Create, view, update, and delete tasks

Clean React UI with TailwindCSS

Backend API using Node.js & Express

🛠️ Tech Stack

Frontend

React

React Router

Axios

TailwindCSS

Backend

Node.js

Express

MongoDB (mongodb-memory-server)

Mongoose

bcryptjs

CORS

📁 Project Structure
mern-task-manager/
├── backend/
│   └── server.js
├── frontend/
│   └── src/

▶️ How to Run
Backend
cd backend
npm install
node server.js

Frontend
cd frontend
npm install
npm run dev


Frontend runs on port 5173
Backend runs on port 5000

🧪 Notes

Database is in-memory → data resets on server restart

Perfect for demos, labs, and learning MERN fundamentals

Easy to extend with JWT auth, roles, sockets, or persistent DB

📌 Future Improvements

JWT-based authentication

Role-based access control

Drag & drop task board

Persistent MongoDB

Deployment (Render + Vercel)
