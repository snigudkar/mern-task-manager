// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   ResponsiveContainer,
// // // //   PieChart,
// // // //   Pie,
// // // //   Tooltip,
// // // //   Cell,
// // // // } from "recharts";

// // // // const Dashboard = () => {
// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [counts, setCounts] = useState({
// // // //     todo: 0,
// // // //     inprogress: 0,
// // // //     completed: 0,
// // // //   });

// // // //   const user = JSON.parse(localStorage.getItem("userInfo"));

// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const fetchTasks = async () => {
// // // //       try {
// // // //         const { data } = await axios.get("/api/tasks");
// // // //         setTasks(data);

// // // //         const todo = data.filter((t) => t.status === "todo").length;
// // // //         const inprogress = data.filter((t) => t.status === "inprogress").length;
// // // //         const completed = data.filter((t) => t.status === "completed").length;

// // // //         setCounts({ todo, inprogress, completed });
// // // //       } catch (error) {
// // // //         console.log(error);
// // // //       }
// // // //     };

// // // //     fetchTasks();
// // // //   }, []);

// // // //   // Admin sees all tasks
// // // //   // User sees only assigned tasks
// // // //   const filteredTasks =
// // // //     user.role === "admin"
// // // //       ? tasks
// // // //       : tasks.filter((t) => t.assignedTo === user._id);

// // // //   const data = [
// // // //     { name: "To Do", value: counts.todo },
// // // //     { name: "In Progress", value: counts.inprogress },
// // // //     { name: "Completed", value: counts.completed },
// // // //   ];

// // // //   const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100">
// // // //       <div className="flex">
// // // //         {/* Sidebar */}
// // // //         <div className="w-72 bg-white shadow-md p-5">
// // // //           <h2 className="text-xl font-bold mb-6">Dashboard</h2>

// // // //           <div className="mb-6">
// // // //             <p className="font-semibold">Hello, {user.name}</p>
// // // //             <p className="text-sm text-gray-500">{user.role}</p>
// // // //           </div>

// // // //           <button
// // // //             className="w-full bg-blue-500 text-white p-2 rounded-lg"
// // // //             onClick={() => navigate("/tasks")}
// // // //           >
// // // //             View Tasks
// // // //           </button>

// // // //           {user.role === "admin" && (
// // // //             <>
// // // //               <button
// // // //                 className="w-full mt-3 bg-green-500 text-white p-2 rounded-lg"
// // // //                 onClick={() => navigate("/create-task")}
// // // //               >
// // // //                 Create Task
// // // //               </button>

// // // //               <button
// // // //                 className="w-full mt-3 bg-purple-500 text-white p-2 rounded-lg"
// // // //                 onClick={() => navigate("/teams")}
// // // //               >
// // // //                 Manage Teams
// // // //               </button>
// // // //             </>
// // // //           )}
// // // //         </div>

// // // //         {/* Main */}
// // // //         <div className="flex-1 p-8">
// // // //           <h1 className="text-2xl font-bold mb-6">Task Overview</h1>

// // // //           {/* Chart */}
// // // //           <div className="bg-white p-6 rounded-lg shadow-md">
// // // //             <h2 className="font-semibold mb-4">Task Status Chart</h2>

// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <PieChart>
// // // //                 <Pie
// // // //                   data={data}
// // // //                   dataKey="value"
// // // //                   nameKey="name"
// // // //                   cx="50%"
// // // //                   cy="50%"
// // // //                   outerRadius={100}
// // // //                   fill="#8884d8"
// // // //                   label
// // // //                 >
// // // //                   {data.map((entry, index) => (
// // // //                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
// // // //                   ))}
// // // //                 </Pie>

// // // //                 <Tooltip />
// // // //               </PieChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           {/* Task Preview */}
// // // //           <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
// // // //             <h2 className="font-semibold mb-4">Recent Tasks</h2>

// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               {filteredTasks.slice(0, 6).map((task) => (
// // // //                 <div
// // // //                   key={task._id}
// // // //                   className="border p-4 rounded-lg hover:shadow-lg transition"
// // // //                 >
// // // //                   <h3 className="font-bold">{task.title}</h3>
// // // //                   <p className="text-sm text-gray-600">
// // // //                     {task.description.slice(0, 60)}...
// // // //                   </p>
// // // //                   <p className="mt-2 text-sm">
// // // //                     <span className="font-semibold">Status:</span>{" "}
// // // //                     {task.status}
// // // //                   </p>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   ResponsiveContainer,
// // //   PieChart,
// // //   Pie,
// // //   Tooltip,
// // //   Cell,
// // // } from "recharts";

// // // const Dashboard = () => {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [counts, setCounts] = useState({
// // //     todo: 0,
// // //     inprogress: 0,
// // //     completed: 0,
// // //   });

// // //   const user = JSON.parse(localStorage.getItem("userInfo"));
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     if (!user) {
// // //       navigate("/login");
// // //     }

// // //     const fetchTasks = async () => {
// // //       try {
// // //         const { data } = await axios.get("/api/tasks");
// // //         setTasks(data);

// // //         const todo = data.filter((t) => t.status === "todo").length;
// // //         const inprogress = data.filter((t) => t.status === "inprogress").length;
// // //         const completed = data.filter((t) => t.status === "completed").length;

// // //         setCounts({ todo, inprogress, completed });
// // //       } catch (error) {
// // //         console.log(error);
// // //       }
// // //     };

// // //     fetchTasks();
// // //   }, [user, navigate]);

// // //   if (!user) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   const filteredTasks =
// // //     user.role === "admin"
// // //       ? tasks
// // //       : tasks.filter((t) => t.assignedTo === user._id);

// // //   const data = [
// // //     { name: "To Do", value: counts.todo },
// // //     { name: "In Progress", value: counts.inprogress },
// // //     { name: "Completed", value: counts.completed },
// // //   ];

// // //   const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

// // //   return (
// // //     <div className="min-h-screen bg-gray-100">
// // //       <div className="flex">
// // //         {/* Sidebar */}
// // //         <div className="w-72 bg-white shadow-md p-5">
// // //           <h2 className="text-xl font-bold mb-6">Dashboard</h2>

// // //           <div className="mb-6">
// // //             <p className="font-semibold">Hello, {user.name}</p>
// // //             <p className="text-sm text-gray-500">{user.role}</p>
// // //           </div>

// // //           <button
// // //             className="w-full bg-blue-500 text-white p-2 rounded-lg"
// // //             onClick={() => navigate("/tasks")}
// // //           >
// // //             View Tasks
// // //           </button>

// // //           {user.role === "admin" && (
// // //             <>
// // //               <button
// // //                 className="w-full mt-3 bg-green-500 text-white p-2 rounded-lg"
// // //                 onClick={() => navigate("/create-task")}
// // //               >
// // //                 Create Task
// // //               </button>

// // //               <button
// // //                 className="w-full mt-3 bg-purple-500 text-white p-2 rounded-lg"
// // //                 onClick={() => navigate("/teams")}
// // //               >
// // //                 Manage Teams
// // //               </button>
// // //             </>
// // //           )}
// // //         </div>

// // //         {/* Main */}
// // //         <div className="flex-1 p-8">
// // //           <h1 className="text-2xl font-bold mb-6">Task Overview</h1>

// // //           {/* Chart */}
// // //           <div className="bg-white p-6 rounded-lg shadow-md">
// // //             <h2 className="font-semibold mb-4">Task Status Chart</h2>

// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <PieChart>
// // //                 <Pie
// // //                   data={data}
// // //                   dataKey="value"
// // //                   nameKey="name"
// // //                   cx="50%"
// // //                   cy="50%"
// // //                   outerRadius={100}
// // //                   fill="#8884d8"
// // //                   label
// // //                 >
// // //                   {data.map((entry, index) => (
// // //                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
// // //                   ))}
// // //                 </Pie>

// // //                 <Tooltip />
// // //               </PieChart>
// // //             </ResponsiveContainer>
// // //           </div>

// // //           {/* Task Preview */}
// // //           <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
// // //             <h2 className="font-semibold mb-4">Recent Tasks</h2>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               {filteredTasks.slice(0, 6).map((task) => (
// // //                 <div
// // //                   key={task._id}
// // //                   className="border p-4 rounded-lg hover:shadow-lg transition"
// // //                 >
// // //                   <h3 className="font-bold">{task.title}</h3>
// // //                   <p className="text-sm text-gray-600">
// // //                     {task.description.slice(0, 60)}...
// // //                   </p>
// // //                   <p className="mt-2 text-sm">
// // //                     <span className="font-semibold">Status:</span>{" "}
// // //                     {task.status}
// // //                   </p>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const Dashboard = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [counts, setCounts] = useState({ todo: 0, inprogress: 0, completed: 0 });

// //   const navigate = useNavigate();
// //   const user = JSON.parse(localStorage.getItem("userInfo"));

// //   const fetchTasks = async () => {
// //     try {
// //       const { data } = await axios.get("/api/tasks");

// //       // IMPORTANT: fix data type issue
// //       const tasksArray = Array.isArray(data) ? data : data.tasks || [];

// //       setTasks(tasksArray);

// //       const todo = tasksArray.filter((t) => t.status === "todo").length;
// //       const inprogress = tasksArray.filter((t) => t.status === "inprogress").length;
// //       const completed = tasksArray.filter((t) => t.status === "completed").length;

// //       setCounts({ todo, inprogress, completed });
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!user) {
// //       navigate("/login");
// //       return;
// //     }

// //     fetchTasks();
// //   }, [user, navigate]); // IMPORTANT: add dependency array

// //   if (!user) return null;

// //   const filteredTasks =
// //     user.role === "admin"
// //       ? tasks
// //       : tasks.filter((t) => t.assignedTo === user._id);

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //         <div className="bg-white p-4 rounded shadow">
// //           <h2>Total Tasks</h2>
// //           <p className="text-3xl font-bold">{counts.todo + counts.inprogress + counts.completed}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded shadow">
// //           <h2>In Progress</h2>
// //           <p className="text-3xl font-bold">{counts.inprogress}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded shadow">
// //           <h2>Completed</h2>
// //           <p className="text-3xl font-bold">{counts.completed}</p>
// //         </div>
// //       </div>

// //       <div className="bg-white p-6 rounded shadow">
// //         <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {filteredTasks.slice(0, 6).map((task) => (
// //             <div key={task._id} className="border p-4 rounded">
// //               <h3 className="font-bold">{task.title}</h3>
// //               <p className="text-sm text-gray-600">
// //                 {task.description ? task.description.slice(0, 60) : "No description"}
// //               </p>
// //               <p className="mt-2 text-sm">
// //                 <strong>Status:</strong> {task.status}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

// // 1. Accept 'user' from props (passed from App.jsx)
// const Dashboard = ({ user }) => {
//   const [tasks, setTasks] = useState([]);
//   const [counts, setCounts] = useState({ todo: 0, inprogress: 0, completed: 0 });

//   useEffect(() => {
//     // If user prop is missing for some reason, do nothing (App handles redirect)
//     if (!user) return;

//     const fetchTasks = async () => {
//       try {
//         const { data } = await axios.get("/api/tasks");
//         const tasksArray = Array.isArray(data) ? data : data.tasks || [];

//         setTasks(tasksArray);

//         const todo = tasksArray.filter((t) => t.status === "todo").length;
//         const inprogress = tasksArray.filter((t) => t.status === "inprogress").length;
//         const completed = tasksArray.filter((t) => t.status === "completed").length;

//         setCounts({ todo, inprogress, completed });
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, [user]); // Re-run only if user changes

//   // 2. Filter using the 'user' prop
//   const filteredTasks =
//     user?.role === "admin"
//       ? tasks
//       : tasks.filter((t) => t.assignedTo === user?._id);

//   const data = [
//     { name: "To Do", value: counts.todo },
//     { name: "In Progress", value: counts.inprogress },
//     { name: "Completed", value: counts.completed },
//   ];

//   const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* Example UI - Customize as needed */}
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Chart Section */}
//         <div className="bg-white p-4 rounded shadow h-80">
//           <h2 className="text-lg font-semibold mb-2">Task Status</h2>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* List Section */}
//         <div className="bg-white p-4 rounded shadow h-80 overflow-y-auto">
//           <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
//           <ul>
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <li key={task._id} className="border-b py-2 flex justify-between">
//                   <span>{task.title}</span>
//                   <span className="text-sm text-gray-500 capitalize">{task.status}</span>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No tasks assigned.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
// import { FaClipboardList, FaCheckCircle, FaSpinner, FaTasks } from "react-icons/fa"; // Install react-icons if needed

// const Dashboard = ({ user }) => {
//   const [tasks, setTasks] = useState([]);
//   const [counts, setCounts] = useState({ todo: 0, inprogress: 0, completed: 0, total: 0 });

//   useEffect(() => {
//     if (!user) return;

//     const fetchTasks = async () => {
//       try {
//         const { data } = await axios.get("/api/tasks");
//         const tasksArray = Array.isArray(data) ? data : data.tasks || [];

//         setTasks(tasksArray);

//         const todo = tasksArray.filter((t) => t.status === "todo").length;
//         const inprogress = tasksArray.filter((t) => t.status === "inprogress").length;
//         const completed = tasksArray.filter((t) => t.status === "completed").length;

//         setCounts({ todo, inprogress, completed, total: tasksArray.length });
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, [user]);

//   // Data for the Chart
//   const data = [
//     { name: "To Do", value: counts.todo },
//     { name: "In Progress", value: counts.inprogress },
//     { name: "Completed", value: counts.completed },
//   ];

//   const COLORS = ["#8884d8", "#f6e05e", "#48bb78"]; // Purple, Yellow, Green

//   // Helper component for the Stat Cards
//   const StatCard = ({ title, count, icon, bg, text }) => (
//     <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
//       <div>
//         <h3 className="text-gray-500 text-sm uppercase font-semibold">{title}</h3>
//         <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
//         <span className="text-gray-400 text-xs">111 last month</span>
//       </div>
//       <div className={`p-3 rounded-full ${bg} ${text}`}>
//         {icon}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
      
//       {/* --- STATS CARDS SECTION --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="TOTAL TASK" 
//           count={counts.total} 
//           icon={<FaClipboardList size={20} />} 
//           bg="bg-blue-100" 
//           text="text-blue-600" 
//         />
//         <StatCard 
//           title="COMPLETED TASK" 
//           count={counts.completed} 
//           icon={<FaCheckCircle size={20} />} 
//           bg="bg-green-100" 
//           text="text-green-600" 
//         />
//         <StatCard 
//           title="TASK IN PROGRESS" 
//           count={counts.inprogress} 
//           icon={<FaSpinner size={20} />} 
//           bg="bg-yellow-100" 
//           text="text-yellow-600" 
//         />
//         <StatCard 
//           title="TODOS" 
//           count={counts.todo} 
//           icon={<FaTasks size={20} />} 
//           bg="bg-red-100" 
//           text="text-red-600" 
//         />
//       </div>

//       {/* --- CHART SECTION --- */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">Chart by Priority</h2>
        
//         {/* FIX: Explicit height (h-80) here prevents the Recharts error */}
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 paddingAngle={5}
//                 dataKey="value"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend verticalAlign="bottom" height={36}/>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import API from "../api"; // 1. FIXED: Use API instance instead of axios
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { FaClipboardList, FaCheckCircle, FaSpinner, FaTasks } from "react-icons/fa"; 

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({ todo: 0, inprogress: 0, completed: 0, total: 0 });

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        // 2. FIXED: Use API.get
        const { data } = await API.get("/api/tasks");
        
        // Safety check to ensure we have an array
        const tasksArray = Array.isArray(data) ? data : data.tasks || [];

        setTasks(tasksArray);

        // Calculate counts
        const todo = tasksArray.filter((t) => t.status === "todo").length;
        const inprogress = tasksArray.filter((t) => t.status === "inprogress").length;
        const completed = tasksArray.filter((t) => t.status === "completed").length;

        setCounts({ todo, inprogress, completed, total: tasksArray.length });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  // Data for the Chart
  const data = [
    { name: "To Do", value: counts.todo },
    { name: "In Progress", value: counts.inprogress },
    { name: "Completed", value: counts.completed },
  ];

  const COLORS = ["#8884d8", "#f6e05e", "#48bb78"]; // Purple, Yellow, Green

  // Helper component for the Stat Cards
  const StatCard = ({ title, count, icon, bg, text }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm uppercase font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
        <span className="text-gray-400 text-xs">111 last month</span>
      </div>
      <div className={`p-3 rounded-full ${bg} ${text}`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* --- STATS CARDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="TOTAL TASK" 
          count={counts.total} 
          icon={<FaClipboardList size={20} />} 
          bg="bg-blue-100" 
          text="text-blue-600" 
        />
        <StatCard 
          title="COMPLETED TASK" 
          count={counts.completed} 
          icon={<FaCheckCircle size={20} />} 
          bg="bg-green-100" 
          text="text-green-600" 
        />
        <StatCard 
          title="TASK IN PROGRESS" 
          count={counts.inprogress} 
          icon={<FaSpinner size={20} />} 
          bg="bg-yellow-100" 
          text="text-yellow-600" 
        />
        <StatCard 
          title="TODOS" 
          count={counts.todo} 
          icon={<FaTasks size={20} />} 
          bg="bg-red-100" 
          text="text-red-600" 
        />
      </div>

      {/* --- CHART SECTION --- */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Chart by Priority</h2>
        
        {/* FIX: Explicit height (h-80) here prevents the Recharts error */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;