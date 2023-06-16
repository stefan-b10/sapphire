import React from "react";
import logo from "./assets/logo.png";

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
