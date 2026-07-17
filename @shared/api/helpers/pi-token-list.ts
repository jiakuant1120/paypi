import { AssetListResponse } from "@shared/constants/soroban/asset-list";
import { INDEXER_V2_URL } from "@shared/constants/mercury";
import { NetworkDetails } from "@shared/constants/stellar";
import { TrendingAsset } from "@shared/api/types";

export interface PiTokenRegistryItem {
  asset_code: string;
  asset_issuer: string;
  display_decimals?: number | null;
  icon_url?: string | null;
  name?: string | null;
  org_name?: string | null;
  org_url?: string | null;
  toml_url?: string | null;
  is_popular?: boolean;
  sort_rank?: number | null;
}

export interface PiTokenRegistryResponse {
  data?: PiTokenRegistryItem[] | { items?: PiTokenRegistryItem[] };
}

const getPiTokenItems = (
  response: PiTokenRegistryResponse,
): PiTokenRegistryItem[] => {
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (response.data?.items) {
    return response.data.items;
  }
  return [];
};

export const getPiTokenRegistryUrl = ({
  networkDetails,
  search,
  popular = false,
  limit = 200,
}: {
  networkDetails: NetworkDetails;
  search?: string;
  popular?: boolean;
  limit?: number;
}) => {
  if (!INDEXER_V2_URL) {
    return "";
  }

  const url = new URL(
    `${INDEXER_V2_URL}${popular ? "/pi-tokens/popular" : "/pi-tokens"}`,
  );
  url.searchParams.set("network", networkDetails.network);
  url.searchParams.set("limit", String(limit));
  if (search) {
    url.searchParams.set("search", search);
  }
  return url.toString();
};

export const isPiTokenRegistryUrl = (url: string) =>
  Boolean(INDEXER_V2_URL && url.startsWith(`${INDEXER_V2_URL}/pi-tokens`));

export const piTokenListToAssetList = ({
  response,
  network,
}: {
  response: PiTokenRegistryResponse;
  network: string;
}): AssetListResponse => ({
  name: "PayPi Tokens",
  description: "Approved Pi Network token registry",
  network,
  version: "1.0",
  provider: "PayPi",
  assets: getPiTokenItems(response).map((token) => ({
    code: token.asset_code,
    issuer: token.asset_issuer,
    domain: token.org_url || token.toml_url || "",
    icon: token.icon_url || "",
    org: token.org_name || "",
    decimals: token.display_decimals ?? 7,
    name: token.name || token.asset_code,
  })),
});

export const piTokenListToStellarExpertSearch = (
  response: PiTokenRegistryResponse,
) => ({
  _embedded: {
    records: getPiTokenItems(response).map((token) => ({
      asset: `${token.asset_code}-${token.asset_issuer}`,
      code: token.asset_code,
      domain: token.org_url || token.toml_url || null,
      token_name: token.name || token.asset_code,
      tomlInfo: {
        image: token.icon_url || undefined,
        code: token.asset_code,
        issuer: token.asset_issuer,
        name: token.name || token.asset_code,
      },
    })),
  },
});

export const piTokenListToTrendingAssets = (
  response: PiTokenRegistryResponse,
): TrendingAsset[] =>
  getPiTokenItems(response).map((token) => ({
    code: token.asset_code,
    issuer: token.asset_issuer,
    domain: token.org_url || token.toml_url || null,
    icon: token.icon_url || undefined,
    volume7d: token.sort_rank ? Number.MAX_SAFE_INTEGER - token.sort_rank : 0,
  }));
