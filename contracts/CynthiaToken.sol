// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact cynthia@cynthiasystems.com
contract CynthiaToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10**18; // 100 million tokens with 18 decimals

    constructor(address initialOwner)
        ERC20("CynthiaToken", "CYNTHIA")
        Ownable(initialOwner)
    {
        _mint(initialOwner, TOTAL_SUPPLY);
    }
}
