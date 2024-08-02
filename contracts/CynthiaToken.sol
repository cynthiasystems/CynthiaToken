// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";

/// @custom:security-contact cynthia@cynthiasystems.com
contract CynthiaToken is ERC20, ERC20Pausable, Ownable, ERC20Permit, ERC20FlashMint {
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10**18; // 100 million tokens with 18 decimals

    constructor(address initialOwner)
        ERC20("CynthiaToken", "CYNTHIA")
        Ownable(initialOwner)
        ERC20Permit("CynthiaToken")
    {
        _mint(initialOwner, TOTAL_SUPPLY);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}