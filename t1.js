let a = ("200+200");
//console.log(a);
let l = a.length;
//console.log(l);
let s1='';
let s2='';
for(let i =0 ;i<l;i++){
    
    if(a[i] == "+"){
      let num =  l- i-1;
      //console.log(num);
      for(let j=num;j<l;j++){
        
        s2+=a[j]
       // console.log(s2);
      }
      break;

    }else{
s1+= a[i];
//console.log(s1);
    }
}
let res = +s1 + +s2;
console.log(res);