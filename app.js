const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require('colors');

const routes = require("./src/routes/index.js"); 
const connectDB = require("./config/db"); 
const { sendMessageToOpenAI } = require("./apis/chatGtp.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Rutas
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi Spartus App!");
});

app.use("/api", routes);

app.post('/api/chat', sendMessageToOpenAI);


app.listen(PORT, () => {
  console.log("Servidor".blue+" corriendo ".green+ "en http://localhost:"+`${PORT}`.yellow);
});
