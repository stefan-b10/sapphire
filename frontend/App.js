import "regenerator-runtime/runtime";
import React from "react";
import QRCode from "react-qr-code";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import badges from "./assets/nft.jpg";

import DatePicker from "react-datepicker";
import "./assets/react-datepicker.css";

import "./assets/global.css";

import { Header, SignInPrompt, SignOutButton, MyWalletButton, ReferencesButton, NotificationsButton, FindJobsButton, DeployContract, Badges } from "./ui-components";

export default function App({ isSignedIn, wallet, isDeployed }) {
  // const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [experience, setExperience] = React.useState({ position: "", company: "", location: "", description: "", startYear: "", endYear: "" });
  const [education, setEducation] = React.useState({ school: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" });

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    if (isDeployed) {
      getFirstName()
        .then(setFirstName)
        .catch(alert)
        .finally(() => {
          setUiPleaseWait(false);
        });
      getLastName().then(setLastName).catch(alert);
      getEmail().then(setEmail).catch(alert);
      getPhone().then(setPhone).catch(alert);
      getExperience().then(setExperience).catch(alert);
      getEducation().then(setEducation).catch(alert);
    }
  }, []);

  function getGreeting() {
    // use the wallet to query the contract's greeting
    return wallet.viewMethod({ method: "get_greeting", contractId });
  }

  // Utils

  function getMonthAndYearFromEpochTime(epochTimeInSeconds) {
    const date = new Date(epochTimeInSeconds * 1000);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return { month, year };
  }

  function updateStartDate(date) {
    setStartDate(date);
  }

  function updateEndDate(date) {
    setEndDate(date);
  }

  // State read functions
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

  function getExperience() {
    return wallet.viewMethod(wallet.accountId, "get_experience");
  }

  function getEducation() {
    return wallet.viewMethod(wallet.accountId, "get_education");
  }

  // State modify function
  function changeFirstName(e) {
    e.preventDefault();
    setUiPleaseWait(true);

    const newFirstName = e.target.elements.newfirstname.value;

    wallet
      .callMethod(wallet.accountId, "change_first_name", { firstName: newFirstName })
      .then(async () => {
        return getFirstName();
      })
      .then(setFirstName)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function changeLastName(e) {
    e.preventDefault();
    setUiPleaseWait(true);

    const newLastName = e.target.elements.newlastname.value;

    wallet
      .callMethod(wallet.accountId, "change_last_name", { lastName: newLastName })
      .then(async () => {
        return getLastName();
      })
      .then(setLastName)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function changeEmail(e) {
    e.preventDefault();
    setUiPleaseWait(true);

    const newEmail = e.target.elements.newemail.value;

    wallet
      .callMethod(wallet.accountId, "set_email", { email: newEmail })
      .then(async () => {
        return getEmail();
      })
      .then(setEmail)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function changePhone(e) {
    e.preventDefault();
    setUiPleaseWait(true);

    const newPhone = e.target.elements.newphone.value;

    wallet
      .callMethod(wallet.accountId, "set_phone_number", { phoneNumber: newPhone })
      .then(async () => {
        return getPhone();
      })
      .then(setPhone)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function addExperience(e) {
    e.preventDefault();
    setUiPleaseWait(true);

    const company = e.target.elements.company.value;
    const position = e.target.elements.position.value;
    const location = e.target.elements.location.value;
    const description = e.target.elements.description.value;
    const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
    const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

    wallet
      .callMethod(wallet.accountId, "add_experience", {
        experience: { position: position, company: company, location: location, description: description, startYear: startDateTimestamp, endYear: endDateTimestamp },
      })
      .then(async () => {
        return getExperience();
      })
      .then(setExperience)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function addEducation(e) {
    e.preventDefault();
    setUiPleaseWait(true);

    const school = e.target.elements.school.value;
    const degree = e.target.elements.degree.value;
    const fieldOfStudy = e.target.elements.fieldofstudy.value;
    const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
    const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

    wallet
      .callMethod(wallet.accountId, "add_education", {
        education: { school: school, degree: degree, fieldOfStudy: fieldOfStudy, startYear: startDateTimestamp, endYear: endDateTimestamp },
      })
      .then(async () => {
        return getEducation();
      })
      .then(setEducation)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  //TODO
  const deployContract = async (e) => {
    e.preventDefault();
    const firstName = e.target.elements.firstname.value;
    const lastName = e.target.elements.lastname.value;
    if (firstName != "" && lastName != "") {
      const wasm = await fetch("./assets/resume.wasm");

      const result = wallet.deploy(wasm);
      console.log(result);
    }
  };

  return (
    <div className={uiPleaseWait ? "please-wait" : ""}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Header />
        <div>{isSignedIn ? <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} /> : <SignInPrompt onClick={() => wallet.signIn()} />}</div>
      </header>

      <div className="mainbox">
        <div className="row">
          <div className="column side">
            <div className="name container">
              <QRCode className="qr" value={isDeployed ? wallet.accountId : "Contract not deployed"}></QRCode>
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
                      <div className="section_title">Experience</div>
                      <div className="section_list">
                        <div>
                          {experience.length > 0 ? (
                            experience.map((el) => (
                              <div className="section_list_item">
                                <div className="left">
                                  <div className="list_bold">{el.company}</div>
                                  <div className="list_text">{el.location}</div>
                                  <div className="list_text">
                                    {getMonthAndYearFromEpochTime(el.startYear).month} {getMonthAndYearFromEpochTime(el.startYear).year} - {getMonthAndYearFromEpochTime(el.endYear).month}{" "}
                                    {getMonthAndYearFromEpochTime(el.endYear).year}
                                  </div>
                                </div>
                                <div className="right">
                                  <div className="list_bold">{el.position}</div>
                                  <div className="list_text">{el.description}</div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="section">
                      <div className="section_title">Education</div>
                      <div className="section_list">
                        <div>
                          {education.length > 0 ? (
                            education.map((el) => (
                              <div className="section_list_item">
                                <div className="left">
                                  <div className="list_bold">{el.school}</div>
                                  <div className="list_text">
                                    {getMonthAndYearFromEpochTime(el.startYear).month} {getMonthAndYearFromEpochTime(el.startYear).year} - {getMonthAndYearFromEpochTime(el.endYear).month}{" "}
                                    {getMonthAndYearFromEpochTime(el.endYear).year}
                                  </div>
                                </div>
                                <div className="right">
                                  <div className="list_bold">{el.degree}</div>
                                  <div className="list_text">{el.fieldOfStudy}</div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Accordion>
                    <AccordionItem header="Modify Resume">
                      <Accordion>
                        <AccordionItem style={{ padding: "5px" }} header="Change First Name">
                          <form onSubmit={changeFirstName}>
                            <label className="modify_label" for="newfirstname">
                              First Name
                            </label>
                            <input className="modify_input" type="text" id="newfirstname" />
                            <div>
                              <button className="modify_button">
                                <span>Submit</span>
                                <div className="loader"></div>
                              </button>
                            </div>
                          </form>
                        </AccordionItem>
                        <AccordionItem style={{ padding: "5px" }} header="Change Last Name">
                          <form onSubmit={changeLastName}>
                            <label className="modify_label" for="newlastname">
                              Last Name
                            </label>
                            <input className="modify_input" type="text" id="newlastname" />
                            <div>
                              <button className="modify_button">
                                <span>Submit</span>
                                <div className="loader"></div>
                              </button>
                            </div>
                          </form>
                        </AccordionItem>
                        <AccordionItem style={{ padding: "5px" }} header="Change Email">
                          <form onSubmit={changeEmail}>
                            <label className="modify_label" for="newemail">
                              Email
                            </label>
                            <input className="modify_input" type="text" id="newemail" />
                            <div>
                              <button className="modify_button">
                                <span>Submit</span>
                                <div className="loader"></div>
                              </button>
                            </div>
                          </form>
                        </AccordionItem>
                        <AccordionItem style={{ padding: "5px" }} header="Change Phone number">
                          <form onSubmit={changePhone}>
                            <label className="modify_label" for="newphone">
                              Phone number
                            </label>
                            <input className="modify_input" type="text" id="newphone" />
                            <div>
                              <button className="modify_button">
                                <span>Submit</span>
                                <div className="loader"></div>
                              </button>
                            </div>
                          </form>
                        </AccordionItem>
                        <AccordionItem style={{ padding: "5px" }} header="Add Work experience">
                          <form onSubmit={addExperience}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="company">
                                  Company
                                </label>
                                <input className="modify_input_long" type="text" id="company" />
                              </div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="position">
                                  Position
                                </label>
                                <input className="modify_input_long" type="text" id="position" />
                              </div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="location">
                                  Location
                                </label>
                                <input className="modify_input_long" type="text" id="location" />
                              </div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="description">
                                  Description
                                </label>
                                <input className="modify_input_long" type="text" id="description" />
                              </div>
                            </div>
                            <div>
                              <label style={{ width: "50%", textAlign: "start" }} className="modify_label" for="startdate">
                                Start Date
                              </label>
                              <DatePicker selected={startDate} onChange={updateStartDate} />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                              <label style={{ width: "50%", textAlign: "start" }} className="modify_label" for="startdate">
                                End Date
                              </label>
                              <DatePicker selected={endDate} onChange={updateEndDate} />
                            </div>
                            <div>
                              <button className="modify_button">
                                <span>Submit</span>
                                <div className="loader"></div>
                              </button>
                            </div>
                          </form>
                        </AccordionItem>
                        <AccordionItem style={{ padding: "5px" }} header="Add Education">
                          <form onSubmit={addEducation}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="school">
                                  School
                                </label>
                                <input className="modify_input_long" type="text" id="school" />
                              </div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="degree">
                                  Degree
                                </label>
                                <input className="modify_input_long" type="text" id="degree" />
                              </div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{ width: "15%", textAlign: "start" }} className="modify_label" for="fieldofstudy">
                                  Field of study
                                </label>
                                <input className="modify_input_long" type="text" id="fieldofstudy" />
                              </div>
                            </div>
                            <div>
                              <label style={{ width: "50%", textAlign: "start" }} className="modify_label" for="startdate">
                                Start Date
                              </label>
                              <DatePicker selected={startDate} onChange={updateStartDate} />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                              <label style={{ width: "50%", textAlign: "start" }} className="modify_label" for="startdate">
                                End Date
                              </label>
                              <DatePicker selected={endDate} onChange={updateEndDate} />
                            </div>
                            <div>
                              <button className="modify_button">
                                <span>Submit</span>
                                <div className="loader"></div>
                              </button>
                            </div>
                          </form>
                        </AccordionItem>
                      </Accordion>
                    </AccordionItem>
                  </Accordion>
                </div>
              ) : (
                <>
                  <h1>Welcome to your Blockchain Resume</h1>
                  <p>You don`t have a Resume contract deployed on blockchain yet. Please enter your First name, Last name and deploy your resume contract.</p>

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
                    <input className="deploy input" type="text" id="firstname" />
                    <label className="deploy label" for="lasttname">
                      Last name:
                    </label>
                    <input className="deploy input" type="text" id="lastname"></input>

                    <div style={{ marginTop: "1rem" }}>
                      <DeployContract />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="column side">
            <h1 style={{ padding: "20px" }}>Your Badges</h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "25px" }}>
              <img src={badges} alt="Logo" style={{ width: "100%", height: "100%", borderRadius: "5%", border: "2px solid black" }} />;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
