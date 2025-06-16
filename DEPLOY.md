# Guia de Deploy - Nova Locações

Este guia explica como implantar o frontend do projeto Nova Locações usando Docker.

## Pré-requisitos

- Docker e Docker Compose instalados no servidor
- Acesso ao repositório do código fonte

## Passos para Deploy

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Frontend
```

### 2. Construir e iniciar os contêineres

```bash
docker-compose up -d
```

Este comando irá:
- Construir a imagem do frontend com base no Dockerfile
- Iniciar o contêiner em modo detached (background)
- Expor a aplicação na porta 80

### 3. Verificar o status dos contêineres

```bash
docker-compose ps
```

### 4. Visualizar logs (se necessário)

```bash
docker-compose logs -f
```

## Manutenção

### Atualizar a aplicação após alterações no código

```bash
git pull
docker-compose build
docker-compose up -d
```

### Parar os contêineres

```bash
docker-compose down
```

## Configuração de ambiente de produção

Para ambientes de produção, considere:

1. Usar HTTPS com certificados SSL (Nginx pode ser configurado para isso)
2. Configurar variáveis de ambiente para apontar para APIs de produção
3. Implementar um sistema de CI/CD para automatizar o deploy

## Troubleshooting

Se a aplicação não estiver funcionando corretamente:

1. Verifique os logs: `docker-compose logs -f`
2. Verifique se o contêiner está em execução: `docker ps`
3. Acesse o shell do contêiner: `docker exec -it nova-locacoes-frontend sh`

## Backup

O contêiner é stateless (não armazena estado), então não é necessário backup dos dados do contêiner. Apenas mantenha o código-fonte seguro com controle de versão.
