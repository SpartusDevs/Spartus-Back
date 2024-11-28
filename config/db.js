const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB".blue + " exitosa".green + " conexión");
  } catch (err) {
    console.log("Error de conexión a MongoDB:".red);
    console.log(err);
    process.exit(1); 
  }
};

module.exports = connectDB;
