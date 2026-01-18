import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter">TEAMFLOW</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="font-bold text-slate-600 hover:text-indigo-600 transition text-sm">Tasks</Link>
          <Link to="/profile" className="font-bold text-slate-600 hover:text-indigo-600 transition text-sm">Profile</Link>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            <span className="text-xs font-bold text-slate-800 hidden sm:block">{user.name}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;