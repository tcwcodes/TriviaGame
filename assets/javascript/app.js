$(document).ready(function() {

    // Declare variables
    var triviaQuestions = 
    [{
        question: 'Question 1?',
        answerList: ['one', 'two', 'three', 'four'],
        answer: 0,
        answerImage: 'assets/images/question1.gif'
    },
    {
        question: 'Question 2?',
        answerList: ['one', 'two', 'three', 'four'],
        answer: 1,
        answerImage: 'assets/images/question2.gif'
    },
    {
        question: 'Question 3?',
        answerList: ['one', 'two', 'three', 'four'],
        answer: 2,
        answerImage: 'assets/images/question3.gif'
    },
    {
        question: 'Question 4?',
        answerList: ['one', 'two', 'three', 'four'],
        answer: 3,
        answerImage: 'assets/images/question4.gif'
    }];

    var wins = 0;
    var losses = 0;
    var unanswered = 0;
    var answeredInTime = false;

    // Set up countdown timer
    var timer = {
        time: 5,

        start: function() {
            counter = setInterval(timer.count, 1000);
            setTimeout (function() {
                clearInterval(counter);
                }, 1000*5)
        },

        count: function() {
            timer.time--;
            $('#timer-div').html("<h2>Time remaining: " + timer.time + "</h2>");
        },

        reset: function() {
            timer.time = 5;
            $('#timer-div').html("<h2>Time remaining: " + timer.time + "</h2>");
        }

    }

    // Declare function that loads the first question
        function loadFirstQuestion() {
            // Pick a random question
            var randomNumber = Math.floor(Math.random()*triviaQuestions.length);
            var randomQuestion = triviaQuestions[randomNumber];
            
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
            eachAnswerDiv.addClass('eachAnswerDivClass');
            eachAnswerDiv.attr('thisAnswer', [i]);
            eachAnswerDiv.append('<h3>' + randomQuestion.answerList[i] + '</h3>');
            $(answerChoiceDiv).append(eachAnswerDiv);
            };

            // Set and display timer
            timer.reset();
            timer.start();

            // Reset "answered in time" attribute
            answeredInTime = false;
            console.log(answeredInTime)
        };

        // Declare function that displays message, correct answer and image if question not answered in time
        function waitedTooLong() {
            var theAnswerInWords = ($('.questionDivClass').attr('correctAnswerInWords'));
            var questionImage = $('.questionDivClass').attr('answerImagePath');
            setTimeout (function() {
                if (answeredInTime === false) {
                unanswered++;
                console.log('Unanswered');
                console.log('Wins: ' + wins)
                console.log('Losses: ' + losses);
                console.log('Unanswered: ' + unanswered);
                $('.questionDivClass').remove();
                $('.answerChoiceDivClass').remove();
                $('#timer-div').hide();
                $('#game-div').append('<h2>You waited too long! The correct answer is ' + theAnswerInWords + '.</h2>');
                $('#game-div').append('<img src=' + questionImage + '>');
                    setTimeout(function() {
                        if (triviaQuestions.length === 0) {
                            $('#game-div').empty();
                            $('#timer-div').hide();
                            $('#game-div').append('<h2>Game over!</h2>');
                            $('#game-div').append('<h3>Correct answers: ' + wins + '</h3>');
                            $('#game-div').append('<h3>Incorrect answers: ' + losses + '</h3>');
                            $('#game-div').append('<h3>Unanswered: ' + unanswered + '</h3>');
                        } else {
                            $('#game-div').empty();
                            loadFirstQuestion();
                            waitedTooLong();
                        }      
                    }, 1000*5);
                } else {}
            }, 1000*5);
        };

        // Declare function that moves on to next question after answer is displayed for three seconds
        function moveOn() {
            setTimeout (function() {
                $('.questionDivClass').remove();
                $('.answerChoiceDivClass').remove();
                loadFirstQuestion();
            }, 1000*5);
        }

    $('body').on('click', '#start-button', function() {

        // Hide start button
        $('#start-button-div').hide();
        // Load first question
        loadFirstQuestion()
        waitedTooLong();
    });

    $('body').on('click', '.eachAnswerDivClass', function() {
        var youClicked = parseInt(($(this).attr('thisAnswer')));
        var theAnswerIs = parseInt(($('.questionDivClass').attr('correctAnswer')));
        var theAnswerInWords = ($('.questionDivClass').attr('correctAnswerInWords'));
        var questionImage = $('.questionDivClass').attr('answerImagePath');
        answeredInTime = true;
        clearInterval(counter);
        console.log('You clicked: ' + youClicked);
        console.log('The answer is: ' + theAnswerIs);
        console.log('Did you answer in time? ' + answeredInTime);
        if (youClicked === theAnswerIs) {
            wins++;
            console.log('Correct');
            console.log('Wins: ' + wins);
            console.log('Losses: ' + losses);
            console.log('Unanswered: ' + unanswered);
            $('#timer-div').hide();
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#game-div').append('<h2>You got it! The correct answer is ' + theAnswerInWords + '.</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            setTimeout(function() {            
                if (triviaQuestions.length === 0) {
                    $('#game-div').empty();
                    $('#game-div').append('<h2>Game over!</h2>');
                    $('#game-div').append('<h3>Correct answers: ' + wins + '</h3>');
                    $('#game-div').append('<h3>Incorrect answers: ' + losses + '</h3>');
                    $('#game-div').append('<h3>Unanswered: ' + unanswered + '</h3>');
                } else {
                    $('#game-div').empty();
                    loadFirstQuestion()
                    waitedTooLong();
                }                  
            }, 1000*5);
        } else {
            losses++;
            console.log('Incorrect');
            console.log('Wins: ' + wins)
            console.log('Losses: ' + losses);
            console.log('Unanswered: ' + unanswered);
            $('#timer-div').hide();
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#game-div').append('<h2>So close! The correct answer is ' + theAnswerInWords + '.</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            setTimeout(function() {
                if (triviaQuestions.length === 0) {
                    $('#game-div').empty();
                    $('#game-div').append('<h2>Game over!</h2>');
                    $('#game-div').append('<h3>Correct answers: ' + wins + '</h3>');
                    $('#game-div').append('<h3>Incorrect answers: ' + losses + '</h3>');
                    $('#game-div').append('<h3>Unanswered: ' + unanswered + '</h3>');
                } else {
                    $('#game-div').empty();
                    loadFirstQuestion()
                    waitedTooLong();
                }      
            }, 1000*5);
        }
    });
});