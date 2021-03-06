const Dash = require('dash');
const uploadToIPFS = require("../utils/uploadToIPFS");
const updateDocument = require("../utils/updateDocument");
const sendResponse = require("./sendResponse");
const formidable = require("formidable");
const fs = require("fs");



const uploadImage = async (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req, async function(err, fields, files) {
      if (err) {
        console.error(err.message);                                                 
        return;
      }
      await uploadToIPFS(files.filename.path)
        .then((CID) => {
          fs.unlinkSync(files.filename.path);                                           // Delete the temporary file
          saveCID(CID, res);
        })
        .catch((err) => sendResponse(res, 500, "Error while uploading to IPFS: " + err));      
    });
  }

  
const saveCID = async (CID, res) => {
    const clientOpts = require('../options/optionsWithContractId');
    const client = new Dash.Client(clientOpts);
    
    updateDocument(client, CID)
      .then(() => sendResponse(res, 200, "Successfully uploaded"))
      .catch((e) => sendResponse(res, 500, "(while saving CID) " + e))
      .finally(() => client.disconnect())
}

module.exports = uploadImage;