const hre = require("hardhat");
require('dotenv').config();

async function main() {
  // Use an environment variable for the initial owner address
  const initialOwnerAddress = process.env.INITIAL_OWNER_ADDRESS;

  if (!initialOwnerAddress) {
    throw new Error("Please set INITIAL_OWNER_ADDRESS in your .env file");
  }

  const CynthiaToken = await hre.ethers.getContractFactory("CynthiaToken");
  const cynthiaToken = await CynthiaToken.deploy(initialOwnerAddress);

  await cynthiaToken.waitForDeployment();

  console.log("CynthiaToken deployed to:", await cynthiaToken.getAddress());

  // Verify total supply and initial owner balance
  const totalSupply = await cynthiaToken.totalSupply();
  console.log("Total supply:", totalSupply.toString());

  const initialOwnerBalance = await cynthiaToken.balanceOf(initialOwnerAddress);
  console.log("Initial owner wallet balance:", initialOwnerBalance.toString());

  // Verify deployer balance (should be 0)
  const [deployer] = await hre.ethers.getSigners();
  const deployerBalance = await cynthiaToken.balanceOf(deployer.address);
  console.log("Deployer balance:", deployerBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
