let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  looses: 0,
  ties: 0,
};
updateScore();

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    checkRPS("rock");
  } else if (event.key === "p") {
    checkRPS("paper");
  } else if (event.key === "s") {
    checkRPS("scissor");
  }
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  checkRPS("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  checkRPS("paper");
});
document.querySelector(".js-scissor-button").addEventListener("click", () => {
  checkRPS("scissor");
});

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = getRandomNumber();
      checkRPS(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

let result = "";
function checkRPS(userInput) {
  let randomPick = getRandomNumber();
  if (randomPick == userInput) {
    result = "It's draw";
    score.ties++;
  } else {
    if (
      (userInput === "rock" && randomPick === "scissor") ||
      (userInput === "paper" && randomPick === "rock") ||
      (userInput === "scissor" && randomPick === "paper")
    ) {
      result = "You won";
      score.wins++;
    } else {
      result = "You lost";
      score.looses++;
    }
  }

  localStorage.setItem("score", JSON.stringify(score));
  console.log(score);
  document.querySelector(".js-result").innerHTML = ` ${result}`;
  document.querySelector(".js-moves").innerHTML = `You 
<img src="Image/${userInput}-emoji.png" class="move-icon">
<img src="Image/${randomPick}-emoji.png" class="move-icon">
Computer`;

  updateScore();
}

function getRandomNumber() {
  const randomNumber = Math.random();
  let randomPick = "";
  if (randomNumber <= 1 / 3) {
    randomPick = "rock";
    return randomPick;
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    randomPick = "paper";
    return randomPick;
  } else {
    randomPick = "scissor";
    return randomPick;
  }
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins} Looses:${score.looses} Ties:${score.ties}`;
}
