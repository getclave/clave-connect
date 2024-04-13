import { useClaveWallet } from "../context";

const ConnectModal = () => {
  const claveConnector = useClaveWallet();
  return (
    <div className="modalBack">
      <div className="modalWrapper">
        <div className="modalHeader">
          <img className="partnerLogo" src={claveConnector.dappInfo?.image} alt="dappImage" />
          <p>{claveConnector.dappInfo?.name}</p>
          <p className="closeButton">x</p>
        </div>
        <div className="modalFooter">
          <button className="openAppButton">Open in Clave app</button>
          <p>Don't have Clave?</p>
        </div>
      </div>
    </div>
  );
};

export { ConnectModal };
