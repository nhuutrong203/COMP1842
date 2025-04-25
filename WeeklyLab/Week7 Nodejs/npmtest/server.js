const http = require('http');
const server = http.createServer(function(req,res){
    if (req.url ==  '/') { // check URL of  current request
        // set response header
        res.writeHead(200, {'Content-Type':'text/html'});
        // set respones content
        res.write('<html><body><p>This is homepage.NguyenHuuTrong</p></body></html>');
        res.end()
    } 
    else if (req.url ==  '/student') {
        res.writeHead(200, {'Content-Type':'text/html'});
        // set respones content
        res.write('<html><body><p>This is Student.</p></body></html>');
        res.end()
    }
    else if (req.url ==  '/admin') { // check URL of  current request
        // set response header
        res.writeHead(200, {'Content-Type':'text/html'});
        // set respones content
        res.write('<html><body><p>This is Admin.</p></body></html>');
        res.end()
    }
    else if (req.url ==  '/data') { // check URL of  current request
        // set response header
        res.writeHead(200, {'Content-Type':'application/json'});
        // set respones content
        res.write(JSON.stringify({message: "Hello World Json"}));
        res.end()
    }
    else {
        res.end('Invalid request');
    }
    
})

server.listen(8000);
console.log('Nodejs web server at port 8000 is running...')