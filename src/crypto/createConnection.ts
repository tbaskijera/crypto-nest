import * as solanaWeb3 from "@solana/web3.js";
import * as bip39 from "bip39";
import { constants as C, constants } from "../constants";

export const createConnection = () => {
  return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
};

export const getBalance = async (publicKey: string) => {
  const connection = createConnection();
  const _publicKey = publicKeyFromString(publicKey);

  const lamports = await connection.getBalance(_publicKey).catch((err) => {
    console.error(`Error: ${err}`);
  });

  const sol = (lamports ?? 0) / C.LAMPORTS_PER_SOL;
  return sol;
};

export const validateMnemonic = (mnemonic: string) => {
  return bip39.validateMnemonic(mnemonic);
};

export const getHistory = async (
  publicKeyString: any,
  options = { limit: 20 },
) => {
  const connection = createConnection();
  const history = await connection.getSignaturesForAddress(
    publicKeyFromString(publicKeyString),
    options,
  );
  return history;
};

export const getTransaction = async (signature: any) => {
  const connection = createConnection();
  const transaction = await connection.getTransaction(signature);

  return transaction;
};

export const getSolanaPrice = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
    {
      method: "GET",
    },
  );

  const data = await response.json();
  return data.solana.usd;
};

export const publicKeyFromString = (publicKeyString: string) => {
  return new solanaWeb3.PublicKey(publicKeyString);
};

export const requestAirDrop = async (publicKeyString: string) => {
  console.warn("hey");
  const connection = createConnection();

  const airdropSignature = await connection.requestAirdrop(
    publicKeyFromString(publicKeyString),
    constants.LAMPORTS_PER_SOL,
  );

  const signature = await connection.confirmTransaction(airdropSignature);
  console.warn(signature);
  return signature;
};

export const makeTransaction = async ({
  from,
  to,
  amount,
}: {
  from: solanaWeb3.Keypair;
  to: string;
  amount: number;
}) => {
  console.log("Executing transaction...");
  console.log(amount);

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: publicKeyFromString(from.publicKey.toString()),
      toPubkey: publicKeyFromString(to),
      lamports: amount * C.LAMPORTS_PER_SOL,
    }),
  );

  // Sign transaction, broadcast, and confirm
  const connection = createConnection();
  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );
  console.log("SIGNATURE", signature);
};
