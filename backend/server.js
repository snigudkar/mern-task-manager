const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(cors({
  origin: '*', // Allows any website to talk to your backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// 1. In-Memory Database
async function startDB() {
    const mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    console.log("In-memory DB connected! Data will clear on restart.");
}
startDB();

// 2. Simple Models
const User = mongoose.model('User', { email: { type: String, unique: true } });
const Task = mongoose.model('Task', { userId: String, text: String, completed: { type: Boolean, default: false } });

// 3. Simple APIs
app.post('/api/auth', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) user = await User.create(req.body);
    res.json(user);
});

app.get('/api/tasks/:userId', async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

app.listen(5000, () => console.log("Backend running on port 5000"));