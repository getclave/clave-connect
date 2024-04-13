import { useClaveWallet } from "../context";

const ConnectModal = () => {
  const claveConnector = useClaveWallet();
  return <div style={{ color: "black" }}>{claveConnector.accountInfo.address}</div>;
};

export { ConnectModal };
