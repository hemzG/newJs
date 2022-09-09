
const outputValue = document.getElementById("output");
const myform = document.getElementById("calc_form");
const operand_butns = document.querySelectorAll("button[data-type=operand]");
myform.addEventListener("submit", (e) => {
    e.preventDefault();
  });
let is_operator = false;
operand_butns.forEach((butn) => {
  butn.addEventListener("click", (e) => {
    if (outputValue.value == "0") {
        outputValue.value = e.target.value;
    } else if (outputValue.value.includes(".")) {
        outputValue.value = outputValue.value + "" + e.target.value.replace(".", "");
    } else if (is_operator) {
      is_operator = false;
      outputValue.value = e.target.value;
    } else {
        outputValue.value = outputValue.value + "" + e.target.value;
    }
  });
});

const operator_butns = document.querySelectorAll("button[data-type=operator]");
let calculation = [];

operator_butns.forEach((butn) => {
    butn.addEventListener("click", (e) => {
      e.currentTarget.classList.add("active");
  
      switch (e.target.value) {
        case "%":
          output.value = parseFloat(output.value) / 100;
          break;
        case "invert":
          output.value = parseFloat(output.value) * -1;
          break;
        case "=":
            calculation.push(output.value);
          output.value = eval(calculation.join(""));
          calculation = [];
          break;
        default:
          let last_item = calculation[calculation.length - 1];
          if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
           // outputValue.value = last_item;
            calculation.pop();
            calculation.push(e.target.value);
          } else {
            calculation.push(output.value);
            calculation.push(e.target.value);
          }
          is_operator = true;
          break;
      }
    });
  });