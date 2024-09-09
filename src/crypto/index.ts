import * as solanaWeb3 from "@solana/web3.js";
import * as bip39 from "bip39";
import { constants as C, constants } from "../constants";
import nacl from "tweetnacl";
import * as ed25519 from "ed25519-hd-key";
import { ethers } from "ethers";
import { getRandomBytesAsync } from "expo-random";
import { Buffer } from "buffer";
import { Mnemonic } from "ethers";
import AsyncStorage from "@react-native-async-storage/async-storage";
global.Buffer = require("buffer").Buffer;

export const accountFromSeed = (seed: string, walletIndex: number) => {
  const derivedSeed = deriveSeed(seed, walletIndex);
  let acc = null;
  if (derivedSeed) {
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
    acc = new solanaWeb3.Keypair(keyPair);
  }
  return acc;
};

export const createConnection = async () => {
  const cluster = (await AsyncStorage.getItem(
    constants.ASYNC_STORAGE_KEYS.CLUSTER,
  )) as solanaWeb3.Cluster;

  return new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl(cluster ?? "devnet"),
  );
};

export const deriveSeed = (
  seed: string,
  walletIndex: number,
): Buffer | undefined => {
  const path44Change = `m/44'/501'/${walletIndex}'/0'`;
  var Buffer = require("buffer").Buffer;
  return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
};

export const generateMnemonic = async () => {
  const randomBytes = await getRandomBytesAsync(16);
  const mnemonic = ethers.Mnemonic.fromEntropy(randomBytes);
  return mnemonic;
};

export const getBalance = async (publicKey: string) => {
  const connection = await createConnection();
  const _publicKey = publicKeyFromString(publicKey);

  const lamports = await connection.getBalance(_publicKey).catch((err) => {
    console.error(`Error: ${err}`);
  });

  const sol = (lamports ?? 0) / C.LAMPORTS_PER_SOL;
  return sol;
};

export const getHistory = async (
  publicKeyString: string,
  options = { limit: 20 },
) => {
  const connection = await createConnection();
  const history = await connection.getSignaturesForAddress(
    publicKeyFromString(publicKeyString),
    options,
  );
  return history;
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

export const getTransaction = async (signature: any) => {
  const connection = await createConnection();
  const transaction = await connection.getTransaction(signature, {
    maxSupportedTransactionVersion: 0,
  });

  return transaction;
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
  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: publicKeyFromString(from.publicKey.toString()),
      toPubkey: publicKeyFromString(to),
      lamports: amount * C.LAMPORTS_PER_SOL,
    }),
  );

  const connection = await createConnection();
  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );
  console.log("SIGNATURE", signature);
};

export const mnemonicToSeed = async (mnemonic: Mnemonic) => {
  const seed = await bip39.mnemonicToSeed(mnemonic.phrase);
  return Buffer.from(seed).toString("hex");
};

export const publicKeyFromString = (publicKeyString: string) => {
  return new solanaWeb3.PublicKey(publicKeyString);
};

export const requestAirDrop = async (publicKeyString: string) => {
  const connection = await createConnection();

  const airdropSignature = await connection.requestAirdrop(
    publicKeyFromString(publicKeyString),
    constants.LAMPORTS_PER_SOL,
  );

  const signature = await connection.confirmTransaction(airdropSignature);
  return signature;
};

export const validateMnemonic = (mnemonic: string) => {
  return bip39.validateMnemonic(mnemonic);
};
