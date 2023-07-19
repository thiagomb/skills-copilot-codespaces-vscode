//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var port = 3000;

//Create server
var server = http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            display_form(req, res);
            break;
        case '/comments':
            save_comment(req, res);
            break;
        default:
            display_404(req, res);
            break;
    }
});

//Start server
server.listen(port);
console.log('Server running at http://localhost:' + port);

//Function to display the form
function display_form(req, res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    });
}

//Function to save the comment
function save_comment(req, res) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var comment = qs.parse(body);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<h1>Thank you for your comment</h1>');
        res.end();
    });
}

//Function to display 404 error
function display_404(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>404 Not Found</h1>');
    res.end();
}