import { NearBindgen, near, call, view, Vector, initialize } from "near-sdk-js";

type Education = {
	school: string;
	degree: string;
	fieldOfStudy: string;
	startYear: number;
	endYear: number;
};

type WorkExperience = {
	position: string;
	company: string;
	location: string;
	description: string;
	startYear: number;
	endYear: number;
};

@NearBindgen({})
class Resume {
	firstName: string = "";
	lastName: string = "";
	email: string = "";
	phoneNumber: number = 0;
	education: Vector<Education> = new Vector<Education>("education");
	experience: Vector<WorkExperience> = new Vector<WorkExperience>("experience");

	// Init function
	@initialize({})
	init({ firstName, lastName }: { firstName: string; lastName: string }) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

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
	get_education({}): Array<Education> {
		return this.education.toArray();
	}

	@call({ privateFunction: true })
	add_education({ education }: { education: Education }) {
		this.education.push(education);
	}

	// Experience functions
	@view({})
	get_experience({}): Array<WorkExperience> {
		return this.experience.toArray();
	}

	@call({ privateFunction: true })
	add_experience({ experience }: { experience: WorkExperience }) {
		this.experience.push(experience);
	}
}
