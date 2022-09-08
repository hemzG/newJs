
function stringToNumericCalc(str){
    let x = str;
    let r;
    if(x.includes('+')){
        let [firstNum, secondNum] = x.split("+", 2);
        r = Number(firstNum)  + Number(secondNum);
    }else if(x.includes('-')){
        let [firstNum, secondNum] = x.split("-", 2);
        r = Number(firstNum)  - Number(secondNum);

    }else if(x.includes('*')){
        let [firstNum, secondNum] = x.split("*", 2);
        r = Number(firstNum)  * Number(secondNum);
    }else if(x.includes('/')){
        let [firstNum, secondNum] = x.split("/", 2);
        r = Number(firstNum)  / Number(secondNum);
    }
    console.log(r);
    return r;
    };
    
    let str = "200/200";
    let result = stringToNumericCalc(str);
    console.log(result);
    
    