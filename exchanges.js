const EXCHANGE_ADDR = {
  '0x742d35cc6634c0532925a3b844bc454e4438f44e': 'Bitfinex_5',

  '0x876eabf441b2ee5b5b0554fd502a8e0600950cfa': 'Bitfinex_4',

  '0x4fdd5eb2fb260149a3903859043e962ab89d8ed4': 'Bitfinex_3',

  '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98': 'Bittrex_1',

  '0xdc76cd25977e0a5ae17155770273ad58648900d3': 'Huobi_6',

  '0x2910543af39aba0cd09dbb2d50200b3e800a63d2': 'Kraken_1',

  '0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13': 'Kraken_2',

  '0xe853c56864a2ebe4576a807d26fdc4a0ada51919': 'Kraken_3',

  '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0': 'Kraken_4',

  '0xfe9e8709d3215310075d67e3ed32a380ccf451c8': 'Binance_5',

  '0x0681d8db095565fe8a346fa0277bffde9c0edbbf': 'Binance_4',

  '0xd551234ae421e3bcba99a0da6d736074f22192ff': 'Binance_2',

  '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be': 'Binance_1',

  '0x6cc5f688a315f3dc28a7781717a9a798a59fda7b': 'Okex_1',

  '0xd24400ae8bfebb18ca49be86258a3c749cf46853': 'Gemini_1',

  '0x1c4b70a3968436b9a0a9cf5205c787eb81bb558c': 'Gate.io_3',

  '0x0d0707963952f2fba59dd06f2b425ace40b492fe': 'Gate.io_1',

  '0x5baeac0a0417a05733884852aa068b706967e790': 'Cryptopia',

  '0x32be343b94f860124dc4fee278fdcbd38c102d88': 'Poloniex_1',
};

function getAccountName(acc) {
  return EXCHANGE_ADDR.hasOwnProperty(acc) ? EXCHANGE_ADDR[acc] : '';
}

module.exports = {
  getAccountName,
};
