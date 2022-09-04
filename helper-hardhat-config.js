const QUORUM_PERCENTAGE = 4;
const MIN_DELAY = 3600; //  1 hour.
const VOTING_PERIOD = 5;
const VOTING_DELAY = 1;
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const NEW_STORE_VALUE_FOR_BOX = 89;
const FUNCTION_TO_CALL = "store";
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 89 in the box instead of 0.";
const PROPOSALS_FILE = "proposals.json"

const DEVELOPMENT_CHAINS = ["hardhat", "localhost"];



module.exports = { MIN_DELAY, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE, ADDRESS_ZERO, NEW_STORE_VALUE_FOR_BOX, FUNCTION_TO_CALL, PROPOSAL_DESCRIPTION, DEVELOPMENT_CHAINS ,PROPOSALS_FILE};

