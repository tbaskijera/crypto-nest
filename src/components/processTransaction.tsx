/* eslint-disable */
export function processTransaction(data: any, publicKey: any) {
  const blockTime = data.blockTime;
  const fee = data.meta?.fee || 0;
  const logMessages = data.meta?.logMessages || [];
  const preBalances = data.meta?.preBalances || [];
  const postBalances = data.meta?.postBalances || [];
  const feePayer = data.transaction?.feePayer;
  const recentBlockhash = data.transaction?.recentBlockhash;
  const err = data.meta?.err;

  // Convert Unix timestamp to human-readable format
  const transactionDate = new Date(blockTime * 1000).toISOString();

  // Calculate transaction amount based on the user's perspective
  let amount = 0;
  let transactionType = "Unknown";

  const accountKeys = data.transaction.message.accountKeys
    .slice(0, 2)
    .map((key: any) => key.toString());

  const publicKeyIndex = accountKeys.indexOf(publicKey);

  if (
    publicKeyIndex !== -1 &&
    preBalances.length > 0 &&
    postBalances.length > 0
  ) {
    const preBalance = preBalances[publicKeyIndex];
    const postBalance = postBalances[publicKeyIndex];
    amount = (postBalance - preBalance) / 1000000000;

    // Determine transaction type based on balance change
    if (amount < 0) {
      transactionType = "Sent";
      amount = Math.abs(amount); // Convert to positive for outgoing
    } else if (amount > 0) {
      transactionType = "Received";
    }
  }

  const status =
    err === null &&
    logMessages.some((msg: any) => msg.toLowerCase().includes("success"))
      ? "Confirmed"
      : "Failed";

  // Convert fee from lamports to SOL
  const feeSOL = fee / 1000000000;

  // Construct the result object
  const transactionDetails = {
    date_time: transactionDate,
    type: transactionType,
    amount: amount,
    fee: feeSOL,
    status: status,
    transaction_id: recentBlockhash,
    address: feePayer,
  };

  return transactionDetails;
}
