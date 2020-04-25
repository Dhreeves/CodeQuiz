
// Variables 
var quizHeading = document.getElementById("quizHeading");
var startMenu = document.getElementById("start-menu");
var theTimer = document.getElementById("theTimer");
var enterInitialsMenu = document.getElementById('enter-initials-menu');
var enterInitialsBtn = document.getElementById('submit-intials-btn');
var scoreCard = document.getElementById("scoreCard");
var viewHighScoresLink = document.getElementById('highscores-link');
var backToStartLink = document.getElementById("backToStart-link");
var choicesList = document.getElementById("quizChoices");
var quizQuestions = 0;
var i = 0;
var numberOfQuestions = questions.length;
var QChoices = questions[quizQuestions].choices;
var quizTimer = numberOfQuestions * 10;
var winningScore;
var highScores = [];


// set up high scores in localStorage
setHighScores()

function setHighScores() {

    var saveScores = localStorage.getItem("high scores");
    if (saveScores === null) {
        return;
    }
    var objectScores = JSON.parse(saveScores);
    highScores = objectScores;

}


// Click start button with clock, question and list choices
function startButton() {

    // Hide start menu
    startMenu.setAttribute("style", "display: none;");
    choicesList.setAttribute("style", "display: block");
    choicesList.innerHTML = " ";
    scoreCard.setAttribute("style", "display: none;");
    viewHighScoresLink.setAttribute("style", "display: none;");
    enterInitialsMenu.setAttribute("style", "display: none;");

    countdownClock();
    quizHeading.textContent = questions[quizQuestions].theQuestion;
    quizChoices();

}

// Loop through questions choices
function quizChoices() {

    for (var i = 0; i < QChoices.length; i++) {

        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "btn btn-dark btn-sm d-block my-2 choice-btn");
        choiceBtn.setAttribute("id", "choice-" + i);
        choiceBtn.textContent = questions[quizQuestions].choices[i];
        choicesList.appendChild(choiceBtn);

    }
}

// Notification of right answer
function rightAnswer() {
    var rightNotify = document.createElement("div");
    rightNotify.setAttribute("class", "border-top mt-3 pt-3");
    rightNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
    rightNotify.textContent = "Right answer!";
    choicesList.appendChild(rightNotify);
}

//  Notification of right wrong
function wrongAnswer() {
    var incorrectNotify = document.createElement("div");
    incorrectNotify.setAttribute("class", "border-top mt-3 pt-3");
    incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
    incorrectNotify.textContent = "Sorry wrong answer.";
    choicesList.appendChild(incorrectNotify);
}




// Add event when choice are picked
document.addEventListener("click", function (event) {
    if (event.target.matches('.choice-btn')) {
        event.stopPropagation();
        event.preventDefault();

        // Condition if user is correct
        if (event.target.textContent === questions[quizQuestions].answer) {
            //  next question
            quizQuestions = quizQuestions + 1;
            // right answer add time 
            quizTimer += 5;


            if (quizQuestions <= (numberOfQuestions - 1)) {
                quizHeading.textContent = questions[quizQuestions].theQuestion;
                choicesList.innerHTML = " ";
                quizChoices();
                rightAnswer();

            } else {
                // End of game, clear choices
                choicesList.innerHTML = " ";
                rightAnswer();
                // enter score
                enterInitialsMenu.setAttribute("style", "display: block;");
                viewHighScoresLink.setAttribute("style", "display: inline;");
                // Display the user's final score
                quizHeading.textContent = "Your score is: " + quizTimer;
                winningScore = quizTimer;
            }


        }
        // Condition if user selects wrong answer
        else if (event.target.textContent !== questions[quizQuestions].answer) {
            // next question
            quizQuestions = quizQuestions + 1;
            // wrong answer Remove time 
            quizTimer -= 10;

            if (quizQuestions <= (numberOfQuestions - 1)) {
                quizHeading.textContent = questions[quizQuestions].theQuestion;
                choicesList.innerHTML = " ";
                quizChoices();
                wrongAnswer();

            } else {
                // // End of game, clear choices
                choicesList.innerHTML = " ";
                wrongAnswer();
                // enter score
                enterInitialsMenu.setAttribute("style", "display: block;");
                viewHighScoresLink.setAttribute("style", "display: inline;");
                // Display the user's final score
                quizHeading.textContent = "Your score is: " + quizTimer;
                winningScore = quizTimer;
            }


        }
    }
});

// /countdown start
function countdownClock() {

    var timerInterval = setInterval(function () {
        theTimer.textContent = quizTimer;
        quizTimer--;

        // Once the timer hits zero, stop game
        if (quizTimer <= 0) {
            clearInterval(timerInterval);
            theTimer.textContent = "0";
            choicesList.innerHTML = " ";
            quizQuestions = 0;
            choicesList.setAttribute("display", "none");
            quizHeading.textContent = "Your score is: " + quizTimer;
            quizTimer = numberOfQuestions * 10;
        }
        // Answer last question stop game
        else if (quizQuestions === 7) {
            clearInterval(timerInterval);
            quizQuestions = 0;
            quizTimer = numberOfQuestions * 10;
        }

    }, 1000);
}

// Take the value the user enters after game ends
function enterInitials(event) {

    event.preventDefault();
    var yourInitials = document.getElementById('initials-input').value;

    // Object containing the user initials and final score
    var yourScore = {
        initials: yourInitials,
        score: winningScore
    };

    highScores.push(yourScore);

    var highScoresString = JSON.stringify(highScores);

    // Store string into local storage
    window.localStorage.setItem("high scores", highScoresString);
    quizHeading.textContent = "You have entered your score. Thanks for playing.";
    enterInitialsMenu.setAttribute("style", "display: none;");
}


// Sort function scores from high to low
function sortScores(a, b) {
    var scoreA = a.score;
    var scoreB = b.score;

    var highToLow = 0;
    if (scoreA > scoreB) {
        highToLow = 1;
    } else if (scoreA < scoreB) {
        highToLow = -1;
    }
    return highToLow * -1;
}


function goBackToStart() {

    backToStartLink.setAttribute("style", "display: none;");
    viewHighScoresLink.setAttribute("style", "display: inline;");
    scoreCard.setAttribute("style", "display: none;");
    choicesList.setAttribute("style", "display: none");
    enterInitialsMenu.setAttribute("style", "display: none;");
}

// Click submit, enter initials, score into local Storage
enterInitialsBtn.addEventListener("click", enterInitials);

// Show the scores
function viewScores() {

    scoreCard.innerHTML = " ";
    scoreCard.setAttribute("style", "display: block;");
    choicesList.setAttribute("style", "display: none");
    enterInitialsMenu.setAttribute("style", "display: none;");
    quizHeading.textContent = "View High Scores";
    backToStartLink.setAttribute("style", "display: inline;");
    viewHighScoresLink.setAttribute("style", "display: none;");

    // get highschores, change score strings to objects in local storage
    var highScoreDisplay = window.localStorage.getItem("high scores");
    var highScoreObject = JSON.parse(highScoreDisplay);
    highScoreObject.sort(sortScores);

    // list each initial with scores
    for (var i = 0; i <= highScores.length - 1; i++) {
        var scoreEntry = document.createElement("div");
        scoreEntry.setAttribute("class", "alert alert-warning");
        scoreEntry.innerHTML = "<span style='font-weight: bold;''>" + highScoreObject[i].initials + ":</span> " + highScoreObject[i].score;
        scoreCard.appendChild(scoreEntry);
    }

}
