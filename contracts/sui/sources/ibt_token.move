module sui_ibt::ibt_token {
    use sui::coin;

    public struct IBT_TOKEN has drop {}

    fun init(otw: IBT_TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<IBT_TOKEN>(
            otw,
            9u8,
            b"IBT_TOKEN",
            b"IBT_TOKEN Coin",
            b"This is the IBT_TOKEN token used to bridge SUI to ETH.", 
            option::none(),
            ctx
        );

        transfer::public_freeze_object(metadata);
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
