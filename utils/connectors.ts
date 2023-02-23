import { ConnectorNames } from "../config/connectors";

export const getConnectorByName = async (name: string, chainId: number) => {
  switch (name) {
    case ConnectorNames.Injected: {
      const c = await import("../connectors/injected/connector");

      return c.getConnector(chainId);
    }
    default:
      return null;
  }
};
