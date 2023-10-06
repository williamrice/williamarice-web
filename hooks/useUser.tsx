import { fetcher } from "@/app/lib/utils/fetcher";
import useSWR from "swr";

export function useUser() {
  const { data, error } = useSWR(`${""}/api/user`, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
