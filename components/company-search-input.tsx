"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDebouncedInput } from "@/lib/client-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function CompanySearchInput({ value }: { value: string }) {
  const [filter, debouncedFilter, handleFilterChange] =
    useDebouncedInput(value);
  const initialRender = useRef(true);
  const router = useRouter();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!debouncedFilter) {
      router.push(`/`);
    } else {
      router.push(`/?search=${debouncedFilter}`);
    }
  }, [debouncedFilter, router]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={filter as any}
        onChange={handleFilterChange as any}
        className="w-full rounded-lg bg-background pl-8"
      />
    </div>
  );
}
