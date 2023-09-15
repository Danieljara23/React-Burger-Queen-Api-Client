import { useEffect, useState } from "react";

type RequestState = {
  loading: boolean;
  error: Error | null;
};

export const useRequestHook = () => {
  const [loadingError, setLoadingError] = useState<RequestState>({
    loading: false,
    error: null,
  });

  const setLoading = (loading: boolean) => {
    setLoadingError((prevLoadingError) => ({
      loading,
      error: loading ? null : prevLoadingError.error,
    }));
  };

  const setError = (error: Error) => {
    setLoadingError((prevLoadingError) => ({
      loading: prevLoadingError.loading,
      error,
    }));
  };

  const execute = async <T>(request: Promise<T>): Promise<T | null> => {
    setLoading(true);
    let response: T | null = null;
    try {
      response = await request;
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
    return response;
  };

  const useOnError = (state: RequestState, callback: (msg: string) => void) =>
    useEffect(() => {
      if (state.error !== null) callback(state.error.message);
    }, [state, callback]);

  const useOnLoading = (state: RequestState, callback: (msg: string) => void) =>
    useEffect(() => {
      if (state.loading) callback("Loading...");
    }, [state, callback]);

  return {
    error: loadingError.error,
    loading: loadingError.loading,
    execute,
    useOnError: useOnError.bind(null, loadingError),
    useOnLoading: useOnLoading.bind(null, loadingError),
  };
};
