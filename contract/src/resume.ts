import { NearBindgen, near, call, view, initialize, Vector } from "near-sdk-js";

@NearBindgen({ requireInit: true })
class ResumeContract {
	firstName: string = "";
	lastName: string = "";
	email: string = "";
	phoneNumber: number = 0;
	education: Vector<string> = new Vector<string>("education");

	// constructor() {
	// 	this.firstName = "";
	// 	this.lastName = "";
	// 	this.email = "";
	// 	this.phoneNumber = 0;
	// 	this.education = new Vector<string>("education");
	// }

	// @initialize({ privateFunction: true })
	// init(
	// 	{ firstName }: { firstName: string },
	// 	{ lastName }: { lastName: string }
	// ) {
	// 	this.firstName = firstName;
	// 	this.lastName = lastName;
	// }

	// Name functions
	@view({})
	get_first_name(): string {
		return this.firstName;
	}

	@view({})
	get_last_name(): string {
		return this.lastName;
	}

	@call({ privateFunction: true })
	change_first_name({ firstName }: { firstName: string }): void {
		this.firstName = firstName;
	}

	@call({ privateFunction: true })
	change_last_name({ lastName }: { lastName: string }): void {
		this.lastName = lastName;
	}

	// Email functions
	@view({})
	get_email(): string {
		return this.email;
	}

	@call({ privateFunction: true })
	set_email({ email }: { email: string }): void {
		this.email = email;
	}

	// Phone number functions
	@view({})
	get_phone_number(): number {
		return this.phoneNumber;
	}

	@call({ privateFunction: true })
	set_phone_number({ phoneNumber }: { phoneNumber: number }) {
		this.phoneNumber = phoneNumber;
	}

	// Education functions

	@view({})
	get_education(): Vector<string> {
		return this.education;
	}

	@call({ privateFunction: true })
	add_education({ education }: { education: Vector<string> }) {
		for (let i = 0; i < education.length; i++) {
			this.education.push(education[i]);
		}
	}
}
