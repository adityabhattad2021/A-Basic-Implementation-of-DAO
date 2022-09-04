const { network, ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log, get } = deployments;
	const { deployer } = await getNamedAccounts();

	console.log(
		"-------------------------------------------------------------"
	);
	console.log("Deploying Box Contract...");
	const box = await deploy("Box", {
		from: deployer,
		args: [],
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});
	console.log("Deployment Successfull!");
	console.log(
		"-------------------------------------------------------------"
	);

	console.log(
		"-------------------------------------------------------------"
	);
	console.log("Trying to transfer the Ownership of the box to timeLock...");
	const timeLock = await get("TimeLock");
	const boxContract = await ethers.getContractAt("Box", box.address);
	const transectionResponse = await boxContract.transferOwnership(
		timeLock.address
	);
	await transectionResponse.wait(1);
	console.log(
		"Successfully transfered the ownership on box contract to timeLock!"
	);
	console.log(
		"-------------------------------------------------------------"
	);
};
