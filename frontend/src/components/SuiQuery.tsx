import React, { useEffect, useState } from "react";
import { useSuiClientQuery } from "@mysten/dapp-kit";

const SuiQuery: React.FC<{ owner: string }> = ({ owner }) => {
  const [refresh, setRefresh] = useState(false);

  const { data: suiBalanceData, isPending: isSuiBalanceLoading, error: suiBalanceError, refetch: refetchSuiBalance } =
    useSuiClientQuery("getBalance", { owner });

  const { data: ibtCoins, isPending: isIbtLoading, error: ibtError, refetch: refetchIbtBalance } = useSuiClientQuery(
    "getCoins",
    {
      owner,
      coinType: `${import.meta.env.VITE_SUI_CONTRACT_ADDRESS || ""}::ibt_token::IBT_TOKEN`,
    }
  );

  const ibtBalance = ibtCoins?.data?.reduce((sum, coin) => sum + BigInt(coin.balance), BigInt(0));

  // add a listener for transaction success to trigger balance refresh
  useEffect(() => {
    const handleTransactionSuccess = async () => {

      // short delay to ensure blockchain state is finalized
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await Promise.all([refetchSuiBalance(), refetchIbtBalance()]);
      setRefresh((prev) => !prev);
    };

    window.addEventListener("suiTransactionSuccess", handleTransactionSuccess as EventListener);

    return () => {
      window.removeEventListener("suiTransactionSuccess", handleTransactionSuccess as EventListener);
    };
  }, [refetchSuiBalance, refetchIbtBalance]);

  if (isSuiBalanceLoading || isIbtLoading) {
    return <div>Loading...</div>;
  }

  if (suiBalanceError || ibtError) {
    return (
      <div>
        Error:
        {suiBalanceError?.message || ibtError?.message}
      </div>
    );
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>
        <strong>Address:</strong> {owner}
      </p>
      <p>
        <strong>SUI Balance:</strong> {suiBalanceData?.totalBalance || "0"} SUI
      </p>
      <p>
        <strong>IBT_TOKEN Balance:</strong> {ibtBalance ? ibtBalance.toString() : "0"} IBT
      </p>
    </div>
  );
};

export default SuiQuery;
