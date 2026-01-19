// // // import React, { useState, useEffect } from 'react';
// // // import API from './api';

// // // export default function App() {
// // //   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('teamUser')));
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
// // //   const [tasks, setTasks] = useState([]);
// // //   const [taskText, setTaskText] = useState('');

// // //   const handleAuth = async () => {
// // //     try {
// // //       const endpoint = isLogin ? '/login' : '/signup';
// // //       const { data } = await API.post(endpoint, formData);
// // //       setUser(data);
// // //       localStorage.setItem('teamUser', JSON.stringify(data));
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Auth Error");
// // //     }
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.removeItem('teamUser');
// // //     setUser(null);
// // //   };

// // //   const fetchTasks = async () => {
// // //     const { data } = await API.get('/tasks');
// // //     setTasks(data);
// // //   };

// // //   useEffect(() => { if (user) fetchTasks(); }, [user]);

// // //   const addTask = async () => {
// // //     if (!taskText) return;
// // //     await API.post('/tasks', { text: taskText, createdBy: user.name });
// // //     setTaskText('');
// // //     fetchTasks();
// // //   };

// // //   const toggleTask = async (id, status) => {
// // //     await API.put(`/tasks/${id}`, { completed: !status });
// // //     fetchTasks();
// // //   };

// // //   if (!user) return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
// // //       <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
// // //         <h1 className="text-4xl font-black text-gray-800 mb-2 text-center">TeamFlow</h1>
// // //         <p className="text-gray-500 text-center mb-8">{isLogin ? 'Welcome back!' : 'Create your account'}</p>
        
// // //         <div className="space-y-4">
// // //           {!isLogin && (
// // //             <input className="w-full p-4 bg-gray-50 border-0 rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" 
// // //                    placeholder="Full Name" onChange={e => setFormData({...formData, name: e.target.value})} />
// // //           )}
// // //           <input className="w-full p-4 bg-gray-50 border-0 rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" 
// // //                  placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
// // //           <input type="password" className="w-full p-4 bg-gray-50 border-0 rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" 
// // //                  placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
          
// // //           <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition" onClick={handleAuth}>
// // //             {isLogin ? 'Sign In' : 'Create Account'}
// // //           </button>
// // //         </div>

// // //         <p className="mt-6 text-center text-sm text-gray-600">
// // //           {isLogin ? "Don't have an account?" : "Already have an account?"}
// // //           <button className="ml-2 text-indigo-600 font-bold hover:underline" onClick={() => setIsLogin(!isLogin)}>
// // //             {isLogin ? 'Sign Up' : 'Login'}
// // //           </button>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
// // //       <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
// // //         <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
// // //           <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TeamFlow</h2>
// // //           <div className="flex items-center gap-4">
// // //             <span className="hidden sm:block text-sm font-medium text-slate-500">Logged in as <b className="text-slate-900">{user.name}</b></span>
// // //             <button onClick={handleLogout} className="text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition">Logout</button>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       <main className="max-w-4xl mx-auto p-6 mt-8">
// // //         <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-10">
// // //           <h3 className="text-lg font-bold mb-4">Assign New Task</h3>
// // //           <div className="flex flex-col sm:flex-row gap-3">
// // //             <input className="flex-grow p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-400 transition" 
// // //                    value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="What needs to be done?" />
// // //             <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition active:translate-y-0" onClick={addTask}>Add to Board</button>
// // //           </div>
// // //         </div>

// // //         <div className="grid gap-4">
// // //           {tasks.map(t => (
// // //             <div key={t._id} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-md transition">
// // //               <div className="flex flex-col">
// // //                 <span className={`text-lg font-semibold ${t.completed ? 'line-through text-slate-300' : 'text-slate-800'}`}>{t.text}</span>
// // //                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mt-1">Creator: {t.createdBy}</span>
// // //               </div>
// // //               <button onClick={() => toggleTask(t._id, t.completed)} 
// // //                       className={`px-6 py-2 rounded-2xl text-sm font-black transition ${t.completed ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}>
// // //                 {t.completed ? 'REOPEN' : 'DONE'}
// // //               </button>
// // //             </div>
// // //           ))}
// // //           {tasks.length === 0 && <div className="text-center py-20 text-slate-400">The task board is empty. Start by adding a task!</div>}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import API from './api';
// // import Navbar from './components/Navbar';
// // import Profile from './components/Profile';

// // // Keeping Dashboard internal for simplicity, or you could move it too!
// // const Dashboard = ({ user, tasks, fetchTasks }) => {
// //   const [text, setText] = useState('');
// //   const addTask = async () => {
// //     if (!text) return;
// //     await API.post('/tasks', { text, createdBy: user.name });
// //     setText('');
// //     fetchTasks();
// //   };

// //   const toggle = async (id, status) => {
// //     await API.put(`/tasks/${id}`, { completed: !status });
// //     fetchTasks();
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto space-y-6">
// //       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
// //         <div className="flex gap-2">
// //           <input className="flex-grow p-3 bg-slate-50 rounded-xl outline-none" value={text} onChange={e => setText(e.target.value)} placeholder="New task..." />
// //           <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold" onClick={addTask}>Add</button>
// //         </div>
// //       </div>
// //       <div className="space-y-3">
// //         {tasks.map(t => (
// //           <div key={t._id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
// //             <p className={`font-semibold ${t.completed ? 'line-through text-slate-300' : 'text-slate-700'}`}>{t.text} <span className="block text-[10px] text-indigo-400 uppercase">By {t.createdBy}</span></p>
// //             <button onClick={() => toggle(t._id, t.completed)} className="text-xs font-bold text-indigo-600"> {t.completed ? 'UNDO' : 'DONE'} </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default function App() {
// //   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
// //   const [tasks, setTasks] = useState([]);
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [form, setForm] = useState({});

// //   const fetchTasks = async () => { if (user) { const { data } = await API.get('/tasks'); setTasks(data); } };
// //   useEffect(() => { fetchTasks(); }, [user]);

// //   const auth = async () => {
// //     const { data } = await API.post(isLogin ? '/login' : '/signup', form);
// //     setUser(data);
// //     localStorage.setItem('user', JSON.stringify(data));
// //   };

// //   const logout = () => { localStorage.clear(); setUser(null); window.location.href = "/"; };

// //   if (!user) return (
// //     <div className="h-screen flex items-center justify-center bg-slate-900">
// //       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm flex flex-col gap-4">
// //         <h1 className="text-3xl font-black italic tracking-tighter">TEAMFLOW</h1>
// //         {!isLogin && <input className="p-3 bg-slate-100 rounded-xl" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />}
// //         <input className="p-3 bg-slate-100 rounded-xl" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
// //         <input className="p-3 bg-slate-100 rounded-xl" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
// //         <button className="bg-indigo-600 text-white py-3 rounded-xl font-bold" onClick={auth}>{isLogin ? 'Login' : 'Signup'}</button>
// //         <button className="text-sm font-bold text-slate-500" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Create Account' : 'Back to Login'}</button>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <BrowserRouter>
// //       <div className="min-h-screen bg-slate-50">
// //         <Navbar user={user} handleLogout={logout} />
// //         <div className="p-6">
// //           <Routes>
// //             <Route path="/" element={<Dashboard user={user} tasks={tasks} fetchTasks={fetchTasks} />} />
// //             <Route path="/profile" element={<Profile user={user} tasks={tasks} />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </BrowserRouter>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import API from "./api";

// import Topbar from "./components/Topbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/Tasks";
// //import Tasks from "./pages/Tasks";
// import CreateTask from "./pages/CreateTask";
// import Team from "./pages/Team";

// export default function App() {
//   const [user, setUser] = useState(() =>
//     JSON.parse(localStorage.getItem("user"))
//   );

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <BrowserRouter>
//       {user && <Topbar user={user} onLogout={logout} />}

//       <Routes>
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
//         />

//         <Route
//           path="/register"
//           element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
//         />

//         <Route
//           path="/"
//           element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
//         />

//         <Route
//           path="/tasks"
//           element={user ? <Tasks user={user} /> : <Navigate to="/login" />}
//         />

//         {/* ADMIN ONLY */}
//         <Route
//           path="/team"
//           element={
//             user?.role === "admin" ? <Team /> : <Navigate to="/" />
//           }
//         />
//       </Routes>*/
//     </BrowserRouter>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Topbar from "./components/Topbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/Tasks";
// import CreateTask from "./pages/CreateTask";
// import Team from "./pages/Team";

// export default function App() {
//   // 1. FIXED: Use "userInfo" to match your Login/Dashboard logic
//   const [user, setUser] = useState(() =>
//     JSON.parse(localStorage.getItem("userInfo"))
//   );

//   const logout = () => {
//     localStorage.removeItem("userInfo"); // Specific removal is safer
//     setUser(null);
//   };

//   return (
//     <BrowserRouter>
//       {user && <Topbar user={user} onLogout={logout} />}

//       <Routes>
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
//         />

//         <Route
//           path="/register"
//           element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
//         />

//         <Route
//           path="/"
//           // 2. FIXED: Pass 'user' prop to Dashboard
//           element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
//         />

//         <Route
//           path="/tasks"
//           element={user ? <Tasks user={user} /> : <Navigate to="/login" />}
//         />

//         <Route
//           path="/create-task"
//           element={user ? <CreateTask /> : <Navigate to="/login" />}
//         />

//         {/* ADMIN ONLY */}
//         <Route
//           path="/team"
//           element={
//             user?.role === "admin" ? <Team /> : <Navigate to="/" />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar"; // 1. IMPORT SIDEBAR

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import Team from "./pages/Team";

// 2. LAYOUT COMPONENT: Handles the Sidebar + Content structure
function Layout({ children, user, logout }) {
  const location = useLocation();
  // Hide Sidebar/Topbar on Login & Register pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return children;
  }

  return (
    // Flex container: Sidebar (Left) | Content (Right)
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* LEFT: Sidebar (only shows if user is logged in) */}
      {user && <Sidebar user={user} />}

      {/* RIGHT: Topbar + Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {user && <Topbar user={user} onLogout={logout} />}
        
        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* 3. Wrap Routes in the Layout */}
      <Layout user={user} logout={logout}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
          />

          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/tasks"
            element={user ? <Tasks user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-task"
            element={user ? <CreateTask /> : <Navigate to="/login" />}
          />

          {/* ADMIN ONLY */}
          <Route
            path="/team"
            element={
              user?.role === "admin" ? <Team user={user} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}