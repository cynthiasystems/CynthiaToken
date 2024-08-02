// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CynthiaTokenSale
 * @dev Implements a token sale and redemption mechanism for CynthiaToken (CYNTHIA).
 * This contract allows users to buy and sell CYNTHIA tokens at a fixed rate of 1 ETH per token.
 */
contract CynthiaTokenSale is Ownable, ReentrancyGuard {
    /// @notice The $CYNTHIA token contract
    IERC20 public cynthiaToken;

    /// @notice Emitted when tokens are purchased
    /// @param buyer The address of the token buyer
    /// @param amount The number of tokens purchased
    event TokensPurchased(address buyer, uint256 amount);

    /// @notice Emitted when tokens are redeemed
    /// @param seller The address of the token seller
    /// @param amount The number of tokens redeemed
    event TokensRedeemed(address seller, uint256 amount);

    /**
     * @dev Sets the $CYNTHIA token contract address and the contract owner.
     * @param _token The address of the $CYNTHIA token contract
     */
    constructor(IERC20 _token) Ownable(msg.sender) {
        cynthiaToken = _token;
    }

    /**
     * @notice Allows users to buy $CYNTHIA tokens
     * @dev Tokens are priced at 1 ETH per token. Excess $ETH is refunded.
     */
    function buyTokens() public payable {
        uint256 tokenAmount = msg.value / 1 ether;  // 1 CYNTHIA = 1 ETH
        require(tokenAmount > 0, "Insufficient payment");
        require(cynthiaToken.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in contract");
        
        require(cynthiaToken.transfer(msg.sender, tokenAmount), "Transfer failed");
        emit TokensPurchased(msg.sender, tokenAmount);

        // Refund excess payment
        uint256 excess = msg.value % 1 ether;
        if (excess > 0) {
            payable(msg.sender).transfer(excess);
        }
    }

    /**
     * @notice Allows users to redeem $CYNTHIA tokens for $ETH
     * @dev Tokens are redeemed at a rate of 1 $ETH per token. Uses ReentrancyGuard for security.
     * @param tokenAmount The number of tokens to redeem
     */
    function redeemTokens(uint256 tokenAmount) public nonReentrant {
        require(tokenAmount > 0, "Must redeem a positive amount");
        require(cynthiaToken.balanceOf(msg.sender) >= tokenAmount, "Insufficient tokens");
        require(address(this).balance >= tokenAmount * 1 ether, "Insufficient ETH in contract");

        require(cynthiaToken.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");
        
        payable(msg.sender).transfer(tokenAmount * 1 ether);
        emit TokensRedeemed(msg.sender, tokenAmount);
    }

    /**
     * @notice Allows the owner to withdraw $ETH from the contract
     * @dev Only callable by the contract owner
     */
    function withdrawEther() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @notice Allows the owner to withdraw unsold $CYNTHIA tokens
     * @dev Only callable by the contract owner
     * @param amount The number of tokens to withdraw
     */
    function withdrawUnsoldTokens(uint256 amount) public onlyOwner {
        require(cynthiaToken.transfer(owner(), amount), "Transfer failed");
    }
}
