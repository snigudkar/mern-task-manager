const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
// Replace your existing CORS block with this:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  // Handle the "Preflight" request specifically
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.use(express.json());

// 1. Database Connection
async function startDB() {
    const mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    console.log("In-Memory Team DB Connected!");
}
startDB();

// 2. Models
const User = mongoose.model('User', { 
    name: String, 
    email: { type: String, unique: true },
    password: String 
});

const Task = mongoose.model('Task', { 
    text: String, 
    createdBy: String, 
    completed: { type: Boolean, default: false } 
});

// 3. APIs

// SIGNUP: Handles new user registration
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error creating user" });
    }
});

// LOGIN: Handles existing user authentication
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET: All tasks for the group dashboard
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// POST: Add a task
app.post('/api/tasks', async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

// PUT: Toggle completion status
app.put('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

app.listen(5000, () => console.log("Backend running on port 5000"));