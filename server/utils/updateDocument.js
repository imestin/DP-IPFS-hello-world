require("dotenv").config();

const updateDocument = async (client, newValue) => {
  const { platform } = client;
  const identity = await platform.identities.get(process.env.ID);
  const documentId = process.env.DOCUMENT_ID;

  // Retrieve the existing document
  const [document] = await client.platform.documents.get(
    'ipfsContract.ipfs',
    { where: [['$id', '==', documentId]] },
  );

  // Update document
  document.set("CID", newValue);

  // Sign and submit the document replace transition
  return platform.documents.broadcast({ replace: [document] }, identity);
  };
  
module.exports = updateDocument;