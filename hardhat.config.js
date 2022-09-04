require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.9",
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
			blockConfirmations: 1,
			allowUnlimitedContractSize:true,
		},
		localhost: {
			chainId: 1337,
			blockConfirmations: 1,
			allowUnlimitedContractSize:true,
		},
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
		player: {
			default: 1,
		},
	},
	mocha: {
		timeout: 500000, //500 seconds.
	},
};
