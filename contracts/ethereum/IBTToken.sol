// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IBTToken is ERC20, Ownable {
    // Pass msg.sender to Ownable's constructor to set the deployer as the owner
    constructor() ERC20("IBT Token", "IBT") Ownable(msg.sender) {
    }

    // Mint function restricted to contract owner
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Burn function restricted to contract owner
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
