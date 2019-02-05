const axios = require('axios');
const delay = require('delay');
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
  {
    symbol: 'NPXS',
    address: '0xA15C7Ebe1f07CaF6bFF097D8a589fb8AC49Ae5B3',
    stable: false,
  },
  {
    symbol: 'GUSD',
    address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd',
    stable: true,
  },
  {
    symbol: 'AE',
    address: '0x5CA9a71B1d01849C0a95490Cc00559717fCF0D1d',
    stable: false,
  },
  {
    symbol: 'DAI',
    address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
    stable: true,
  },
  {
    symbol: 'IOST',
    address: '0xFA1a856Cfa3409CFa145Fa4e20Eb270dF3EB21ab',
    stable: false,
  },
  {
    symbol: 'R',
    address: '0x48f775EFBE4F5EcE6e0DF2f7b5932dF56823B990',
    stable: false,
  },
  {
    symbol: 'SNT',
    address: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
    stable: false,
  },
  {
    symbol: 'PPT',
    address: '0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a',
    stable: false,
  },
  {
    symbol: 'GNT',
    address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
    stable: false,
  },
  {
    symbol: 'INB',
    address: '0x17Aa18A4B64A55aBEd7FA543F2Ba4E91f2dcE482',
    stable: false,
  },
  {
    symbol: 'ODEM',
    address: '0xbf52F2ab39e26E0951d2a02b49B7702aBe30406a',
    stable: false,
  },
  {
    symbol: 'HT',
    address: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161',
    stable: false,
  },
  {
    symbol: 'AOA',
    address: '0x9ab165D795019b6d8B3e971DdA91071421305e5a',
    stable: false,
  },
  {
    symbol: 'THETA',
    address: '0x3883f5e181fccaF8410FA61e12b59BAd963fb645',
    stable: false,
  },
  {
    symbol: 'XIN',
    address: '0xA974c709cFb4566686553a20790685A47acEAA33',
    stable: false,
  },
  {
    symbol: 'LRC',
    address: '0xEF68e7C694F40c8202821eDF525dE3782458639f',
    stable: false,
  },
  {
    symbol: 'WTC',
    address: '0xb7cB1C96dB6B22b0D3d9536E0108d062BD488F74',
    stable: false,
  },
  {
    symbol: 'LKY',
    address: '0x49bD2DA75b1F7AF1E4dFd6b1125FEcDe59dBec58',
    stable: false,
  },
  {
    symbol: 'MANA',
    address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    stable: false,
  },
  {
    symbol: 'NEXO',
    address: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206',
    stable: false,
  },
  {
    symbol: 'DENT',
    address: '0x3597bfD533a99c9aa083587B074434E61Eb0A258',
    stable: false,
  },
];

// returns undefined if address not found
function getSymbolByAddress(address) {
  return TOP_TOKENS.filter(token => token.address === address)[0].symbol;
}

function getRateBySymbol(symbol) {
  const filtered = TOP_TOKENS.filter(token => token.symbol === symbol);
  const rate = filtered[0].rate;
  return rate ? rate : 0;
}

function isStable(symbol) {
  return TOP_TOKENS.find(token => token.symbol === symbol).stable;
}

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
    }, THROTTLE_API_MS * index);
  });
}

module.exports = {
  topTokens: TOP_TOKENS,
  getSymbolByAddress,
  getRateBySymbol,
  isStable,
  config: getTokenInfo,
};
