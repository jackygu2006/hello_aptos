import "./styles.css";
import { Faucet } from "./components/Faucet";
import { TransferAPT } from "./components/TransferAPT";
import { Divider } from "./components/Divider";
import { TransferToken } from "./components/TransferToken";
import { AcceptToken } from "./components/AcceptToken";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Aptos</h1>
      <h2>Example code of aptos and move</h2>
      <h3>(Only available for devnet)</h3>
      <Faucet />
      <Divider />
      <TransferAPT />
      <Divider />
      <TransferToken />
      <Divider />
      <AcceptToken />
    </div>
  );
}
