## 1 Create Wallet
Run `node init/createWallet.js`. node version has to be v12 or higher. Save the mnemoic to .env with the field MNEMOIC and address with the field ADDRESS

## 2 Fund Wallet
Use [Dash Faucet](http://faucet.testnet.networks.dash.org/) to fund the wallet that you've just created

## 3 Wait for Confirmation
Wait until transaction is confirmed

## 4 Create Identity
Run `node init/createIdentity.js`. Save id to the .env with the field ID

## 5 Register Contract
Run `node init/registerContract.js`. Save $id to the .env with the field CONTRACT_ID

## 6 Submit Document
Run `node init/submitDocument.js`. Save $id to the .env with the field DOCUMENT_ID

## 7 Done
Now you have a node that is able to save an IPFS CID to Dash Platform


_NOTE_: Sometimes 502 Bad Gateway happens. Try to run the script again. It can also happen that after a 502 Bad Gateway error the script will give an ID after some minutes of waiting.