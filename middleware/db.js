import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        console.log("Using current connection");
        return;
    }

    // Use new db connection

    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    });
    console.log("New connection");
    return;
}

export default connectDB;