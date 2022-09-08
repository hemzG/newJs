function stringToNumericCalc(str){
/*var x = "200+200";
//var y = x.split("+", 2) ;
//console.log(y);
//var r = Number(y[0])  + Number(y[1]);
console. log(r);*/
let x = str;
let [firstNum, secondNum] = x.split("+", 2);
console. log(firstNum);
console. log(secondNum);
let r = Number(firstNum)  + Number(secondNum);
console. log(r);
return r;
};

let str = "200+200";
let result = stringToNumericCalc(str);
console.log(result);

