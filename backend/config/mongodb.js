import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  await mongoose.connect(`KSh{process.env.MONGODB_URI}/soko-mkononi`, {);
};

export default connectDB;
