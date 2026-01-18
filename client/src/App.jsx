import React, { useState, useEffect } from 'react';
import API from './api';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('teamUser')));
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const { data } = await API.post(endpoint, formData);
      setUser(data);
      localStorage.setItem('teamUser', JSON.stringify(data));
    } catch (err) {
      alert(err.response?.data?.message || "Auth Error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('teamUser');
    setUser(null);
  };

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  useEffect(() => { if (user) fetchTasks(); }, [user]);

  const addTask = async () => {
    if (!taskText) return;
    await API.post('/tasks', { text: taskText, createdBy: user.name });
    setTaskText('');
    fetchTasks();
  };

  const toggleTask = async (id, status) => {
    await API.put(`/tasks/${id}`, { completed: !status });
    fetchTasks();
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h1 className="text-4xl font-black text-gray-800 mb-2 text-center">TeamFlow</h1>
        <p className="text-gray-500 text-center mb-8">{isLogin ? 'Welcome back!' : 'Create your account'}</p>
        
        <div className="space-y-4">
          {!isLogin && (
            <input className="w-full p-4 bg-gray-50 border-0 rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" 
                   placeholder="Full Name" onChange={e => setFormData({...formData, name: e.target.value})} />
          )}
          <input className="w-full p-4 bg-gray-50 border-0 rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" 
                 placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" className="w-full p-4 bg-gray-50 border-0 rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition" 
                 placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition" onClick={handleAuth}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button className="ml-2 text-indigo-600 font-bold hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TeamFlow</h2>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm font-medium text-slate-500">Logged in as <b className="text-slate-900">{user.name}</b></span>
            <button onClick={handleLogout} className="text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-10">
          <h3 className="text-lg font-bold mb-4">Assign New Task</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input className="flex-grow p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-400 transition" 
                   value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="What needs to be done?" />
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition active:translate-y-0" onClick={addTask}>Add to Board</button>
          </div>
        </div>

        <div className="grid gap-4">
          {tasks.map(t => (
            <div key={t._id} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-md transition">
              <div className="flex flex-col">
                <span className={`text-lg font-semibold ${t.completed ? 'line-through text-slate-300' : 'text-slate-800'}`}>{t.text}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mt-1">Creator: {t.createdBy}</span>
              </div>
              <button onClick={() => toggleTask(t._id, t.completed)} 
                      className={`px-6 py-2 rounded-2xl text-sm font-black transition ${t.completed ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}>
                {t.completed ? 'REOPEN' : 'DONE'}
              </button>
            </div>
          ))}
          {tasks.length === 0 && <div className="text-center py-20 text-slate-400">The task board is empty. Start by adding a task!</div>}
        </div>
      </main>
    </div>
  );
}