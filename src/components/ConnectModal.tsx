import { QRCode } from "react-qrcode-logo";
import { useClaveWallet } from "../context";

const ConnectModal = () => {
  const claveConnector = useClaveWallet();
  return (
    <div className="modalBack">
      <div className="modalWrapper">
        <div className="modalHeader">
          <img className="partnerLogo" src={claveConnector.dappInfo?.image} alt="dappImage" />
          <p>{claveConnector.dappInfo?.name}</p>
          <p className="closeButton">✖</p>
        </div>
        <div className="qrWrapper">
          <QRCode
            value={claveConnector.connectionId}
            size={280}
            bgColor="transparent"
            qrStyle="dots"
            eyeColor="#E5E7EB"
            fgColor="#E5E7EB"
            eyeRadius={8}
          />
        </div>
        <div className="modalFooter">
          <button className="openAppButton">Open in Clave app</button>
          <button className="dontHaveClaveButton">Don't have Clave?</button>
        </div>
      </div>
    </div>
  );
};

export { ConnectModal };
