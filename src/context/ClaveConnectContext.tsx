import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { ConnectModal } from "../components";

type ClaveConnectObjectType = {
  isConnected: boolean;
  _isConnecting: boolean;
  accountInfo: AccountInfoType;
};

type AccountInfoType = {
  address: string;
};

interface ClaveConnectInterface {
  connect: () => Promise<void>;
  isConnected: boolean;
  _isConnecting: boolean;
  accountInfo: AccountInfoType;
  prepareTxn: (transactions: Array<string>) => string;
  sendTxn: (txnHash: string) => Promise<boolean>;
  disconnect: () => boolean;
  sign: (message: string) => Promise<string>;
  verifySig: (signature: string) => Promise<boolean>;
}

const ClaveConnectObjectDefault: ClaveConnectObjectType = {
  isConnected: false,
  _isConnecting: false,
  accountInfo: { address: "0x" },
};

const ClaveConnectContext = createContext<ClaveConnectInterface | null>(null);

export const ClaveConnectProvider = ({ children }: { children: ReactNode }) => {
  const [claveConnectObject, setClaveConnectObject] = useState(ClaveConnectObjectDefault);

  /**
   * @function connect
   * @description Call this function to connect user's Clave wallet with dapp
   * @return {Promise<void>} Returns promise with no info
   */
  async function connect(): Promise<void> {
    setClaveConnectObject((prev) => ({ ...prev, _isConnecting: true }));
  }

  /**
   * @function prepareTxn
   * @description Function to prepare transaction, before sending it to the wallet. Supports batch txns
   * @param {Array<string>} transactions Give an array of transactions e.g [contract.approve(param), contract.transferFrom(param)
   * @returns {string} Returns the hash of the transaction
   */
  function prepareTxn(transactions: Array<string>) {
    return "hash";
  }

  /**
   * @function sendTxn
   * @description Function to send the transaction to the wallet.
   * @param {string} txnHash Pass the value returned from "prepareTxn"
   * @returns {boolean} Returns true or false depending on the success
   */
  async function sendTxn(txnHash: string) {
    return Promise.resolve(true);
  }

  /**
   * @function disconnect
   * @description Function to disconnect the user from the dapp.
   * @returns {boolean} Returns if the disconnect operation succeeds or not
   */
  function disconnect() {
    return true;
  }

  /**
   * @function sign
   * @description Function to ask for a signature from the user. This function supports latest standards
   * @param {string} message Pass the eip1271 supported message to be signed by smart contract wallet
   * @returns {Promise<string>} Returns the signature
   */
  async function sign(message: string) {
    return Promise.resolve("signature");
  }

  /**
   * @function verifySig
   * @description Function to verify signature
   * @param {string} signature Pass the signature received from wallet
   * @returns {Promise<boolean>} Returns true if signature is valid
   */
  async function verifySig(signature: string) {
    return Promise.resolve(true);
  }

  const ClaveConnector = useMemo(() => {
    return {
      ...claveConnectObject,
      connect,
      prepareTxn,
      sendTxn,
      disconnect,
      sign,
      verifySig,
    };
  }, [claveConnectObject]);

  return (
    <ClaveConnectContext.Provider value={ClaveConnector}>
      <ConnectModal />
      {children}
    </ClaveConnectContext.Provider>
  );
};

export const useClaveWallet = () => {
  const claveConnect = useContext(ClaveConnectContext);
  return claveConnect as ClaveConnectInterface;
};
