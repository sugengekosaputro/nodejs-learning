const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="messageText" /><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
        });

        return req.on("end", () => {
            const messageText = Buffer.concat(body).toString().split('=')[1];
            fs.writeFile('message.txt', messageText, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });
    }


    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello World, I am from Node Server</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;