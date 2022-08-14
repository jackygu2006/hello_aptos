import React, { useState } from "react";
import {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
  BCS,
  MaybeHexString,
  HexString,
  FaucetClient
} from "aptos";
import { accountBalance } from "../utils";
import "../styles.css";
import { NODE_URL, FAUCET_URL } from "./Faucet";

export const TransferToken = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [to, setTo] = useState("");

  const transfer = () => {
    console.log(tokenAddress);
  };
  return (
    <div>
      <input
        placeholder="Token address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        placeholder="To account"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={() => transfer()}>Transfer Token</button>
    </div>
  );
};
