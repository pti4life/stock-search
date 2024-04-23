import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchCompanyOverview } from "@/service/instrument.service";
import { notFound } from "next/navigation";
import { HTMLAttributes, forwardRef } from "react";

export default async function InstrumentDetailPage({
  params,
}: {
  readonly params: { instrument: string };
}) {
  const percentFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format;
  const ticker = await fetchCompanyOverview(params.instrument).catch(() =>
    notFound()
  );
  if (!ticker.Currency) {
    return;
  }
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: ticker.Currency,
  }).format;
  return (
    <div className="container">
      <div className="grid gap-8 grid-rows-2 md:grid-rows-[unset] md:grid-cols-[1fr,minmax(200px,_280px)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 h-max">
            <h1 className="text-3xl font-bold">{ticker.Name}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {ticker.Symbol}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                {ticker.Exchange}
              </span>
            </div>
          </div>
          <span className="text-3xl font-semibold block">
            {currencyFormatter(Number(ticker.currentPrice))}
          </span>
          <div>
            <h2 className="mb-2 text-xl font-bold">Financial Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <KeyValueCard
                title="Market Cap"
                value={
                  currencyFormatter(
                    Number(ticker.MarketCapitalization) / 1000000000
                  ) + "B"
                }
              ></KeyValueCard>
              <KeyValueCard
                title="Profit Margin"
                value={percentFormatter(Number(ticker.ProfitMargin))}
              ></KeyValueCard>
              {ticker.PERatio && (
                <KeyValueCard
                  title="P/E ratio"
                  value={ticker.PERatio}
                ></KeyValueCard>
              )}
              <KeyValueCard
                title="EPS"
                value={currencyFormatter(Number(ticker.EPS))}
              ></KeyValueCard>
              <KeyValueCard title="Beta" value={ticker.Beta}></KeyValueCard>
              <KeyValueCard
                title="Dividend rate"
                value={
                  ticker.DividendPerShare
                    ? currencyFormatter(Number(ticker.DividendPerShare))
                    : "-"
                }
              ></KeyValueCard>
              {ticker.DividendPerShare && (
                <KeyValueCard
                  title="Dividend yield"
                  value={percentFormatter(Number(ticker.DividendYield))}
                />
              )}
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold">About</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KeyValue title="Ticker" value={ticker.Symbol} />
              <KeyValue title="Sector" value={ticker.Sector} />
              <KeyValue title="Asset type" value={ticker.AssetType} />
              <KeyValue title="Trading on" value={ticker.Exchange} />
              <KeyValue title="Address" value={ticker.Address} />
              <KeyValue title="Industry" value={ticker.Industry} />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Company overview</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-500 dark:text-gray-400">
            {ticker.Description}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface KeyValueCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
}

const KeyValueCard = forwardRef<HTMLDivElement, KeyValueCardProps>(
  ({ title, className, value, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm p-4 max-w-[15rem] min-w-min",
          className
        )}
        ref={ref}
        {...rest}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-1 text-2xl font-bold overflow-auto">{value}</p>
      </div>
    );
  }
);

KeyValueCard.displayName = "KeyValueCard";

interface KeyValueProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
}

const KeyValue = forwardRef<HTMLDivElement, KeyValueProps>(
  ({ title, className, value, ...rest }, ref) => {
    return (
      <div
        className={cn("text-card-foreground", className)}
        ref={ref}
        {...rest}
      >
        <h3 className="text-sm dark:text-gray-400 text-gray-500">{title}</h3>
        <span className="text-base">{value}</span>
      </div>
    );
  }
);

KeyValue.displayName = "KeyValue";
