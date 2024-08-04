require('dotenv').config();
const { ethers } = require('ethers');

const privateKey = process.env.MAINNET_PRIVATE_KEY;

if (!privateKey) {
  console.error('Please set MAINNET_PRIVATE_KEY in your .env file');
  process.exit(1);
}

const wallet = new ethers.Wallet(privateKey);
console.log('Address associated with MAINNET_PRIVATE_KEY:', wallet.address);
