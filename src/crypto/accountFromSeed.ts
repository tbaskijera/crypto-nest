import nacl from "tweetnacl";
import { deriveSeed } from "./deriveSeed";
import * as solanaWeb3 from "@solana/web3.js";

export const accountFromSeed = (seed: string, walletIndex: number) => {
  const derivedSeed = deriveSeed(seed, walletIndex);
  let acc = null;
  if (derivedSeed) {
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
    acc = new solanaWeb3.Keypair(keyPair);
  }
  return acc;
};
