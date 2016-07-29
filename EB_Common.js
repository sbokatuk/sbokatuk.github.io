(function() {
  EB_Common = {
    version: '2.0.0',
    versionDetail: {
      major: 2,
      minor: 0,
      patch: 0
    },
    description: 'Member Portal'
  };

  var re = /\{(\d+)\}/g;
  $.extend(EB_Common, {
    ctx: $('script[ctx]').attr('ctx'),
    getCtx: function() {
      return this.ctx;
    },
    wrap: function(url) {
      if (url.substring(0, 1) !== '/') {
        url = '/' + url;
      }
      return this.ctx + url;
    },
    wrapStatics: function(url) {
      if (url.substring(0, 1) !== '/') {
        url = '/' + url;
      }
      return this.ctx + '/statics' + url+'?version=@version@';
    },
    encode64: function(code) {
      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var input = escape(code);
      var output = '';
      var chr1 = '';
      var chr2 = '';
      var chr3 = '';
      var enc1 = '';
      var enc2 = '';
      var enc3 = '';
      var enc4 = '';
      var i = 0;
      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = '';
        chr2 = '';
        chr3 = '';
        enc1 = '';
        enc2 = '';
        enc3 = '';
        enc4 = '';
      } while (i < input.length);
      return output;
    },
    applyTemplate: function(template, values) {
      return template.replace(re, function(match, key, index, source) {
        return values[key] !== undefined ? values[key] : '';
      });
    }
  });

  EB_Common.Element = (function() {

    var check = function(r) {
      return r.test(navigator.userAgent.toLowerCase());
    };
    var doc = document,
            isOpera = check(/opera/),
            isIE = !isOpera && check(/msie/),
            isStrict = doc.compatMode == 'CSS1Compat';

    var element = {
      //return the page viewport width
      getViewportWidth: function() {
        return !isStrict && !isOpera ? doc.body.clientWidth : isIE
                ? doc.documentElement.clientWidth
                : self.innerWidth;
      },
      //return the page viewport height
      getViewportHeight: function() {
        return isIE ? (isStrict
                ? doc.documentElement.clientHeight
                : doc.body.clientHeight) : self.innerHeight;
      }
    };
    return element;
  })();

  EB_Common.getViewportWidth = EB_Common.Element.getViewportWidth;

  EB_Common.gmaps = {
    loadSuccess: false,
    callback: function() {
      this.loadSuccess = true;
    }
  };

  EB_Common.browser = (function() {
    var userAgent = navigator.userAgent;
    var browser = {
      android: /Android/i.test(userAgent),
      iPhone: /iPhone/i.test(userAgent),
      iPad: /iPad/i.test(userAgent)
    };
    browser.ios = browser.iPhone || browser.iPad;
    browser.mobile = browser.android || browser.iPhone || browser.iPad;
    return browser;
  })();

  //ie7 ie8 compatibility
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(item) {
      var me = this;
      if (me.length == 0) {
        return -1;
      }
      for (var i = 0, len = me.length; i < len; i++) {
        if (item == me[i]) {
          return i;
        }
      }
      return -1;
    };
  }
})();

$(function() {
  var ajaxStart = function() {
    if ($('#sspAjaxLoadingBackdrop').length === 0) {
      $('body').append('<div class="ajax-loading-backdrop" id="sspAjaxLoadingBackdrop"></div>');
    } else {
      $('#sspAjaxLoadingBackdrop').show();
    }
    if ($('#sspAjaxLoading').length === 0) {
      $('body').append('<div class="ajax-loading" id="sspAjaxLoading">'+i18n['ssp.request.working']+'</div>');
    } else {
      $('#sspAjaxLoading').show();
    }
  },
  ajaxStop = function() {
    $('#sspAjaxLoadingBackdrop').hide();
    $('#sspAjaxLoading').hide();
  };
  $(document).on({
    'ajaxStart': ajaxStart,
    'ajaxStop': ajaxStop
  });
});