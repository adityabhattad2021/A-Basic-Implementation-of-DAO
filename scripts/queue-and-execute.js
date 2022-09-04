const { ethers, network } = require("hardhat");
const { DEVELOPMENT_CHAINS, FUNCTION_TO_CALL, MIN_DELAY, NEW_STORE_VALUE_FOR_BOX, PROPOSAL_DESCRIPTION } = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const { moveTime } = require("../utils/move-time");

async function queueAndExecute() {
    const args = [NEW_STORE_VALUE_FOR_BOX];
    const box = await ethers.getContract("Box");
    const encodedFunctionCall = box.interface.encodeFunctionData(FUNCTION_TO_CALL, args)
    const descriptionHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
    );


    const governer = await ethers.getContract("GovernerContract");
    console.log(
		"-------------------------------------------------------------"
	);
    console.log("Queueing...");
    const queueTransectionResponse = await governer.queue(
        [box.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    );
    await queueTransectionResponse.wait(1)
    console.log(
		"-------------------------------------------------------------"
	);

    if (DEVELOPMENT_CHAINS.includes(network.name)) {
        await moveTime(MIN_DELAY + 1);
        console.log(
            "-------------------------------------------------------------"
        );
        await moveBlocks(1)
        console.log(
            "-------------------------------------------------------------"
        );
    }

    console.log(
		"-------------------------------------------------------------"
	);
    console.log("Executing...");
    const executeTransectionResponse = await governer.execute(
        [box.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    )
    await executeTransectionResponse.wait(1)
    console.log(
		"-------------------------------------------------------------"
    );
    
    console.log(
		"-------------------------------------------------------------"
    );

    const boxNewValue = await box.retrieve();
    console.log(`The updated box value is ${boxNewValue.toString()}.`);
    console.log(
		"-------------------------------------------------------------"
	);




}

queueAndExecute()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
