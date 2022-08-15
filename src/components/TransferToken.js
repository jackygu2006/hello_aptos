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
import { useAuth } from "../contexts/AuthContext";

export const TransferToken = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [to, setTo] = useState("");
  const {
      client,
      currentAccount,
      currentPriKey,
  } = useAuth();

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
