import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  // Fixed: Changed 'KSh{' to '${' and removed the stray '{' and ',' 
  await mongoose.connect(`${process.env.MONGODB_URI}/soko-mkononi`);
};

export default connectDB;