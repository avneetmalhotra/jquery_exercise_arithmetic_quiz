function QuizStructure(parentSelector){
  this.$quizParent = $(parentSelector);
}

QuizStructure.prototype.init = function(){
  this.createStructure();
  this.ansFieldHint = this.$ansField.val(); 
  this.inputHintObj = new InputHint(this.$ansField);
  this.inputHintObj.init();
};

QuizStructure.prototype.createStructure = function(){
  this.$quizContainer = $(document.createElement('div')).addClass('quiz-container');
 
  this.createQuesArea();
  this.createFinalDiv();

  this.$quizContainer.append(this.$quesArea);
};

QuizStructure.prototype.createQuesArea = function(){
  this.$quesArea = $('<div class="ques-area"></div>');

  this.$quesNo = $('<h2 class="question-no">question-no</h2>');
  this.$ques = $('<p class="question">question</p>');
  this.$ansField = $('<input type="text" name="ans" class="user-answer hint" value="Enter Answer Here">');
  this.$proceedBtn = $('<input class="proceed-btn" type="button" name="next-btn" value="Next >>">');
  this.$currScore = $('<p class="curr-score">curr-score</p>');
  this.$ansStatus = $('<p class="ans-status"></p>');

  this.$quesArea.append(this.$quesNo, this.$ques, this.$ansField, 
                        this.$proceedBtn, this.$currScore, this.$ansStatus);
  };

QuizStructure.prototype.createFinalDiv = function(){
  this.$finalDiv = $('<div class="final-div"></div>');
  
  this.$finalScore = $('<h3 class="final-score">final-score</h3>');
  
  this.$incorrectQuestions = $('<div class="incorrect-ques"></div>').data('incorrectQuestions', new Array());
  this.$incorrectQuestionsHeadline = $('<h4>Incorrectly Answered Questions are: </h4>');

  this.$incorrectQuestions.append(this.$incorrectQuestionsHeadline);

  this.$finalDiv.append(this.$finalScore, this.$incorrectQuestionsHeadline, this.$incorrectQuestions);
};

QuizStructure.prototype.displayQuiz = function(){
  this.$quizParent.append(this.$quizContainer);
};

QuizStructure.prototype.clearAnsStatus = function(){
  // this.$ansStatus = $('<p class="ans-status"></p>');
  this.$ansStatus.removeClass('correct incorrect show');
};

QuizStructure.prototype.clearAnsField = function(){
  this.$ansField.val(this.ansFieldHint).addClass('hint');
};

QuizStructure.prototype.updateCurrScore = function(score){
  this.$currScore.text('Score: ' + score);  
};

QuizStructure.prototype.setProceedBtnValue = function(value){
  this.$proceedBtn.val(value);
};

QuizStructure.prototype.displayFinalDiv = function(){
  var _this = this;

  return function(finalScore){
    _this.$finalScore.text('Final Score: ' + finalScore);

    _this.$quesArea.addClass('hide');
    _this.$quizContainer.append(_this.$finalDiv);
  }
};

QuizStructure.prototype.saveIncorrectQues = function(){
  $('<p>' + this.$ques.text() + '<br>' + 'Correct Answer: ' + this.$ques.data('answer') + '</p>').appendTo(this.$incorrectQuestions);
};