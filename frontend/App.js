import "regenerator-runtime/runtime";
import React from "react";

import "./assets/global.css";

import { Header, SignInPrompt, SignOutButton } from "./ui-components";

export default function App({ isSignedIn, contractId, wallet }) {
	const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

	const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

	// Get blockchian state once on component load
	React.useEffect(() => {
		// getGreeting()
		//   .then(setValueFromBlockchain)
		//   .catch(alert)
		//   .finally(() => {
		//     setUiPleaseWait(false);
		//   });
	}, []);

	/*
	/// If user not signed-in with wallet - show prompt
	if (!isSignedIn) {
		// Sign-in flow will reload the page later
		return (
			<SignInPrompt
				greeting={valueFromBlockchain}
				onClick={() => wallet.signIn()}
			/>
		);
	}
  */

	/*
  function changeGreeting(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { greetingInput } = e.target.elements;
    
    // use the wallet to send the greeting to the contract
    wallet.callMethod({ method: 'set_greeting', args: { message: greetingInput.value }, contractId })
      .then(async () => {return getGreeting();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function getGreeting(){
    // use the wallet to query the contract's greeting
    return wallet.viewMethod({ method: 'get_greeting', contractId })
  }
  */

	return (
		<>
			<header
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "10px",
				}}
			>
				<Header />
				<div>
					{isSignedIn ? (
						<SignOutButton
							accountId={wallet.accountId}
							onClick={() => wallet.signOut()}
						/>
					) : (
						<SignInPrompt onClick={() => wallet.signIn()} />
					)}
				</div>
			</header>
			<main>
				<h1>Sign out / Sign in</h1>
			</main>
		</>
	);
}
