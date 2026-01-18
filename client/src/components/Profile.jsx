import React from 'react';

const Profile = ({ user, tasks }) => {
  // Simple stats for the bootcamp students to see data manipulation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-lg">
          {user.name[0].toUpperCase()}
        </div>
        <h2 className="text-2xl font-black text-slate-800">{user.name}</h2>
        <p className="text-slate-500 mb-8 text-sm">{user.email}</p>
        
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tasks</p>
            <p className="text-2xl font-black text-slate-800">{totalTasks}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Completed</p>
            <p className="text-2xl font-black text-indigo-600">{completedTasks}</p>
          </div>
        </div>
        
        <div className="mt-8 text-left">
           <p className="text-xs font-bold text-slate-400 uppercase mb-2">Account Details</p>
           <div className="text-sm text-slate-600 space-y-1">
             <p><b>Role:</b> Team Member</p>
             <p><b>Joined:</b> January 2026</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;