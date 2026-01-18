import React, { useState, useEffect } from 'react';
import API from './api';

export default function App() {
  // 1. Check if user data exists in browser memory on load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('teamUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // 2. Login/Signup Function
  const handleAuth = async () => {
    if (!formData.name || !formData.email) return alert("Please fill in both fields");
    try {
      const { data } = await API.post('/auth', formData);
      setUser(data);
      localStorage.setItem('teamUser', JSON.stringify(data)); // Stay logged in
    } catch (err) {
      alert("Auth failed. Check if Backend is running!");
    }
  };

  // 3. Logout Function
  const handleLogout = () => {
    localStorage.removeItem('teamUser');
    setUser(null);
    setTasks([]);
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) { console.error("Fetch failed", err); }
  };

  useEffect(() => { if (user) fetchAllTasks(); }, [user]);

  const addTask = async () => {
    if (!taskText) return;
    await API.post('/tasks', { text: taskText, createdBy: user.name });
    setTaskText('');
    fetchAllTasks();
  };

  const toggleTask = async (id, currentStatus) => {
    await API.put(`/tasks/${id}`, { completed: !currentStatus });
    fetchAllTasks();
  };

  // --- VIEW: LOGIN / SIGNUP SCREEN ---
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2 text-center">Team Login</h1>
        <p className="text-slate-500 mb-6 text-center">Enter your name and email to start</p>
        <input 
          className="w-full p-3 border rounded-lg mb-3 outline-blue-500" 
          placeholder="Full Name" 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          className="w-full p-3 border rounded-lg mb-6 outline-blue-500" 
          placeholder="Email Address" 
          onChange={e => setFormData({...formData, email: e.target.value})} 
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition" onClick={handleAuth}>
          Enter Dashboard
        </button>
      </div>
    </div>
  );

  // --- VIEW: TASK DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Group Tasks</h1>
            <p className="text-slate-500">Shared with the team</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800">{user.name}</p>
            <button onClick={handleLogout} className="text-xs text-red-500 hover:underline font-bold uppercase tracking-widest">
              Logout
            </button>
          </div>
        </header>

        {/* Add Task Input */}
        <div className="flex gap-3 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <input 
            className="flex-grow p-3 bg-slate-50 rounded-xl outline-none" 
            value={taskText} 
            onChange={e => setTaskText(e.target.value)} 
            placeholder="Assign a task..." 
          />
          <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition" onClick={addTask}>
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="grid gap-4">
          {tasks.map(t => (
            <div key={t._id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className={`text-lg font-medium ${t.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {t.text}
                </p>
                <p className="text-sm text-blue-500 font-bold">BY: {t.createdBy}</p>
              </div>
              <button 
                onClick={() => toggleTask(t._id, t.completed)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
                  t.completed ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {t.completed ? 'Undo' : 'Done'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}