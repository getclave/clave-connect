import "./App.css";
import { useClaveWallet } from "./context";

function App() {
  const claveConnector = useClaveWallet();

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={async () => {
          await claveConnector.connect({
            name: "Koi Finance",
            image:
              "https://raw.githubusercontent.com/getclave/clave-lists/master/dapp-list/logos/koi.png",
          });
        }}
      >
        connect
      </button>
    </div>
  );
}

export default App;
