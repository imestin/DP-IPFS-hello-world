const Dash = require('dash');
require("dotenv").config();

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: process.env.MNEMOIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
    },
  },
  apps: {
    ipfsContract: {
      contractId: process.env.CONTRACT_ID,
    },
  },
};


const client = new Dash.Client(clientOpts);

const submitIpfsDocument = async () => {
  const { platform } = client;
  const identity = await platform.identities.get(process.env.ID);

  const docProperties = require('./docProperties');

  // Create the IPFS document
  const ipfsDocument = await platform.documents.create('ipfsContract.ipfs', identity, docProperties,);

  const documentBatch = {
    create: [ipfsDocument], 
    replace: [],            
    delete: [],             
  };
  // Sign and submit the document(s)
  return platform.documents.broadcast(documentBatch, identity);
};

submitIpfsDocument()
  .then((d) => console.log("\n\n Save this as DOCUMENT_ID: " + d.toJSON().transitions[0].$id + "\n\n"))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
