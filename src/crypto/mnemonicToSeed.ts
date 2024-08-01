import * as bip39 from "bip39";
import { Buffer } from "buffer";
import { Mnemonic } from "ethers";
global.Buffer = require("buffer").Buffer;

export const mnemonicToSeed = async (mnemonic: Mnemonic) => {
  const seed = await bip39.mnemonicToSeed(mnemonic.phrase);
  return Buffer.from(seed).toString("hex");
};
