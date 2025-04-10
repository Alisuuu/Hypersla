const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Sua API Key direto no código (somente para testes)
const HYPERBEAM_API_KEY = 'sk_test_Kb8ZQgsU7SJAuV6UXNgvydVT6baIRKTF4o6Q4nHN6ec';

app.use(cors());

app.get('/start-session', async (req, res) => {
  try {
    const response = await axios.post('https://engine.hyperbeam.com/v0/vm', {}, {
      headers: {
        'Authorization': `Bearer ${HYPERBEAM_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar sessão:', error.response?.data || error.message);
    res.status(500).send('Erro ao iniciar sessão');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
