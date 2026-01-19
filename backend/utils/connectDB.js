import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  console.log("✅ MongoDB In-Memory Server Connected");
};

export default connectDB;
