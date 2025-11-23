# Infinity Solutions - Frontend

## 📋 Sobre o Projeto

Este repostório contém todo o código-fonte da interface do sistema <i>Nova Locações</i>. O sistema foi desenvolvido utilizando o framework React junto da linguagem Javascript, oferecemos funcionalidades completas para usuários, produtos, pedidos e gestão de arquivos.

## 🏗️ Arquitetura

```
nova-locacoes/
├── public/               	# Contém todas as imagens e vídeos estáticos 
├── src/                  	# Código fonte do projeto
│    ├── assets/         	# Imagens e vídeos
│    ├── components/        # Componentes reutilizáveis
│    ├── pages/             # Paginas do site
│    ├── provider/         	# Configuração da API do projeto e de API's externas
│    ├── routers/          	# Rotas e endpoints
│    └── utils/            	# Funcionalidades utilitárias
```

## 🛠️ Tecnologias Utilizadas

- <b>Node</b> versão 22.20.0 ou superior
- <b>NPM</b> versão 10.9.3 ou superior
- <b>React</b> versão 19.0.0 ou superior

# 🚀 Executando o Projeto

### 🔧 Ambiente de Desenvolvimento

<b>1. Baixe o projeto</b>
```bash
git clone https://github.com/Org-InfinitySolutions/Frontend.git
```

Após baixar o código-fonte, abra o CMD dentro da pasta do projeto e execute os comandos abaixo.

<b>2. Instale as dependências</b>
```bash
npm install
```

<b>3. Rode o projeto</b>
```bash
npm run dev
```

> Acesse a aplicação por meio do link -> <a href="http://localhost:5173/">http://localhost:5173/</a>

#### 📋 Configuração .Env

Na raiz do projeto crie um arquivo .env com a seguinte estrutura:
```.env
VITE_ENDERECO_API_AUTH=http://localhost:8080/auth          # Acesso aos endpoints de autenticação
VITE_ENDERECO_API=http://localhost:8080/api                # Acesso aos endpoints das funcionalidades gerais
```

### 🌐 Ambiente de Produção

1. Gere a distribuição do projeto
```bash
npm run build
```

2. Será gerado uma pasta chamada ``dist`` com o codigo estático do projeto, coloque-o no caminho de configuração do serviço nginx.
```bash
sudo cp -r ~/dist/* /var/www/html/
```

> Acesse a aplicação por meio do endereço do servidor -> <a href="http://{IP_SERVIDOR}:{PORTA_SERVIDOR}/">http://{IP_SERVIDOR}:{PORTA_SERVIDOR}/</a>
