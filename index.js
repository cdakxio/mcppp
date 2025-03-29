
const express = require("express");
const { spawn } = require("child_process");
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  const mcp = spawn("node", [
    "/modelcontextprotocol/perplexity-ask/dist/index.js"
  ], { env: { ...process.env } });

  let data = "";
  mcp.stdout.on("data", chunk => data += chunk);
  mcp.stderr.on("data", err => console.error("MCP error:", err.toString()));
  mcp.on("close", () => {
    try {
      res.json(JSON.parse(data));
    } catch (e) {
      res.status(500).json({ error: "Invalid response", raw: data });
    }
  });

  mcp.stdin.write(JSON.stringify(req.body));
  mcp.stdin.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`MCP HTTP wrapper listening on port ${port}`));
