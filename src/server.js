const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/data', (req, res) => {
    const { cpf, cnpj, telefone, registroGeral, email } = req.body;
    if (!cpf || !cnpj || !telefone || !registroGeral || !email) {
        return res.status(400).json({ error: 'Por favor preencha todos os campos!' });
    }
    res.locals.data = { cpf, cnpj, telefone, registroGeral, email };
    res.status(201).json(res.locals.data);
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server está rodando em http://localhost:3000');
});