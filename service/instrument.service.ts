export const fetchCompanyOverview = async (
  ticker: string
): Promise<CompanyOverviewResponse & { currentPrice: string }> => {
  const overview = fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  )
    .then((response) => handleResponse<CompanyOverviewResponse>(response))
    .then((response) => {
      if (!Object.keys(response).length) {
        throw new Error("Not found");
      }
      return response;
    });
  const quote = fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  ).then((response) => handleResponse<GlobalQuote>(response));
  return Promise.all([overview, quote]).then((values) => {
    return {
      ...values[0],
      currentPrice: values[1]?.["Global Quote"]?.["05. price"],
    };
  });
};

export const fetchTickersBySearchString = async (search: string) => {
  if (!search) {
    return [];
  }
  return fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  )
    .then((response) => handleResponse<TickerSearchResponse>(response))
    .then((response) => {
      if (response.bestMatches == null) {
        throw new Error("Not found");
      }
      return response.bestMatches.map((match) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
        country: match["4. region"],
      }));
    });
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const res = await response.json();
  replaceNoneWithNull(res);
  return res as T;
}

function replaceNoneWithNull(obj: Record<string, any>): void {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        replaceNoneWithNull(obj[key]); // Recursively call for nested objects
      } else if (typeof obj[key] === "string" && obj[key] === "None") {
        obj[key] = null; // Replace 'None' with null
      }
    }
  }
}

export interface TickerSearchResponse {
  bestMatches: {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
  }[];
}

interface GlobalQuote {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
}

export interface CompanyOverviewResponse {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  AnalystRatingStrongBuy: string;
  AnalystRatingBuy: string;
  AnalystRatingHold: string;
  AnalystRatingSell: string;
  AnalystRatingStrongSell: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
}
