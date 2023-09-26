import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConnect = async () => {
  try {
    const dburl = process.env.CONNECTION_STRING || "error";
    const connect = await mongoose.connect(dburl); 

    console.log(connect.connection.host, connect.connection.name);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default dbConnect;
