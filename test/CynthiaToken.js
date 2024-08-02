const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CynthiaToken", function () {
  let CynthiaToken;
  let cynthiaToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    CynthiaToken = await ethers.getContractFactory("CynthiaToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    cynthiaToken = await CynthiaToken.deploy(owner.address);
    await cynthiaToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await cynthiaToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await cynthiaToken.balanceOf(owner.address);
      const totalSupply = await cynthiaToken.TOTAL_SUPPLY();
      expect(ownerBalance).to.equal(totalSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 1000 tokens from owner to addr1
      await cynthiaToken.transfer(addr1.address, ethers.parseEther("1000"));
      expect(await cynthiaToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("1000"));

      // Transfer 500 tokens from addr1 to addr2
      await cynthiaToken.connect(addr1).transfer(addr2.address, ethers.parseEther("500"));
      expect(await cynthiaToken.balanceOf(addr2.address)).to.equal(ethers.parseEther("500"));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await cynthiaToken.balanceOf(owner.address);
      await expect(
        cynthiaToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(cynthiaToken, "ERC20InsufficientBalance");
      expect(await cynthiaToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});