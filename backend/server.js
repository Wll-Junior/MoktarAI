const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Missing message" });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI engine error", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ MoktarAI backend running on port 3000");
});
