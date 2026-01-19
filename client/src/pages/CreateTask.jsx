// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const CreateTask = () => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [status, setStatus] = useState("todo");
// //   const [assignedTo, setAssignedTo] = useState("");
// //   const [teamMembers, setTeamMembers] = useState([]);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchTeamMembers = async () => {
// //       try {
// //         const { data } = await axios.get("/api/users/team-members");
// //         setTeamMembers(data);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };

// //     fetchTeamMembers();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await axios.post("/api/tasks", {
// //         title,
// //         description,
// //         status,
// //         assignedTo,
// //       });

// //       alert("Task created successfully!");
// //       navigate("/tasks"); // redirect to tasks page
// //     } catch (error) {
// //       console.log(error);
// //       alert("Failed to create task");
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h1>Create Task</h1>

// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Task Title</label>
// //           <input
// //             type="text"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label>Task Description</label>
// //           <textarea
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //           />
// //         </div>

// //         <div>
// //           <label>Status</label>
// //           <select value={status} onChange={(e) => setStatus(e.target.value)}>
// //             <option value="todo">To Do</option>
// //             <option value="inprogress">In Progress</option>
// //             <option value="completed">Completed</option>
// //           </select>
// //         </div>

// //         <div>
// //           <label>Assign To</label>
// //           <select
// //             value={assignedTo}
// //             onChange={(e) => setAssignedTo(e.target.value)}
// //             required
// //           >
// //             <option value="">Select Team Member</option>
// //             {teamMembers.map((member) => (
// //               <option key={member._id} value={member._id}>
// //                 {member.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <button type="submit">Create Task</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateTask;

// import React, { useEffect, useState } from "react";
// import API from "../api"; // 1. FIXED: Use API instance, not axios
// import { useNavigate } from "react-router-dom";
// import { FaUserCheck, FaTasks } from "react-icons/fa"; 

// const CreateTask = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("todo");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [priority, setPriority] = useState("normal");
//   const [date, setDate] = useState("");
  
//   const [teamMembers, setTeamMembers] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTeamMembers = async () => {
//       try {
//         // 2. FIXED: Use API.get
//         const { data } = await API.get("/api/user/get-team"); 
        
//         // Safety check to ensure data is an array
//         if (Array.isArray(data)) {
//           setTeamMembers(data);
//         } else if (data && Array.isArray(data.users)) {
//           setTeamMembers(data.users);
//         } else {
//           setTeamMembers([]); 
//         }
//       } catch (error) {
//         console.error("Error fetching team:", error);
//         setTeamMembers([]); 
//       }
//     };
//     fetchTeamMembers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // 3. FIXED: Use API.post
//       await API.post("/api/tasks", {
//         title,
//         description,
//         status,
//         assignedTo,
//         priority, 
//         date,     
//       });
//       alert("Task created successfully!");
//       navigate("/tasks");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to create task");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        
//         <div className="bg-blue-600 p-6 text-white">
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <FaTasks /> Create New Task
//           </h2>
//           <p className="text-blue-100 text-sm">Assign a new task to your team</p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
//             <input
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//               placeholder="e.g. Redesign Homepage"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//              <div>
//               <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
//               <input
//                 type="date"
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Priority</label>
//               <select
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//               >
//                 <option value="normal">Normal</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Status</label>
//               <select
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value="todo">To Do</option>
//                 <option value="inprogress">In Progress</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Assign To</label>
//               <div className="relative">
//                 <select
//                   className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 appearance-none"
//                   value={assignedTo}
//                   onChange={(e) => setAssignedTo(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Team Member</option>
                  
//                   {teamMembers && teamMembers.length > 0 ? (
//                     teamMembers.map((member) => (
//                       <option key={member._id} value={member._id}>
//                         {member.name}
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>Loading members...</option>
//                   )}

//                 </select>
//                 <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
//                   <FaUserCheck />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Description</label>
//             <textarea
//               rows="4"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//               placeholder="Add details about the task..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="flex justify-end gap-4 mt-8">
//             <button
//               type="button"
//               onClick={() => navigate("/tasks")}
//               className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-8 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
//             >
//               Create Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTask;


//correct
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // 1. FIXED: Changed FaUserSelect to FaUserCheck
// import { FaUserCheck, FaTasks } from "react-icons/fa"; 

// const CreateTask = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("todo");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [priority, setPriority] = useState("normal");
//   const [date, setDate] = useState("");
  
//   const [teamMembers, setTeamMembers] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTeamMembers = async () => {
//       try {
//         const { data } = await axios.get("/api/user/get-team"); 
        
//         // Safety check to ensure data is an array
//         if (Array.isArray(data)) {
//           setTeamMembers(data);
//         } else if (data && Array.isArray(data.users)) {
//           setTeamMembers(data.users);
//         } else {
//           setTeamMembers([]); 
//         }
//       } catch (error) {
//         console.error("Error fetching team:", error);
//         setTeamMembers([]); 
//       }
//     };
//     fetchTeamMembers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/tasks", {
//         title,
//         description,
//         status,
//         assignedTo,
//         priority, 
//         date,     
//       });
//       alert("Task created successfully!");
//       navigate("/tasks");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to create task");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        
//         <div className="bg-blue-600 p-6 text-white">
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <FaTasks /> Create New Task
//           </h2>
//           <p className="text-blue-100 text-sm">Assign a new task to your team</p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
//             <input
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//               placeholder="e.g. Redesign Homepage"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//              <div>
//               <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
//               <input
//                 type="date"
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Priority</label>
//               <select
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//               >
//                 <option value="normal">Normal</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Status</label>
//               <select
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value="todo">To Do</option>
//                 <option value="inprogress">In Progress</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Assign To</label>
//               <div className="relative">
//                 <select
//                   className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 appearance-none"
//                   value={assignedTo}
//                   onChange={(e) => setAssignedTo(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Team Member</option>
                  
//                   {teamMembers && teamMembers.length > 0 ? (
//                     teamMembers.map((member) => (
//                       <option key={member._id} value={member._id}>
//                         {member.name}
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>Loading members...</option>
//                   )}

//                 </select>
//                 {/* 2. FIXED: Using FaUserCheck here */}
//                 <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
//                   <FaUserCheck />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Description</label>
//             <textarea
//               rows="4"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//               placeholder="Add details about the task..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="flex justify-end gap-4 mt-8">
//             <button
//               type="button"
//               onClick={() => navigate("/tasks")}
//               className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-8 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
//             >
//               Create Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTask;


//trial
// import React, { useEffect, useState } from "react";
// import API from "../api"; // ✅ Use your custom API instance
// import { useNavigate } from "react-router-dom";
// import { FaUserCheck, FaTasks, FaArrowLeft } from "react-icons/fa"; 

// const CreateTask = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("todo");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [priority, setPriority] = useState("normal");
//   const [date, setDate] = useState("");
//   const [teamMembers, setTeamMembers] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTeamMembers = async () => {
//       try {
//         // ✅ Fetches users where isActive: true (Aman Chopra)
//         const { data } = await API.get("/api/user/get-team"); 
//         setTeamMembers(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching team:", error);
//         setTeamMembers([]); 
//       }
//     };
//     fetchTeamMembers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/api/tasks", {
//         title,
//         description,
//         status,
//         assignedTo,
//         priority, 
//         date,     
//       });
//       navigate("/tasks");
//     } catch (error) {
//       alert("Failed to create task");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
//         <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold flex items-center gap-2">
//               <FaTasks /> Create New Task
//             </h2>
//             <p className="text-blue-100 text-sm">Assign workflow to team members</p>
//           </div>
//           <button onClick={() => navigate("/tasks")} className="text-white/80 hover:text-white">
//             <FaArrowLeft size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-6">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
//             <input
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all"
//               placeholder="Task name..."
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Priority</label>
//               <select
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none"
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//               >
//                 <option value="normal">Normal</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Assign To</label>
//               <div className="relative">
//                 <select
//                   className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none appearance-none cursor-pointer"
//                   value={assignedTo}
//                   onChange={(e) => setAssignedTo(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Member (e.g. Aman)</option>
//                   {teamMembers.map((member) => (
//                     <option key={member._id} value={member._id}>
//                       {member.name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
//                   <FaUserCheck />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Description</label>
//             <textarea
//               rows="3"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
//               placeholder="Details..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="flex justify-end gap-4">
//             <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition-all">
//               Save Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTask;


//now
import React, { useEffect, useState } from "react";
import API from "../api"; 
import { useNavigate } from "react-router-dom";
import { FaTasks, FaArrowLeft, FaTimes } from "react-icons/fa"; 

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]); // Stores Array of User Objects for UI chips
  const [priority, setPriority] = useState("normal");
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data } = await API.get("/api/user/get-team"); 
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeamMembers();
  }, []);

  // ✅ Add member to chips
  const addMember = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const member = teamMembers.find(m => m._id === selectedId);
    // Prevent duplicates
    if (member && !assignedTo.find(m => m._id === selectedId)) {
      setAssignedTo([...assignedTo, member]);
    }
    e.target.value = ""; // Reset dropdown
  };

  // ✅ Remove member from chips
  const removeMember = (id) => {
    setAssignedTo(assignedTo.filter(m => m._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send only the IDs to the backend
      const memberIds = assignedTo.map(m => m._id);
      await API.post("/api/tasks", {
        title,
        description,
        assignedTo: memberIds, 
        priority, 
      });
      navigate("/tasks");
    } catch (error) {
      alert("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2"><FaTasks /> Create New Task</h2>
          <button onClick={() => navigate("/tasks")} className="text-white/80 hover:text-white"><FaArrowLeft size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Priority</label>
              <select className="w-full px-4 py-3 rounded-lg border outline-none" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Assign Team Members</label>
              <select className="w-full px-4 py-3 rounded-lg border outline-none mb-3" onChange={addMember}>
                <option value="">Select Member...</option>
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>{member.name}</option>
                ))}
              </select>

              {/* ✅ MODERN CHIPS SECTION */}
              <div className="flex flex-wrap gap-2">
                {assignedTo.map(member => (
                  <div key={member._id} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {member.name}
                    <button type="button" onClick={() => removeMember(member._id)} className="hover:text-red-500">
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea rows="3" className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">Save Task</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;