let currentBrowser = {
  isOpera: function() {
    return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  },
  isFirefox : function() {
    return typeof InstallTrigger !== 'undefined';
  },
  isSafari : function() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  },
  isIE : function() {
    return /*@cc_on!@*/false || !!document.documentMode;
  },
  isEdge : function() {
    return !isIE && !!window.StyleMedia;
  },
  isChrome : function() {
    return !!window.chrome && !!window.chrome.webstore;
  },
  isBlink : function() {
    return (isChrome || isOpera) && !!window.CSS;
  }
};
export default currentBrowser;
