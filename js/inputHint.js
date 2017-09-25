function InputHint($inputField){
  this.$inputElem = $inputField;
  this.hint = $inputField.val();
}

InputHint.prototype.init = function(){
  this.bindEventsOnInputField();
};

InputHint.prototype.bindEventsOnInputField = function(){
  this.$inputElem.on('focus', this.inputFocus);
  this.$inputElem.on('blur', this.inputBlur());
};

InputHint.prototype.inputFocus = function(){
  $(this).removeClass('hint').val('');
};

InputHint.prototype.inputBlur = function(){
  var _this = this;

  return function(){
    var $element = $(this);

    if(!$element.val().trim().length){
      $element.val(_this.hint).addClass('hint');
    }
  };
};

