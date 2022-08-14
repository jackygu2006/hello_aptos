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

export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

export const Faucet = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [faucetRequire, setFaucetRequire] = useState("");

  const client = new AptosClient(NODE_URL);
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
        setBalance(await accountBalance(client, account.address()));
        setFaucetRequire(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const privateKeyHexToAccount = (hexString) =>
    new AptosAccount(new HexString(hexString).toUint8Array());

  // 0x945cc283b8c6cfecf800ed53032a128dbeb45ddcb022d96bfa34dae5f956898d
  const getAccount = async (key) => {
    if (key === "") {
      setBalance(0);
      setAccount("");
    }
    try {
      setPrivateKey(key);
      const _account = privateKeyHexToAccount(key);
      setAccount(_account);
      setBalance(await accountBalance(client, _account.address()));
    } catch (e) {}
  };

  return (
    <div>
      <div>
        <input
          value={privateKey}
          onChange={(e) => getAccount(e.target.value)}
          placeholder="Private key"
        />
      </div>
      <div>{`Account: ${account !== "" ? account.address() : ""}`}</div>
      <div>{`Balance: ${balance} APT`}</div>
      <input
        value={faucetRequire}
        onChange={(e) => setFaucetRequire(e.target.value)}
        placeholder="How much faucet you want"
      />
      <div>
        <button onClick={() => getFaucet()}>Get faucet</button>
      </div>
    </div>
  );
};
