const ethers = require("ethers");
const contractJSON = require("./build/contracts/KeepSlip.json");

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

let privateKey =
  "b3caecd0278206321e03889f0c97db39b0806ff1425a0b0567c58cce5c0f3167";
let wallet = new ethers.Wallet(privateKey, provider);

// init contract
const contractAddress = "0xFb8eD82d21785727e1EC9F9dbb7652294E31e976";
const contractABI = contractJSON.abi;
let contract = new ethers.Contract(contractAddress, contractABI, provider);
// console.log(contract);

// init contract with sign wallet
let contractWithSigner = contract.connect(wallet);

// Calling a Non-Constant Method (contract with sign wallt variable)
addReceipt = (recId, items) => {
  contractWithSigner
    .add(recId, items)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  // contractWithSigner.add(["a123", "A021684", "asdqsd3"],[["a123", "Espresso", 4500, 1, false, 0 ],["a123", "IPhoneXI", 4500000, 1, true, 365 ]]).then(result => {console.log(result)}).catch(err =>{console.log(err);});
};
// test input
// ["a123", "A021684", "asdqsd3"],[["a123", "Espresso", 4500, 1, false, 0],["a123", "IPhoneXI", 4500000, 1, true, 365]]
// ["AP245", "A021684", "ad12345"],[["AP245", "MacBook Pro", 4599000, 1, true, 365],["AP245", "IPhoneXI", 4500000, 1, true, 365]]

let rec = ["a123", "A021684", "asdqsd3"];
let items = [
  ["a123", "Espresso", 4500, 1, false, 0],
  ["a123", "IPhoneXI", 4500000, 1, true, 365]
];
// addReceipt(rec, items);
// addReceipt()

// Calling a read-only Constant Method (Use contract variable)
getReciptInfomation = receiptId => {
  contract
    .getAllItemFromReceipt(receiptId)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};
// getReciptInfomation("a123");

getItem = (receiptId, itemNumber) => {
  contract
    .getItem(receiptId, itemNumber)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  //  หรือ
  // contract
  // .items(receiptId, itemNumber)
  // .then(result => {
  //   console.log(result);
  // })
  // .catch(err => {
  //   console.log(err);
  // });
};
// getItem("a123", 0);

getItem = async () => {
  try {
    let item = await contract.getItem("a129", 0);
    let item0 = {
      recId: item[0],
      productName: item[1],
      price: parseInt(item[2]),
      amount: parseInt(item[3]),
      warranty: item[4],
      warrantyTime: parseInt(item[5])
    };
    // console.log(item0);
    // console.log(item);
  } catch (err) {
    console.log(err.data.name);
  }
};
// getItem()

getReceiptList = async () => {
  try {
    let list = await contract.listReceipt();
    // let list = await contract.ReceiptIds(1);
    console.log(list);

    // for (let i = 0; i < list.length; i++) {
    //   let rec = await contract.ReceiptIds(i);
    //   console.log(rec);
    // }

    // เช็คว่าอยู่ใน array มั้ย
    // console.log(list.includes("a123a"));
  } catch (err) {
    console.log(err);
  }
};
getReceiptList();
