const { ethers } = require("hardhat");

async function main() {
  // Use environment variables or command-line arguments
  const saleAddress = process.env.SALE_ADDRESS || process.argv[2];
  const ownerAddress = process.env.OWNER_ADDRESS || process.argv[3];

  if (!saleAddress || !ownerAddress) {
    throw new Error("Sale address and owner address must be provided");
  }

  console.log(`Sale Address: ${saleAddress}`);
  console.log(`Owner Address: ${ownerAddress}`);

  // Get the contract instance
  const CynthiaTokenSale = await ethers.getContractAt("CynthiaTokenSale", saleAddress);

  // Ensure you're using the correct signer
  const [owner] = await ethers.getSigners();
  if (owner.address.toLowerCase() !== ownerAddress.toLowerCase()) {
    throw new Error("Not using the correct owner address");
  }

  // Get the balance before withdrawal
  const balanceBefore = await ethers.provider.getBalance(saleAddress);
  console.log(`Contract balance before withdrawal: ${ethers.formatEther(balanceBefore)} ETH`);

  // Call the withdrawal function
  const tx = await CynthiaTokenSale.withdrawEther();
  await tx.wait();

  // Get the balance after withdrawal
  const balanceAfter = await ethers.provider.getBalance(saleAddress);
  console.log(`Contract balance after withdrawal: ${ethers.formatEther(balanceAfter)} ETH`);

  console.log("Ether withdrawn successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });