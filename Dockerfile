FROM node:20-alpine AS build

# Configura o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm ci

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói o aplicativo para produção
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia a configuração do nginx personalizada
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
