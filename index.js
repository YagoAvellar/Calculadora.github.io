const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const tabuadaNumber = parseInt(query.tabuada);
    
    if (!query.tabuada || isNaN(tabuadaNumber)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Parâmetro "tabuada" não encontrado ou inválido.');
        return;
    }

    let tabuadaHTML = '<h2>Tabuada do ' + tabuadaNumber + '</h2>';
    for (let i = 1; i <= 10; i++) {
        tabuadaHTML += `<p>${tabuadaNumber} x ${i} = ${tabuadaNumber * i}</p>`;
    }

    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro interno no servidor.');
            return;
        }
        const updatedHTML = data.replace('{{ tabuada }}', tabuadaHTML);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(updatedHTML);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`);
});
