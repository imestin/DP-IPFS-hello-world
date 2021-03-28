const Dash = require('dash');
const getDocument = require("../utils/getDocument");
const sendResponse = require('./sendResponse');


const getCID = async (res) => {
  const clientOpts = require('../options/optionsWithContractId');
  const client = new Dash.Client(clientOpts);
  
  getDocument(client)
    .then((d) =>  {
      let response = { CID: d[0].data.CID}
      sendResponse(res, 200, JSON.stringify(response))
    })
    .catch((e) => console.error('Something went wrong:\n', e))
    .finally(() => client.disconnect());
}

module.exports = getCID;