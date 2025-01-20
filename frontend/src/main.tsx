import React from "react";
import ReactDOM from "react-dom";
import { WalletStandardAdapterProvider } from "@mysten/dapp-kit";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <WalletStandardAdapterProvider>
      <App />
    </WalletStandardAdapterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
