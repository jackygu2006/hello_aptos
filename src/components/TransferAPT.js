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
import { transfer } from "../utils";
import "../styles.css";

export const TransferAPT = (props) => {
	const [privateKey, setPrivateKey] = useState("");
  const [to, setTo] = useState("");
	const [hash, setHash] = useState("");
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		console.log("222", props.priKey);
		setPrivateKey(props.priKey);
	}, [props])

	const privateKeyHexToAccount = (hexString) =>
	new AptosAccount(new HexString(hexString).toUint8Array());

  const transferTo = async () => {
    const hash = await transfer(props.client, privateKeyHexToAccount(privateKey), to, amount);
		setHash("hash: " + hash);
  };

	return (
    <div>
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="To account"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={() => transferTo()}>Transfer APT</button>
			<div>{`${hash}`}</div>
    </div>
  );
};
