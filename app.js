console.log('starting up...');
//TODO - load dotenv if not production

// const result = require('dotenv').config();

// if (result.error) {
//   throw result.error;
// }

const tweet = require('./tweet');
const tracker = require('./track');
const tokens = require('./tokens');
tokens.config(); // retrieve rates from cryptocompare

const events = {};

const THRESHOLD = 5000;

function handleEvent(event) {
  // convert the token value from web3.js into a normalized form
  function displayTokenValue(value, decimals = 18) {
    return Number((value / Math.pow(10, decimals)).toFixed(3));
  }

  function createEtherscanLink(transactionHash) {
    return `https://etherscan.io/tx/${transactionHash}`;
  }

  const txHash = event.transactionHash;
  // console.log(
  //   `checking ${txHash} in events. events.size = ${Object.keys(events).length}`
  // );
  if (txHash in events) {
    return;
  }

  const symbol = event.tokenInfo.symbol;
  const { from, to } = event;
  const amount = displayTokenValue(event.value, event.tokenInfo.decimals);
  const price = tokens.getRateBySymbol(symbol);
  const value = Number(price * amount).toFixed(2);
  const link = createEtherscanLink(txHash);
  if (value > THRESHOLD) {
    const output =
      `${amount} $${symbol} tokens transferred from ${from} to ` +
      `${to} Total Value $${value} URL: ${link}`;
    console.log(output);
    tweet.tweet(output);
  }
  events[txHash] = event;
}

tokens.topTokens.forEach(token => {
  let sub = tracker.track(token.address, handleEvent);
});
