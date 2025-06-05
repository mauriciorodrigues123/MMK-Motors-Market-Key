const jsonServer = require('json-server');
const servidor = jsonServer.create();
const roteador = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Definir porta do servidor
const porta = 3001;

// Usar configurações padrão (logger, arquivos estáticos, cors e no-cache)
servidor.use(middlewares);

// Log de todas as requisições
servidor.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === 'POST') {
        console.log('Dados recebidos:', req.body);
    }
    next();
});

// Adicionar um pequeno atraso para simular uma API real
servidor.use((requisicao, resposta, proximo) => {
    setTimeout(proximo, 500); // atraso de meio segundo
});

// Usar o roteador para gerenciar as requisições
servidor.use(roteador);

// Iniciar o servidor
servidor.listen(porta, () => {
    console.log(`Servidor JSON está rodando em http://localhost:${porta}`);
    console.log('Para ver os usuários, acesse: http://localhost:3001/usuarios');
}); 