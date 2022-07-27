const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>My first Page</title></head>')
        res.write('<body><h1>First task!!!</h1><form action="/create-user" method="POST"><label>username:</label><br><input type="text" name="username"><button type="submit" >Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/users') {
        fs.writeFileSync('message.txt', 'DUMMY')
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>My first Page</title></head>')
        res.write('<body><h1>User List</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            let onlyName = body.split('=')[1]
            console.log(`Complete Body: ${body}`, `Parsed username only: ${onlyName}`)
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        })
    }
}

export {
    requestHandler
}