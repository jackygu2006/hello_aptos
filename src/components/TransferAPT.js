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

export const TransferAPT = () => {
  const [to, setTo] = useState("");
  const transfer = () => {
    console.log(to);
  };
  return (
    <div>
      <input
        placeholder="To account"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={() => transfer()}>Transfer APT</button>
    </div>
  );
};
