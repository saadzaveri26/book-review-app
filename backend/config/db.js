// This file handles our connection to the MongoDB database.

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully! 🚀');
  } catch (error) {
    
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;