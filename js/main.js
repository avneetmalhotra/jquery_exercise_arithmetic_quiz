$(document).ready(function(){
  var questionAreaElementsSelectors = 
    { question : '[data-hook="question"]',
      questionNumber : '[data-hook="question-number"]',
      submitAndProceedButton : '[data-hook="submit-and-proceed-button"]',
      answerStatus : '[data-hook="answer-status"]',
      currentScore : '[data-hook="current-score"]',
      answerField : '[data-hook="answer-field"]'
    };

  var finalViewElementsSelectors = 
    { finalScore : '[data-hook="final-score"]',
      incorrectQuestions : '[data-hook="final-view-headline"]',
      finalViewHeadline : '[data-hook="incorrect-questions"]'
    };

  var options = 
    { $quizParent : $('.main-container'),
      $quizTemplate : $('div[data-hook="quiz-template"]'),
      questionAreaSelector : '.question-area',
      finalViewSelector : '.final-view'
    };


  var quiz1 = new Quiz(20, options, questionAreaElementsSelectors, finalViewElementsSelectors);
  quiz1.init();

  var quiz2 = new Quiz(2, options, questionAreaElementsSelectors, finalViewElementsSelectors);
  quiz2.init();

  var quiz3 = new Quiz(4, options, questionAreaElementsSelectors, finalViewElementsSelectors);
  quiz3.init();
});