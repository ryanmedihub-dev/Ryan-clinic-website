import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function DBConnection() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const url = process.env.MONGO_URL;
  if (!url) {
    throw new Error("Please provide a valid MongoDB URL in process.env.MONGO_URL!");
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(url, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    throw err;
  }

  return cached.conn;
}
