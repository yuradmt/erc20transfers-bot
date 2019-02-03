const API_KEY = process.env.ETHPLORER_API_KEY;
const API_THROTTLE_MS = 10000; // one minute
const TOKEN_API_URL = 'http://api.ethplorer.io/getTokenHistory';
const TRANSFERS_LIMIT = 20;

const topTokens = require('./tokens');
const axios = require('axios');
let timestamp = Date.now();

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// add timestamp
async function track(contractAddress, callback) {
  console.log('subscribing to ', contractAddress);
  setInterval(() => {
    const oneMinuteAgo = Date.now() - 60000;
    // get token transactions in the last minute
    axios
      .get(
        `${TOKEN_API_URL}/${contractAddress}?apiKey=${API_KEY}` +
          `&type=transfer&limit=${TRANSFERS_LIMIT}&timestamp=${oneMinuteAgo}`
      )
      .then(response => {
        response.data.operations.forEach(op => {
          callback(op);
        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }, API_THROTTLE_MS + randomInt(0, 10000));
}

module.exports = {
  track: track,
};
