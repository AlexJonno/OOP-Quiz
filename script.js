function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
  }

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function() {
  return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}

function populate() {
  if(quiz.isEnded()) {
    showScores();
  }
  else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;
    var choices = quiz.getQuestionIndex().choices;
    for(var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  }
}

function showProgress () {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.questions.length;
}

function showScores() {
  var gameOverHtml = "<h1>Result</h1>";
  gameOverHtml += "<h2 id='score'>Your score: " + quiz.score + " out of 5</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
}

var questions = [
  new Question ("How have you discovered this test?", ["I was bored browsing online", "I want to see how edgy I am", "Im a friend doing it out of Sympathy", "Im looking at this weirdo's portfolio"], "Im looking at this weirdo's portfolio"),
  new Question ("How edgy do you think you are?", ["Extremely edgy", "Im very mainstream", "What does edgy even mean?", "I don't do labels"], "I don't do labels"),
  new Question ("Of these colors which is your favourite?", ["Blue", "Orange", "Majenta", "Black"], "Black"),
  new Question ("Could you bring yourself to hurt a living thing?", ["Only if it hurt me first", "I hurt stuff for fun", "No never how could you im a vegan", "I hurt myself all the time"], "I hurt myself all the time"),
  new Question ("If someone tickled you how would you respond?", ["Tickle fight", "Run away", "Punch them in the face", "Write a song"], "Write a song"),
];

var quiz = new Quiz(questions);

populate();
