const Dash = require('dash');
require("dotenv").config();

const clientOpts = {
  wallet: {
    mnemonic: process.env.MNEMOIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
    },    
  },
};
const client = new Dash.Client(clientOpts);

const registerContract = async () => {
  const { platform } = client;
  const identity = await platform.identities.get(process.env.ID);

  const contractDocument = require('./contract');

  const contract = await platform.contracts.create(contractDocument, identity);
  console.dir({ contract });

  // Make sure contract passes validation checks
  const validationResult = await platform.dpp.dataContract.validate(contract);

  if (validationResult.isValid()) {
    console.log('Validation passed, broadcasting contract..');
    // Sign and submit the data contract
    return platform.contracts.broadcast(contract, identity);
  }
  console.error(validationResult);
  throw validationResult.errors[0];
};

registerContract()
  .then((d) => console.log("\n\n Contract registered. Save this to the .env as CONTRACT_ID: \n" + d.toJSON().dataContract.$id + "\n"))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
