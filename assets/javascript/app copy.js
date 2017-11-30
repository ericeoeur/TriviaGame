let quizlet = $("#quiz-area");
let countStartNumber = 10;
let timer;// Variable to hold our setInterval


// Make your sets of questions here
let questions = [{
    question: "What Type of Pokemon is Pikachu?",
    answers: ["Grass", "Electric", "Psychic", "Cute"],
    correctAnswer: "Electric",

    }, {
        question: "What is the name of the Mountain where Clefairy was first found?",
        answers: ["Mt. Fairy", "Mt. Saffron", "Mt. Pewter", "Mt. Moon"],
        correctAnswer: "Mt. Moon",

    },
    {
        question: "What is the evolved form of Goldeen?",
        answers: ["Golduck", "Vaporeon", "Golbat", "Seaking"],
        correctAnswer: "Seaking",

    },

    {
        question: "What town in the Pokemon Red, Blue, and Yellow series is known as the last resting place for departed Pokémon?",
        answers: ["Pallet Town", "Lavender Town", "Ghastly Town", "Traverse Town"],
        correctAnswer: "Lavender Town",

    },

    {
        question: "Which of the following is NOT an evolved form of Eevee?",
        answers: ["Vaporeon", "Flareon", "Physeon", "Jolteon"],
        correctAnswer: "Physeon",

    },

    {
        question: "If a Pokemon faints in battle, what item can you use to bring them back to life?",
        answers: ["Phoenix Down", "Revive", "Ether", "Smelling Salts"],
        correctAnswer: "Revive",

    },

    {
        question: "If a fire-type Pokemon is weak against water-types, which type of Pokemon are weak against water-types?",
        answers: ["Flying", "Psychic", "Electric", "Rock"],
        correctAnswer: "Electric",

    },

    {
        question: "In Pokemon Red, Blue, and Yellow, what item do you use to wake up Snorlax when found asleep blocking Route 12?",
        answers: ["Esuna", "Antidote", "Poke Lute", "Poke Flute"],
        correctAnswer: "Poke Flute",

    },


    {
        question: "Which of the following Pokemon is known as a legendary Pokemon?",
        answers: ["Machamp", "Jynx", "Jigglypuff", "Articuno"],
        correctAnswer: "Articuno",

    },

    {
        question: "Which of the following is NOT a Pokemon?",
        answers: ["Dewgong", "Mr. Mime", "Moogle", "Pidgeot"],
        correctAnswer: "Moogle",

    },




    ];



var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    quizlet.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      quizlet.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    quizlet.html("<h2>Out of Time!</h2>");
    quizlet.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    quizlet.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    quizlet.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(game.counter);

    quizlet.append("<h3>Correct Answers: " + game.correct + "</h3>");
    quizlet.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    quizlet.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    quizlet.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    quizlet.html("<h2>Nope!</h2>");
    quizlet.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    quizlet.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    quizlet.html("<h2>Correct!</h2>");
    quizlet.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});