FROM node:18

# Install git
RUN apt update && apt install -y git

# Clone le repo MCP dans /app/modelcontextprotocol
RUN git clone https://github.com/ppl-ai/modelcontextprotocol.git /app/modelcontextprotocol

# Va dans le dossier du projet
WORKDIR /app/modelcontextprotocol/perplexity-ask

# Installe les dépendances et build
RUN npm install && npm run build

# Reviens à la racine de l'app
WORKDIR /app

# Ajoute un serveur Express simple qui utilise le MCP
COPY index.js .

# Initialise npm et installe express
RUN npm init -y && npm install express

# Définis la clé API dans l’environnement
ENV PERPLEXITY_API_KEY=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

# Lance l'app
CMD ["node", "index.js"]
