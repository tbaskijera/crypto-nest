import * as ed25519 from "ed25519-hd-key";

export const deriveSeed = (
  seed: string,
  walletIndex: number,
): Buffer | undefined => {
  const path44Change = `m/44'/501'/${walletIndex}'/0'`;
  var Buffer = require("buffer").Buffer;
  return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
};
