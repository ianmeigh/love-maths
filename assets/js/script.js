// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByTagName('button');
  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded and after the
 * user's answer has been processed.
 */
function runGame(gameType) {
  // Clear answer-box
  document.getElementById('answer-box').value = "";

  function generateRandomNumber(min, max) {
    return (Math.floor(Math.random() * max) + min);
  }

  let num1 = generateRandomNumber(1, 25);
  let num2 = generateRandomNumber(1, 25);

  switch (gameType) {
    case 'addition':
      displayAdditionQuestion(num1, num2);
      break;
    case 'subtract':
      displaySubtractQuestion(num1, num2);
      break;
    case 'multiply':
      displayMultiplyQuestion(num1, num2);
      break;
    case 'division':
      displayDivisionQuestion(num1, num2);
      break;
  }
}

/**
 * Checks the answer against the first element in the returned
 * calculateCorrectAnswer array.
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('answer-box').value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Correct! You got it right! 😃");
    incrementScore();
  } else {
    alert(`That's incorrect, you entered ${userAnswer} but the correct answer is ${calculatedAnswer[0]}.`);
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc.) directly
 * from the DOM. Returns the correct answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById('operand1').innerText);
  let operand2 = parseInt(document.getElementById('operand2').innerText);
  let operator = document.getElementById('operator').innerText;

  switch (operator) {
    case '+':
      return [operand1 + operand2, "addition"];
    case '-':
      return [operand1 - operand2, "subtract"];
    case 'x':
      return [operand1 * operand2, "multiply"];
    case '/':
      return [operand1 / operand2, "division"];
  }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerHTML = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
  let oldIncorrectAnswers = parseInt(document.getElementById('incorrect').innerHTML);
  document.getElementById('incorrect').innerHTML = ++oldIncorrectAnswers;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  // Ensure we never have a negative answer
  document.getElementById('operand1').textContent = 
  operand1 >= operand2 ? operand1 : operand2;
  document.getElementById('operand2').textContent = 
  operand1 >= operand2 ? operand2 : operand1;
  document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = "/";
}