// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../IBTToken.sol";

contract IBTTokenTest is Test {
    IBTToken token;
    address deployer = address(this); // Test contract acts as deployer
    address user = address(0x123);

    function setUp() public {
        // Deploy the token contract
        token = new IBTToken();
    }

    function testInitialSupply() public {
        assertEq(token.totalSupply(), 0, "Initial supply should be zero");
    }

    function testMinting() public {
        token.mint(user, 1000);
        assertEq(token.balanceOf(user), 1000, "User should have 1000 tokens");
    }

    function testBurning() public {
        token.mint(user, 1000);
        assertEq(token.balanceOf(user), 1000, "User should have 1000 tokens");

        token.burn(user, 500);
        assertEq(token.balanceOf(user), 500, "User should have 500 tokens after burning");
    }

    function testOnlyOwnerCanMint() public {
        vm.prank(user); // Simulate a call from a non-owner
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        token.mint(user, 1000);
    }
}
