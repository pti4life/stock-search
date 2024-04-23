import { CompanySearchInput } from "@/components/company-search-input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchTickersBySearchString } from "@/service/instrument.service";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home(params: {
  readonly searchParams: { search: string };
}) {
  const searchParam = params?.searchParams?.search ?? "";
  const tickers = await fetchTickersBySearchString(searchParam).catch(() => []);
  return (
    <div className="container">
      <Card className="h-[calc(80vh-1rem)] max-w-[640px] mx-auto flex flex-col">
        <CardHeader>
          <CompanySearchInput value={searchParam} />
        </CardHeader>
        <CardContent className="flex flex-col h-full overflow-y-auto">
          {tickers.length ? (
            tickers.map((item) => (
              <Link
                className="w-full text-left hover:bg-primary/10 rounded-md p-2 flex gap-1 justify-between items-center"
                key={item.symbol}
                href={item.symbol}
              >
                <div>
                  <span className="block text-sm font-semibold">
                    {item.name}
                  </span>
                  <span className="block text-xs overflow-visible">
                    {item.symbol} - {item.country}
                  </span>
                </div>
                <ArrowRight className="h-6 w-6 min-w-6" />
              </Link>
            ))
          ) : (
            <span className="block mx-auto text-xl">
              {searchParam
                ? "No results found"
                : "Start typing to see the results"}
            </span>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
