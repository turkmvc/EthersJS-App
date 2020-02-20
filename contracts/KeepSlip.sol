pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract KeepSlip{
    struct Receipt{
        string receiptId;
        string customerId;
    }

    mapping (string => Receipt) public receipts;
    string[] public ReceiptIds;
    
    struct Item{
        string receiptId;
        string productName;
        uint price; // thb * 100
        uint amount;
        bool warranty;
        uint warrantyTime; // day
    }
    
    Item[] public ItemArray;
    mapping (string => Item[]) public items;
    
    function add(Receipt memory _receipt, Item[] memory _items) public {
        Receipt memory newReceipt = _receipt;
        receipts[newReceipt.receiptId] = newReceipt; 
    
        for(uint i=0; i<_items.length; i++){
            Item memory newItem = _items[i];
            items[newReceipt.receiptId].push(newItem);
        } 
        
        ReceiptIds.push(newReceipt.receiptId);
    }
    
    function getReceiptInformation(string memory _receiptId) public view returns(string memory, string memory){
        Receipt memory currentReceipt = receipts[_receiptId];
        return (currentReceipt.receiptId, currentReceipt.customerId);
    }
    
    function getItem(string memory _receiptId, uint _itemNumber) public view returns(string memory, string memory, uint, uint, bool, uint){
        return (items[_receiptId][_itemNumber].receiptId, items[_receiptId][_itemNumber].productName, items[_receiptId][_itemNumber].price, items[_receiptId][_itemNumber].amount, items[_receiptId][_itemNumber].warranty, items[_receiptId][_itemNumber].warrantyTime);
    }
    
    function getAllItemFromReceipt(string memory _receiptId) public view returns(Item[] memory){
        return items[_receiptId];
    }
    
    function countItem(string memory _receiptId) public view returns(uint) {
      return items[_receiptId].length;
    }
    
    function countReceipt() public view returns(uint) {
      return ReceiptIds.length;
    }
}
// ["a123", "A021684"],[["a123", "Espresso", 4500, 1, false, 0 ],["a123", "IPhoneXI", 4500000, 1, true, 365 ]]