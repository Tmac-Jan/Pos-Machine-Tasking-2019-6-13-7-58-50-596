
const loadAllItem = ()=>{
    const database = [
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
      ];
     return database;
}
const doseBarcodesExist = (barcodes,items)=>{
     let existItemLengths = 0;
     barcodes.forEach(function(barcode){
          items.forEach(function(item){
              if(item.id===barcode){
                   existItemLengths++;
              }
          });
     });
     return existItemLengths==barcodes.length?true:false;
}
const calculateTotalPrice = (items)=>{
       let totalPrice = 0;
       items.forEach(function(element){
            totalPrice+=element.price*element.count;
   });
      return totalPrice;
}
const getErrorInfo = (barcodes,items)=>{
        const errorInfo = '[ERROR]: At least one of Barcodes dose not exist';
        return doseBarcodesExist(barcodes,items)?'':errorInfo;
}
const getItemsByDecodeBarcodes = (barcodes)=>{
        let items = loadAllItem();
        items.forEach(function(item){
          item.count=0;
        });
       barcodes.forEach(function(barcode){
            items.map(function(item){
                  if(barcode==item.id){
                   item.count=item.count==0?1:++item.count;
                  }
            });
      });
      return items;

}
const generateReceipt = (items)=>{
    let totalPrice = calculateTotalPrice(items);
    let templateString = `Receipts
    ---
    `;
        items.forEach(function(item){
        if(item.count>0){
//        resultStr+=item.name+' '+id.price+' '+id.count+'\n';
         templateString+=`${item.name} ${item.price} ${item.count}\n`;
        }
        });
        templateString+=`
    ---
    Price:${totalPrice}`;
        return templateString;
}
const printReceipt = (barcodes)=>{
    let items = getItemsByDecodeBarcodes(barcodes);
    let resultStr = getErrorInfo(barcodes,items);
    if(resultStr == null || "" ){
       let printString = generateReceipt(items);
       return printString;
    }
    return null;
}
module.exports = {
loadAllItem,doseBarcodesExist,
calculateTotalPrice,getErrorInfo,
getItemsByDecodeBarcodes,generateReceipt,printReceipt
};
