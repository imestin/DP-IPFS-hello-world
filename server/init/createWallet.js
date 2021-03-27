// This is a function that will be only called from the command line
const Dash = require('dash');

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: null, // this indicates that we want a new wallet to be generated
    offlineMode: true, 
  },
};

const client = new Dash.Client(clientOpts);

const createWallet = async () => {
  const account = await client.getWalletAccount();

  const mnemonic = client.wallet.exportWallet();
  const address = account.getUnusedAddress();
  console.log('\n\nMnemonic:', mnemonic);
  console.log('Unused address:', address.address);
  console.log('\nPlease request some money through http://faucet.testnet.networks.dash.org/ to the above address and save the mnemoic to the .env file with MNEMOIC field. Keep the quotation marks! Wait until transaction is confirmed before proceeding to next step.\n');
};

createWallet()
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());

// Handle wallet async errors
client.on('error', (error, context) => {
  console.error(`Client error: ${error.name}`);
  console.error(context);
});

