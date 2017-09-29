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
Quiz.prototype.answerFieldHint = 'Enter Answer Here';

Quiz.prototype.init = function(){
  this.$question = this.$questionArea.find('.question');
  this.$questionNumber  = this.$questionArea.find('.question-number') ;
  this.$submitAndProceedButton = this.$questionArea.find('.submit-and-proceed-button');
  this.$answerStatus = this.$questionArea.find('.answer-status');
  this.$currentScore = this.$questionArea.find('.current-score');

  this.$finalScore = this.$finalView.find('.final-score');
  this.$incorrectQuestions = this.$finalView.find('.incorrect-questions');
  this.$finalViewHeadline = this.$finalView.find('.final-view-headline');

  this.question = new Question({'$questionNumber' : this.$questionNumber,
                                '$question' : this.$question
                               });
  
  this.getNewQuestion();
  
  this.displayQuiz();

  this.bindFocusAndBlurEventsToAnswerField();
  
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

///---///
Quiz.prototype.displayQuiz = function(){
  this.$quizParent.append(this.$quizContainer.removeClass('hide'));
};

////
Quiz.prototype.bindFocusAndBlurEventsToAnswerField = function(){
  this.$answerField = this.$questionArea.find('.answer-field');

  this.$answerField.on('focus', function(){
    $(this).removeClass('hint').val('');    
  });

  var _this = this;

  this.$answerField.on('blur', function(){
    var $answerField = $(this);

    if(!$answerField.val().trim().length)
      $answerField.val(_this.answerFieldHint).addClass('hint');
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

    else if(!_this.isAnswerValid(userAnswer))
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
      _this.changeFinalViewHeadline('All answers were correct.')
      _this.$incorrectQuestions.remove();
    }

    _this.$finalScore.text('Final Score: ' + finalScore);

    _this.$questionArea.addClass('hide');
    _this.$finalView.addClass('show');
  }
};

Quiz.prototype.changeFinalViewHeadline = function(newText){
  this.$finalViewHeadline.text(newText);
};

Quiz.prototype.saveIncorrectQuestions = function(){
  $('<p>' + this.$question.text() + '<br>' + 'Correct Answer: ' + this.$question.data('answer') + '</p>').appendTo(this.$incorrectQuestions);
};

//----functions to reset fields--//
Quiz.prototype.resetAllFields = function(){
  var _this = this;

  return function(){
    _this.clearAnswerStatus();
    _this.resetAnswerFieldToHint();
    _this.updateCurrentScore(_this.getScore());
    _this.getNewQuestion();
  };
};

Quiz.prototype.clearAnswerStatus = function(){
  this.$answerStatus.removeClass('correct incorrect show');
};

Quiz.prototype.resetAnswerFieldToHint = function(){
  this.$answerField.val(this.answerFieldHint).addClass('hint');
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

Quiz.prototype.isAnswerValid = function(userAnswer){
  return this.validAnsRegex.test(userAnswer);
};  