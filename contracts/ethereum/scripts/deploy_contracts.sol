// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {IBTToken} from "../IBTToken.sol";
import {Bridge} from "../Bridge.sol";

contract DeployContracts is Script {
    function run() external returns (address ibtTokenAddress, address bridgeAddress) {
        vm.startBroadcast(); // Begin broadcasting

        // Deploy IBTToken
        IBTToken ibtToken = new IBTToken();
        ibtTokenAddress = address(ibtToken);

        // Deploy Bridge with the IBTToken address
        Bridge bridge = new Bridge(ibtTokenAddress);
        bridgeAddress = address(bridge);

        vm.stopBroadcast(); // End broadcasting
    }
}
