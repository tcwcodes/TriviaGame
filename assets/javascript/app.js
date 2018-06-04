$(document).ready(function() {

    // Declare variables
    var triviaQuestions = 
    [{
        question: "What do the kids in 'Stranger Things' call the interdimensional monster?",
        answerList: ["The Upside Down", "The Facehugger", "The Demogorgon", "The Terminator"],
        answer: 2,
        answerImage: 'assets/images/strangerthings.gif'
    },
    {
        question: "In the 'Fifth Element,' what item does Leeloo present to multiple characters?",
        answerList: ["Lightsaber", "Multipass", "Raygun", "Chili's Gift Card"],
        answer: 1,
        answerImage: 'assets/images/fifthelement.gif'
    },
    {
        question: "What are the humanoid robots called in 'Blade Runner'?",
        answerList: ["Androids", "Cyborgs", "Robocops", "Replicants"],
        answer: 3,
        answerImage: 'assets/images/bladerunner.gif'
    },
    {
        question: "In 'They Live,' what message do characters see when they put on special sunglasses?",
        answerList: ["Prevail", "Don't Stop Believing", "Obey", "Who Let the Dogs Out?"],
        answer: 2,
        answerImage: 'assets/images/theylive.gif'
    },
    {
        question: "In the 'X-Files,' what character shows up when an alien conspiracy is afoot?",
        answerList: ["The Smoking Man", "Jose Chung", "Fox Mulder", "The Talking Dog"],
        answer: 0,
        answerImage: 'assets/images/xfiles.gif'
    }];

    var questionBank = [];

    var wins = 0;
    var losses = 0;
    var unanswered = 0;
    var answeredInTime = false;

    var myTimeout;
    var counter;

    // Set up countdown timer
    var timer = {
        time: 30,

        start: function() {
            counter = setInterval(timer.count, 1000);
        },

        count: function() {
            timer.time--;
            $('#timer-div').html("<h2>Time remaining: " + timer.time + "</h2>");
        },

        reset: function() {
            timer.time = 30;
            $('#timer-div').html("<h2>Time remaining: " + timer.time + "</h2>");
        }

    }

    // Declare function that loads the first question
        function loadFirstQuestion() {
            // Pick a random question
            var randomNumber = Math.floor(Math.random()*triviaQuestions.length);
            var randomQuestion = triviaQuestions[randomNumber];
            questionBank.push(randomQuestion);
            console.log(triviaQuestions);
            console.log(questionBank);

            
            // Give that question an index of 0 then shift it from the array
            triviaQuestions[randomNumber] = triviaQuestions[0];
            triviaQuestions.shift();

            // Create a question div, add answer and image attributes, append to game div
            var questionDiv = $('<div>');
            questionDiv.addClass('questionDivClass');
            questionDiv.attr('correctAnswer', randomQuestion.answer)
            questionDiv.attr('correctAnswerInWords', randomQuestion.answerList[randomQuestion.answer])
            questionDiv.attr('answerImagePath', randomQuestion.answerImage)
            questionDiv.append('<h2>' + randomQuestion.question + '</h2>');
            $('#game-div').append(questionDiv);

            // Create an answer choice div and append to game div
            var answerChoiceDiv = $('<div>');
            answerChoiceDiv.addClass('answerChoiceDivClass');
            $('#game-div').append(answerChoiceDiv);

            // Create a div for each answer choice, add respective answer attritbue and append to answer choice div
            for (var i = 0; i < randomQuestion.answerList.length; i++) {
            var eachAnswerDiv = $('<div>');
            eachAnswerDiv.attr('thisAnswer', [i]);
            eachAnswerDiv.append('<button type="button" class="btn btn-outline-primary button-text-color">' + randomQuestion.answerList[i] + '</button>');
            eachAnswerDiv.addClass('eachAnswerDivClass');
            $(answerChoiceDiv).append(eachAnswerDiv);
            };

            // Set and display timer
            clearTimeout(myTimeout);
            clearInterval(counter);
            timer.reset();
            timer.start();

            // Reset "answered in time" attribute
            answeredInTime = false;
            console.log(answeredInTime)
            
            myTimeout = setTimeout (function() {
                if (answeredInTime === false) { 
                    waitedTooLong();
                } else {
                    clearTimeout(myTimeout);
                }
            }, 1000*30)

        };

        // Declare function that displays message, correct answer and image if question not answered in time
        function waitedTooLong() {
            var theAnswerInWords = ($('.questionDivClass').attr('correctAnswerInWords'));
            var questionImage = $('.questionDivClass').attr('answerImagePath');
            console.log("You did not answer in time!");
            unanswered++;
            console.log('Unanswered');
            console.log('Wins: ' + wins)
            console.log('Losses: ' + losses);
            console.log('Unanswered: ' + unanswered);
            clearInterval(counter);
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#timer-div').empty();
            $('#game-div').append('<h2>You waited too long! The correct answer is ' + theAnswerInWords + '.</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            setTimeout(function() {
                if (triviaQuestions.length === 0) {
                    $('#game-div').empty();
                    $('#timer-div').empty();
                    $('#game-div').append('<h2>Game over! Hit the start button to play again!</h2>');
                    $('#game-div').append('<h3>Correct answers: ' + wins + '</h3>');
                    $('#game-div').append('<h3>Incorrect answers: ' + losses + '</h3>');
                    $('#game-div').append('<h3>Unanswered: ' + unanswered + '</h3>');
                    triviaQuestions = questionBank;
                    questionBank = [];
                    wins = 0;
                    losses = 0;
                    unanswered = 0;
                    answeredInTime = false;
                    console.log(answeredInTime)
                    $('#start-button-div').show();
                } else {
                    $('#game-div').empty();
                    loadFirstQuestion();
                }      
            }, 1000*5);
        };

    $('body').on('click', '#start-button', function() {

        // Hide start button
        $('#start-button-div').hide();
        $('#game-div').empty();
        // Load first question
        loadFirstQuestion()
    });

    $('body').on('click', '.eachAnswerDivClass', function() {
        var youClicked = parseInt(($(this).attr('thisAnswer')));
        var theAnswerIs = parseInt(($('.questionDivClass').attr('correctAnswer')));
        var theAnswerInWords = ($('.questionDivClass').attr('correctAnswerInWords'));
        var questionImage = $('.questionDivClass').attr('answerImagePath');
        answeredInTime = true;
        console.log(answeredInTime);
        clearInterval(counter);
        console.log("Timeout cleared");
        console.log('You clicked: ' + youClicked);
        console.log('The answer is: ' + theAnswerIs);
        console.log('Did you answer in time? ' + answeredInTime);
        if (youClicked === theAnswerIs) {
            wins++;
            console.log('Correct');
            console.log('Wins: ' + wins);
            console.log('Losses: ' + losses);
            console.log('Unanswered: ' + unanswered);
            $('#timer-div').empty();
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#game-div').append('<h2>You got it! The correct answer is ' + theAnswerInWords + '.</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            setTimeout(function() {            
                if (triviaQuestions.length === 0) {
                    $('#game-div').empty();
                    $('#game-div').append('<h2>Game over! Hit the start button to play again!</h2>');
                    $('#game-div').append('<h3>Correct answers: ' + wins + '</h3>');
                    $('#game-div').append('<h3>Incorrect answers: ' + losses + '</h3>');
                    $('#game-div').append('<h3>Unanswered: ' + unanswered + '</h3>');
                    clearTimeout(myTimeout);
                    triviaQuestions = questionBank;
                    questionBank = [];
                    wins = 0;
                    losses = 0;
                    unanswered = 0;
                    answeredInTime = false;
                    console.log(answeredInTime)
                    $('#start-button-div').show();
                } else {
                    console.log("Go again");
                    $('#game-div').empty();
                    loadFirstQuestion()
                }                  
            }, 1000*5);
        } else {
            losses++;
            console.log('Incorrect');
            console.log('Wins: ' + wins)
            console.log('Losses: ' + losses);
            console.log('Unanswered: ' + unanswered);
            $('#timer-div').empty();
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#game-div').append('<h2>So close! The correct answer is ' + theAnswerInWords + '.</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            setTimeout(function() {
                if (triviaQuestions.length === 0) {
                    $('#game-div').empty();
                    $('#game-div').append('<h2>Game over! Hit the start button to play again!</h2>');
                    $('#game-div').append('<h3>Correct answers: ' + wins + '</h3>');
                    $('#game-div').append('<h3>Incorrect answers: ' + losses + '</h3>');
                    $('#game-div').append('<h3>Unanswered: ' + unanswered + '</h3>');
                    clearTimeout(myTimeout);
                    triviaQuestions = questionBank;
                    questionBank = [];
                    wins = 0;
                    losses = 0;
                    unanswered = 0;
                    answeredInTime = false;
                    console.log(answeredInTime)
                    $('#start-button-div').show();
                } else {
                    $('#game-div').empty();
                    loadFirstQuestion()
                }      
            }, 1000*5);
        }
    });
});