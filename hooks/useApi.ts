import useSWR, { SWRConfiguration } from "swr";

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useApi = <T>(url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<T>(`/api/${url}`, fetcher, config);

  return {
    data,
    isLoading: !error && !data,
    error: error,
  };
};
