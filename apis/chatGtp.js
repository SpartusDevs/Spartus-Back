const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const sendMessageToOpenAI = async (req, res) => {
  const { message } = req.body;   
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",  
      {
        model: "gpt-3.5-turbo",  
        messages: [{ role: "user", content: message }],  
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  
        },
      }
    );
console.log(response.data)
    return res.json(response.data.choices[0].message);  

  } catch (error) {
    console.log('Error '+error)
    // Manejo de errores
    if (error.response && error.response.status === 429) {
      return res.status(429).json({ error: "Límite de solicitudes alcanzado. Intenta nuevamente más tarde." });
    } else {
      console.error("Error al interactuar con OpenAI:", error.message);
      return res.status(500).json({ error: "Error al comunicarse con OpenAI" });
    }
  }
};

module.exports = { sendMessageToOpenAI };
