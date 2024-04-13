import { ReactNode, createContext, useContext } from "react";
import { ConnectModal } from "../components";

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

type AccountInfoType = {
  address: string;
};

class ClaveConnect implements ClaveConnectInterface {
  /**
   * @description Property to view if user is connected or not
   * @returns {boolean} Returns true for connected, false for not-connected
   */
  isConnected = false;

  /**
   * @protected Do not use this property! This is only for sdk development
   * @returns {boolean} Returns true for connected, false for not-connected
   */
  _isConnecting = false;

  /**
   * @function connect
   * @description Call this function to connect user's Clave wallet with dapp
   * @return {Promise<void>} Returns promise with no info
   */
  async connect(): Promise<void> {
    this._isConnecting = true;
  }

  /**
   * @description Property to view accountInfo after connection provided
   * @returns {AccountInfoType} Returns account details
   */
  accountInfo = { address: "0x" };

  /**
   * @function prepareTxn
   * @description Function to prepare transaction, before sending it to the wallet. Supports batch txns
   * @param {Array<string>} transactions Give an array of transactions e.g [contract.approve(param), contract.transferFrom(param)
   * @returns {string} Returns the hash of the transaction
   */
  prepareTxn = (transactions: Array<string>) => "hash";

  /**
   * @function sendTxn
   * @description Function to send the transaction to the wallet.
   * @param {string} txnHash Pass the value returned from "prepareTxn"
   * @returns {boolean} Returns true or false depending on the success
   */
  sendTxn = async (txnHash: string) => Promise.resolve(true);

  /**
   * @function disconnect
   * @description Function to disconnect the user from the dapp.
   * @returns {boolean} Returns if the disconnect operation succeeds or not
   */
  disconnect = () => true;

  /**
   * @function sign
   * @description Function to ask for a signature from the user. This function supports latest standards
   * @param {string} message Pass the eip1271 supported message to be signed by smart contract wallet
   * @returns {Promise<string>} Returns the signature
   */
  sign = (message: string) => Promise.resolve("signature");

  /**
   * @function verifySig
   * @description Function to verify signature
   * @param {string} signature Pass the signature received from wallet
   * @returns {Promise<boolean>} Returns true if signature is valid
   */
  verifySig = (signature: string) => Promise.resolve(true);
}

const ClaveConnectContext = createContext<ClaveConnectInterface | null>(null);
const claveConnector = new ClaveConnect();

export const ClaveConnectProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClaveConnectContext.Provider value={claveConnector}>
      <ConnectModal />
      {children}
    </ClaveConnectContext.Provider>
  );
};

export const useClaveWallet = () => {
  const claveConnect = useContext(ClaveConnectContext);
  return claveConnect as ClaveConnectInterface;
};
