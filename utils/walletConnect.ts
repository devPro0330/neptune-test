export const disconnect = async () => {
  if (!window.localStorage.getItem("walletconnect")) {
    return;
  }
};
