// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IBTToken} from "../IBTToken.sol";
import {Bridge} from "../Bridge.sol";

contract DeployContracts {
    function deploy() public returns (address ibtTokenAddress, address bridgeAddress) {
        // Deploy IBTToken
        IBTToken ibtToken = new IBTToken();
        ibtTokenAddress = address(ibtToken);

        // Deploy Bridge with the IBTToken address
        Bridge bridge = new Bridge(ibtTokenAddress);
        bridgeAddress = address(bridge);
    }

    function run() external returns (address ibtTokenAddress, address bridgeAddress) {
        return deploy();
    }
}
