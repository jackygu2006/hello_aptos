// 0x945cc283b8c6cfecf800ed53032a128dbeb45ddcb022d96bfa34dae5f956898d

import React, { useEffect, useState } from "react";
import {
  AptosAccount,
  AptosClient,
  HexString,
  FaucetClient
} from "aptos";
import { accountBalance } from "../utils";
import { NODE_URL, FAUCET_URL } from "../App";
import { Divider } from "./Divider";
import "../styles.css";

export const Faucet = (props) => {
	const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [faucetRequire, setFaucetRequire] = useState("");
	const [hash, setHash] = useState("");

  const client = props.client;
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  const getFaucet = async () => {
    if (account === "") console.log("account can not be zero");
    if (faucetRequire === "" || faucetRequire === 0)
      console.log("Faucet requirement can not be zero");
    try {
      const faucet = await faucetClient.fundAccount(
        account.address(),
        faucetRequire
      );
      if (faucet.length > 0) {
				setHash("hash: " + faucet[0]);
        await refreshBalance();
        setFaucetRequire(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const privateKeyHexToAccount = (hexString) =>
    new AptosAccount(new HexString(hexString).toUint8Array());

	useEffect(() => {
		const getAccount = async (key) => {
			if (key === "") {
				setBalance(0);
				setAccount("");
			}
			try {
				const _account = privateKeyHexToAccount(key);
				setAccount(_account);
				setBalance(await accountBalance(client, _account.address()));
			} catch (e) {}
		};
		console.log("111", props.priKey);
		getAccount(props.priKey);
	}, [props])
  
  const refreshBalance = async () => {
    setBalance(await accountBalance(client, account.address()));
  }
  
  return (
    <div>
      <div>{`Account: ${account !== "" ? account.address() : ""}`}</div>
      <div>{`Balance: ${balance} APT`}</div>
      <div>
          <button onClick={() => refreshBalance()}>Refresh Balance</button>
      </div>
			<Divider/>
      <input
        value={faucetRequire}
        onChange={(e) => setFaucetRequire(e.target.value)}
        placeholder="How much faucet you want"
      />
      <div>
        <button onClick={() => getFaucet()}>Get faucet</button>
      </div>
			<div>{hash}</div>
    </div>
  );
};
