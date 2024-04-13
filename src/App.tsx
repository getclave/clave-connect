import "./App.css";
import { useClaveWallet } from "./context";

function App() {
  const claveConnector = useClaveWallet();

  return (
    <div>
      <button
        onClick={async () => {
          console.log(await claveConnector.connect());
          console.log(claveConnector._isConnecting);
        }}
      >
        build
      </button>
    </div>
  );
}

export default App;
