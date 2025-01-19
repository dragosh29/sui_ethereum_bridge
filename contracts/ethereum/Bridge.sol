// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IBTToken.sol";

contract Bridge {
    IBTToken public token;

    event TokensBurned(address indexed from, uint256 amount, string targetChain);
    event TokensMinted(address indexed to, uint256 amount, string sourceChain);

    constructor(address tokenAddress) {
        token = IBTToken(tokenAddress);
    }

    // Burn tokens on Ethereum
    function burnTokens(uint256 amount, string memory targetChain) public {
        token.burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount, targetChain);
    }

    // Mint tokens on Ethereum
    function mintTokens(address to, uint256 amount, string memory sourceChain) public {
        token.mint(to, amount);
        emit TokensMinted(to, amount, sourceChain);
    }
}
