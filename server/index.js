var http = require('http');
//const getCID = require('./routes/getCIDRoute');
const uploadImage = require('./routes/uploadImageRoute');
const port = process.env.PORT || 3000;


let server = http.createServer(function (req, res) {
    var url = req.url;
    // These are the different routes for the API server
    if (url ==='/get-cid') {
        //getCID(res);
    } else if (url === '/upload' && req.method.toLowerCase() === 'post') {
        uploadImage(req, res);
    }
});

// Starting the server
server.listen(port, function(){
 console.log("server start at port 3000");
});

module.exports = server;