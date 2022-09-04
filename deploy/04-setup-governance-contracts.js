const { network, ethers } = require("hardhat");
const { ADDRESS_ZERO } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log, get } = deployments;
	const { deployer } = await getNamedAccounts();

	const timeLock = await ethers.getContract("TimeLock", deployer);
	const governer = await ethers.getContract("GovernerContract", deployer);

	console.log(
		"-------------------------------------------------------------"
	);
	console.log("Setting up the roles...");
	const proposerRole = await timeLock.PROPOSER_ROLE();
	const executorRole = await timeLock.EXECUTOR_ROLE();
	const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

	const setProposerTransectionResponse = await timeLock.grantRole(
		proposerRole,
		governer.address
	);
    await setProposerTransectionResponse.wait(1);
    
	const setExecutorTransectionResponse = await timeLock.grantRole(
		executorRole,
		ADDRESS_ZERO
	);
    await setExecutorTransectionResponse.wait(1);
    
	const revokeAdminTransectionResponse = await timeLock.revokeRole(
		adminRole,
		deployer
	);
    await revokeAdminTransectionResponse.wait(1);

    console.log("-------------------------------------------------------------");

    
};
