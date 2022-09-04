const fs = require("fs");
const { network, ethers } = require("hardhat");
const {
	PROPOSALS_FILE,
	DEVELOPMENT_CHAINS,
	VOTING_PERIOD,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");

const INDEX = 0;

async function vote(proposalIndex) {
	const proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, "utf-8"));
	const proposalId = proposals[network.config.chainId][proposalIndex];

	// Here: 0=>Vote against the proposal 1=>Vote in favour of the proposal 2=>Abstain your vote.
	const voteWay = 1;
	const governer = await ethers.getContract("GovernerContract");
	const reason = "I really like the number 89 :)";
	console.log(
		"-------------------------------------------------------------"
	);
	console.log("Trying to vote...");
	const voteTransectionResopnse = await governer.castVoteWithReason(
		proposalId,
		voteWay,
		reason
	);
	await voteTransectionResopnse.wait(1);
	console.log("Succefully voted in favour of the proposal :)");
	console.log(
		"-------------------------------------------------------------"
    );
    
    const possibleStates = [
		"Pending",
		"Active",
		"Canceled",
		"Defeated",
		"Succeeded",
		"Queued",
		"Expired",
		"Executed",
	];

	const governerStateBefore = await governer.state(proposalId);
	console.log(
		`Governer state for proposal: ${proposalId} before voting peroid ends is ${governerStateBefore}`
	);
	console.log(
		`The proposal is currently ${possibleStates[governerStateBefore]}.`
	);

	console.log(
		"-------------------------------------------------------------"
	);

	if (DEVELOPMENT_CHAINS.includes(network.name)) {
		await moveBlocks(VOTING_PERIOD + 1);
	}

	console.log(
		"-------------------------------------------------------------"
	);

	
	const governerStateAfter = await governer.state(proposalId);
	console.log(
		`Governer state for proposal: ${proposalId} after voting peroid ends is ${governerStateAfter}`
	);

	console.log(
		`The proposal is currently ${possibleStates[governerStateAfter]}.`
	);

	console.log(
		"-------------------------------------------------------------"
	);
}

vote(INDEX)
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
