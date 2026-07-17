import { Keypair } from "stellar-sdk";
import StellarHDWallet from "stellar-hd-wallet";

const { fromMnemonic } = StellarHDWallet;

const PI_DERIVATION_PATH_PREFIX = "m/44'/314159'";

export const getPiWallet = (mnemonicPhrase: string) =>
  fromMnemonic(mnemonicPhrase);

export const derivePiKeyPair = ({
  mnemonicPhrase,
  index = 0,
}: {
  mnemonicPhrase: string;
  index?: number;
}) => {
  const wallet = getPiWallet(mnemonicPhrase);
  const rawSeed = wallet.derive(`${PI_DERIVATION_PATH_PREFIX}/${index}'`);
  const keypair = Keypair.fromRawEd25519Seed(rawSeed);

  return {
    publicKey: keypair.publicKey(),
    privateKey: keypair.secret(),
  };
};
