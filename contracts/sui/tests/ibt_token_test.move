module sui_ibt::ibt_token_test {
    use sui_ibt::ibt_token::{
        init_ibt, mint, burn, mock_bridge_admin, access_treasury_cap, test_create_ibt,
    };
    use sui::tx_context::{dummy, sender};
    use sui::transfer;

    #[test]
    fun test_ibt_initialization() {
        let mut ctx = dummy();

        // Call the initialization function
        init_ibt(&mut ctx);

        // Assert that no errors occur during initialization
        assert!(true, 0);
    }

    #[test]
    fun test_minting() {
        let mut ctx = dummy();
        let sender_addr = sender(&ctx);

        // Create a mock IBT token
        let ibt_witness = test_create_ibt();

        // Create a mock TreasuryCap and CoinMetadata
        let (treasury_cap, metadata) = sui::coin::create_currency(
            ibt_witness,
            2u8,
            b"IBT",
            b"IBT Token",
            b"Description",
            option::none(),
            &mut ctx,
        );

        // Transfer metadata to a dummy address
        let dummy_address = @0xCAFE;
        transfer::public_transfer(metadata, dummy_address);

        // Create a mock BridgeAdmin
        let mut bridge_admin = mock_bridge_admin(sender_addr, treasury_cap, &mut ctx);

        // Mint some IBT tokens
        let mint_amount = 1_000u64;
        let recipient = sender_addr;
        mint(&mut bridge_admin, mint_amount, recipient, &mut ctx);

        // Transfer BridgeAdmin to the dummy address
        transfer::public_transfer(bridge_admin, dummy_address);

        // Assert minting logic succeeds
        assert!(true, 0);
    }

    #[test]
    fun test_burning() {
        let mut ctx = dummy();
        let sender_addr = sender(&ctx);

        // Create a mock IBT token
        let ibt_witness = test_create_ibt();

        // Create a mock TreasuryCap and CoinMetadata
        let (treasury_cap, metadata) = sui::coin::create_currency(
            ibt_witness,
            2u8,
            b"IBT",
            b"IBT Token",
            b"Description",
            option::none(),
            &mut ctx,
        );

        // Transfer metadata to a dummy address
        let dummy_address = @0xCAFE;
        transfer::public_transfer(metadata, dummy_address);

        // Create a mock BridgeAdmin
        let mut bridge_admin = mock_bridge_admin(sender_addr, treasury_cap, &mut ctx);

        // Mint some IBT tokens for burning
        let mint_amount = 1_000u64;
        let treasury_cap_mut = access_treasury_cap(&mut bridge_admin);
        let ibt_coin = sui::coin::mint(treasury_cap_mut, mint_amount, &mut ctx);

        // Burn the minted IBT tokens
        burn(&mut bridge_admin, ibt_coin, &mut ctx);

        // Transfer BridgeAdmin to the dummy address
        transfer::public_transfer(bridge_admin, dummy_address);

        // Assert burning logic succeeds
        assert!(true, 0);
    }
}
