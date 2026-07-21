import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/next-project";

async function run() {
  try {
    const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/next-project";
    await mongoose.connect(url);
    const db = mongoose.connection.db;

    console.log("=== RECENT TRACKER ENTRIES ===");
    const trackers = await db.collection("trackers")
      .find({})
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray();
    console.log(JSON.stringify(trackers, null, 2));

  } catch (err) {
    console.error("Database query error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
