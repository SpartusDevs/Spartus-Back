const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
