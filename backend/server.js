const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(cors()); 
app.use(express.json());

// 1. Database Connection
async function startDB() {
    const mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    console.log("In-Memory Team DB Connected!");
}
startDB();

// 2. Models
// We store 'name' during registration
const User = mongoose.model('User', { 
    name: String, 
    email: { type: String, unique: true } 
});

// We store 'createdBy' (the name) so the team knows who added the task
const Task = mongoose.model('Task', { 
    text: String, 
    createdBy: String, 
    completed: { type: Boolean, default: false } 
});

// 3. APIs

// Login/Signup: Creates user if they don't exist
app.post('/api/auth', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        user = await User.create({ name: req.body.name, email: req.body.email });
    }
    res.json(user);
});

// GET: All tasks for the group dashboard
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// POST: Add a task with the creator's name
app.post('/api/tasks', async (req, res) => {
    const task = await Task.create(req.body); // req.body will be { text, createdBy }
    res.json(task);
});

// PUT: Toggle completion status
app.put('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

app.listen(5000, () => console.log("Backend running on 5000"));