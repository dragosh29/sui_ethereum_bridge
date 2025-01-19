// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IBTToken is ERC20, Ownable {
    constructor() ERC20("IBT Token", "IBT") {}

    // Mint function restricted to contract owner
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Burn function restricted to contract owner
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
