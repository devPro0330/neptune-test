export const wrongNetwork = (notify: any, error: any) => {
  notify({
    type: "error",
    title: "Wrong network",
    message:"please check your wallet",
    error: error,
  });
};

export const providerError = (notify: any, error: any) => {
  notify({
    type: "error",
    title: "Provider Error",
    message: "Could not connect. No provider found",
    error: error,
  });
};

export const authError = (notify: any, error: any) => {
  notify({
    type: "error",
    title: "Authorization Error",
    message: "Please authorize to access your account",
    error: error,
  });
};

export const unidentifiedError = (notify: any, error: any) => {
  notify({
    type: "error",
    title: "Error",
    message: "Something went wrong",
    error: error,
  });
};
