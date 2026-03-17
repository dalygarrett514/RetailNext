import { SearchResultsExperience } from "@/components/search-results-experience";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

function parseQuery(query: string | string[] | undefined) {
  return Array.isArray(query) ? query[0] ?? "" : query ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};

  return <SearchResultsExperience initialQuery={parseQuery(params.q)} />;
}
