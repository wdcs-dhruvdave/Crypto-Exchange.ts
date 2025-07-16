import axios from "axios";

import type { CryptoResponse, CryptoAsset } from "@/types/crypto";


export async function fetchCryptoAssets(page = 1, limit = 20): Promise<CryptoAsset[]> {
  try {
    const res = await axios.get<CryptoResponse>(
      // https://data.messari.io/api/v2/assets?fields=id,symbol,name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_1_hour,metrics/marketcap/current_marketcap_usd&limit=${limit}&page=${page}
      `https://data.messari.io/api/v2/assets?limit=${limit}&page=${page}`
    );
    return res.data.data;
  } catch (error) {
    console.error("❌ Messari API error:", error);
    return []; 
  }
}
