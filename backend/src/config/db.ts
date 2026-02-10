import mongoose from "mongoose";
import ENV from "./ENV";

export const connectDB = async () => {
  try {
    const uri = ENV.MONGOURI as string;

    await mongoose
      .connect(uri)
      .then((msg) => console.log(`Mongoose connected to -> ${msg.connection.host}`))
      .catch((err) => console.log(err));
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};
