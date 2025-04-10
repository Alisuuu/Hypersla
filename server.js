const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Onde vai o index.html

app.get('/create-room', async (req, res) => {
  try {
    const response = await axios.post(
      'https://w2g.tv/rooms/create.json',
      {
        w2g_api_key: process.env.W2G_API_KEY,
        share: '',
        bg_color: '#181818',
        bg_opacity: '100'
      }
    );

    const streamKey = response.data.streamkey;
    const embedUrl = `https://w2g.tv/rooms/${streamKey}/embed`;

    res.json({ url: embedUrl });
  } catch (error) {
    console.error('Erro ao criar sala:', error.message);
    res.status(500).json({ error: 'Erro ao criar sala' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
