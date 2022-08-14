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
