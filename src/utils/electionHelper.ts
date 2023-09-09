import { ethers } from "ethers";
import abi from "../constants/abi.json";

const contractABI = abi;
const contractAddress = "0x76f181Bc2b6f9d26e55324dAC316DA7bb8803623";

const isWeb3Enabled = !!window.ethereum;

const nftAlchemyProvider = import.meta.env.VITE_NFT_ALCHEMY_PROVIDER;

const provider = isWeb3Enabled
  ? new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    )
  : new ethers.providers.JsonRpcProvider(`${nftAlchemyProvider}`);

const signer = provider.getSigner();

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Function to create an election
export async function createElection(
  schemaId: string,
  name: string,
  startTime: number
) {
  const tx = await contract.createElection(
    schemaId,
    name,
    ethers.utils.parseUnits(String(startTime), "wei")
  );
  await tx.wait();

  console.log("election added");
}

// Function to add a position
export async function addPosition(
  electionSchemaId: string,
  positionSchemaId: string,
  title: string
) {
  const tx = await contract.addPosition(
    electionSchemaId,
    positionSchemaId,
    title
  );
  await tx.wait();
}

// Function to add a candidate
export async function addCandidate(
  electionSchemaId: string,
  positionSchemaId: string,
  candchemaId: string,
  name: string,
  candidateAddress: string
) {
  const tx = await contract.addCandidate(
    electionSchemaId,
    positionSchemaId,
    candchemaId,
    name,
    candidateAddress
  );
  await tx.wait();
}

// Function to vote
export async function vote(
  electionId: string,
  positionId: string,
  candidateId: string
) {
  const tx = await contract.vote(electionId, positionId, candidateId);
  await tx.wait();
}

// Call the functions as needed
// Example usage:
// createElection(1, "Election 1", 1631000000);
// addPosition(1, "Position 1");
// addCandidate(1, "Candidate 1", "0x12345...");
// vote(1, 0, 0);
