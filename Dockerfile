FROM node:20

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Install python-is-python3 (alternative to python)
RUN apt-get update && apt-get install -y python-is-python3

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências, incluindo sqlite3
RUN npm install

# Copiar o resto do código da aplicação
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["sh", "-c", "npm run build && npm start"]