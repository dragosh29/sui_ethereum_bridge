// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IBTToken} from "../IBTToken.sol";
import {Bridge} from "../Bridge.sol";

contract DeployBridge {
    function deploy(address ibtTokenAddress) public returns (address) {
        Bridge bridge = new Bridge(ibtTokenAddress);
        return address(bridge);
    }

    function run(address ibtTokenAddress) external returns (address) {
        return deploy(ibtTokenAddress);
    }
}
