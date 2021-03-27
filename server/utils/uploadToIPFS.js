const IPFS = require('ipfs');
const fs = require("fs");

// This function will return the CID of the newly uploaded file, that CID will be saved on Dash Platform
const uploadToIPFS = async (filepath) => {  
    // Create and run a new IPFS node
    const node = await IPFS.create();
    
    // Add file to IPFS
    const file = await node.add(fs.readFileSync(filepath));
    console.log('Added file:', file.cid.toString());

    node.stop();
    return file.cid.toString();
}

module.exports = uploadToIPFS