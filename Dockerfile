FROM node:24-alpine

WORKDIR /app

# Copia os arquivos de dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Porta padrão do Vite
EXPOSE 5173

# O "--host" é obrigatório no Docker para o Vite aceitar conexões de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]