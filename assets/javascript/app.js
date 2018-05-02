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

    $('body').on('click', '#start-button', function() {

        // Empty start button
        $('#start-button-div').empty();

        function loadFirstQuestion() {
            // Pick a random question
            var randomNumber = Math.floor(Math.random()*triviaQuestions.length);
            var randomQuestion = triviaQuestions[randomNumber];
            
            // Give that question and index of 0 then shift it from the array
            triviaQuestions[randomNumber] = triviaQuestions[0];
            triviaQuestions.shift();

            // Create a question div and append the question
            var questionDiv = $('<div>');
            questionDiv.addClass('questionDivClass');
            questionDiv.append(randomQuestion.question);
            $('#game-div').append(questionDiv);

            // Create an answer choice div
            var answerChoiceDiv = $('<div>');
            answerChoiceDiv.addClass('answerChoiceDivClass');
            $('#game-div').append(answerChoiceDiv);

            // Create a div for each answer choice
            for (var i = 0; i < randomQuestion.answerList.length; i++) {
            var eachAnswerDiv = $('<div>');
            eachAnswerDiv.addClass('eachAnswerDivClass');
            eachAnswerDiv.attr('answer', [i]);
            var theAnswerIs = randomQuestion.answer;
            eachAnswerDiv.append(randomQuestion.answerList[i]);
            $(answerChoiceDiv).append(eachAnswerDiv);
            };

            $('body').on('click', '.eachAnswerDivClass', function() {
                var youClicked = parseInt(($(this).attr('answer')));
                round++;
                console.log($(this).attr("answer"));
                console.log(this);
                console.log('Round: ' + round);
                console.log('You clicked: ' + youClicked);
                console.log('The answer is: ' + theAnswerIs)
                if (youClicked === theAnswerIs) {
                    console.log('Correct');
                    $('.questionDivClass').remove();
                    $('.answerChoiceDivClass').remove();
                    $('#game-div').append('<h2>You got it!</h2>');
                    $('#game-div').append('<img src=' + randomQuestion.answerImage + '>');
                    setTimeout(function() {            
                        $('#game-div').empty();
                        loadFirstQuestion();                  
                    }, 1000*3);
                } else {
                    console.log('Incorrect');
                    $('.questionDivClass').remove();
                    $('.answerChoiceDivClass').remove();
                    $('#game-div').append('<h2>Nope!</h2>');
                    $('#game-div').append('<img src=' + randomQuestion.answerImage + '>');
                    setTimeout(function() {
                        $('#game-div').empty();
                        loadFirstQuestion();           
                    }, 1000*3);
                }
            });
        };
        loadFirstQuestion()
    });

});