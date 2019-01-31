const axios = require('axios');
const CRYPTOCOMPARE_KEY = process.env.CRYPTOCOMPARE_API_KEY;
const CRYPTOCOMPARE_API_URL = 'https://min-api.cryptocompare.com/data/price';
const THROTTLE_API_MS = 1000;

const TOP_TOKENS = [
  {
    symbol: 'BNB',
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    stable: false,
  },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    stable: true,
  },
  {
    symbol: 'MKR',
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    stable: false,
  },
  {
    symbol: 'OMG',
    address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    stable: false,
  },
  {
    symbol: 'ZIL',
    address: '0x05f4a42e251f2d52b8ed15E9FEdAacFcEF1FAD27',
    stable: false,
  },
  {
    symbol: 'ZRX',
    address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    stable: false,
  },
  {
    symbol: 'HOT',
    address: '0x6c6EE5e31d828De241282B9606C8e98Ea48526E2',
    stable: false,
  },
  {
    symbol: 'LINK',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    stable: false,
  },
  {
    symbol: 'BAT',
    address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    stable: false,
  },
  {
    symbol: 'PAX',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    stable: true,
  },
  {
    symbol: 'REP',
    address: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    stable: false,
  },
];

// returns undefined if address not found
function getSymbolByAddress(address) {
  return TOP_TOKENS.filter(token => token.address === address)[0].symbol;
}

function getRateBySymbol(symbol) {
  const filtered = TOP_TOKENS.filter(token => token.symbol === symbol);
  if (!filtered) {
    console.log(`getRateBySymbol err ${symbol}`);
    return 0;
  }
  const rate = filtered[0].rate;
  return rate ? rate : 0;
}

// retrieve token data from Ethplorer
function getTokenInfo() {
  TOP_TOKENS.map((token, index) => {
    let cryptocomparePath = `${CRYPTOCOMPARE_API_URL}?fsym=${
      token.symbol
    }&tsyms=USD&?&api_key=${CRYPTOCOMPARE_KEY}`;
    setTimeout(() => {
      axios
        .get(cryptocomparePath)
        .then(response => {
          token.rate = response.data.USD;
          console.log(`${token.symbol} price=$${token.rate}`);
        })
        .catch(err => {
          console.log('Axios error', err);
        });
    }, THROTTLE_API_MS);
  });
}

module.exports = {
  topTokens: TOP_TOKENS,
  getSymbolByAddress,
  getRateBySymbol,
  config: getTokenInfo,
};
