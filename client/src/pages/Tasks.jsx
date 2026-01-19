// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data } = await axios.get("/api/users/me");
//       setUser(data);
//     };

//     const fetchTasks = async () => {
//       const { data } = await axios.get("/api/tasks");
//       setTasks(data);
//     };

//     fetchUser();
//     fetchTasks();
//   }, []);

//   const filteredTasks =
//     user?.role === "admin"
//       ? tasks
//       : tasks.filter((task) => task.assignedTo === user?._id);

//   return (
//     <div className="container">
//       <h1>Tasks</h1>

//       {/* Admin-only button */}
//       {user?.role === "admin" && (
//         <button onClick={() => navigate("/create-task")}>
//           Create Task
//         </button>
//       )}

//       {filteredTasks.map((task) => (
//         <div key={task._id} className="task-card">
//           <h3>{task.title}</h3>
//           <p>Status: {task.status}</p>
//           <p>Description: {task.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tasks;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";

// const Tasks = ({ user }) => {
//   // Initialize as empty array
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const { data } = await axios.get("/api/tasks");
        
//         // FIX: Extract array correctly. 
//         // If data is { tasks: [...] }, use data.tasks. If data is [...], use data.
//         const tasksArray = Array.isArray(data) ? data : data.tasks || [];
        
//         setTasks(tasksArray);
//       } catch (error) {
//         console.error("Error fetching tasks", error);
//         // Fallback to empty array on error to prevent crashes
//         setTasks([]); 
//       }
//     };

//     fetchTasks();
//   }, []);

//   // FIX: Ensure tasks is an array before filtering
//   const safeTasks = Array.isArray(tasks) ? tasks : [];

//   const filteredTasks = safeTasks
//     .filter((task) => {
//       // 1. Role Check
//       if (user?.role === "admin") return true; 
//       return task.assignedTo === user?._id;
//     })
//     .filter((task) => {
//       // 2. Status Tab Check
//       if (filter === "all") return true;
//       return task.status === filter;
//     });

//   const getPriorityColor = (p) => {
//     if (p === "high") return "bg-red-100 text-red-600";
//     if (p === "medium") return "bg-yellow-100 text-yellow-600";
//     return "bg-blue-100 text-blue-600";
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
//           <p className="text-gray-500 text-sm">Manage your team's workflow</p>
//         </div>
        
//         {user?.role === "admin" && (
//           <button
//             onClick={() => navigate("/create-task")}
//             className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
//           >
//             <FaPlus size={14} /> Create Task
//           </button>
//         )}
//       </div>

//       <div className="flex gap-6 border-b border-gray-200 mb-6">
//         {["all", "todo", "inprogress", "completed"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`capitalize pb-3 text-sm font-semibold transition-colors relative ${
//               filter === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab === "inprogress" ? "In Progress" : tab}
//             {filter === tab && (
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
//               <div className="flex justify-between items-start mb-3">
//                 <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getPriorityColor(task.priority || "normal")}`}>
//                   {task.priority || "normal"}
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   {task.date ? new Date(task.date).toLocaleDateString() : "No Date"}
//                 </span>
//               </div>

//               <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{task.title}</h3>
//               <p className="text-gray-500 text-sm line-clamp-2 mb-4">
//                 {task.description || "No description provided."}
//               </p>

//               <div className="flex items-center justify-between border-t pt-4">
//                 <span className={`text-xs font-semibold capitalize ${
//                   task.status === "completed" ? "text-green-500" : "text-gray-500"
//                 }`}>
//                   ● {task.status}
//                 </span>
//                 <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
//                   {task.assignedTo ? "U" : "?"}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20 text-gray-400">
//             No tasks found in this category.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tasks;



// import React, { useEffect, useState } from "react";
// import API from "../api"; // 1. FIXED: Use API instance instead of axios
// import { FaUserCircle, FaPlus, FaTimes } from "react-icons/fa";

// const Team = ({ user }) => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Form State
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "", // Required to create a user in DB
//     role: "user", // Default role
//     title: "Member" // Job title
//   });

//   // 1. Fetch Users
//   const fetchTeamMembers = async () => {
//     try {
//       // 2. FIXED: Use API.get to ensure correct Base URL
//       const { data } = await API.get("/api/user/get-team"); 
      
//       // Safety check: Handle different data structures
//       if (Array.isArray(data)) {
//         setTeamMembers(data);
//       } else if (data && Array.isArray(data.users)) {
//         setTeamMembers(data.users); // Handle { users: [...] }
//       } else {
//         setTeamMembers([]);
//       }
//     } catch (error) {
//       console.error("Error fetching team:", error);
//       setTeamMembers([]); // Fallback to empty array to prevent crashes
//     }
//   };

//   useEffect(() => {
//     fetchTeamMembers();
//   }, []);

//   // 2. Handle Add Member
//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // 3. FIXED: Use API.post
//       // Verify if your backend route is "/api/user/register" or "/api/auth/register"
//       await API.post("/api/user/register", formData); 
      
//       alert("Team member added successfully!");
//       setShowModal(false);
//       setFormData({ name: "", email: "", password: "", role: "user", title: "Member" }); // Reset form
//       fetchTeamMembers(); // Refresh list immediately
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Failed to add member");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        
//         {/* Admin Button */}
//         {user?.role === "admin" && (
//           <button 
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             <FaPlus size={14} /> Add Member
//           </button>
//         )}
//       </div>

//       {/* Members Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {teamMembers && teamMembers.length > 0 ? (
//           teamMembers.map((member) => (
//             <div key={member._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
//               <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-3">
//                 {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
//               <p className="text-gray-500 text-sm">{member.title || "Team Member"}</p>
//               <p className="text-gray-400 text-xs mb-3">{member.email}</p>
              
//               <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
//                 member.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
//               }`}>
//                 {member.role}
//               </span>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10 text-gray-500">
//             No team members found.
//           </div>
//         )}
//       </div>

//       {/* --- ADD MEMBER MODAL --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
//             <div className="bg-blue-600 p-4 flex justify-between items-center">
//               <h3 className="text-white font-bold">Add New Member</h3>
//               <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
//                 <FaTimes />
//               </button>
//             </div>
            
//             <form onSubmit={handleAddMember} className="p-6 flex flex-col gap-4">
//               <input 
//                 type="text" placeholder="Full Name" required 
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
//               />
//               <input 
//                 type="email" placeholder="Email Address" required 
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//               <input 
//                 type="text" placeholder="Job Title (e.g. Developer)" 
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
//               />
//               <input 
//                 type="password" placeholder="Temporary Password" required 
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
//               />
              
//               <div className="flex flex-col">
//                 <label className="text-sm text-gray-600 mb-1">Role</label>
//                 <select 
//                   className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>

//               <button 
//                 type="submit" disabled={loading}
//                 className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:opacity-50 mt-2 transition"
//               >
//                 {loading ? "Adding..." : "Add Member"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Team;



//correct
// import React, { useEffect, useState } from "react";
// import API from "../api"; // 1. FIXED: Use API instance instead of axios
// import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";

// const Tasks = ({ user }) => {
//   // Initialize as empty array
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         // 2. FIXED: Use API.get
//         const { data } = await API.get("/api/tasks");
        
//         // Safety Check: If data is { tasks: [...] }, use data.tasks. If data is [...], use data.
//         const tasksArray = Array.isArray(data) ? data : data.tasks || [];
        
//         setTasks(tasksArray);
//       } catch (error) {
//         console.error("Error fetching tasks", error);
//         // Fallback to empty array on error to prevent crashes
//         setTasks([]); 
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Ensure tasks is an array before filtering
//   const safeTasks = Array.isArray(tasks) ? tasks : [];

//   const filteredTasks = safeTasks
//     .filter((task) => {
//       // 1. Role Check
//       if (user?.role === "admin") return true; 
//       return task.assignedTo === user?._id;
//     })
//     .filter((task) => {
//       // 2. Status Tab Check
//       if (filter === "all") return true;
//       return task.status === filter;
//     });

//   const getPriorityColor = (p) => {
//     if (p === "high") return "bg-red-100 text-red-600";
//     if (p === "medium") return "bg-yellow-100 text-yellow-600";
//     return "bg-blue-100 text-blue-600";
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
//           <p className="text-gray-500 text-sm">Manage your team's workflow</p>
//         </div>
        
//         {user?.role === "admin" && (
//           <button
//             onClick={() => navigate("/create-task")}
//             className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
//           >
//             <FaPlus size={14} /> Create Task
//           </button>
//         )}
//       </div>

//       <div className="flex gap-6 border-b border-gray-200 mb-6">
//         {["all", "todo", "inprogress", "completed"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`capitalize pb-3 text-sm font-semibold transition-colors relative ${
//               filter === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab === "inprogress" ? "In Progress" : tab}
//             {filter === tab && (
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
//               <div className="flex justify-between items-start mb-3">
//                 <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getPriorityColor(task.priority || "normal")}`}>
//                   {task.priority || "normal"}
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   {task.date ? new Date(task.date).toLocaleDateString() : "No Date"}
//                 </span>
//               </div>

//               <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{task.title}</h3>
//               <p className="text-gray-500 text-sm line-clamp-2 mb-4">
//                 {task.description || "No description provided."}
//               </p>

//               <div className="flex items-center justify-between border-t pt-4">
//                 <span className={`text-xs font-semibold capitalize ${
//                   task.status === "completed" ? "text-green-500" : "text-gray-500"
//                 }`}>
//                   ● {task.status}
//                 </span>
//                 <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
//                   {task.assignedTo ? "U" : "?"}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20 text-gray-400">
//             No tasks found in this category.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tasks;


//trial
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaUserCircle } from "react-icons/fa";

// const Tasks = ({ user }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const { data } = await API.get("/api/tasks");
//         setTasks(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching tasks", error);
//         setTasks([]); 
//       }
//     };
//     fetchTasks();
//   }, []);

//   const filteredTasks = tasks.filter((task) => {
//     const matchesUser = user?.role === "admin" || task.assignedTo?._id === user?._id;
//     const matchesFilter = filter === "all" || task.status === filter;
//     return matchesUser && matchesFilter;
//   });

//   const getPriorityColor = (p) => {
//     const colors = { high: "bg-red-100 text-red-600", medium: "bg-yellow-100 text-yellow-600", normal: "bg-blue-100 text-blue-600" };
//     return colors[p] || colors.normal;
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
//           <p className="text-gray-500 text-sm">Current Team Progress</p>
//         </div>
//         {user?.role === "admin" && (
//           <button onClick={() => navigate("/create-task")} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition">
//             <FaPlus size={14} /> Create Task
//           </button>
//         )}
//       </div>

//       <div className="flex gap-6 border-b mb-6">
//         {["all", "todo", "inprogress", "completed"].map((tab) => (
//           <button key={tab} onClick={() => setFilter(tab)} className={`capitalize pb-3 text-sm font-semibold transition-all relative ${filter === tab ? "text-blue-600" : "text-gray-500"}`}>
//             {tab === "inprogress" ? "In Progress" : tab}
//             {filter === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//               <div className="flex justify-between items-start mb-3">
//                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getPriorityColor(task.priority)}`}>
//                   {task.priority || "normal"}
//                 </span>
//               </div>
//               <h3 className="font-bold text-gray-800 mb-1">{task.title}</h3>
//               <p className="text-gray-500 text-xs mb-4 line-clamp-2">{task.description}</p>
              
//               <div className="flex items-center justify-between border-t pt-4">
//                 <span className="text-[11px] font-bold text-gray-400 uppercase">● {task.status}</span>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-medium text-gray-600">
//                     {task.assignedTo?.name || "Unassigned"}
//                   </span>
//                   <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">
//                     {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : <FaUserCircle />}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20 text-gray-400">No tasks found.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaUserCircle, FaTrash, FaCheckCircle } from "react-icons/fa";

// const Tasks = ({ user }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   const fetchTasks = async () => {
//     try {
//       const { data } = await API.get("/api/tasks");
//       setTasks(Array.isArray(data) ? data : []);
//     } catch (error) {
//       setTasks([]);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (taskId) => {
//     if (!window.confirm("Delete this task?")) return;
//     await API.delete(`/api/tasks/${taskId}`);
//     fetchTasks();
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     await API.put(`/api/tasks/${taskId}`, { status: newStatus });
//     fetchTasks();
//   };

//   // --- STRICT FILTERING LOGIC ---
//   const filteredTasks = tasks.filter((task) => {
//     if (!user) return false;

//     // 1. Admin sees everything
//     if (user.role === "admin") {
//       return filter === "all" || task.status === filter;
//     }

//     // 2. Members see ONLY what is assigned to their unique ID
//     const isAssignedToMe = task.assignedTo?._id === user._id;
//     const matchesTab = filter === "all" || task.status === filter;

//     return isAssignedToMe && matchesTab;
//   });

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
//           <p className="text-gray-500 text-sm">
//             Account: <span className="text-blue-600 font-bold">{user?.name}</span> ({user?.role})
//           </p>
//         </div>
//         {user?.role === "admin" && (
//           <button onClick={() => navigate("/create-task")} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition">
//             + Create Task
//           </button>
//         )}
//       </div>

//       <div className="flex gap-6 border-b mb-6">
//         {["all", "todo", "inprogress", "completed"].map((tab) => (
//           <button key={tab} onClick={() => setFilter(tab)} className={`capitalize pb-3 text-sm font-semibold transition-all relative ${filter === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}>
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((task) => (
//             <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border relative">
//               {user?.role === "admin" && (
//                 <button onClick={() => handleDelete(task._id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500">
//                   <FaTrash size={12} />
//                 </button>
//               )}

//               <h3 className="font-bold text-gray-800">{task.title}</h3>
//               <p className="text-gray-500 text-xs mb-4">{task.description}</p>
              
//               <div className="mb-4">
//                 {user?.role === "admin" ? (
//                   <select 
//                     className="text-xs border rounded p-1"
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                   >
//                     <option value="todo">TODO</option>
//                     <option value="inprogress">IN PROGRESS</option>
//                     <option value="completed">COMPLETED</option>
//                   </select>
//                 ) : (
//                   <span className="text-xs font-bold text-blue-600 uppercase">● {task.status}</span>
//                 )}
//               </div>

//               <div className="flex items-center justify-between border-t pt-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold">
//                     {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : "?"}
//                   </div>
//                   <span className="text-xs text-gray-600">{task.assignedTo?.name || "Unassigned"}</span>
//                 </div>
//                 {task.status === "completed" && <FaCheckCircle className="text-green-500" />}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
//             No tasks found for your account.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
  import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUserCircle, FaTrash, FaCheckCircle } from "react-icons/fa";

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/api/tasks");
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    await API.delete(`/api/tasks/${taskId}`);
    fetchTasks();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await API.put(`/api/tasks/${taskId}`, { status: newStatus });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (!user) return false;

    if (user.role === "admin") {
      return filter === "all" || task.status === filter;
    }

    // ✅ FIX: Check if user's ID exists anywhere in the assignedTo array
    const isAssignedToMe = task.assignedTo?.some(member => 
      (typeof member === 'string' ? member : member._id) === user._id
    );
    const matchesTab = filter === "all" || task.status === filter;

    return isAssignedToMe && matchesTab;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-500 text-sm">
            Account: <span className="text-blue-600 font-bold">{user?.name}</span> ({user?.role})
          </p>
        </div>
        {user?.role === "admin" && (
          <button onClick={() => navigate("/create-task")} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition">
            + Create Task
          </button>
        )}
      </div>

      <div className="flex gap-6 border-b mb-6">
        {["all", "todo", "inprogress", "completed"].map((tab) => (
          <button key={tab} onClick={() => setFilter(tab)} className={`capitalize pb-3 text-sm font-semibold transition-all relative ${filter === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border relative flex flex-col justify-between">
              <div>
                {user?.role === "admin" && (
                  <button onClick={() => handleDelete(task._id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500">
                    <FaTrash size={12} />
                  </button>
                )}

                <h3 className="font-bold text-gray-800 uppercase tracking-tight">{task.title}</h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{task.description}</p>
                
                <div className="mb-4">
                  {user?.role === "admin" ? (
                    <select 
                      className="text-xs border rounded p-1 bg-gray-50 outline-none"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <option value="todo">TODO</option>
                      <option value="inprogress">IN PROGRESS</option>
                      <option value="completed">COMPLETED</option>
                    </select>
                  ) : (
                    <span className="text-xs font-bold text-blue-600 uppercase">● {task.status}</span>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Assigned To:</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* ✅ FIX: Map through the array of members instead of showing just one */}
                  {task.assignedTo && task.assignedTo.length > 0 ? (
                    task.assignedTo.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                          {member.name ? member.name.charAt(0) : "?"}
                        </div>
                        <span className="text-[11px] text-gray-700 font-medium">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">Unassigned</span>
                  )}
                  {task.status === "completed" && <FaCheckCircle className="text-green-500 ml-auto" />}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
            No tasks found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;