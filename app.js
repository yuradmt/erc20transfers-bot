require('dotenv').config();

const tweet = require('./tweet');
const tracker = require('./track');
const tokens = require('./tokens');
const exchanges = require('./exchanges');
tokens.config(); // retrieve rates from cryptocompare

const events = {};

const THRESHOLD = 1000000;

function handleEvent(event) {
  // convert the token value from web3.js into a normalized form
  function displayTokenValue(value, decimals = 18) {
    return Number((value / Math.pow(10, decimals)).toFixed(3));
  }

  function createEtherscanLink(transactionHash) {
    return `https://etherscan.io/tx/${transactionHash}`;
  }

  const txHash = event.transactionHash;
  if (txHash in events) {
    return;
  }

  const symbol = event.tokenInfo.symbol;
  const name = event.tokenInfo.name;
  const { from, to } = event;
  const from_name = exchanges.getAccountName(from);
  const to_name = exchanges.getAccountName(to);
  const amount = displayTokenValue(event.value, event.tokenInfo.decimals);
  const price = tokens.getRateBySymbol(symbol);
  const value = Number(price * amount).toFixed(2);
  const link = createEtherscanLink(txHash);
  if (value > THRESHOLD) {
    const output = `💸💸💸 Transfer detected 💸💸💸\n💲 ${value} in $${symbol} ${
      tokens.isStable(symbol) ? 'stablecoin' : ''
    } moved\n\n From: ${from_name} ${from}\n To: ${to_name} ${to}\n Tokens: ${amount} ${symbol}(${name})\n🔗 URL: ${link}`;
    console.log(output);
    if (!process.env.DEVELOPMENT) {
      tweet.tweet(output);
    }
  }
  events[txHash] = event;
}

tokens.topTokens.forEach(token => {
  let sub = tracker.track(token.address, handleEvent);
});
