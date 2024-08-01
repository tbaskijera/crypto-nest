import { ethers } from "ethers";
import { getRandomBytesAsync } from "expo-random";

export const generateMnemonic = async () => {
  const randomBytes = await getRandomBytesAsync(16);
  const mnemonic = ethers.Mnemonic.fromEntropy(randomBytes);
  return mnemonic;
};
