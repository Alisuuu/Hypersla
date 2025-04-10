const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const HYPERBEAM_API_KEY = 'sk_test_Kb8ZQgsU7SJAuV6UXNgvydVT6baIRKTF4o6Q4nHN6ec';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

let currentSessionId = null;

app.get('/start-session', async (req, res) => {
  try {
    const response = await axios.post('https://engine.hyperbeam.com/v0/vm', {}, {
      headers: {
        Authorization: `Bearer ${HYPERBEAM_API_KEY}`
      }
    });
    currentSessionId = response.data.session_id;
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar sessão:', error.response?.data || error.message);
    res.status(500).send('Erro ao iniciar sessão');
  }
});

app.delete('/end-session', async (req, res) => {
  if (!currentSessionId) {
    return res.status(400).json({ error: 'Nenhuma sessão ativa' });
  }

  try {
    await axios.delete(`https://engine.hyperbeam.com/v0/vm/${currentSessionId}`, {
      headers: {
        Authorization: `Bearer ${HYPERBEAM_API_KEY}`
      }
    });
    currentSessionId = null;
    res.json({ message: 'Sessão encerrada com sucesso' });
  } catch (error) {
    console.error('Erro ao encerrar sessão:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao encerrar sessão' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
