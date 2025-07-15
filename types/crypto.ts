export type CryptoAsset ={
    id: string;
    name: string;
    symbol: string;
    metrics: {
        market_data: {
            price_usd: number;
            percent_change_usd_last_24_hours: number;
        };
        marketcap: {
        current_marketcap_usd: number;
    };
    }
    
    
}

export type CryptoResponse = {
  data: CryptoAsset[];
};
