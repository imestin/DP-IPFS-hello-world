// This is a function that will be only called from the command line
const Dash = require('dash');
require('dotenv').config();

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: process.env.MNEMOIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
    },
  },
};
const client = new Dash.Client(clientOpts);

const createIdentity = async () => {
  return client.platform.identities.register();
};

createIdentity()
  .then((d) => console.log('\n\n ID:\n', d.toJSON().id))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
