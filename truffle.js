
require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    live: {
      network_id: 1,
      host: "localhost",
      port: 8545,
      from: "", // Set as deploy address (must be unlocked prior to migrate)
      gas: 90000, // Gas limit used for deploy
      gasPrice: 20000000000  // Use https://ethgasstation.info/ to find optimal price
    },
    ganache: {
        network_id: 4,
        host: "localhost",
        port: 9545,
        from: "0xc31eb6e317054a79bb5e442d686cb9b225670c1d",
        gasPrice: 20000000000, // 20 Gwei
        gasLimit: 90000
    },
  },
  
  mocha: {
    useColors: true,
    slow: 5000
  }
};

