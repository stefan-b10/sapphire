// React
import { createRoot } from "react-dom/client";
import App from "./App";

// NEAR
import { Wallet } from "./near-wallet";

const WASM = process.env;

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

		try {
			const firstName = await wallet.viewMethod(accountId, "get_first_name");
			if (firstName) isDeployed = true;
			console.log(firstName);
		} catch (error) {
			console.log(error);
		}
	}

	root.render(
		<App
			isSignedIn={isSignedIn}
			// contractId={CONTRACT_ADDRESS}
			wallet={wallet}
			isDeployed={isDeployed}
			compiledContract={WASM}
		/>
	);
};
