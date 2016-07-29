'use strict';
angular.module('sspApp').directive('sspDialog', function() {
  return {
    restrict: 'EA',
    templateUrl: EB_Common.wrapStatics('views/template/template_dialog.html'),
    transclude: true,
    replace: true,
    scope: {
      dialogTitle: '=',
      customStyle: '=',
      show: '=',
      modalEffect: '=',
      showCloseBtn: '=',
      okText: '=',
      cancelText: '=',
      close: '&',
      ok: '&',
      onShow: '&',
      onShown: '&',
      onHide: '&',
      onHidden: '&'
    },
    link: function(scope, iElement, iAttrs, controller) {
      if(window.i18n){
        scope.sspI18n = window.i18n;
      }
      $(iElement[0]).on({'show.bs.modal': function() {
          if ($.isFunction(scope.onShow)) {
            scope.onShow();
          }
        }, 'shown.bs.modal': function() {
          if ($.isFunction(scope.onShown)) {
            scope.onShown();
          }
        }, 'hide.bs.modal': function() {
          if ($.isFunction(scope.onHide)) {
            scope.onHide();
          }
        }, 'hidden.bs.modal': function() {
          if ($.isFunction(scope.onHidden)) {
            scope.onHidden();
          }
        }});

      scope.$watch('show', function(show) {
        if (show) {
          $(iElement[0]).modal('show');
        } else {
          $(iElement[0]).modal('hide');
        }
      });
    }
  };
});