module sui_ibt::ibt_token {
    use sui::coin;

    /// The IBT_TOKEN , using One-Time Witness (OTW) semantics.
    public struct IBT_TOKEN has drop {}

    /// Initializes the IBT_TOKEN token and assigns a treasury cap to the creator. 
    fun init(otw: IBT_TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<IBT_TOKEN>(
            otw,                   // Witness for the OTW type
            9u8,                      // Decimals for the token
            b"IBT_TOKEN",                   // Token name
            b"IBT_TOKEN Coin",              // Token display name
            b"This is the IBT_TOKEN token used to bridge SUI to ETH.", // Description
            option::none(),           // Optional URL for metadata
            ctx
        );

        // Freeze the metadata to prevent modifications.
        transfer::public_freeze_object(metadata);

        // Transfer the treasury cap to the creator.
        transfer::public_transfer(treasury_cap, ctx.sender());
    }

    /// Mint function (only the creator can mint).
    public entry fun mint(
        cap: &mut coin::TreasuryCap<IBT_TOKEN>, 
        amount: u64, 
        ctx: &mut TxContext
    ) {
        let minted_coin = coin::mint(cap, amount, ctx);
        transfer::public_transfer(minted_coin, ctx.sender());
    }

    /// Burn function (only the creator can burn).
    public entry fun burn(
        cap: &mut coin::TreasuryCap<IBT_TOKEN>, 
        coin_to_burn: coin::Coin<IBT_TOKEN>, 
        ctx: &mut TxContext
    ) {
        coin::burn(cap, coin_to_burn);
    }
}
