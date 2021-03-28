require("dotenv").config();

// This is an option for Dash client with mnemoic and contract ID
const optionsWithContractId = {
    wallet: {
      mnemonic: process.env.MNEMOIC,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: 468300, 
      },
    },
    apps: {
      ipfsContract: {
        contractId: process.env.CONTRACT_ID,
      },
    },
  };

module.exports = optionsWithContractId;