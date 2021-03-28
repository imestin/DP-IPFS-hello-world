const getDocument = async (client) => {
    return client.platform.documents.get(
      'ipfsContract.ipfs',
      {
        limit: 1, // Only retrieve 1 document
      },
    );
  };
  
  module.exports = getDocument;