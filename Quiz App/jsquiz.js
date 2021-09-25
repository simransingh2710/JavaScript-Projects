var questions = [{
        question: "What is the fastest land animal?",
        choices: ["Wolf", "Tiger", "Cheetah", "Giraffe"],
        correctAnswer: 2
    }, {
        question: "Which of these is the fastest fish?",
        choices: ["Shark", "Sailfish", "Tuna", "Flying Fish"],
        correctAnswer: 1
    }, {
        question: "What is the fastest bird?",
        choices: ["Stork", "Eagle", "Peregrine Falcon", "Hawk"],
        correctAnswer: 2
    }, {
        question: "Which of these is the shortest time span?",
        choices: ["Decade", "Millennium", "Century", "A dozen years"],
        correctAnswer: 0
    }, {
        question: "Which of these is the shortest measurement of length?",
        choices: ["Centimetre", "Metre", "Inch", "Gramme"],
        correctAnswer: 0
    }, {
        question: "Which of these words best completes this sentence grammatically: He _______ dodged the speeding car.",
        choices: ["quickly", "either of these", "fastly", "neither of these"],
        correctAnswer: 0

    }, {
        question: "Which of these things most likely takes up the least time?",
        choices: ["Driving from Los Angeles to New York", "Taking a shower", "Reading a novel with at least 300 pages ", "Watching a movie "],
        correctAnswer: 1
    },
    {
        question: "What is the shortest sentence in the English language?",
        choices: ["I am.", "None of these", "A.", "Go!"],
        correctAnswer: 3
    },
    {
        question: "Of the following, who was the shortest U.S. president?",
        choices: ["William Henry Harrison", "George Washington", "Abraham Lincoln", "James Madison"],
        correctAnswer: 3

    },
    {
        question: "Which of the following US presidents served for the shortest amount of time?",
        choices: ["William Henry Harrison", "George Washington", "Abraham Lincoln", "James Madison"],
        correctAnswer: 0

    },
    {
        question: "What is a baby Monkey called?",
        choices: ["infant", "baby", "calf", "pup"],
        correctAnswer: 0

    },
    {
        question: "What is a baby Bear Called?",
        choices: ["cub", "baby balu", "young bear", "bearlet"],
        correctAnswer: 0
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}