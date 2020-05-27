// フロントからデータベースに日時データを渡す時
export const dateToSql = (date) => {
    var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;   
    }  
    const dateObj = new Date(date)
    
     var yyyy = dateObj.getFullYear();
     var mm = toDoubleDigits(dateObj.getMonth() + 1);
     var dd = toDoubleDigits(dateObj.getDate());
     var hh = toDoubleDigits(dateObj.getHours());
     var mi = toDoubleDigits(dateObj.getMinutes());
     const sc = toDoubleDigits(dateObj.getSeconds());
     return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + sc;



}