import { NETWORKS } from "@shared/constants/stellar";
import { INDEXER_V2_URL } from "@shared/constants/mercury";

export type AssetsListKey = NETWORKS.PUBLIC | NETWORKS.TESTNET;

export type AssetsLists = {
  [K in AssetsListKey]: AssetsListItem[];
};

export interface AssetsListItem {
  url: string;
  isEnabled: boolean;
}

const getPiTokenListUrl = (network: NETWORKS.PUBLIC | NETWORKS.TESTNET) => {
  if (!INDEXER_V2_URL) {
    return "";
  }

  const url = new URL(`${INDEXER_V2_URL}/pi-tokens`);
  url.searchParams.set("network", network);
  url.searchParams.set("limit", "200");
  return url.toString();
};

export const DEFAULT_ASSETS_LISTS: AssetsLists = {
  [NETWORKS.PUBLIC]: [
    {
      url: getPiTokenListUrl(NETWORKS.PUBLIC),
      isEnabled: Boolean(INDEXER_V2_URL),
    },
  ],
  [NETWORKS.TESTNET]: [
    {
      url: getPiTokenListUrl(NETWORKS.TESTNET),
      isEnabled: Boolean(INDEXER_V2_URL),
    },
  ],
};

export interface AssetListReponseItem {
  code: string;
  issuer: string;
  // contract, org and name are best-effort: schemaValidatedAssetList keeps an
  // asset even when these are absent or fail validation (the bad field is
  // stripped), so consumers must treat them as optional.
  contract?: string;
  org?: string;
  domain: string;
  icon: string;
  decimals: number;
  name?: string;
}

export interface AssetListResponse {
  name: string;
  description: string;
  network: string;
  version: string;
  provider: string;
  assets: AssetListReponseItem[];
}
