const { network, ethers } = require("hardhat");
const { MIN_DELAY } = require("../helper-hardhat-config");


module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts()
    
    console.log("-------------------------------------------------------------");
    console.log("Deploying TimeLock...");
    await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })
    console.log("Deploment successfull!");
    console.log("-------------------------------------------------------------");

}