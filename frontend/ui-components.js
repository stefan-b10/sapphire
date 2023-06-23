import React from "react";
import logo from "./assets/logo.png";
import wallet from "./assets/wallet.png";
import checkbox from "./assets/checked-checkbox.png";
import notifications from "./assets/notifications.png"
import find from "./assets/find.png"

export function Header() {
	return (
		<header>
			<div className="logo">
				<img
					src={logo}
					alt="Logo"
					style={{ width: "150px", height: "100px" }}
				/>
			</div>
		</header>
	);
}

export function SignInPrompt({ onClick }) {
	return (
		<button style={{ float: "right" }} onClick={onClick}>
			Sign in with NEAR Wallet
		</button>
	);
}

export function SignOutButton({ accountId, onClick }) {
	return (
		<button style={{ float: "right" }} onClick={onClick}>
			Sign out {accountId}
		</button>
	);
}

export function MyWalletButton() {
	return (
		<button className="left buttons">
			<img src={wallet}></img>
			<span style={{ marginLeft: "25px" }}>My Wallet</span>
		</button>
	);
}

export function ReferencesButton() {
	return (
		<button className="left buttons">
			<img src={checkbox}></img>
			<span style={{ marginLeft: "25px" }}>References</span>
		</button>
	);
}

export function NotificationsButton() {
	return (
		<button className="left buttons">
			<img src={notifications}></img>
			<span style={{ marginLeft: "25px" }}>Notifications</span>
		</button>
	);
}

export function FindJobsButton() {
	return (
		<button className="left buttons">
			<img src={find}></img>
			<span style={{ marginLeft: "25px" }}>Find Jobs</span>
		</button>
	);
}

export function DeployContract({ onClick }) {
	return (
		<button type="submit" onClick={onClick}>
			Deploy Resume Contract
		</button>
	);
}
