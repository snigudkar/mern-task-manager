// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Team = () => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // fetch logged in user
//     const fetchUser = async () => {
//       try {
//         const { data } = await axios.get("/api/users/me");
//         setUser(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // fetch team members
//     const fetchTeamMembers = async () => {
//       try {
//         const { data } = await axios.get("/api/users/team-members");
//         setTeamMembers(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUser();
//     fetchTeamMembers();
//   }, []);

//   return (
//     <div className="container">
//       <h1>Team</h1>

//       {/* Admin-only button */}
//       {user?.role === "admin" && (
//         <button onClick={() => console.log("Add team member")}>
//           Add Team Member
//         </button>
//       )}

//       {/* Team members list */}
//       <div>
//         {teamMembers.map((member) => (
//           <div key={member._id} className="team-card">
//             <h3>{member.name}</h3>
//             <p>{member.email}</p>

//             {/* Admin-only edit/delete */}
//             {user?.role === "admin" && (
//               <div>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Team;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
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
//       // Make sure this matches your backend route exactly! 
//       // It might be "/api/user" or "/api/users" depending on your server.js
//       const { data } = await axios.get("/api/user/get-team"); 
      
//       if (Array.isArray(data)) {
//         setTeamMembers(data);
//       } else {
//         setTeamMembers([]);
//       }
//     } catch (error) {
//       console.error("Error fetching team:", error);
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
//       // Usually the register endpoint creates the user in MongoDB
//       await axios.post("/api/user/register", formData); 
      
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
//         {teamMembers.map((member) => (
//           <div key={member._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
//             <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-3">
//               {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
//             </div>
//             <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
//             <p className="text-gray-500 text-sm">{member.title || "Team Member"}</p>
//             <p className="text-gray-400 text-xs mb-3">{member.email}</p>
            
//             <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
//               member.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
//             }`}>
//               {member.role}
//             </span>
//           </div>
//         ))}
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
//                 className="border p-2 rounded"
//                 value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
//               />
//               <input 
//                 type="email" placeholder="Email Address" required 
//                 className="border p-2 rounded"
//                 value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//               <input 
//                 type="text" placeholder="Job Title (e.g. Developer)" 
//                 className="border p-2 rounded"
//                 value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
//               />
//               <input 
//                 type="password" placeholder="Temporary Password" required 
//                 className="border p-2 rounded"
//                 value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
//               />
              
//               <div className="flex flex-col">
//                 <label className="text-sm text-gray-600 mb-1">Role</label>
//                 <select 
//                   className="border p-2 rounded"
//                   value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>

//               <button 
//                 type="submit" disabled={loading}
//                 className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:opacity-50 mt-2"
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




// import React, { useEffect, useState } from "react";
// import API from "../api"; // ✅ FIXED: Use your custom API instance
// import { FaUserCircle, FaTimes } from "react-icons/fa"; 

// const Team = ({ user }) => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [showModal, setShowModal] = useState(false); // Modal state
//   const [newMember, setNewMember] = useState({ name: "", email: "", role: "member", title: "Member" });

//   const fetchTeamMembers = async () => {
//     try {
//       // ✅ FIXED: Using API instance correctly hits port 5000
//       const { data } = await API.get("/api/user/get-team");
      
//       if (Array.isArray(data)) {
//         setTeamMembers(data);
//       } else {
//         setTeamMembers([]);
//       }
//     } catch (error) {
//       console.error("Error fetching team:", error);
//       setTeamMembers([]);
//     }
//   };

//   useEffect(() => {
//     fetchTeamMembers();
//   }, []);

//   // Handle adding a new member
//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     try {
//       // This calls the register route in your backend
//       await API.post("/api/user/register", newMember);
//       setShowModal(false); // Close modal
//       setNewMember({ name: "", email: "", role: "member", title: "Member" }); // Reset form
//       fetchTeamMembers(); // Refresh list
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to add member");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        
//         {user?.role === "admin" && (
//           <button 
//             onClick={() => setShowModal(true)} // ✅ FIXED: Now opens the modal
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             + Add Member
//           </button>
//         )}
//       </div>

//       {/* Team Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {teamMembers.length > 0 ? (
//           teamMembers.map((member) => (
//             <div key={member._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
//               <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-4">
//                 {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
//               <p className="text-gray-500 text-sm mb-3">{member.email}</p>
//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                 member.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
//               }`}>
//                 {member.role}
//               </span>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500 mt-10">No team members found.</p>
//         )}
//       </div>

//       {/* --- ADD MEMBER MODAL --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//               <FaTimes />
//             </button>
            
//             <h2 className="text-xl font-bold mb-6">Add New Team Member</h2>
            
//             <form onSubmit={handleAddMember} className="space-y-4">
//               <input 
//                 type="text" placeholder="Full Name" required className="w-full p-2 border rounded"
//                 onChange={(e) => setNewMember({...newMember, name: e.target.value})}
//               />
//               <input 
//                 type="email" placeholder="Email Address" required className="w-full p-2 border rounded"
//                 onChange={(e) => setNewMember({...newMember, email: e.target.value})}
//               />
//               <select 
//                 className="w-full p-2 border rounded"
//                 onChange={(e) => setNewMember({...newMember, role: e.target.value})}
//               >
//                 <option value="member">Member</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
//                 Register & Add
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Team;
// import React, { useEffect, useState } from "react";
// import API from "../api"; 
// import { FaUserCircle, FaTimes } from "react-icons/fa"; 

// const Team = ({ user }) => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [availableUsers, setAvailableUsers] = useState([]); 
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEmail, setSelectedEmail] = useState("");

//   const fetchData = async () => {
//     try {
//       const teamRes = await API.get("/api/user/get-team");
//       setTeamMembers(teamRes.data);
      
//       if (showModal) {
//         const availRes = await API.get("/api/user/available");
//         setAvailableUsers(availRes.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [showModal]);

//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     if (!selectedEmail) return alert("Please select a user");
    
//     try {
//       await API.post("/api/user/add-to-team", { email: selectedEmail });
//       setShowModal(false);
//       setSelectedEmail("");
//       fetchData();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to add member");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
//         {user?.role === "admin" && (
//           <button 
//             onClick={() => setShowModal(true)} 
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             + Add Member
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {teamMembers.length > 0 ? (
//           teamMembers.map((member) => (
//             <div key={member._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
//               <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-4">
//                 {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
//               <p className="text-gray-500 text-sm mb-3">{member.email}</p>
//               <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
//                 {member.role}
//               </span>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500 mt-10">No team members found.</p>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//               <FaTimes />
//             </button>
            
//             <h2 className="text-xl font-bold mb-2">Add Member</h2>
//             <p className="text-sm text-gray-500 mb-6">Select a user who has already registered.</p>
            
//             <form onSubmit={handleAddMember} className="space-y-4">
//               <label className="block text-sm font-medium text-gray-700">Registered Users</label>
//               <select 
//                 className="w-full p-2 border rounded-lg bg-gray-50"
//                 value={selectedEmail}
//                 onChange={(e) => setSelectedEmail(e.target.value)}
//                 required
//               >
//                 <option value="">-- Choose User --</option>
//                 {availableUsers.map(u => (
//                   <option key={u.email} value={u.email}>{u.name} ({u.email})</option>
//                 ))}
//               </select>

//               <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
//                 Add to Team View
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Team;




import React, { useEffect, useState } from "react";
import API from "../api"; 
import { FaUserCircle, FaTimes } from "react-icons/fa"; 

const Team = ({ user }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  const fetchData = async () => {
    try {
      const teamRes = await API.get("/api/user/get-team");
      // Ensure we always set an array
      setTeamMembers(Array.isArray(teamRes.data) ? teamRes.data : []);
      
      if (showModal) {
        const availRes = await API.get("/api/user/available");
        setAvailableUsers(Array.isArray(availRes.data) ? availRes.data : []);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setTeamMembers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showModal]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedEmail) return alert("Please select a user");
    
    try {
      await API.post("/api/user/add-to-team", { email: selectedEmail });
      setShowModal(false);
      setSelectedEmail("");
      fetchData(); // Refresh the list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add member");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        {user?.role === "admin" && (
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Member
          </button>
        )}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div key={member._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-4 font-bold">
                {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{member.email}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                member.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
              }`}>
                {member.role}
              </span>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">No team members found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            
            <h2 className="text-xl font-bold mb-2">Add Registered User</h2>
            <p className="text-sm text-gray-500 mb-6">Users must sign up first before appearing here.</p>
            
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Select User</label>
                <select 
                  className="w-full p-2.5 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  required
                >
                  <option value="">-- Choose User --</option>
                  {availableUsers.map(u => (
                    <option key={u.email} value={u.email}>{u.name} ({u.email})</option>
                  ))}
                </select>
                {availableUsers.length === 0 && (
                  <p className="text-red-500 text-[11px] mt-2 italic">No new registrations found.</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={availableUsers.length === 0}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Team View
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;