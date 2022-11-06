import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("EncryptedDataStore");
  const datastore = await contract.deploy();
  await datastore.deployed();
  console.log(`Contract deployed to ${datastore.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
