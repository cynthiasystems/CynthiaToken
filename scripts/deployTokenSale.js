const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Check if OWNER_ADDRESS is set
  if (!process.env.OWNER_ADDRESS) {
    throw new Error("OWNER_ADDRESS is not set in the environment variables");
  }

  console.log("Owner address:", process.env.OWNER_ADDRESS);

  try {
    // Deploy CynthiaToken
    console.log("Deploying CynthiaToken...");
    const CynthiaToken = await hre.ethers.getContractFactory("CynthiaToken");
    const cynthiaToken = await CynthiaToken.deploy(process.env.OWNER_ADDRESS);
    await cynthiaToken.waitForDeployment();
    console.log("CynthiaToken deployed to:", await cynthiaToken.getAddress());

    // Deploy CynthiaTokenSale
    console.log("Deploying CynthiaTokenSale...");
    const CynthiaTokenSale = await hre.ethers.getContractFactory("CynthiaTokenSale");
    const cynthiaTokenSale = await CynthiaTokenSale.deploy(await cynthiaToken.getAddress());
    await cynthiaTokenSale.waitForDeployment();
    console.log("CynthiaTokenSale deployed to:", await cynthiaTokenSale.getAddress());

    // Transfer tokens to sale contract
    console.log("Transferring tokens to sale contract...");
    const tokensForSale = hre.ethers.parseEther("1000000"); // 1 million tokens
    await cynthiaToken.transfer(await cynthiaTokenSale.getAddress(), tokensForSale);
    console.log("Transferred", hre.ethers.formatEther(tokensForSale), "tokens to the sale contract");

    console.log("Deployment completed successfully!");
  } catch (error) {
    console.error("Error during deployment:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });