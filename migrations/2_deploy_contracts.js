// Global config
const CONFIG = require("../GODELTA_CONFIG");

// EtherDelta Contract
const EtherDelta = artifacts.require("./EtherDelta.sol");

// Deploy an ERC20 token if on test (local) network
const AlphaToken = artifacts.require("./AlphaToken.sol");

/* Smart contract constructor args, change as needed */
let admin; // TODO: Set to desired public key when deploying on mainnet in GODELTA_CONFIG.json
let feeAccount; // TODO: Set to desired public key when deploying to mainnet in GODELTA_CONFIG.json
let accountLevelsAddr; // TODO: Set to desired public key when deploying to mainnet in GODELTA_CONFIG.json
let feeTake = CONFIG.CONTRACT_CONFIG.feeTake;
let feeMake = CONFIG.CONTRACT_CONFIG.feeMake;
let feeRebate = CONFIG.CONTRACT_CONFIG.feeRebate;

module.exports = function (deployer, network, accounts) {

    if (network === "ganache") { // Ganache local testnet
        // Just set all admin accounts to 0 on local deploy
        admin = accounts[0];
        feeAccount = accounts[0];
        accountLevelsAddr = "0x0000000000000000000000000000000000000000"; // By default, don't use account levels

        // Only deploy token in testnet, for running tests
        deployer.deploy(AlphaToken, admin, "Five Decimals", "FIVD", 5);

    } else if (network === "live") { // Gochain livenet
        admin = CONFIG.CONTRACT_CONFIG.contract_admin_public_key;
        feeAccount = CONFIG.CONTRACT_CONFIG.contract_fee_account_public_key;
        accountLevelsAddr = CONFIG.CONTRACT_CONFIG.contract_fee_account_public_key;
    } else {
        throw "NO OTHER NETWORKS CONFIGURED"
    }

    // Deploy EtherDelta Contract with constructor parameters
    deployer.deploy(
        EtherDelta,
        admin,
        feeAccount,
        accountLevelsAddr,
        feeMake,
        feeTake,
        feeRebate,
    );
};

