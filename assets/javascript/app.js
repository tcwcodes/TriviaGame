$(document).ready(function() {

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

    var round = [];

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
        questionDiv.attr('answerImagePath', randomQuestion.answerImage)
        questionDiv.append(randomQuestion.question);
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
        eachAnswerDiv.append(randomQuestion.answerList[i]);
        $(answerChoiceDiv).append(eachAnswerDiv);
        };
    };

    $('body').on('click', '#start-button', function() {

        // Empty start button
        $('#start-button-div').hide();
        // Load first question
        loadFirstQuestion()
    });

    $('body').on('click', '.eachAnswerDivClass', function() {
        var youClicked = parseInt(($(this).attr('thisAnswer')));
        round++;
        var theAnswerIs = parseInt(($('.questionDivClass').attr('correctAnswer')));
        var questionImage = $('.questionDivClass').attr('answerImagePath');
        console.log('Round: ' + round);
        console.log('You clicked: ' + youClicked);
        console.log('The answer is: ' + theAnswerIs)
        if (youClicked === theAnswerIs) {
            console.log('Correct');
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#game-div').append('<h2>You got it!</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            // setTimeout(function() {            
            //     if (triviaQuestions.length === 0) {
            //         $('#game-div').empty();
            //         $('#game-div').append('<h2>Game over!</h2>');
            //     } else {
            //         $('#game-div').empty();
            //         loadFirstQuestion()
            //     }                  
            // }, 1000*3);
        } else {
            console.log('Incorrect');
            $('.questionDivClass').remove();
            $('.answerChoiceDivClass').remove();
            $('#game-div').append('<h2>Nope!</h2>');
            $('#game-div').append('<img src=' + questionImage + '>');
            // setTimeout(function() {
            //     if (triviaQuestions.length === 0) {
            //         $('#game-div').empty();
            //         $('#game-div').append('<h2>Game over!</h2>');
            //     } else {
            //         $('#game-div').empty();
            //         loadFirstQuestion()
            //     }      
            // }, 1000*3);
        }
    });
});