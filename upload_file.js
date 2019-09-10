var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

http.createServer(function (req, res) {

    // send form upload
    if (req.url === "/" && req.method === "GET") {
        fs.readFile("form_upload.html", (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            if (err) throw err;
            res.end(data);
        });
    }

    // upload file
    if (req.url == '/' && req.method === "POST") {
        // make object form from formidable
        var form = new formidable.IncomingForm();

        // upload file processing
        form.parse(req, function (err, fields, files) {
            // console.log(files);
            var oldpath = files.fileupload.path;
            var newpath = __dirname + "/uploads/" + files.fileupload.name;

            // move file done upload
            mv(oldpath, newpath, function (err) {
                if (err) {
                    throw err;
                }
                console.log('files uploaded successfully');
                return res.end("file uploaded successfully");
            });
        });
    }
}).listen(8000);

console.log("server listen on http://localhost:8000");