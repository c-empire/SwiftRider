
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db"); // Adjust path as needed
const User = require("./models/User");
const Delivery = require("./models/DeliveryRequest");

(async () => {
  try {
    await connectDB();
    console.log("Connected to DB for seeding");

    // Clean
    await User.deleteMany({});
    await Delivery.deleteMany({});

    const admin = await User.create({
      fullName: "admin",
      email: "admin@gmail.com",
      password: "password",
      role: "admin",
    });
    const customer = await User.create({
      fullName: "customer one",
      email: "cust@gmail.com",
      password: "password",
      role: "customer",
    });
    const rider = await User.create({
      fullName: "rider one",
      email: "rider@gmail.com",
      password: "password",
      role: "rider",
    });

    await Delivery.create({
      customer: customer._id,
      pickupLocation: "Ikeja, Lagos",
      dropoffLocation: "Victoria Island, Lagos",
      packageDetails: "Laptop delivery",
      cost: 3000,
    });

    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
})();
