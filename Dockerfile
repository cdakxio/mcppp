
FROM node:18

# Installer git et cloner le repo MCP
RUN apt update && apt install -y git \
  && git clone https://github.com/ppl-ai/modelcontextprotocol.git

# Build du MCP Perplexity
WORKDIR /modelcontextprotocol/perplexity-ask
RUN npm install && npm run build

# Créer un petit serveur HTTP wrapper
WORKDIR /app
COPY index.js .
RUN npm init -y && npm install express

# Clé API à définir via ENV
ENV PERPLEXITY_API_KEY=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
EXPOSE 3000

CMD ["node", "index.js"]
