const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/ai', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Mangler prompt' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Ingen respons" });
  } catch (err) {
    res.status(500).json({ error: 'Noe gikk galt', details: err.message });
  }
});
app.listen(port, () => {
    console.log(`✅ Backend kjører på http://localhost:${port}`);
  });


  
