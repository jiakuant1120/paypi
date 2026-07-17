export enum NETWORK_NAMES {
  TESTNET = "Pi Testnet",
  PUBNET = "Pi Mainnet",
  FUTURENET = "Pi Testnet2",
}

export enum NETWORKS {
  PUBLIC = "PUBLIC",
  TESTNET = "TESTNET",
  FUTURENET = "FUTURENET",
}

export enum NETWORK_URLS {
  PUBLIC = "https://api.mainnet.minepi.com",
  TESTNET = "https://api.testnet.minepi.com",
  FUTURENET = "https://api.testnet2.minepi.com",
}

export enum FRIENDBOT_URLS {
  TESTNET = "",
  FUTURENET = "",
}

export const SOROBAN_RPC_URLS: { [key in NETWORKS]: string } = {
  [NETWORKS.PUBLIC]: "https://rpc.mainnet.minepi.com",
  [NETWORKS.TESTNET]: "https://rpc.testnet.minepi.com",
  [NETWORKS.FUTURENET]: "https://rpc.testnet.minepi.com",
};

export const NATIVE_TOKEN_CODE = "PI";

export const NETWORK_PASSPHRASES = {
  PUBLIC: "Pi Network",
  TESTNET: "Pi Testnet",
  FUTURENET: "Pi Testnet",
} as const;

export interface NetworkDetails {
  network: string;
  networkName: string;
  networkUrl: string;
  networkPassphrase: string;
  friendbotUrl?: string;
  sorobanRpcUrl?: string;
}

export const MAINNET_NETWORK_DETAILS: NetworkDetails = {
  network: NETWORKS.PUBLIC,
  networkName: NETWORK_NAMES.PUBNET,
  networkUrl: NETWORK_URLS.PUBLIC,
  networkPassphrase: NETWORK_PASSPHRASES.PUBLIC,
  sorobanRpcUrl: SOROBAN_RPC_URLS.PUBLIC,
};

export const TESTNET_NETWORK_DETAILS: NetworkDetails = {
  network: NETWORKS.TESTNET,
  networkName: NETWORK_NAMES.TESTNET,
  networkUrl: NETWORK_URLS.TESTNET,
  networkPassphrase: NETWORK_PASSPHRASES.TESTNET,
  sorobanRpcUrl: SOROBAN_RPC_URLS[NETWORKS.TESTNET],
  friendbotUrl: FRIENDBOT_URLS.TESTNET,
};

export const FUTURENET_NETWORK_DETAILS: NetworkDetails = {
  network: NETWORKS.FUTURENET,
  networkName: NETWORK_NAMES.FUTURENET,
  networkUrl: NETWORK_URLS.FUTURENET,
  networkPassphrase: NETWORK_PASSPHRASES.FUTURENET,
  sorobanRpcUrl: SOROBAN_RPC_URLS[NETWORKS.FUTURENET],
  friendbotUrl: FRIENDBOT_URLS.FUTURENET,
};

export const DEFAULT_NETWORKS: Array<NetworkDetails> = [
  MAINNET_NETWORK_DETAILS,
  TESTNET_NETWORK_DETAILS,
];

export const BASE_RESERVE = 0.49 as const;
export const BASE_RESERVE_MIN_COUNT = 2 as const;

export const PASSPHRASE_TO_NETWORK_NAME: Record<string, string> = {
  [NETWORK_PASSPHRASES.PUBLIC]: NETWORK_NAMES.PUBNET,
  [NETWORK_PASSPHRASES.TESTNET]: NETWORK_NAMES.TESTNET,
  [FUTURENET_NETWORK_DETAILS.networkPassphrase]: NETWORK_NAMES.FUTURENET,
};

// The token-prices endpoint only supports mainnet and testnet. This map is the
// single source of truth for which passphrases resolve to a price-supported
// network; anything not listed here is skipped by getTokenPrices.
export const PASSPHRASE_TO_PRICE_NETWORK: Record<string, NETWORKS> = {
  [NETWORK_PASSPHRASES.PUBLIC]: NETWORKS.PUBLIC,
  [NETWORK_PASSPHRASES.TESTNET]: NETWORKS.TESTNET,
};
