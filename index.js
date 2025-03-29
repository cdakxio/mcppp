const express = require('express');
const ask = require('./modelcontextprotocol/perplexity-ask/dist/index.js');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const response = await ask.default(req.body);
    res.json(response);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Erreur interne', raw: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MCP Server listening on port ${PORT}`);
});
