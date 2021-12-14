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

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else {
    alert(`Unknown Game Type: ${gameType}`);
    throw `Unknown Game Type: ${gameType}. Aborting`;
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
  } else {
    alert(`That's incorrect, you entered ${calculatedAnswer[0]} but the correct answer is ${calculatedAnswer[0]}.`);
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
  }
}

function incrementScore() { }
function displayQuestion() { }

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() { }
function displayMultiplyQuestion() { }