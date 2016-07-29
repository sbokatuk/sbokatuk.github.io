'use strict';
angular.module('sspApp').directive('sspi18n',function(){
  return {
    restict: 'EA',
    link: function(scope, element, attrs){
      element.replaceWith(i18n[element.text()]);
    }
  };
});