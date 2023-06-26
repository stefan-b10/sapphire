// React
import { createRoot } from "react-dom/client";
import App from "./App";

// NEAR
import { Wallet } from "./near-wallet";

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({});
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();
  let isDeployed = false;

  if (isSignedIn) {
    const accountId = wallet.accountId;
    console.log(accountId);
    try {
      const firstName = await wallet.viewMethod(accountId, "get_first_name");
      if (firstName) isDeployed = true;
      console.log(firstName);
    } catch (error) {
      console.log(error);
    }
  }

  root.render(<App isSignedIn={isSignedIn} wallet={wallet} isDeployed={isDeployed} />);
};
