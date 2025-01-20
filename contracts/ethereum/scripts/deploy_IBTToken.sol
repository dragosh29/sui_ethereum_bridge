// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IBTToken} from "../IBTToken.sol";

contract DeployIBTToken {
    function deploy() public returns (address) {
        IBTToken ibt = new IBTToken();
        return address(ibt);
    }

    function run() external returns (address) {
        return deploy();
    }
}
