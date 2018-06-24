/* If run using npm run-script, will unlock your account for 3 minutes. Use with caution and/or lower the unlock time */

// Global config
const CONFIG = require("../GODELTA_CONFIG");

// Determine network type by first cli arg
const network = process.argv[2];

// Unlock account time
const unlock_duration_sec = parseInt(process.argv[3]);

// Init variables depending on network type
let my_public_key;
let my_private_key;
let rpc_api_provider;
if (network === 'l') { // Livenet
    my_public_key = CONFIG.DEPLOYER_CONFIG.public_key;
    my_private_key = CONFIG.DEPLOYER_CONFIG.private_key;
    rpc_api_provider = CONFIG.DEPLOYER_CONFIG.livenet_rpc_provider;
} else if (network === 'g') { // Ganache
    my_public_key = "0xc31eb6e317054a79bb5e442d686cb9b225670c1d";
    my_private_key = "3e722ce009e8acbfad73048108d965b6e38c8d2051d4feaef9fe8d867de7f62c";
    rpc_api_provider = "http://localhost:9545";
}

// Web3
const Web3 = require('web3');
const web3 = new Web3(rpc_api_provider);

// Unlock account
web3.eth.personal.unlockAccount(my_public_key, my_private_key, unlock_duration_sec);
