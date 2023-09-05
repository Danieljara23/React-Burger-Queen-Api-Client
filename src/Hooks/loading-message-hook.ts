import { useState } from "react";

export const LoadingMessageHook = () => {
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

  const setLoadingAndMessage = (loading: boolean, message: string) => {
    setLoading(loading);
    setMessage(message);
  };

  return {
    message: loadingMessage.message,
    loading: loadingMessage.loading,
    setMessage,
    setLoading,
    setLoadingAndMessage,
  };
};
