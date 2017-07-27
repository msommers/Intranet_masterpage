'use strict;'

var http = require('http');
var fs = require('fs');

const PORT=8080;

fs.readFile('./OpenPositionsRemake.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.writeHeader(200, {"Access-Control-Allow-Origin":"*"});
        response.writeHeader(200, {"Authorization": "Basic aW50ZXJuYWxqb2JhcGk6e2VMNycheUY3OGYm"});

        response.write(html);
        response.end();
    }).listen(PORT);
});
