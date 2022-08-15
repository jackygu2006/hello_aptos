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
  const [to, setTo] = useState("0xf5e7d4f63bc04ab3a8ae990af28e1b4f9a6b7834c39995f2d147fd406d79f8b3");
	const [hash, setHash] = useState("");
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		setPrivateKey(props.priKey);
	}, [props])

	const privateKeyHexToAccount = (hexString) =>
	new AptosAccount(new HexString(hexString).toUint8Array());

  const transferTo = async () => {
		try {
			const hash = await transfer(props.client, privateKeyHexToAccount(privateKey), to, amount);
			setHash("hash: " + hash);	
		} catch (e) {
			setHash(e.message);
		}
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
