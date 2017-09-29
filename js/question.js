//requirev 
function Question(elements){
  this.$question = elements.$question;
  this.$questionNumber = elements.$questionNumber;
}

Question.prototype.init = function(questionNumber){
  this.questionNumber = questionNumber;
  this.generateQuestion();
  this.appendQuestionDetails();
};

Question.prototype.generateQuestion = function(){
  var operand1 = Math.floor((Math.random() * 20) + 1),
      operand2 = Math.floor((Math.random() * 20) + 1),
      operatorsArray = ['+', '-', 'x', '/'],
      operator = operatorsArray[Math.floor(Math.random() * 4)];

  this.question = 'Evaluate : ' + operand1 +  operator + operand2;
  this.evaluateAnswer(operand1, operator, operand2);
};

Question.prototype.evaluateAnswer = function(operand1, operator, operand2){
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
  this.$questionNumber.text('Question No: ' + this.questionNumber);
  this.$question.text(this.question);
};