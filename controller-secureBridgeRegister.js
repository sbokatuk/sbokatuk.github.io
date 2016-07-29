/**
 * Created by wangyanjun on 2014-05-27.
 */

'use strict';

angular.module('sspApp').controller('DeviceRegisterCtrl', ['$scope', function ($scope) {
  //set title content
    angular.element(window.document)[0].title = $('#orgName').text() + ' - SecureBridge Registration';

  //confirm dialog options
  $scope.confirm = {
    show: false,
    content: '',
    ok: function () {
    }
  };

  if ($('body').attr('member-app') === 'true') {
    loadMemberApp();
  }
  //mobile member
  function loadMemberApp() {
    if (!EB_Common.browser.mobile) {
      $scope.promptMessage = true;
      return;
    }else{
      $scope.memberPortalLogo = true;
    }

    var applink = function () {
      var clickedAt = +new Date;
      // During tests on 3g/3gs this timeout fires immediately if less than 500ms.
      setTimeout(function () {
        // To avoid failing on return to MobileSafari, ensure freshness!
        if (+new Date - clickedAt < 2000) {
          window.location = 'https://itunes.apple.com/cn/app/securebridge/id886804201?l=en&mt=8';
        }
      }, 500);
    };

    var appUrl;
    if (EB_Common.browser.android) {
      var bodyEl = $('body');
      var orgId = bodyEl.attr('orgid');
      var userStatus = bodyEl.attr('user-status');
      var referrerAndriod = bodyEl.attr('referrer-andriod');
      appUrl = userStatus === 'public' ? EB_Common.wrap('/downloadsecurebridgeapp?orgId=' + orgId) : EB_Common.wrap('/downloadsecurebridgeapp?' + referrerAndriod);
    } else {
      appUrl = $('meta[name="apple-itunes-everbridge-app"]').attr('url');
    }
    if ($('#smartbanner').length === 0) {
      $.smartbanner({
        title: 'SecureBridge',
        author: 'Everbridge, Inc.',
        force: EB_Common.browser.android ? 'android' : 'ios',
        url: appUrl,
        daysHidden: 0,
        daysReminder: 0
      });
    }

    // add linstener click event
    $('#smartbanner .sb-button').click(function (e) {
      if (EB_Common.browser.android) {
        e.preventDefault();
        window.location = appUrl;
      } else {
        applink();
      }
    });
    /*$scope.confirm.show = true;
    $scope.confirm.ok = function () {*/
        setTimeout(function(){
            if (EB_Common.browser.ios) {
                var href = $('#smartbanner .sb-button').attr('href');
                window.location = href;
            }
            $('#smartbanner .sb-button').click();
        },100);
    /*};*/
  }
}]);