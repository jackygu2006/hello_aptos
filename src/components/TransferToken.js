import React, { useState, useEffect } from "react";
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

export const TransferToken = (props) => {
	const [tokenAddress, setTokenAddress] = useState("");
  const [to, setTo] = useState("");
	
  const transfer = () => {
    console.log(privateKey);
    
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
