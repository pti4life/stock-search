import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="container text-center flex flex-col gap-4 justify-center">
      <h1 className="text-3xl ">404 - Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="max-w-fit mx-auto">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
