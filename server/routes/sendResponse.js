const sendResponse = (res, status, text) => {
    const headers = require("../headers");
    res.writeHead(status, headers);
    res.write(text);
    res.end();
}

module.exports = sendResponse;