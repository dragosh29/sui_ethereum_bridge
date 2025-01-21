import React from 'react';
import { useSuiClientQuery } from '@mysten/dapp-kit';

const SuiQuery: React.FC<{ owner: string }> = ({ owner }) => {
  // Query to get owned objects
  const { data: ownedObjects, isPending: isObjectsLoading, error: objectsError } = useSuiClientQuery(
    'getOwnedObjects',
    { owner }
  );

  // Query to get balance
  const { data: balanceData, isPending: isBalanceLoading, error: balanceError } = useSuiClientQuery(
    'getBalance',
    { owner }
  );

  if (isObjectsLoading || isBalanceLoading) {
    return <div>Loading...</div>;
  }

  if (objectsError || balanceError) {
    return (
      <div>
        Error:
        {objectsError?.message || balanceError?.message}
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
        <strong>Balance:</strong> {balanceData?.totalBalance || '0'} SUI
      </p>

      {/* <h2>Your Owned Objects</h2>
      <pre>{JSON.stringify(ownedObjects, null, 2)}</pre> */}
    </div>
  );
};

export default SuiQuery;
