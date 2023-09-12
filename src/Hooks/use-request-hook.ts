import { useState } from "react";

export const useRequestHook = () => {
	const [loadingMessage, setLoadingMessage] = useState({
		loading: false,
		message: "",
	});

	const setLoading = (loading: boolean) => {
		setLoadingMessage((prevLoadingMessage) => ({
			loading,
			message: loading ? "Loading..." : prevLoadingMessage.message,
		}));
	};

	const setMessage = (message: string) => {
		setLoadingMessage((prevLoadingMessage) => ({
			loading: prevLoadingMessage.loading,
			message,
		}));
	};

	const execute = async <T>(request: Promise<T>): Promise<T | null> => {
		setLoading(true);
		let response: T | null = null;
		try {
			response = await request;
		} catch (error) {
			setMessage((error as Error).message);
		}
		setLoading(false);
		return response;
	};

	return {
		message: loadingMessage.message,
		loading: loadingMessage.loading,
		setMessage,
		execute
	};
};
