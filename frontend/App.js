import "regenerator-runtime/runtime";
import React from "react";
import QRCode from "react-qr-code";

import "./assets/global.css";

import {
	Header,
	SignInPrompt,
	SignOutButton,
	MyWalletButton,
	ReferencesButton,
	NotificationsButton,
	FindJobsButton,
	DeployContract,
} from "./ui-components";

export default function App({ isSignedIn, wallet, isDeployed }) {
	// const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

	const [firstName, setFirstName] = React.useState();
	const [lastName, setLastName] = React.useState();
	const [email, setEmail] = React.useState();
	const [phone, setPhone] = React.useState();

	const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

	// Get blockchian state once on component load
	React.useEffect(() => {
		if (isDeployed) {
			getFirstName().then(setFirstName).catch(alert);
			getLastName().then(setLastName).catch(alert);
			getEmail().then(setEmail).catch(alert);
			getPhone().then(setPhone).catch(alert);
		}

		// .finally(() => setUiPleaseWait(false));
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

	// function deployContract(e) {
	// 	e.preventDefault();
	// 	console.log(e);
	// }

	const deployContract = async (e) => {
		e.preventDefault();
		const firstName = e.target.elements.firstname.value;
		const lastName = e.target.elements.lastname.value;
		if (firstName != "" && lastName != "") {
			// console.log(wallet.wallet);

			const wasm = await fetch("./assets/resume.wasm");

			const result = wallet.deploy(wasm);
			console.log(result);

			/*
			fetch("./assets/resume.wasm").then((res) => {
				console.log(res);
				console.log(res.body);
				res.arrayBuffer().then((r) => {
					console.log(r);
					WebAssembly.instantiate(r).then((e) => {
						console.log(e);
					});
				});
			});
			*/
		}
	};

	function getFirstName() {
		return wallet.viewMethod(wallet.accountId, "get_first_name");
	}

	function getLastName() {
		return wallet.viewMethod(wallet.accountId, "get_last_name");
	}

	function getEmail() {
		return wallet.viewMethod(wallet.accountId, "get_email");
	}

	function getPhone() {
		return wallet.viewMethod(wallet.accountId, "get_phone_number");
	}

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

			<div className="mainbox">
				<div className="row">
					<div className="column side">
						<div className="name container">
							<QRCode
								className="qr"
								value={isDeployed ? wallet.accountId : "Contract not deployed"}
							></QRCode>
							<h1 className="name full">
								{firstName} {lastName}
							</h1>
						</div>

						<MyWalletButton />
						<ReferencesButton />
						<NotificationsButton />
						<FindJobsButton />
					</div>

					<div className="column middle">
						<div className="middlebox">
							{isDeployed ? (
								<div>
									<h1>CV</h1>
									<div className="resume">
										<div className="fullname">
											<span className="first name">{firstName} </span>
											<span className="last name">{lastName}</span>
										</div>
										<div className="contact info">
											<span className="email">Email: </span>
											<span className="email val">{email}</span>
											<span className="separator"></span>
											<span className="email">Phone: </span>
											<span className="email val">{phone}</span>
										</div>
										<div className="section">
											<div className="section_title" >Experience</div>
										</div>
									</div>
								</div>
							) : (
								<>
									<h1>Welcome to your Blockchain Resume</h1>
									<p>
										You don`t have a Resume contract deployed on blockchain yet.
										Please enter your First name, Last name and deploy your
										resume contract.
									</p>

									<form
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											marginTop: "2rem",
										}}
										onSubmit={deployContract}
									>
										<label className="deploy label" for="firstname">
											First name:
										</label>
										<input
											className="deploy input"
											type="text"
											id="firstname"
										/>
										<label className="deploy label" for="lasttname">
											Last name:
										</label>
										<input
											className="deploy input"
											type="text"
											id="lastname"
										></input>

										<div style={{ marginTop: "1rem" }}>
											<DeployContract />
										</div>
									</form>
								</>
							)}
						</div>
					</div>

					<div className="column side">
						<h1>asdasdsad</h1>
						<h1>asdasdsad</h1>
						<h1>asdasdsad</h1>
						<h1>asdasdsad</h1>
						<h1>asdasdsad</h1>
					</div>
				</div>
			</div>
		</>
	);
}
