# EthersJS-App
Test to use ethers.js to work with Smart Contract

____
## Clone project and do something
when you have already cloned this project you have to do this before.
```
npm install
```
Dependencies are
- Ethers [Docs](https://docs.ethers.io/ethers.js/html/index.html)
- Truffle [Docs](https://www.trufflesuite.com/docs/truffle/overview)
- Ganache [Docs](https://www.trufflesuite.com/docs/ganache/overview)
- Nodemon [Docs](https://github.com/remy/nodemon#nodemon)
____

## If you want to create project from scratch
> **1st step:** create your application folder and init node package
``` 
npm init -y
```

> **2nd step:** install truffle and ganache
```
npm install -g truffle
```
Download and install ganache [here](https://www.trufflesuite.com/ganache)


> **3rd step:** install ethers JS
```
npm i --save ethers
```

> **4th Step:** Setting and deploy the contract
- create a workspace in ganache application
- truffle to connect with ganache in truffle-config.js > network > development
- create file and your Smart Contract code in folder contracts set filename as <ContractName>.sol
- create 2_deploy_<ContractName>.js, write same file 1_initial_migration.js but use ContractName instead Migrations
- CLI > truffle console development network 
- truffle migrate

then Contract has deployed and truffle will create folder build/contracts automatically, you will have JSON file from your contract.
In JSON files it has a contract ABI.

> **5th Step:** create app.js and run
- create app.js file
- load ethers
```
const ethers = require('ethers');
```
- load ContractABI from JSON file
- init Provider
- init wallet
- init contract
- init contract with sign wallet
- call method from Smart Contract (it have 2 types of method: Non-Constant Method and read-only Constant Method)
- run app.js by node app.js in CLI or use Nodemon
