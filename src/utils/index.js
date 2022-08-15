import {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
  BCS,
  MaybeHexString,
  HexString,
  FaucetClient
} from "aptos";

export async function accountBalance(client, accountAddress) {
  try {
    const resource = await client.getAccountResource(
      accountAddress,
      "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
    );
    if (resource == null) return null;
    // resource.data.coin.value中获得余额
    return parseInt(resource.data["coin"]["value"]);
  } catch (_) {
    return 0;
  }
}

export async function transfer(client, accountFrom, recipient, amount) {
  const token = new TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString("0x1::aptos_coin::AptosCoin"));

  const scriptFunctionPayload = new TxnBuilderTypes.TransactionPayloadScriptFunction(
    TxnBuilderTypes.ScriptFunction.natural(
      "0x1::coin",
      "transfer",
      [token],
      [BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(recipient)), BCS.bcsSerializeUint64(amount)],
    ),
  );

  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    client.getAccount(accountFrom.address()),
    client.getChainId(),
  ]);

  const rawTxn = new TxnBuilderTypes.RawTransaction(
    TxnBuilderTypes.AccountAddress.fromHex(accountFrom.address()),
    BigInt(sequenceNumber),
    scriptFunctionPayload,
    1000n, // 1000个代币
    1n,
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new TxnBuilderTypes.ChainId(chainId),
  );

  const bcsTxn = AptosClient.generateBCSTransaction(accountFrom, rawTxn);
  const pendingTxn = await client.submitSignedBCSTransaction(bcsTxn);

  return pendingTxn.hash;
}