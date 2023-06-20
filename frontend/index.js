// React
import { createRoot } from "react-dom/client";
import App from "./App";

// NEAR
import { Wallet } from "./near-wallet";
import { Contract } from "near-api-js";
import { providers } from "near-api-js";

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// Setup on page load
window.onload = async () => {
	const isSignedIn = await wallet.startUp();

	console.log(wallet.accountId);
	console.log(CONTRACT_ADDRESS);

	const accountId = wallet.accountId;
	
	const firstName = await wallet.viewMethod(accountId, "get_first_name");
	console.log(firstName);
	
	root.render(
		<App
			isSignedIn={isSignedIn}
			contractId={CONTRACT_ADDRESS}
			wallet={wallet}
			firstName={firstName}
		/>
	);
};
