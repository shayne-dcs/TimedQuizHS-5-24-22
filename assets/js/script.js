// Creating Questions Array for Functions
var questions = [
  {
    title: "Which class in World of Warcraft wears plate armor and knows the art of healing through the Light?",
    choices: ["Warrior", "Priest", "Rogue", "Paladin"],
    answer: "Paladin"
  },
  {
    title: "What is the role called in World of Warcraft for a player who takes the brunt of the damage for his group and protects them from harm?",
    choices: ["Tank", "Melee Damage Dealer", "Healer", "Ranged Damage Dealer"],
    answer: "Tank"
  },
  {
    title: "What famous anime and card game inspired World of Warcraft's Pet Battling System?",
    choices: ["Yu-Gi-Oh!", "Magic the Gathering", "Pokemon", "Vanguard!"],
    answer: "Pokemon"
  },
  {
    title: "What profession in World of Warcraft centers around using plants and vials to create a finished product?",
    choices: ["Blacksmith", "Skinning", "Fishing", "Alchemy"],
    answer: "Alchemy"
  },
  {
    title: "What does the acronym 'BG' stand for in World of Warcraft?",
    choices: ["Battleground", "Big Guy", "boring giant", "Berryguava"],
    answer: "Battleground"
  },

];

// Creating Declared Variables for Functions
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#timer");
var timer = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions");
var container = document.querySelector("#container");

// Creating Timer Parameters
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;

var ulCreate = document.createElement("ul");

// Starts timer on 'Click' and displays information
timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// Adds Questions and Answers to the page
function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {

    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
  })
}

// Checks Choice to Answers
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

    var create = document.createElement("div");
    create.setAttribute("id", "create");

    if (element.textContent == questions[questionIndex].answer) {
      score++;
      create.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

    } else {

      secondsLeft = secondsLeft - penalty;
      create.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }

  }

  questionIndex++;

  if (questionIndex >= questions.length) {

    allDone();
    create.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
    render(questionIndex);
  }
  questionsDiv.appendChild(create);

}

// When user completes, will display following styling and score
function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!"

  questionsDiv.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);


  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsDiv.appendChild(createP2);
  }


  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);


  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);


  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);


  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

      console.log("No value entered!");

    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining
      }
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);

      window.location.replace("./scores.html");
    }
  });

}