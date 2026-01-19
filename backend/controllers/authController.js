import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password, team, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const user = await User.create({
    name,
    email,
    password,
    team,
    role: role || "member",
  });

  res.json(user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json(user);
};
