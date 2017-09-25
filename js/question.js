function Question(elements$Objs){
  this.$question = elements$Objs.ques;
  this.$questionNo = elements$Objs.quesNo;
}

Question.prototype.init = function(quesNum){
  this.quesNum = quesNum;
  this.generateQuestion();
  this.appendQuestionDetails();
};

Question.prototype.generateQuestion = function(){
  var operand1 = Math.floor((Math.random() * 20) + 1),
      operand2 = Math.floor((Math.random() * 20) + 1),
      operatorsArray = ['+', '-', 'x', '/'],
      operator = operatorsArray[Math.floor(Math.random() * 4)];

  this.ques = 'Evaluate : ' + operand1 +  operator + operand2;
  this.evaluateExp(operand1, operator, operand2);
};

Question.prototype.evaluateExp = function(operand1, operator, operand2){
  switch(operator){
    case '+':
      this.$question.data('answer', (operand1 + operand2).toString());
      break;

    case '-':
      this.$question.data('answer', (operand1 - operand2).toString());
      break;

    case 'x':
      this.$question.data('answer', (operand1 * operand2).toString());
      break;

    case '/':
      this.$question.data('answer', (operand1 / operand2).toFixed(2));
      break;
  }
};

Question.prototype.appendQuestionDetails = function(){
  this.$questionNo.text('Question No: ' + this.quesNum);
  this.$question.text(this.ques);
};