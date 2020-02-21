const ethers = require('ethers');
const contractJSON = require('./build/contracts/KeepSlip.json')

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

let privateKey = '1a1d3bd89ce1cb87951963cc310cbffdd939c00a13c29cd78e23e36f85d4fe04';
let wallet = new ethers.Wallet(privateKey, provider);

// init contract
const contractAddress ='0x1729571758B196F3b322328f0c04fB12bedb383D'
const contractABI = contractJSON.abi
let contract = new ethers.Contract(contractAddress, contractABI, provider);
// console.log(contract);

// init contract with sign wallet
let contractWithSigner = contract.connect(wallet);

// Calling a Non-Constant Method (contract with sign wallt variable)
addReceipt = (recId, items) =>{
    contractWithSigner.add(recId, items).then(result => {console.log(result)}).catch(err =>{console.log(err);});
    // contractWithSigner.add(["a123", "A021684"], [["a123", "Espresso", 4500, 1, false, 0 ],["a123", "IPhoneXI", 4500000, 1, true, 365 ]]).then(result => {console.log(result)}).catch(err =>{console.log(err);});
}
let rec = ["a129", "A021684"]
let items = [["a129", "Espresso", 4500, 1, false, 0 ],["a129", "IPhoneXI", 4500000, 1, true, 365 ]]
// addReceipt(rec, items)
// addReceipt()

// Calling a read-only Constant Method (Use contract variable)
getReciptInfomation =(receiptId)=>{
    contract.getAllItemFromReceipt(receiptId).then(result =>{console.log(result)}).catch(err =>{console.log(err)})
}
getReciptInfomation("a129")

getItem =(receiptId, itemNumber)=>{
    contract.getItem(receiptId, itemNumber).then(result =>{console.log(result)}).catch(err =>{console.log(err)})
}
// getItem("a129", 0)

getItem= async()=>{
    try{
        let item =  await contract.getItem("a129", 0)
        let item0 = {recId: item[0], productName:item[1],  price:parseInt(item[2]),amount:parseInt(item[3]), warranty:item[4], warrantyTime:parseInt(item[5])}
        // console.log(item0);
        // console.log(item);
    }catch(err){
        console.log(err.data.name);
    }
}
// getItem()

