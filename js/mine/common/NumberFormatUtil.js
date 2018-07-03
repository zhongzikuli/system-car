NumberFormatUtil = {
		/**
		 * 传入数字（s），小数位数（n）
		 * 返回1,000.00样式的金额
		 */
		fmoney : function(s, n) {
			if(s == 0 || s == "0") return "0.00";
			if(undefined == s || null == s || s == "") return "";
			var mark = "";
			if(parseFloat(s) < 0){
				mark = "-";
				s = (s + "").replace("-", "");
			}
			n = n > 0 && n <= 20 ? n : 2;
			var temp = parseFloat((s + "").replace(/[^\d\.-]/g, ""))
			s = Math.round(Math.pow(10,n)*temp)/Math.pow(10,n) + "";
			//如果四舍五入后s是个整数，则给小数部分添加n个0
			if(s.indexOf('.') < 0){
				s = temp.toFixed(n) + "";
			}
			
			var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			return mark + t.split("").reverse().join("") + "." + r;
		},
		/**
		 * 传入数字（s），小数位数（n）
		 * 返回1000.00样式的金额
		 */
		fnumber : function(s, n) {
			if(s == 0 || s == "0") return "0.00";
			if(undefined == s || null == s || s == "") return "";
			var mark = "";
			if(parseFloat(s) < 0){
				mark = "-";
				s = (s + "").replace("-", "");
			}
			n = n > 0 && n <= 20 ? n : 2;
			var temp = parseFloat((s + "").replace(/[^\d\.-]/g, ""))
			s = Math.round(Math.pow(10,n)*temp)/Math.pow(10,n) + "";
			//如果四舍五入后s是个整数，则给小数部分添加n个0
			if(s.indexOf('.') < 0){
				s = temp.toFixed(n) + "";
			}
			return s;
		},
		/**
		 * 将1,000.00样式的金额转换为纯数字
		 */
		rmoney : function(s) {
			return parseFloat(s.replace(/[^\d\.-]/g, ""));
		},
		/**
		 * 将字符串转化为浮点数，对于非法字符串返回0
		 * @param value
		 * @returns
		 */
		stringToFloat : function(value){
			if(isNaN(value))
				return 0;
			
			if(isNaN(parseFloat(value)))
				return 0;
			
			return parseFloat(value);
		}
};
/**
判断value是否是数字
flag<0:是数字即可
flag=0:必须是大于等于0的数字
flag>0:必须是大于0的数字
 */
function isNumber(value,flag){
	if(value == null || value == "")
		return false;
	if(!isNaN(value)){
		if(flag<0) return true;
		if(flag==0) return value>=0;
		if(flag>0) return value>0;
	}
	if(typeof value=="number"&&isNaN(value)){
		return false;
	}
	if((value=value.replace(/\s+/g,"")).length==0) return false;
	if(isNaN(value)) return false;
	value=parseFloat(value);
	if(flag<0) return true;
	if(flag==0) return value>=0;
	if(flag>0) return value>0;
	
}

/**
 * 直接传值，返回对应的中文
 * @param value
 */
function numTextToChinese(value){
	var num =value;
	var numberValue = new String(Math.round(num * 100)); // 数字金额
	var chineseValue = ""; // 转换后的汉字金额
	var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
	var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
	var fu ="負";
	var len = numberValue.length; // numberValue 的字符串长度
	var Ch1; // 数字的汉语读法
	var Ch2; // 数字位的汉字读法
	var nZero = 0; // 用来计算连续的零值的个数
	var String3; // 指定位置的数值
	if (len > 10) {
		alert("超出计算范围");
		return "";
	}

	if (numberValue == 0) {
		chineseValue = "零元整";
		return chineseValue;
	}
	String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
	for ( var i = 0; i < len; i++) {
		String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
		
		if (i != (len - 3) && i != (len - 7) && i != (len - 11)
				&& i != (len - 15)) {
			if (String3 == 0) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			}else if(i==0&&numberValue.substr(i, 1)=="-"){
				Ch1=fu;
				Ch2 = "";
				nZero = 0;
			} else {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			}
		} else { // 该位是万亿，亿，万，元位等关键位
			if (i == 0 && numberValue.substr(i, 1) == "-"){//先排除负角、负千、负千万、负千亿级别时的情况
				Ch1 = fu;
				Ch2 = "";
				nZero = 0;
			} else if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if (String3 != 0 && nZero == 0) {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if (String3 == 0 && nZero >= 3) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else {
				Ch1 = "";
				Ch2 = String2.substr(i, 1);
				nZero = nZero + 1;
			}
			
			if (i == 0 && numberValue.substr(i, 1) == "-"){//当第一个字符为负号时不需要添加单位
				Ch2 = "";
			} else if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
				Ch2 = String2.substr(i, 1);
			}
		}
		chineseValue = chineseValue + Ch1 + Ch2;
	}
	if (String3 == 0) { // 最后一位（分）为0时，加上“整”
		chineseValue = chineseValue + "整";
	}
	return chineseValue;
}
