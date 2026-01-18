import React, { useState, useEffect } from 'react';
import API from './api';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const login = async () => {
    const { data } = await API.post('/auth', { email });
    setUser(data);
  };

  const getTasks = async () => {
    if (user) {
      const { data } = await API.get(`/tasks/${user._id}`);
      setTasks(data);
    }
  };

  useEffect(() => { getTasks(); }, [user]);

  const addTask = async () => {
    await API.post('/tasks', { userId: user._id, text });
    setText('');
    getTasks();
  };

  const toggle = async (id, status) => {
    await API.put(`/tasks/${id}`, { completed: !status });
    getTasks();
  };

  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">Bootcamp Task Manager</h1>
        <input className="border p-2 w-full mb-4" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={login}>Login</button>
      </div>
    </div>
  );

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <div className="flex gap-2 mb-6">
        <input className="border p-2 flex-grow" value={text} onChange={e => setText(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addTask}>Add</button>
      </div>
      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t._id} className="flex justify-between border p-3 rounded bg-white shadow-sm">
            <span className={t.completed ? "line-through text-gray-400" : ""}>{t.text}</span>
            <button className="text-sm text-blue-500" onClick={() => toggle(t._id, t.completed)}>
              {t.completed ? 'Undo' : 'Done'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}