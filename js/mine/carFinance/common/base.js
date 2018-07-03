(function (window, document){
	var defaultOptions = {
			
	};
	var HYCarFinance = function(options){
		this.options = $.extend({}, defaultOptions, options || {});
		return this;
	}
	window.HYCarFinance = HYCarFinance;
})(window, document);