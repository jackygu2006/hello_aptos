import React, { useState } from "react";
import {
  AptosAccount,
  AptosClient,
  HexString,
  FaucetClient
} from "aptos";
import { accountBalance } from "../utils";
import { useAuth } from "../contexts/AuthContext";
import "../styles.css";

export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

export const Faucet = () => {
//   const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState(0);
  const [faucetRequire, setFaucetRequire] = useState("");
  
  const {
      currentAccount,
      currentPriKey,
      setCurrentAccount,
      setCurrentPriKey,
      setClient,
  } = useAuth();
  
  const client = new AptosClient(NODE_URL);
  setClient(client);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  const getFaucet = async () => {
    if (currentAccount === "") console.log("account can not be zero");
    if (faucetRequire === "" || faucetRequire === 0)
      console.log("Faucet requirement can not be zero");
    try {
      const faucet = await faucetClient.fundAccount(
        currentAccount.address(),
        faucetRequire
      );
      if (faucet.length > 0) {
        await refreshBalance();
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
    //   setAccount("");
      setCurrentAccount("");
    }
    try {
      setCurrentPriKey(key);
      setCurrentPriKey(key);
      const _account = privateKeyHexToAccount(key);
    //   setAccount(_account);
      setCurrentAccount(_account);
      setBalance(await accountBalance(client, _account.address()));
    } catch (e) {}
  };
  
  const refreshBalance = async () => {
    setBalance(await accountBalance(client, currentAccount.address()));
  }
  
  return (
    <div>
      <div>
        <input
          value={currentPriKey}
          onChange={(e) => getAccount(e.target.value)}
          placeholder="Private key"
        />
      </div>
      <div>{`Account: ${currentAccount !== "" ? currentAccount.address() : ""}`}</div>
      <div>{`Balance: ${balance} APT`}</div>
      <div>
          <button onClick={() => refreshBalance()}>Refresh Balance</button>
      </div>
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
