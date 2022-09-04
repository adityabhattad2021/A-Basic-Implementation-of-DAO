const { network, ethers } = require("hardhat");
const {
	NEW_STORE_VALUE_FOR_BOX,
	FUNCTION_TO_CALL,
	PROPOSAL_DESCRIPTION,
	DEVELOPMENT_CHAINS,
	VOTING_DELAY,
	PROPOSALS_FILE,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const fs = require("fs");

async function propose(args, functionToCall, proposalDescription) {
	const governor = await ethers.getContract("GovernerContract");
	const box = await ethers.getContract("Box");
	const encodedFunctionCall = box.interface.encodeFunctionData(
		functionToCall,
		args
	);

	console.log(
		"-------------------------------------------------------------"
	);
	console.log(`The current box value is ${(await box.retrieve()).toString()}.`);
	console.log(
		"-------------------------------------------------------------"
	);


	console.log(
		"-------------------------------------------------------------"
	);
	console.log(
		`Here is how encoded function call looks like ${encodedFunctionCall}`
	);
	console.log(
		"-------------------------------------------------------------"
	);
	console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
	console.log(`Proposal Description:\n ${proposalDescription}`);

	const proposeTransectionResponse = await governor.propose(
		[box.address],
		[0],
		[encodedFunctionCall],
		proposalDescription
	);
	const proposeTransectionRecipt = await proposeTransectionResponse.wait(1);
	console.log("Proposal sent successfully!");
	console.log(
		"-------------------------------------------------------------"
	);

	if (DEVELOPMENT_CHAINS.includes(network.name)) {
		console.log(
			"-------------------------------------------------------------"
		);
		await moveBlocks(VOTING_DELAY + 1);
		console.log(
			"-------------------------------------------------------------"
		);
	}

	const proposalId = proposeTransectionRecipt.events[0].args.proposalId;
	let proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, "utf-8"));
	proposals[network.config.chainId.toString()].push(proposalId.toString());
	fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals));
}

propose([NEW_STORE_VALUE_FOR_BOX], FUNCTION_TO_CALL, PROPOSAL_DESCRIPTION)
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
