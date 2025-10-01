require("dotenv").config();
const mongoose = require("mongoose");
const DeliveryRequest = require("./models/DeliveryRequest");

async function run() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB ✅");

    // Drop all indexes except _id
    await DeliveryRequest.collection.dropIndexes();
    console.log("All indexes dropped (except _id) 🚀");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();

