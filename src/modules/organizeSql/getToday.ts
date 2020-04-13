export const getToday = () => {
    var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;   
    }  

     var date = new Date();
     var yyyy = date.getFullYear();
     var mm = toDoubleDigits(date.getMonth() + 1);
     var dd = toDoubleDigits(date.getDate());
     var hh = toDoubleDigits(date.getHours());
     var mi = toDoubleDigits(date.getMinutes());
     const sc = toDoubleDigits(date.getSeconds());
     return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + sc;



}