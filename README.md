<p style="padding-top: 30px;" align="center">
  <img src="https://assets.metaintro.com/images/logos/white-mark.png" alt="metaintro banner Logo" />
</p>

<br />
<div align="center"><strong>metaintro</strong></div>
<div align="center">The professional resume wallet</div>
<br />
<div align="center">
<a href="https://www.metaintro.com">Website</a> 
<span> · </span>
<a href="https://discord.gg/metaintro">Discord</a> 
<span> · </span>
<a href="https://twitter.com/metaintro">Twitter</a>
</div>

# The Professional Resume Wallet on Near Protocol

This is a POC app that can connect to a Near wallet and deploy a Resume smart contract on chain and modify it using NEAR SDK-JS.


## Installation
1. Clone this repository :

    ```bash
   git clone <repository>
    ```

2. Open a terminal in cloned folder and install dependecies :

    ```bash
   npm install
    ```

## Run the app
1. Deploy a Resume smart contract on Near Protocol using Near CLI

   Login to a Near wallet (you will be redirected to NEAR Wallet requesting full access to your account)

    ```bash
    near login
    ```

   Select which account you would like an access key to, you will be asked to confirm this authorization by entering the account name.

   After succesfully login, deploy and initialize your new Resume smart contract:
   ```bash
   near deploy --accountID <yourAccount.testnet> --wasmFile frontend/assets/resume.wasm --initFunctions init --initArgs '{"firstName":"<yourFirstName>", "lastName":"<yourLastName>"}'
   ```

2. Start the app

   ```bash
   npm run start
   ```

   Once the app started you can login with a Near wallet (the wallet that has deployed a Resume smart contract).
   
   ![2023-08-14_16-59](https://github.com/stefan-b10/sapphire/assets/72396423/1c60a30a-e5db-43be-919d-a403c43a513a)

Head over to ``Modify Resume`` to change/add informations on your Resume.

The available fields on the Resume to add/change at the moment are:

- First Name    
- Last Name
- Email
- Phone number
- Work experience
- Education
