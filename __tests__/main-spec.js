const loadAllItem = require('../main').loadAllItem;
const doseBarcodesExist =  require('../main').doseBarcodesExist;
const calculateTotalPrice =  require('../main').calculateTotalPrice;
const getErrorInfo =  require('../main').getErrorInfo;
const getItemsByDecodeBarcodes =  require('../main').getItemsByDecodeBarcodes;
const printReceipt =  require('../main').printReceipt;
const generateReceipt =  require('../main').generateReceipt;
it ('should return all the Items', () => {
    expect(loadAllItem()).toStrictEqual([
        {"id": "0001", "name" : "Coca Cola", "price": 3},
        {"id": "0002", "name" : "Diet Coke", "price": 4},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
        {"id": "0004", "name" : "Mountain Dew", "price": 6},
        {"id": "0005", "name" : "Dr Pepper", "price": 7},
        {"id": "0006", "name" : "Sprite", "price": 8},
        {"id": "0007", "name" : "Diet Pepsi", "price": 9},
        {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
        {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
        {"id": "0010", "name" : "Fanta", "price": 12}
    ]);
});
it ('should get the Error info which is not null', () => {
     const barcodes=['0001', '0002', '0002', '0003'];
     const items=[
     {"id": "0001", "name" : "Coca Cola", "price": 3,"count":1},
     {"id": "0002", "name" : "Diet Coke", "price": 4,"count":2}
     ];
     const errorInfo = '[ERROR]: At least one of Barcodes dose not exist';
    expect(getErrorInfo(barcodes,items)).toStrictEqual(errorInfo);
});
it ('should get the Error info which is  null', () => {
     const barcodes=['0001', '0002', '0002'];
     const items=[
     {"id": "0001", "name" : "Coca Cola", "price": 3,"count":1},
     {"id": "0002", "name" : "Diet Coke", "price": 4,"count":2}
     ];
     const errorInfo = '';
    expect(getErrorInfo(barcodes,items)).toStrictEqual(errorInfo);
});
it ('should get the Error info which is  null', () => {
     const barcodes=['0001', '0002', '0002'];
     const expectedItems=[
             {"id": "0001", "name" : "Coca Cola", "price": 3,"count":1},
             {"id": "0002", "name" : "Diet Coke", "price": 4,"count":2},
             {"id": "0003", "name" : "Pepsi-Cola", "price": 5,"count":0},
             {"id": "0004", "name" : "Mountain Dew", "price": 6,"count":0},
             {"id": "0005", "name" : "Dr Pepper", "price": 7,"count":0},
             {"id": "0006", "name" : "Sprite", "price": 8,"count":0},
             {"id": "0007", "name" : "Diet Pepsi", "price": 9,"count":0},
             {"id": "0008", "name" : "Diet Mountain Dew", "price": 10,"count":0},
             {"id": "0009", "name" : "Diet Dr Pepper", "price": 11,"count":0},
             {"id": "0010", "name" : "Fanta", "price": 12,"count":0}
     ];
     const actualItms = getItemsByDecodeBarcodes(barcodes);
      expect(actualItms).toStrictEqual(expectedItems);
});
//it ('should get return receipt when given the ture barcodes', () => {
//      const barcodes=['0001', '0002', '0002','0003'];
//      expect(printReceipt(barcodes)).toStrictEqual(
//       `Receipts
//    ---
//    Coca Cola 3 1
//    Pepsi-Cola 5 2
//    Dr Pepper 7 1
//    ---
//    Price: 20`
//    );
//});
it ('should generate receipt when given the ture barcodes', () => {
      const barcodes=['0001', '0002', '0002','0003'];
      expect(generateReceipt(getItemsByDecodeBarcodes(barcodes))).toStrictEqual(
    "Receipts\n
    ---\n
    Coca Cola 3 1\n
    Diet Coke 4 2\n
    Pepsi-Cola 5 1\n
    ---\n
    Price:16\n
    "
    );
});