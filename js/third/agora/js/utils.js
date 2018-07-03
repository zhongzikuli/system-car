/*
 * utils file
 */

/*
 * Logger
 */
var Logger = function Logger() {
  _classCallCheck(this, Logger);
};

Logger.log = function (m) {
  console.log(m);
};

/*
 * Toast
 */

var Message = function Message() {
  _classCallCheck(this, Message);
};

Message.show = function (m) {
	faildMsg(m);
	//$.snackbar({ content: m, timeout: 3000 });
};

/*
 * Browser Utils
 */

var Browser = function Browser() {
  _classCallCheck(this, Browser);
};

Browser.getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};