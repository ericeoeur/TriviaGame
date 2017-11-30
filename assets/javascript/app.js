let quizlet = $("#pokemonQuiz");
let quizTime = 10;
let timer;// Variable to hold our setInterval, call setInterval in quiz


// Make your sets of questions here
let questions = [{

        question: "What Type of Pokemon is Pikachu?",
        answers: ["Grass", "Electric", "Psychic", "Cute"],
        correctAnswer: "Electric",

},
    {
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

//Begin Quiz Code here 
let quiz = {
    currentQuestion: 0,
    counter: quizTime,
    correct: 0,
    incorrect: 0,

    //Check if eventAnswer is correct; reset timer; add points; add timeout; go to next question
    start: function (eventAnswer) {
        clearInterval(timer);
        if ($(eventAnswer.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            clearInterval(timer);
            quiz.correct++;
            quizlet.html("<h2>Correct!</h2>");
            

            if (quiz.currentQuestion === questions.length - 1) {
                setTimeout(quiz.results, 2000);
            }
            else {
                setTimeout(quiz.nextQuestion, 2000);
            }
        }
        else {
            quiz.incorrect++;
            clearInterval(timer);
            quizlet.html("<h2>Nope!</h2>");
            quizlet.append("<h3>The Correct Answer was: " + questions[quiz.currentQuestion].correctAnswer + "</h3>");
            

            if (quiz.currentQuestion === questions.length - 1) {
                setTimeout(quiz.results, 2000);
            }
            else {
                setTimeout(quiz.nextQuestion, 2000);
            }
        }
    },

    //countdown clock 
    countdown: function () {
        quiz.counter--;
        $("#counter-number").html(quiz.counter);
        if (quiz.counter === 0) {
            console.log("Time's up!");
            quiz.timeUp();
        }
    },

    //adds/loads question for buttons for multiple choice answers 
    loadQuestion: function () {

        timer = setInterval(quiz.countdown, 1000);  // setInterval and timer, make sure this resets  

        //set divs for bootstrap
        quizlet.html("<h3>" + questions[this.currentQuestion].question + "</h3><br>");
        for (let i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            quizlet.append("<div class='row'><div class='center'><div class='col-md-12 center-block'><button class='answer-button btn-primary col-md-2 text-center' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'> <div class='divider'/>" + questions[this.currentQuestion].answers[i] + "</button></div></div></div>");
        }

    },

    //goes to the next question
    nextQuestion: function () {
        quiz.counter = quizTime;
        $("#counter-number").html(quiz.counter);
        quiz.currentQuestion++;
        quiz.loadQuestion();
    },

    //when the user runs out of time, as set by counter
    timeUp: function () {
        quiz.clearTimer(); 
        clearInterval(timer);
        $("#counter-number").html(quiz.counter);
        quizlet.html("<h2>Time's up!</h2>");
        quizlet.append("<h3>Correct Answer: " + questions[this.currentQuestion].correctAnswer);
        if (quiz.currentQuestion === questions.length - 1) {
            setTimeout(quiz.results, 3 * 1000);
        }
        else {
            setTimeout(quiz.nextQuestion, 3 * 1000);
        }
    },

    clearTimer: function () {
        $( ".timerShow" ).remove();
    },

    //end of quiz, show results
    results: function () {
        clearInterval(timer);
        quizlet.html("<h2>Your Results</h2>");
        $("#counter-number").html(quiz.counter);
        quizlet.append("<p>Correct: " + quiz.correct + "</p>");
        quizlet.append("<p>Incorrect: " + quiz.incorrect + "</p>");
        quizlet.append("<p>Unanswered: " + (questions.length - (quiz.incorrect + quiz.correct)) + "</p>");

        if (quiz.correct > 8) {
            quizlet.append("<h3> You are a Pokemon Master!</h3>");

        } else {
            quizlet.append("<h3> Better get to training!</h3>" + "<h4>Get more than eight correct be a Pokemon Master!</h4>");

        }

        quizlet.append("<br><button class='playAgain btn btn-danger'>Again?</button>");

    },

    //reset game to start again
    reset: function () {
        this.currentQuestion = 0;
        this.counter = quizTime;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

//set click events on the bottom

//start button click event
$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<div class='timerShow'><h2>Timer: <span id='counter-number'>" + quizTime + "</span> Seconds</h2></div>");
    quiz.loadQuestion();
});

//code for click event; with click of .answer-button class; place in eventAnswer
$(document).on("click", ".answer-button", function (eventAnswer) {
    quiz.start(eventAnswer);
});


//call reset
$(document).on("click", ".playAgain", function () {
    quiz.reset();
});

