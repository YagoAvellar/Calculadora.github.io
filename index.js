const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const tabuadaNumber = parseInt(query.tabuada);
    const sequencia = parseInt(query.sequencia) || 10;
    
    if (!query.tabuada || isNaN(tabuadaNumber)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Parâmetro "tabuada" não encontrado ou inválido.');
        return;
    }

    let tabuadaHTML = `<h2>Tabuada do ${tabuadaNumber} até ${sequencia}:</h2>`;
    for (let i = 0; i <= sequencia; i++) {
        tabuadaHTML += `<p>${tabuadaNumber} x ${i} = ${tabuadaNumber * i}</p>`;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(tabuadaHTML);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
