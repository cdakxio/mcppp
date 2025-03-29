const express = require("express");
const { createInterface } = require("@modelcontextprotocol/server-perplexity-ask");

const app = express();
app.use(express.json());

const perplexity = createInterface();

app.post("/", async (req, res) => {
  try {
    const messages = req.body.messages;
    const response = await perplexity.ask({ messages });
    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Perplexity Ask MCP Server running on port 3000");
});
