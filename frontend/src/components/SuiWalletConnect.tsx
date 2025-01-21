import React from 'react';
import { ConnectButton } from '@mysten/dapp-kit';

const SuiWalletConnect: React.FC = () => {
  return (
    <div>
      <h2>Sui Wallet</h2>
      <ConnectButton />
    </div>
  );
};

export default SuiWalletConnect;
