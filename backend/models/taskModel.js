// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     status: {
//       type: String,
//       enum: ["todo", "inprogress", "completed"],
//       default: "todo",
//     },

//     priority: {
//       type: String,
//       enum: ["low", "normal", "high"],
//       default: "normal",
//     },

//     // 👤 Task assigned to a team member
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // 👑 Admin who created the task
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // 👥 Team name (for filtering)
//     team: {
//       type: String,
//       required: true,
//     },

//     dueDate: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Task", taskSchema);
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,

  status: {
    type: String,
    enum: ["todo", "in-progress", "completed"],
    default: "todo"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Task", taskSchema);
