const { network, ethers } = require("hardhat")


module.exports = async ({deployments, getNamedAccounts}) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts()

    console.log("-------------------------------------------------------------");
    console.log("Deploying Governance Token...");
    const governanceToken=await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })
    console.log("Deploment successfull!");
    console.log("-------------------------------------------------------------");
    console.log("-------------------------------------------------------------");
    console.log('Trying to delegate votes to deployer...');
    await delegate(governanceToken.address, deployer);
    console.log("Delegated.");
    console.log("-------------------------------------------------------------");
     
}


// With this function one persone can assign his voting power to any one of his wish. 
const delegate = async (governanceTokenAddress,delegatedAccount) => {
    const governanceToken = await ethers.getContractAt(
        "GovernanceToken",
        governanceTokenAddress
    );

    const transectionResponse = await governanceToken.delegate(delegatedAccount);
    await transectionResponse.wait(1)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}



/* TODO:
Deploy Governance token
Use delegate function in the deploy script. delegate to deployer.
Deploy TimeLock Smart Contract
-Args for timeLock = [MIN_DELAY,[],[]]
Deploy GovernanceContract (Governance Contract.)





*/
