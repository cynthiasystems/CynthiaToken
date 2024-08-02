const hre = require("hardhat");

async function main() {
  const CynthiaToken = await hre.ethers.getContractFactory("CynthiaToken");
  const cynthiaToken = await CynthiaToken.deploy();

  await cynthiaToken.waitForDeployment();

  console.log("CynthiaToken deployed to:", await cynthiaToken.getAddress());

  // Verify total supply and deployer balance
  const totalSupply = await cynthiaToken.totalSupply();
  console.log("Total supply:", totalSupply.toString());

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
