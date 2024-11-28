const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require('colors');

const routes = require("./routes/index.js"); 
const connectDB = require("./config/db"); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Rutas
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi backend con Node.js y Express!");
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  console.log("Datos recibidos:", data);
  res.status(201).json({ message: "Datos recibidos correctamente", data });
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Servidor".blue+" corriendo ".green+ "en http://localhost:"+`${PORT}`.yellow);
});
