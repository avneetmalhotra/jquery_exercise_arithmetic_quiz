function Quiz(noOfQuestions){
  this.noOfQuestions = noOfQuestions;
  this.questionNo = 0;
  this.noOfCorrectAns = 0;
}

Quiz.prototype.validAnsRegex = /^(\-)?\d+$/;

Quiz.prototype.init = function(){
  this.quizStructureObj = new QuizStructure('.main-container');
  this.quizStructureObj.init();
  
  this.questionObj = new Question({'quesNo' : this.quizStructureObj.$quesNo,
                                   'ques' : this.quizStructureObj.$ques
                                  });
  
  this.newQuestion()();
  this.quizStructureObj.displayQuiz();
  
  this.quizStructureObj.$proceedBtn.on('click', this.proceedBtnHandler());
};

Quiz.prototype.newQuestion = function(){
  var _this = this;

  return function(){
    _this.quizStructureObj.clearAnsStatus();
    _this.quizStructureObj.clearAnsField();
    _this.quizStructureObj.updateCurrScore(_this.getScore());

    _this.questionObj.init(++_this.questionNo);
    _this.enableProceedBtn();
        
    if(_this.isLastQues())
      _this.quizStructureObj.setProceedBtnValue('Submit');
  };
};

Quiz.prototype.getScore = function(){
  return (this.noOfCorrectAns + ' / ' + this.questionNo);
};

Quiz.prototype.isLastQues = function(){
  return this.noOfQuestions === this.questionNo;
};

Quiz.prototype.proceedBtnHandler = function(){
  var _this = this;

  return function(eventObj){
    _this.checkAnswer();
  };
};

Quiz.prototype.disableProceedBtn = function(){
  this.quizStructureObj.$proceedBtn.prop('disabled', true);
};

Quiz.prototype.enableProceedBtn = function(){
  this.quizStructureObj.$proceedBtn.prop('disabled', false);
};

Quiz.prototype.checkAnswer = function(){
  var userAns = this.quizStructureObj.$ansField.val().trim(),
      correctAns = this.quizStructureObj.$ques.data('answer');

  if(userAns === this.quizStructureObj.ansFieldHint)
    alert('No answer entered. Please enter one.')

  else if(!this.isAnsValid(userAns))
    alert('Answer should be a number only.');

  else{
    this.disableProceedBtn();
    this.onValidAns(userAns, correctAns);
  }
};

Quiz.prototype.onValidAns = function(userAns, correctAns){
  if(userAns === correctAns){
      this.onCorrectAns();
    }
  else{
    this.onIncorrectAns();
  }

  if(this.isLastQues()){
    setTimeout(this.quizStructureObj.displayFinalDiv(), 2000, this.getScore());
  }
  else{
    setTimeout(this.newQuestion(), 2000);
  }
};

Quiz.prototype.isAnsValid = function(userAns){
  return this.validAnsRegex.test(userAns);
};

Quiz.prototype.onCorrectAns = function(){
  this.quizStructureObj.$ansStatus.text('Correct').addClass('correct show');
  this.noOfCorrectAns++;
};

Quiz.prototype.onIncorrectAns = function(){
  this.quizStructureObj.$ansStatus.text('Incorrect').addClass('incorrect show');
  this.quizStructureObj.saveIncorrectQues();
};