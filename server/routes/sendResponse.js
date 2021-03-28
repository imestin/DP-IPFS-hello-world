const sendResponse = (res, status, text) => {
    const headers = require("../headers");
    res.writeHead(status, headers);
    res.write(text);
    res.end();
    console.log("\n" + status + " " + text);
}

module.exports = sendResponse;