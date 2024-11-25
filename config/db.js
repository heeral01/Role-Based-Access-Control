const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'data', // Replace with your database name
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection Error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;