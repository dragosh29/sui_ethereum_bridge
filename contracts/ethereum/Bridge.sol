// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IBTToken.sol";

contract Bridge is Ownable {
    IERC20 public token;

    event TokensBurned(address indexed user, uint256 amount, string targetChain);
    event TokensMinted(address indexed user, uint256 amount, string sourceChain);

    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
    }

    function burnTokens(uint256 amount, string memory targetChain) external {
        // Transfer tokens from the user to the Bridge contract
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        // Burn the tokens (Bridge is the token owner)
        IBTToken(address(token)).burn(address(this), amount);

        emit TokensBurned(msg.sender, amount, targetChain);
    }

    function mintTokens(address user, uint256 amount, string memory sourceChain) external onlyOwner {
        // Mint tokens to the user
        IBTToken(address(token)).mint(user, amount);

        emit TokensMinted(user, amount, sourceChain);
    }
}
