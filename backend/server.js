// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // const { MongoMemoryServer } = require('mongodb-memory-server');

// // // const app = express();
// // // // Replace your existing CORS block with this:
// // // app.use((req, res, next) => {
// // //   res.header("Access-Control-Allow-Origin", "*");
// // //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// // //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
// // //   // Handle the "Preflight" request specifically
// // //   if (req.method === "OPTIONS") {
// // //     return res.status(200).end();
// // //   }
// // //   next();
// // // });
// // // app.use(express.json());

// // // // 1. Database Connection
// // // async function startDB() {
// // //     const mongo = await MongoMemoryServer.create();
// // //     await mongoose.connect(mongo.getUri());
// // //     console.log("In-Memory Team DB Connected!");
// // // }
// // // startDB();

// // // // 2. Models
// // // const User = mongoose.model('User', { 
// // //     name: String, 
// // //     email: { type: String, unique: true },
// // //     password: String 
// // // });

// // // const Task = mongoose.model('Task', { 
// // //     text: String, 
// // //     createdBy: String, 
// // //     completed: { type: Boolean, default: false } 
// // // });

// // // // 3. APIs

// // // // SIGNUP: Handles new user registration
// // // app.post('/api/signup', async (req, res) => {
// // //     try {
// // //         const { name, email, password } = req.body;
// // //         const existing = await User.findOne({ email });
// // //         if (existing) return res.status(400).json({ message: "User already exists" });

// // //         const user = await User.create({ name, email, password });
// // //         res.json(user);
// // //     } catch (err) {
// // //         res.status(500).json({ message: "Error creating user" });
// // //     }
// // // });

// // // // LOGIN: Handles existing user authentication
// // // app.post('/api/login', async (req, res) => {
// // //     try {
// // //         const { email, password } = req.body;
// // //         const user = await User.findOne({ email, password });
        
// // //         if (user) {
// // //             res.json(user);
// // //         } else {
// // //             res.status(401).json({ message: "Invalid email or password" });
// // //         }
// // //     } catch (err) {
// // //         res.status(500).json({ message: "Server error" });
// // //     }
// // // });

// // // // GET: All tasks for the group dashboard
// // // app.get('/api/tasks', async (req, res) => {
// // //     const tasks = await Task.find();
// // //     res.json(tasks);
// // // });

// // // // POST: Add a task
// // // app.post('/api/tasks', async (req, res) => {
// // //     const task = await Task.create(req.body);
// // //     res.json(task);
// // // });

// // // // PUT: Toggle completion status
// // // app.put('/api/tasks/:id', async (req, res) => {
// // //     const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // //     res.json(task);
// // // });

// // // app.listen(5000, () => console.log("Backend running on port 5000"));
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const { MongoMemoryServer } = require('mongodb-memory-server');

// // const app = express();

// // /* =======================
// //    CORS
// // ======================= */
// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// //   if (req.method === "OPTIONS") {
// //     return res.status(200).end();
// //   }
// //   next();
// // });

// // app.use(express.json());

// // /* =======================
// //    DATABASE (IN-MEMORY)
// // ======================= */
// // async function startDB() {
// //   const mongo = await MongoMemoryServer.create();
// //   await mongoose.connect(mongo.getUri());
// //   console.log("✅ In-Memory Team DB Connected!");

// //   await seedAdmin(); // seed admin AFTER db connect
// // }
// // startDB();

// // /* =======================
// //    MODELS
// // ======================= */
// // const User = mongoose.model('User', {
// //   name: String,
// //   email: { type: String, unique: true },
// //   password: String,

// //   // NEW FIELDS 👇
// //   role: { type: String, default: "member" }, // admin | member
// //   team: { type: String, default: "General" }
// // });

// // const Task = mongoose.model('Task', {
// //   text: String,
// //   createdBy: String,
// //   completed: { type: Boolean, default: false }
// // });

// // /* =======================
// //    SEED ADMIN
// // ======================= */
// // async function seedAdmin() {
// //   const adminExists = await User.findOne({ email: "admin@test.com" });

// //   if (!adminExists) {
// //     await User.create({
// //       name: "Admin",
// //       email: "admin@test.com",
// //       password: "admin@123",
// //       role: "admin",
// //       team: "Core"
// //     });

// //     console.log("👑 Admin user seeded");
// //   }
// // }

// // /* =======================
// //    APIs
// // ======================= */

// // /* REGISTER */
// // app.post('/api/signup', async (req, res) => {
// //   try {
// //     const { name, email, password, role, team } = req.body;

// //     const existing = await User.findOne({ email });
// //     if (existing)
// //       return res.status(400).json({ message: "User already exists" });

// //     const user = await User.create({
// //       name,
// //       email,
// //       password,
// //       role: role || "member",
// //       team: team || "General"
// //     });

// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: "Error creating user" });
// //   }
// // });

// // /* LOGIN */
// // app.post('/api/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email, password });

// //     if (!user)
// //       return res.status(401).json({ message: "Invalid email or password" });

// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // /* TASKS */
// // app.get('/api/tasks', async (req, res) => {
// //   const tasks = await Task.find();
// //   res.json(tasks);
// // });

// // app.post('/api/tasks', async (req, res) => {
// //   const task = await Task.create(req.body);
// //   res.json(task);
// // });

// // app.put('/api/tasks/:id', async (req, res) => {
// //   const task = await Task.findByIdAndUpdate(
// //     req.params.id,
// //     req.body,
// //     { new: true }
// //   );
// //   res.json(task);
// // });

// // /* =======================
// //    SERVER
// // ======================= */
// // app.listen(5000, () =>
// //   console.log("🚀 Backend running on port 5000")
// // );
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// const app = express();

// /* =======================
//    MIDDLEWARE
// ======================= */
// app.use(cors());
// app.use(express.json());

// /* =======================
//    DATABASE (IN-MEMORY)
// ======================= */
// async function startDB() {
//   const mongo = await MongoMemoryServer.create();
//   await mongoose.connect(mongo.getUri());
//   console.log("✅ In-Memory MongoDB Connected");

//   await seedAdmin();
// }
// startDB();

// /* =======================
//    MODELS
// ======================= */

// // USER MODEL
// const User = mongoose.model("User", {
//   name: String,
//   email: { type: String, unique: true },
//   password: String,

//   role: { type: String, default: "member" }, // admin | member
//   team: { type: String, default: "General" }
// });

// // TASK MODEL
// const Task = mongoose.model("Task", {
//   title: String,
//   description: String,

//   status: {
//     type: String,
//     enum: ["todo", "in-progress", "completed"],
//     default: "todo"
//   },

//   assignedTo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },

//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   }
// });

// /* =======================
//    SEED ADMIN
// ======================= */
// async function seedAdmin() {
//   const adminExists = await User.findOne({ email: "admin@test.com" });

//   if (!adminExists) {
//     const hashed = await bcrypt.hash("admin@123", 10);

//     await User.create({
//       name: "Admin",
//       email: "admin@test.com",
//       password: hashed,
//       role: "admin",
//       team: "Core"
//     });

//     console.log("👑 Admin seeded (admin@test.com / admin@123)");
//   }
// }

// /* =======================
//    AUTH ROUTES
// ======================= */

// // REGISTER
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { name, email, password, role, team } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "member",
//       team: team || "General"
//     });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Signup failed" });
//   }
// });

// // LOGIN
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Login error" });
//   }
// });

// /* =======================
//    ADMIN MIDDLEWARE
// ======================= */
// const adminOnly = async (req, res, next) => {
//   const userId = req.headers.userid;
//   const user = await User.findById(userId);

//   if (!user || user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };

// /* =======================
//    TASK ROUTES
// ======================= */

// // GET TASKS (Admin = all, Member = assigned)
// app.get("/api/tasks", async (req, res) => {
//   const user = await User.findById(req.headers.userid);

//   let tasks;
//   if (user.role === "admin") {
//     tasks = await Task.find()
//       .populate("assignedTo", "name email")
//       .populate("createdBy", "name");
//   } else {
//     tasks = await Task.find({ assignedTo: user._id });
//   }

//   res.json(tasks);
// });

// // CREATE TASK (ADMIN ONLY)
// app.post("/api/tasks", adminOnly, async (req, res) => {
//   const task = await Task.create(req.body);
//   res.json(task);
// });

// // UPDATE TASK (ADMIN ONLY)
// app.put("/api/tasks/:id", adminOnly, async (req, res) => {
//   const task = await Task.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(task);
// });

// // DELETE TASK (ADMIN ONLY)
// app.delete("/api/tasks/:id", adminOnly, async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: "Task deleted" });
// });

// /* =======================
//    SERVER
// ======================= */
// app.listen(5000, () => {
//   console.log("🚀 Backend running on port 5000");
// });
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// const app = express();

// /* =======================
//    1. CORS CONFIGURATION (CRITICAL FIX)
// ======================= */
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     // 👇 THIS matches your exact frontend URL from the error message
//     "https://improved-happiness-wrvjq459gpxgfg7rx-5173.app.github.dev"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true // Allows cookies/headers
// }));

// app.use(express.json());

// /* =======================
//    2. DATABASE
// ======================= */
// async function startDB() {
//   const mongo = await MongoMemoryServer.create();
//   await mongoose.connect(mongo.getUri());
//   console.log("✅ In-Memory MongoDB Connected");
//   await seedAdmin();
// }
// startDB();

// /* =======================
//    3. MODELS
// ======================= */
// const User = mongoose.model("User", {
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: "member" },
//   team: { type: String, default: "General" },
//   title: String
// });

// const Task = mongoose.model("Task", {
//   title: String,
//   description: String,
//   status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" }, // Fixed enum to match frontend
//   priority: { type: String, default: "normal" }, // Added priority
//   date: Date, // Added date
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// /* =======================
//    4. SEED ADMIN
// ======================= */
// async function seedAdmin() {
//   const adminExists = await User.findOne({ email: "admin@test.com" });
//   if (!adminExists) {
//     const hashed = await bcrypt.hash("admin@123", 10);
//     await User.create({
//       name: "Admin",
//       email: "admin@test.com",
//       password: hashed,
//       role: "admin",
//       team: "Core"
//     });
//     console.log("👑 Admin seeded (admin@test.com / admin@123)");
//   }
// }

// /* =======================
//    5. AUTH ROUTES
// ======================= */
// // REGISTER (Public)
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { name, email, password, role, team } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name, email, password: hashedPassword, role: role || "member", team: team || "General"
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Signup failed" });
//   }
// });

// // LOGIN
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Login error" });
//   }
// });

// /* =======================
//    6. TEAM ROUTES (ADDED MISSING ROUTES)
// ======================= */
// // GET TEAM (Used by Team.jsx)
// // app.get("/api/user/get-team", async (req, res) => {
// //   try {
// //     const users = await User.find({}, "-password"); // Don't send passwords back
// //     res.json(users);
// //   } catch (err) {
// //     res.status(500).json({ message: "Error fetching team" });
// //   }
// // });

// // // ADD MEMBER (Used by Team.jsx Modal)
// // app.post("/api/user/register", async (req, res) => {
// //   try {
// //     const { name, email, password, role, title } = req.body;
// //     const exists = await User.findOne({ email });
// //     if (exists) return res.status(400).json({ message: "User already exists" });

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = await User.create({
// //       name, email, password: hashedPassword, role: role || "member", title: title || "Member"
// //     });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to add member" });
// //   }
// // });
// app.get("/api/user/get-team", async (req, res) => {
//   try {
//     const users = await User.find({}, "name email role title status"); 
//     res.json(users); // This MUST return an array []
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch team" });
//   }
// });

// // 2. Add a new member (This registers them in the DB)
// app.post("/api/user/register", async (req, res) => {
//   try {
//     const { name, email, password, role, title } = req.body;
    
//     // Check if they already exist
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "User already exists" });

//     // Create the new user
//     const newUser = await User.create({
//       name,
//       email,
//       password: await bcrypt.hash(password || "123456", 10), // Default password if none provided
//       role: role || "member",
//       title: title || "Team Member"
//     });

//     res.json(newUser);
//   } catch (err) {
//     res.status(500).json({ message: "Error adding member" });
//   }
// });

// /* =======================
//    7. TASK ROUTES
// ======================= */
// // GET TASKS
// app.get("/api/tasks", async (req, res) => {
//   // Simple fallback logic since headers might be missing in simple requests
//   // In a real app, use the 'userid' header or a cookie token
//   const tasks = await Task.find().populate("assignedTo", "name");
//   res.json(tasks);
// });

// // CREATE TASK
// app.post("/api/tasks", async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating task" });
//   }
// });

// /* =======================
//    8. START SERVER
// ======================= */
// app.listen(5000, () => {
//   console.log("🚀 Backend running on port 5000");
// });
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// const app = express();

// /* =======================
//     1. CORS CONFIGURATION (GITHUBSPACE FIX)
// ======================= */
// // We store settings in a variable to avoid "Undefined" errors
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "https://improved-happiness-wrvjq459gpxgfg7rx-5173.app.github.dev"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "userid"],
//   credentials: true 
// };

// app.use(cors(corsOptions)); 

// // FIXED PathError: Using RegEx /(.*)/ instead of "*" for compatibility with Node v24+
// app.options(/(.*)/, cors(corsOptions)); 

// app.use(express.json());

// /* =======================
//     2. DATABASE & MODELS
// ======================= */
// async function startDB() {
//   const mongo = await MongoMemoryServer.create();
//   await mongoose.connect(mongo.getUri());
//   console.log("✅ In-Memory MongoDB Connected");
//   await seedAdmin();
// }
// startDB();

// const User = mongoose.model("User", {
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: "member" },
//   title: { type: String, default: "Team Member" }
// });

// const Task = mongoose.model("Task", {
//   title: String,
//   description: String,
//   status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" },
//   priority: { type: String, default: "normal" },
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// /* =======================
//     3. SEED ADMIN (Initial Login)
// ======================= */
// async function seedAdmin() {
//   const adminExists = await User.findOne({ email: "admin@test.com" });
//   if (!adminExists) {
//     const hashed = await bcrypt.hash("admin@123", 10);
//     await User.create({
//       name: "Admin", 
//       email: "admin@test.com", 
//       password: hashed, 
//       role: "admin", 
//       title: "Administrator"
//     });
//     console.log("👑 Admin seeded: admin@test.com / admin@123");
//   }
// }

// /* =======================
//     4. ROUTES
// ======================= */

// // --- AUTH ---
// app.post("/api/signup", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({ ...req.body, password: hashedPassword });
//     res.json(user);
//   } catch (err) { res.status(500).json({ message: "Signup failed" }); }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user && await bcrypt.compare(req.body.password, user.password)) {
//       res.json(user);
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (err) { res.status(500).json({ message: "Login error" }); }
// });

// // --- TEAM MANAGEMENT ---
// app.get("/api/user/get-team", async (req, res) => {
//   try {
//     const users = await User.find({}, "-password");
//     res.json(users);
//   } catch (err) { res.status(500).json({ message: "Error fetching team" }); }
// });

// app.post("/api/user/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password || "123456", 10);
//     const user = await User.create({ ...req.body, password: hashed });
//     res.json(user);
//   } catch (err) { res.status(500).json({ message: "Failed to add member" }); }
// });

// // --- TASKS ---
// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("assignedTo", "name");
//     res.json(tasks);
//   } catch (err) { res.status(500).json({ message: "Error fetching tasks" }); }
// });

// app.post("/api/tasks", async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.json(task);
//   } catch (err) { res.status(500).json({ message: "Error creating task" }); }
// });

// /* =======================
//     5. START SERVER
// ======================= */
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on port ${PORT}`);
// });


//GOOD
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// const app = express();

// /* =======================
//     1. CORS CONFIGURATION
// ======================= */
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "https://improved-happiness-wrvjq459gpxgfg7rx-5173.app.github.dev"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "userid"],
//   credentials: true 
// };

// app.use(cors(corsOptions)); 
// app.options(/(.*)/, cors(corsOptions)); 
// app.use(express.json());

// /* =======================
//     2. DATABASE & MODELS
// ======================= */
// async function startDB() {
//   const mongo = await MongoMemoryServer.create();
//   await mongoose.connect(mongo.getUri());
//   console.log("✅ In-Memory MongoDB Connected");
//   await seedAdmin();
// }
// startDB();

// const User = mongoose.model("User", {
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: "member" },
//   title: { type: String, default: "Team Member" },
//   isActive: { type: Boolean, default: false } // New: Only shows in Team if True
// });

// const Task = mongoose.model("Task", {
//   title: String,
//   description: String,
//   status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" },
//   priority: { type: String, default: "normal" },
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// /* =======================
//     3. SEED ADMIN
// ======================= */
// async function seedAdmin() {
//   const adminExists = await User.findOne({ email: "admin@test.com" });
//   if (!adminExists) {
//     const hashed = await bcrypt.hash("admin@123", 10);
//     await User.create({
//       name: "Admin", email: "admin@test.com", password: hashed, role: "admin", isActive: true 
//     });
//     console.log("👑 Admin seeded: admin@test.com / admin@123");
//   }
// }

// /* =======================
//     4. ROUTES
// ======================= */

// // SIGNUP: Users register here (isActive starts as false)
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "Email already registered. Please login." });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, isActive: false });
//     res.json(user);
//   } catch (err) { res.status(500).json({ message: "Signup failed" }); }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user && await bcrypt.compare(req.body.password, user.password)) {
//       res.json(user);
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (err) { res.status(500).json({ message: "Login error" }); }
// });

// // GET TEAM: Only users who are active
// app.get("/api/user/get-team", async (req, res) => {
//   try {
//     const users = await User.find({ isActive: true }, "-password");
//     res.json(users);
//   } catch (err) { res.status(500).json({ message: "Error fetching team" }); }
// });

// // GET AVAILABLE: Registered users NOT yet in the team
// app.get("/api/user/available", async (req, res) => {
//   try {
//     const users = await User.find({ isActive: false }, "name email");
//     res.json(users);
//   } catch (err) { res.status(500).json({ message: "Error" }); }
// });

// // ADD TO TEAM: Admin updates an existing user to isActive
// app.post("/api/user/add-to-team", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOneAndUpdate({ email }, { isActive: true }, { new: true });
//     if (!user) return res.status(404).json({ message: "User must register first!" });
//     res.json(user);
//   } catch (err) { res.status(500).json({ message: "Error" }); }
// });

// // TASKS
// app.get("/api/tasks", async (req, res) => {
//   const tasks = await Task.find().populate("assignedTo", "name");
//   res.json(tasks);
// });

// app.post("/api/tasks", async (req, res) => {
//   const task = await Task.create(req.body);
//   res.json(task);
// });

// app.listen(5000, () => console.log("🚀 Backend running on port 5000"));


//TRIAL
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();

/* =======================
    1. CORS CONFIGURATION
======================= */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://improved-happiness-wrvjq459gpxgfg7rx-5173.app.github.dev"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "userid"],
  credentials: true 
};

app.use(cors(corsOptions)); 
app.options(/(.*)/, cors(corsOptions)); 
app.use(express.json());

/* =======================
    2. DATABASE & MODELS
======================= */
async function startDB() {
  const mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  console.log("✅ In-Memory MongoDB Connected");
  await seedAdmin();
}
startDB();

const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "member" },
  title: { type: String, default: "Team Member" },
  isActive: { type: Boolean, default: false } 
});

const Task = mongoose.model("Task", {
  title: String,
  description: String,
  status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" },
  priority: { type: String, enum: ["high", "medium", "normal", "low"], default: "normal" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

/* =======================
    3. SEED ADMIN
======================= */
async function seedAdmin() {
  const adminExists = await User.findOne({ email: "admin@test.com" });
  if (!adminExists) {
    const hashed = await bcrypt.hash("admin@123", 10);
    await User.create({
      name: "Admin", email: "admin@test.com", password: hashed, role: "admin", isActive: true 
    });
    console.log("👑 Admin seeded: admin@test.com / admin@123");
  }
}

/* =======================
    4. ROUTES
======================= */

// --- AUTH ---
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isActive: false });
    res.json(user);
  } catch (err) { res.status(500).json({ message: "Signup failed" }); }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) { res.status(500).json({ message: "Login error" }); }
});

// --- TEAM MANAGEMENT ---
app.get("/api/user/get-team", async (req, res) => {
  try {
    // Returns all members who were added to the team (including Aman)
    const users = await User.find({ isActive: true }, "-password");
    res.json(users);
  } catch (err) { res.status(500).json({ message: "Error fetching team" }); }
});

app.get("/api/user/available", async (req, res) => {
  try {
    const users = await User.find({ isActive: false }, "name email");
    res.json(users);
  } catch (err) { res.status(500).json({ message: "Error fetching registered users" }); }
});

app.post("/api/user/add-to-team", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate({ email }, { isActive: true }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.json(user);
  } catch (err) { res.status(500).json({ message: "Error adding to team" }); }
});

// --- TASKS ---
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: "Error fetching tasks" }); }
});

app.post("/api/tasks", async (req, res) => {
  try {
    // If assignedTo is an empty string from frontend, set it to null
    const taskData = { ...req.body };
    if (!taskData.assignedTo) delete taskData.assignedTo;

    const task = await Task.create(taskData);
    const populatedTask = await Task.findById(task._id).populate("assignedTo", "name");
    res.json(populatedTask);
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: "Error creating task" }); 
  }
});

/* =======================
    5. START SERVER
======================= */
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));