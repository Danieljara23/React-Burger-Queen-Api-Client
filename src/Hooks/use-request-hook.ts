import { useEffect, useState } from "react";

export const useRequestHook = () => {
	const [loadingError, setLoadingError] = useState<{ loading: boolean; error: Error | null; }>({
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

	const onError = (callback: (msg: string) => void) =>
		useEffect(() => {
			if (loadingError.error !== null)
				callback(loadingError.error.message);
		}, [loadingError.error]);

	const onLoading = (callback: (msg: string) => void) =>
		useEffect(() => {
			if (loadingError.loading)
				callback("Loading...");
		}, [loadingError.loading]);

	return {
		error: loadingError.error,
		loading: loadingError.loading,
		execute,
		onError,
		onLoading
	};
};
