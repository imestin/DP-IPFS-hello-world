const uploadToIPFS = require("../utils/uploadToIPFS");
const sendResponse = require("./sendResponse");
const formidable = require("formidable");
const fs = require("fs");


const uploadImage = async (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req, async function(err, fields, files) {
      if (err) {
        console.error(err.message);                                                 // !!!
        return;
      }
      const CID = await uploadToIPFS(files.filename.path)
        .catch((err) => sendResponse(res, 500, "Error while uploading to IPFS"));      
      fs.unlinkSync(files.filename.path);                                           // Delete the temporary file
      // Not implemented yet
      //saveCID(CID, res);
    });
  }
  


module.exports = uploadImage;