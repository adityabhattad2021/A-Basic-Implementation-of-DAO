const { network } = require("hardhat");
const {
	VOTING_DELAY,
	VOTING_PERIOD,
	QUORUM_PERCENTAGE,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log, get } = deployments;
	const { deployer } = await getNamedAccounts();
	const governanceToken = await get("GovernanceToken");
	const timeLock = await get("TimeLock");

	console.log(
		"-------------------------------------------------------------"
	);
	console.log("Deploying Governance Contract...");
	await deploy("GovernerContract", {
		from: deployer,
		args: [
			governanceToken.address,
			timeLock.address,
			VOTING_DELAY,
			VOTING_PERIOD,
			QUORUM_PERCENTAGE,
		],
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});
	console.log("Deploment Successfull!");
	console.log(
		"-------------------------------------------------------------"
	);
};
