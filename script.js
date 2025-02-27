// Creates the original array where user puts numbers into
const numbers = [];

// Dispays user input in the screen
function user() {
document.getElementById("input").innerHTML = numbers.join(' ');
};

// registers which button is clicked and puts it into array. Makes sure to exclude clear and backspace. 
const buttonId = (event) => {
  let buttonNumber = event.target.id;
  if (buttonNumber !== "backspace" && buttonNumber !== "clear" && buttonNumber !== "is") {
    numbers.push(buttonNumber);
  }
  user();
};

// button click event
const buttons = document.querySelectorAll(".numberButtons");
for (let button of buttons) {
  button.addEventListener("click", buttonId);
}

// takes the numbers array and joins the digits into 2 numbers divided by an operator
function calculation(arr) {
  const result = [];
  let currentNumber = "";

  for (let item of arr) {
    if (!isNaN(item) || (item === "." && !currentNumber.includes("."))) {
      currentNumber += item;
    } else {
      if (currentNumber) {
        result.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      result.push(item);
    }
  }
  if (currentNumber) {
    result.push(parseFloat(currentNumber));
  }
  return result;
}

// function to call the answer of the sum, round to 2 decimals and display
document.getElementById("is").onclick = function () {
  const result = calculateAnswer();
  if (typeof result === "string") { 
    document.getElementById("answers").innerHTML = result;
  } else {
  let answer = Math.round(result * 100) /100;
  document.getElementById("answers").textContent = `${answer}`;
}};

//   function that takes the array items, checks the operator and performs the calculation.
function calculateAnswer() {
  const calculations = calculation(numbers); 
  // checking if there is more than one operator used at the time;
  const operators = ['*','/','-','+'];
  const operatorCount = numbers.filter(item => operators.includes(item)).length;
  if (operatorCount >1) {
    return "Only one operator allowed.";
  }

  // does the actual calculations
  switch (calculations[1]) {
    case "+":
      return calculations[0] + calculations[2];
    case "-":
      return calculations[0] - calculations[2];
    case "*":
      return calculations[0] * calculations[2];
    case "/":
      if (calculations[2] === 0) {
        return "Time to Pay Numpty Tax"; 
      } else {
        return calculations[0] / calculations[2];
      }
    default:
      return "error";
}};

//  function for backspace
document.getElementById("backspace").onclick = () => numbers.pop();

// function to clear all user input
document.getElementById("clear").onclick = function () {
    numbers.length = 0;
    document.getElementById("answers").textContent = "";
    user();
};


// keyboard support
document.addEventListener('keyup', (e) => {
  const accepted = ['0','1','2','3','4','5','6','7','8','9','0','+','-','/','*','='];
  if (accepted.includes (e.key)) {
    numbers.push(e.key);
    user();
  }
});

// to do list: 
// keyboard support for =
// only allow one operator at the time (automatically calculates outcome when second operator is pressed?)
// clear screen and array on error
// move variables to the top of the screen
// create more functions for readability

