//require('question.js');
function Quiz(totalNumberOfQuestions){
  this.totalNumberOfQuestions = totalNumberOfQuestions;
  this.questionNumber = 0;
  this.numberOfCorrectAnswers = 0;

  this.$quizParent = $('.main-container');

  this.$quizContainer = $('div[data-hook="quiz-template"]').clone().removeAttr('data-hook');
  this.$questionArea = this.$quizContainer.find('.question-area');
  this.$finalView = this.$quizContainer.find('.final-view');
}

Quiz.prototype.validAnsRegex = /^(\-)?\d+(.\d+)?$/;
Quiz.prototype.timeoutDurationAfterAnswerSubmission = 2000;

var questionAreaElementsSelectors = { $question : '[data-hook="question"]',
                                      $questionNumber : '[data-hook="question-number"]',
                                      $submitAndProceedButton : '[data-hook="submit-and-proceed-button"]',
                                      $answerStatus : '[data-hook="answer-status"]',
                                      $currentScore : '[data-hook="current-score"]',
                                      $answerField : '[data-hook="answer-field"]'
                                    };

var finalViewElementsSelectors = { $finalScore : '[data-hook="final-score"]',
                                   $incorrectQuestions : '[data-hook="final-view-headline"]',
                                   $finalViewHeadline : '[data-hook="incorrect-questions"]'
                                  };

Quiz.prototype.init = function(){
  var _this = this;

  //defining class variables for quizArea's elements
  for(elementSelector in questionAreaElementsSelectors){
    _this[elementSelector] = _this.$questionArea.find(questionAreaElementsSelectors[elementSelector]);
  }

  //defining class variables for finalView's elements
  for(elementSelector in finalViewElementsSelectors){
    _this[elementSelector] = _this.$finalView.find(finalViewElementsSelectors[elementSelector]);
  }

  this.question = new Question({'$questionNumber' : this.$questionNumber,
                                '$question' : this.$question
                               });

  this.getNewQuestion();

  //disaply quiz
  this.$quizParent.append(this.$quizContainer.removeClass('hide'));

  this.bindBlurEventToAnswerField();

  this.$questionArea.find('.submit-and-proceed-button').on('click', this.checkAnswer());
};

Quiz.prototype.getNewQuestion = function(){
  this.question.init(++this.questionNumber);
  this.$submitAndProceedButton.prop('disabled', false);

  if(this.isLastQues())
    this.changeSubmitAndProceedButtonValue('Submit')
};

Quiz.prototype.changeSubmitAndProceedButtonValue = function(newValue){
  this.$submitAndProceedButton.val(newValue);
};

Quiz.prototype.bindBlurEventToAnswerField = function(){
  var _this = this;

  this.$answerField.on('blur', function(){
    var $answerField = $(this);

    if(!$answerField.val().trim().length)
      $answerField.val('');
  });
};

// functions to handle one answer submission
Quiz.prototype.checkAnswer = function(){
  var _this = this;

  return function(){
    var userAnswer = _this.$answerField.val().trim(),
        correctAnswer = _this.$question.data('answer');

    if(userAnswer === _this.answerFieldHint)
      alert('No answer entered. Please enter one.')

    else if(!_this.validAnsRegex.test(userAnswer))
      alert('Answer should be a number only.');

    else{
      _this.$submitAndProceedButton.prop('disabled', true);
      _this.onValidAnswer(userAnswer, correctAnswer);
    }
  };
};

Quiz.prototype.onValidAnswer = function(userAnswer, correctAnswer){
  if(userAnswer === correctAnswer){
    this.$answerStatus.text('Correct').addClass('correct show');
    this.numberOfCorrectAnswers++;
  }
  else{
    this.$answerStatus.text('Incorrect').addClass('incorrect show');
    this.saveIncorrectQuestions();
  }

  if(this.isLastQues())
    setTimeout(this.displayFinalView(), this.timeoutDurationAfterAnswerSubmission, this.getScore());
  else
    setTimeout(this.resetAllFields(), this.timeoutDurationAfterAnswerSubmission);
};

Quiz.prototype.displayFinalView = function(){
  var _this = this;

  return function(finalScore){
    //if all answers are correct
    if(_this.totalNumberOfQuestions === _this.numberOfCorrectAnswers){
      _this.$finalViewHeadline.text('All answers were correct.');
      _this.$incorrectQuestions.remove();
    }

    _this.$finalScore.text('Final Score: ' + finalScore);

    _this.$questionArea.addClass('hide');
    _this.$finalView.addClass('show');
  }
};

Quiz.prototype.saveIncorrectQuestions = function(){
  $('<p>' + this.$question.text() + '<br>' + 'Correct Answer: ' + this.$question.data('answer') + '</p>').appendTo(this.$incorrectQuestions);
};

//----functions to reset fields--//
Quiz.prototype.resetAllFields = function(){
  var _this = this;

  return function(){
    _this.resetAnswerField();
    _this.clearAnswerStatus();
    _this.updateCurrentScore(_this.getScore());
    _this.getNewQuestion();
  };
};

Quiz.prototype.clearAnswerStatus = function(){
  this.$answerStatus.removeClass('correct incorrect show');
};

Quiz.prototype.resetAnswerField = function(){
  this.$answerField.val('');
};

Quiz.prototype.updateCurrentScore = function(score){
  this.$currentScore.text('Score: ' + score);
};

//utility functions
Quiz.prototype.getScore = function(){
  return (this.numberOfCorrectAnswers + ' / ' + this.questionNumber);
};

Quiz.prototype.isLastQues = function(){
  return this.totalNumberOfQuestions === this.questionNumber;
};