pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract KeepSlip {
    struct Receipt {
        string receiptId;
        string customerId;
        string storeId;
    }

    mapping(string => Receipt) public receipts;
    string[] public ReceiptIds;

    struct Item {
        string receiptId;
        string productName;
        uint256 price; // thb * 100
        uint256 amount;
        bool warranty;
        uint256 warrantyTime; // day
    }

    Item[] public ItemArray;
    mapping(string => Item[]) public items;

    function add(Receipt memory _receipt, Item[] memory _items) public {
        Receipt memory newReceipt = _receipt;
        receipts[newReceipt.receiptId] = newReceipt;

        for (uint256 i = 0; i < _items.length; i++) {
            Item memory newItem = _items[i];
            items[newReceipt.receiptId].push(newItem);
        }

        ReceiptIds.push(newReceipt.receiptId);
    }

    function getReceiptInformation(string memory _receiptId)
        public
        view
        returns (string memory, string memory, string memory)
    {
        Receipt memory currentReceipt = receipts[_receiptId];
        return (
            currentReceipt.receiptId,
            currentReceipt.customerId,
            currentReceipt.storeId
        );
    }

    function getItem(string memory _receiptId, uint256 _itemNumber)
        public
        view
        returns (string memory, string memory, uint256, uint256, bool, uint256)
    {
        return (
            items[_receiptId][_itemNumber].receiptId,
            items[_receiptId][_itemNumber].productName,
            items[_receiptId][_itemNumber].price,
            items[_receiptId][_itemNumber].amount,
            items[_receiptId][_itemNumber].warranty,
            items[_receiptId][_itemNumber].warrantyTime
        );
    }

    function getAllItemFromReceipt(string memory _receiptId)
        public
        view
        returns (Item[] memory)
    {
        return items[_receiptId];
    }

    function countItem(string memory _receiptId) public view returns (uint256) {
        return items[_receiptId].length;
    }

    function countReceipt() public view returns (uint256) {
        return ReceiptIds.length;
    }

    function listReceipt() public view returns (string[] memory) {
        return ReceiptIds;
    }
}
// test input
// ["a123", "A021684", "asdqsd3"],[["a123", "Espresso", 4500, 1, false, 0],["a123", "IPhoneXI", 4500000, 1, true, 365]]
// ["AP245", "A021684", "ad12345"],[["AP245", "MacBook Pro", 4599000, 1, true, 365],["AP245", "IPhoneXI", 4500000, 1, true, 365]]

// มันจะมีฟังก์ชันเรียกดูค่าที่ solidity มันทำให้เองเช่น items, resceipts ลองใช้ดู outpu มันจะต่างกัน เปรียบเทียบกับเมธอดที่เราสร้างแล้วเลือกใช้ให้เหมาะสม

// ไปปรับ
// Receipt ควรจะเก็บ ID ลูกค้า กับร้านค้ามั้ย
// มันบันหมาทึกหมายเลขใบเสร็จซ้ำได้ เพราะฉะนั้นต้องดึง listReceipt มาเช็คก่อนว่าหมายเลขที่จะบันทึกมันมีซ้ำมั้ย กันพลาด ดักเคสไว้
// หรือไม่ก็เช็คใน DB ก่อนว่าบันทึกได้มั้ย ถ้า id มันซ้ำมันบันทึกไม่ได้อยู๋แล้ว ก็ดักเคส ลำดับขั้นตอนเอาว่าควรจะดักเออเร่ออะไรยังไงก่อนหลัง
