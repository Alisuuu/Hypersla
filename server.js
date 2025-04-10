const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.HYPERBEAM_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/start-session", async (req, res) => {
  try {
    const response = await axios.post(
      "https://engine.hyperbeam.com/v0/vm",
      {},
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ url: response.data.embed_url });
  } catch (error) {
    console.error("Erro ao iniciar sessão:", error.message);
    res.status(500).json({ error: "Erro ao iniciar sessão" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
