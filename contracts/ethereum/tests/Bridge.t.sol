// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../IBTToken.sol";
import "../Bridge.sol";

contract BridgeTest is Test {
    IBTToken token;
    Bridge bridge;
    address user = address(0x123);

    function setUp() public {
        // Deploy the token and bridge
        token = new IBTToken();
        bridge = new Bridge(address(token));

        // Transfer ownership of the token to the bridge contract
        // so only the bridge can call mint/burn on IBTToken.
        token.transferOwnership(address(bridge));
    }

    function testBurnTokens() public {
        // 1. Mint tokens to `user` via the Bridge.
        //    (The test contract owns the Bridge, so this is allowed.)
        vm.prank(address(this));
        bridge.mintTokens(user, 1000, "TestSetup");

        // 2. Have `user` approve the Bridge to spend 500 tokens
        vm.prank(user);
        token.approve(address(bridge), 500);

        // 3. Burn tokens through the Bridge
        vm.prank(user);
        bridge.burnTokens(500, "Sui");

        // 4. Check final balances
        assertEq(token.balanceOf(user), 500, "User should have 500 tokens left after burning 500");
        assertEq(token.balanceOf(address(bridge)), 0, "Bridge should hold 0 tokens after burn");
    }

    function testMintTokens() public {
        // Mint tokens through the Bridge.
        // The test contract (deployer) is the owner of the Bridge.
        vm.prank(address(this));
        bridge.mintTokens(user, 1000, "Ethereum");

        // Confirm `user` received 1000 tokens
        assertEq(token.balanceOf(user), 1000, "User should have 1000 tokens after mint");
    }

    function testEvents() public {
        // 1. Mint tokens to `user` via the Bridge
        vm.prank(address(this));
        bridge.mintTokens(user, 1000, "TestSetup");

        // 2. Approve Bridge to spend 500 tokens
        vm.prank(user);
        token.approve(address(bridge), 500);

        // 3. Expect the burn event
        vm.expectEmit(true, true, true, true);
        emit Bridge.TokensBurned(user, 500, "Sui");

        // 4. Burn tokens through the Bridge
        vm.prank(user);
        bridge.burnTokens(500, "Sui");
    }
}
