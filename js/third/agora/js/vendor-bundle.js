/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,D=/^.[^:#\[\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\x20\t\r\n\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,la=/^$|\/(?:java|ecma)script/i,ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\s*(?:[^=]|=\s*.checked.)/i,Ca=/^true\/(.*)/,Da=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});

/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});

/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* More information about these options at jshint.com/docs/options */
/* jshint browser: true, camelcase: true, curly: true, devel: true,
   eqeqeq: true, forin: false, globalstrict: true, node: true,
   quotmark: single, undef: true, unused: strict */
/* global mozRTCIceCandidate, mozRTCPeerConnection, Promise,
mozRTCSessionDescription, webkitRTCPeerConnection, MediaStreamTrack */
/* exported trace,requestUserMedia */

'use strict';

var getUserMedia = null;
var attachMediaStream = null;
var reattachMediaStream = null;
var webrtcDetectedBrowser = null;
var webrtcDetectedVersion = null;
var webrtcMinimumVersion = null;
var webrtcUtils = {
  log: function() {
    // suppress console.log output when being included as a module.
    if (typeof module !== 'undefined' ||
        typeof require === 'function' && typeof define === 'function') {
      return;
    }
    console.log.apply(console, arguments);
  },
  extractVersion: function(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos]);
  }
};

function trace(text) {
  // This function is used for logging.
  if (text[text.length - 1] === '\n') {
    text = text.substring(0, text.length - 1);
  }
  if (window.performance) {
    var now = (window.performance.now() / 1000).toFixed(3);
    webrtcUtils.log(now + ': ' + text);
  } else {
    webrtcUtils.log(text);
  }
}

if (typeof window === 'object') {
  if (window.HTMLMediaElement &&
    !('srcObject' in window.HTMLMediaElement.prototype)) {
    // Shim the srcObject property, once, when HTMLMediaElement is found.
    Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
      get: function() {
        // If prefixed srcObject property exists, return it.
        // Otherwise use the shimmed property, _srcObject
        return 'mozSrcObject' in this ? this.mozSrcObject : this._srcObject;
      },
      set: function(stream) {
        if ('mozSrcObject' in this) {
          this.mozSrcObject = stream;
        } else {
          // Use _srcObject as a private property for this shim
          this._srcObject = stream;
          // TODO: revokeObjectUrl(this.src) when !stream to release resources?
          this.src = URL.createObjectURL(stream);
        }
      }
    });
  }
  // Proxy existing globals
  getUserMedia = window.navigator && window.navigator.getUserMedia;
}

// Attach a media stream to an element.
attachMediaStream = function(element, stream) {
  element.srcObject = stream;
};

reattachMediaStream = function(to, from) {
  to.srcObject = from.srcObject;
};

if (typeof window === 'undefined' || !window.navigator) {
  webrtcUtils.log('This does not appear to be a browser');
  webrtcDetectedBrowser = 'not a browser';
} else if (navigator.mozGetUserMedia && window.mozRTCPeerConnection) {
  webrtcUtils.log('This appears to be Firefox');

  webrtcDetectedBrowser = 'firefox';

  // the detected firefox version.
  webrtcDetectedVersion = webrtcUtils.extractVersion(navigator.userAgent,
      /Firefox\/([0-9]+)\./, 1);

  // the minimum firefox version still supported by adapter.
  webrtcMinimumVersion = 31;

  // The RTCPeerConnection object.
  window.RTCPeerConnection = function(pcConfig, pcConstraints) {
    if (webrtcDetectedVersion < 38) {
      // .urls is not supported in FF < 38.
      // create RTCIceServers with a single url.
      if (pcConfig && pcConfig.iceServers) {
        var newIceServers = [];
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
          var server = pcConfig.iceServers[i];
          if (server.hasOwnProperty('urls')) {
            for (var j = 0; j < server.urls.length; j++) {
              var newServer = {
                url: server.urls[j]
              };
              if (server.urls[j].indexOf('turn') === 0) {
                newServer.username = server.username;
                newServer.credential = server.credential;
              }
              newIceServers.push(newServer);
            }
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
    }
    return new mozRTCPeerConnection(pcConfig, pcConstraints); // jscs:ignore requireCapitalizedConstructors
  };

  // The RTCSessionDescription object.
  if (!window.RTCSessionDescription) {
    window.RTCSessionDescription = mozRTCSessionDescription;
  }

  // The RTCIceCandidate object.
  if (!window.RTCIceCandidate) {
    window.RTCIceCandidate = mozRTCIceCandidate;
  }

  // getUserMedia constraints shim.
  getUserMedia = function(constraints, onSuccess, onError) {
    var constraintsToFF37 = function(c) {
      if (typeof c !== 'object' || c.require) {
        return c;
      }
      var require = [];
      Object.keys(c).forEach(function(key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = c[key] = (typeof c[key] === 'object') ?
            c[key] : {ideal: c[key]};
        if (r.min !== undefined ||
            r.max !== undefined || r.exact !== undefined) {
          require.push(key);
        }
        if (r.exact !== undefined) {
          if (typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          } else {
            c[key] = r.exact;
          }
          delete r.exact;
        }
        if (r.ideal !== undefined) {
          c.advanced = c.advanced || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[key] = {min: r.ideal, max: r.ideal};
          } else {
            oc[key] = r.ideal;
          }
          c.advanced.push(oc);
          delete r.ideal;
          if (!Object.keys(r).length) {
            delete c[key];
          }
        }
      });
      if (require.length) {
        c.require = require;
      }
      return c;
    };
    if (webrtcDetectedVersion < 38) {
      webrtcUtils.log('spec: ' + JSON.stringify(constraints));
      if (constraints.audio) {
        constraints.audio = constraintsToFF37(constraints.audio);
      }
      if (constraints.video) {
        constraints.video = constraintsToFF37(constraints.video);
      }
      webrtcUtils.log('ff37: ' + JSON.stringify(constraints));
    }
    return navigator.mozGetUserMedia(constraints, onSuccess, onError);
  };

  navigator.getUserMedia = getUserMedia;

  // Shim for mediaDevices on older versions.
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {getUserMedia: requestUserMedia,
      addEventListener: function() { },
      removeEventListener: function() { }
    };
  }
  navigator.mediaDevices.enumerateDevices =
      navigator.mediaDevices.enumerateDevices || function() {
    return new Promise(function(resolve) {
      var infos = [
        {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
        {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
      ];
      resolve(infos);
    });
  };

  if (webrtcDetectedVersion < 41) {
    // Work around http://bugzil.la/1169665
    var orgEnumerateDevices =
        navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices = function() {
      return orgEnumerateDevices().then(undefined, function(e) {
        if (e.name === 'NotFoundError') {
          return [];
        }
        throw e;
      });
    };
  }
} else if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
  webrtcUtils.log('This appears to be Chrome');

  webrtcDetectedBrowser = 'chrome';

  // the detected chrome version.
  webrtcDetectedVersion = webrtcUtils.extractVersion(navigator.userAgent,
      /Chrom(e|ium)\/([0-9]+)\./, 2);

  // the minimum chrome version still supported by adapter.
  webrtcMinimumVersion = 38;

  // The RTCPeerConnection object.
  window.RTCPeerConnection = function(pcConfig, pcConstraints) {
    // Translate iceTransportPolicy to iceTransports,
    // see https://code.google.com/p/webrtc/issues/detail?id=4869
    if (pcConfig && pcConfig.iceTransportPolicy) {
      pcConfig.iceTransports = pcConfig.iceTransportPolicy;
    }

    var pc = new webkitRTCPeerConnection(pcConfig, pcConstraints); // jscs:ignore requireCapitalizedConstructors
    var origGetStats = pc.getStats.bind(pc);
    pc.getStats = function(selector, successCallback, errorCallback) { // jshint ignore: line
      var self = this;
      var args = arguments;

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.
      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats(selector, successCallback);
      }

      var fixChromeStats = function(response) {
        var standardReport = {};
        var reports = response.result();
        reports.forEach(function(report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: report.type
          };
          report.names().forEach(function(name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });

        return standardReport;
      };

      if (arguments.length >= 2) {
        var successCallbackWrapper = function(response) {
          args[1](fixChromeStats(response));
        };

        return origGetStats.apply(this, [successCallbackWrapper, arguments[0]]);
      }

      // promise-support
      return new Promise(function(resolve, reject) {
        if (args.length === 1 && selector === null) {
          origGetStats.apply(self, [
              function(response) {
                resolve.apply(null, [fixChromeStats(response)]);
              }, reject]);
        } else {
          origGetStats.apply(self, [resolve, reject]);
        }
      });
    };

    return pc;
  };

  // add promise support
  ['createOffer', 'createAnswer'].forEach(function(method) {
    var nativeMethod = webkitRTCPeerConnection.prototype[method];
    webkitRTCPeerConnection.prototype[method] = function() {
      var self = this;
      if (arguments.length < 1 || (arguments.length === 1 &&
          typeof(arguments[0]) === 'object')) {
        var opts = arguments.length === 1 ? arguments[0] : undefined;
        return new Promise(function(resolve, reject) {
          nativeMethod.apply(self, [resolve, reject, opts]);
        });
      } else {
        return nativeMethod.apply(this, arguments);
      }
    };
  });

  ['setLocalDescription', 'setRemoteDescription',
      'addIceCandidate'].forEach(function(method) {
    var nativeMethod = webkitRTCPeerConnection.prototype[method];
    webkitRTCPeerConnection.prototype[method] = function() {
      var args = arguments;
      var self = this;
      return new Promise(function(resolve, reject) {
        nativeMethod.apply(self, [args[0],
            function() {
              resolve();
              if (args.length >= 2) {
                args[1].apply(null, []);
              }
            },
            function(err) {
              reject(err);
              if (args.length >= 3) {
                args[2].apply(null, [err]);
              }
            }]
          );
      });
    };
  });

  // getUserMedia constraints shim.
  var constraintsToChrome = function(c) {
    if (typeof c !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    var cc = {};
    Object.keys(c).forEach(function(key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      var oldname = function(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return (name === 'deviceId') ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function(mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };

  getUserMedia = function(constraints, onSuccess, onError) {
    if (constraints.audio) {
      constraints.audio = constraintsToChrome(constraints.audio);
    }
    if (constraints.video) {
      constraints.video = constraintsToChrome(constraints.video);
    }
    webrtcUtils.log('chrome: ' + JSON.stringify(constraints));
    return navigator.webkitGetUserMedia(constraints, onSuccess, onError);
  };
  navigator.getUserMedia = getUserMedia;

  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {getUserMedia: requestUserMedia,
                              enumerateDevices: function() {
      return new Promise(function(resolve) {
        var kinds = {audio: 'audioinput', video: 'videoinput'};
        return MediaStreamTrack.getSources(function(devices) {
          resolve(devices.map(function(device) {
            return {label: device.label,
                    kind: kinds[device.kind],
                    deviceId: device.id,
                    groupId: ''};
          }));
        });
      });
    }};
  }

  // A shim for getUserMedia method on the mediaDevices object.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (!navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      return requestUserMedia(constraints);
    };
  } else {
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(c) {
      webrtcUtils.log('spec:   ' + JSON.stringify(c)); // whitespace for alignment
      c.audio = constraintsToChrome(c.audio);
      c.video = constraintsToChrome(c.video);
      webrtcUtils.log('chrome: ' + JSON.stringify(c));
      return origGetUserMedia(c);
    };
  }

  // Dummy devicechange event methods.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
    navigator.mediaDevices.addEventListener = function() {
      webrtcUtils.log('Dummy mediaDevices.addEventListener called.');
    };
  }
  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
    navigator.mediaDevices.removeEventListener = function() {
      webrtcUtils.log('Dummy mediaDevices.removeEventListener called.');
    };
  }

  // Attach a media stream to an element.
  attachMediaStream = function(element, stream) {
    if (webrtcDetectedVersion >= 43) {
      element.srcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      webrtcUtils.log('Error attaching stream to element.');
    }
  };
  reattachMediaStream = function(to, from) {
    if (webrtcDetectedVersion >= 43) {
      to.srcObject = from.srcObject;
    } else {
      to.src = from.src;
    }
  };

} else if (navigator.mediaDevices && navigator.userAgent.match(
    /Edge\/(\d+).(\d+)$/)) {
  webrtcUtils.log('This appears to be Edge');
  webrtcDetectedBrowser = 'edge';

  webrtcDetectedVersion = webrtcUtils.extractVersion(navigator.userAgent,
      /Edge\/(\d+).(\d+)$/, 2);

  // the minimum version still supported by adapter.
  webrtcMinimumVersion = 12;
} else {
  webrtcUtils.log('Browser does not appear to be WebRTC-capable');
}

// Returns the result of getUserMedia as a Promise.
function requestUserMedia(constraints) {
  return new Promise(function(resolve, reject) {
    getUserMedia(constraints, resolve, reject);
  });
}

var webrtcTesting = {};
try {
  Object.defineProperty(webrtcTesting, 'version', {
    set: function(version) {
      webrtcDetectedVersion = version;
    }
  });
} catch (e) {}

if (typeof module !== 'undefined') {
  var RTCPeerConnection;
  if (typeof window !== 'undefined') {
    RTCPeerConnection = window.RTCPeerConnection;
  }
  module.exports = {
    RTCPeerConnection: RTCPeerConnection,
    getUserMedia: getUserMedia,
    attachMediaStream: attachMediaStream,
    reattachMediaStream: reattachMediaStream,
    webrtcDetectedBrowser: webrtcDetectedBrowser,
    webrtcDetectedVersion: webrtcDetectedVersion,
    webrtcMinimumVersion: webrtcMinimumVersion,
    webrtcTesting: webrtcTesting,
    webrtcUtils: webrtcUtils
    //requestUserMedia: not exposed on purpose.
    //trace: not exposed on purpose.
  };
} else if ((typeof require === 'function') && (typeof define === 'function')) {
  // Expose objects and functions when RequireJS is doing the loading.
  define([], function() {
    return {
      RTCPeerConnection: window.RTCPeerConnection,
      getUserMedia: getUserMedia,
      attachMediaStream: attachMediaStream,
      reattachMediaStream: reattachMediaStream,
      webrtcDetectedBrowser: webrtcDetectedBrowser,
      webrtcDetectedVersion: webrtcDetectedVersion,
      webrtcMinimumVersion: webrtcMinimumVersion,
      webrtcTesting: webrtcTesting,
      webrtcUtils: webrtcUtils
      //requestUserMedia: not exposed on purpose.
      //trace: not exposed on purpose.
    };
  });
}

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = (function (fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
});

var isBrowser = typeof window !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var scheduled = false;
  var i = 0;
  var elem = document.createElement('span');

  // MutationObserver provides a mechanism for scheduling microtasks, which
  // are scheduled *before* the next task. This gives us a way to debounce
  // a function but ensure it's called *before* the next paint.
  var observer = new MutationObserver(function () {
    fn();
    scheduled = false;
  });

  observer.observe(elem, { attributes: true });

  return function () {
    if (!scheduled) {
      scheduled = true;
      elem.setAttribute('x-index', i);
      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
    }
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
    return window.document.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = window.document.documentElement;
    var scrollingElement = window.document.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = +styles.marginTop.split('px')[0];
    var marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = window.document.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));
//# sourceMappingURL=popper.js.map

(function(){'use strict';var e=Math.max,t=function(e){function t(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(e){return(e[0]||e).nodeType}function a(){return{bindType:l.end,delegateType:l.end,handle:function(t){return e(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}}}function o(){if(window.QUnit)return!1;var e=document.createElement('bootstrap');for(var t in i)if(void 0!==e.style[t])return{end:i[t]};return!1}function r(t){var n=this,a=!1;return e(this).one(s.TRANSITION_END,function(){a=!0}),setTimeout(function(){a||s.triggerTransitionEnd(n)},t),this}var l=!1,i={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'},s={TRANSITION_END:'bsTransitionEnd',getUID:function(e){do e+=~~(1e6*Math.random());while(document.getElementById(e));return e},getSelectorFromElement:function(t){var n=t.getAttribute('data-target');n&&'#'!==n||(n=t.getAttribute('href')||'');try{var a=e(n);return 0<a.length?n:null}catch(e){return null}},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(t){e(t).trigger(l.end)},supportsTransitionEnd:function(){return!!l},typeCheckConfig:function(e,a,o){for(var r in o)if(o.hasOwnProperty(r)){var l=o[r],i=a[r],s=i&&n(i)?'element':t(i);if(!new RegExp(l).test(s))throw new Error(e.toUpperCase()+': '+('Option "'+r+'" provided type "'+s+'" ')+('but expected type "'+l+'".'))}}};return function(){l=o(),e.fn.emulateTransitionEnd=r,s.supportsTransitionEnd()&&(e.event.special[s.TRANSITION_END]=a())}(),s}(jQuery),n='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&'function'==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?'symbol':typeof e},a=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},o=function(){function e(e,t){for(var n,a=0;a<t.length;a++)n=t[a],n.enumerable=n.enumerable||!1,n.configurable=!0,'value'in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=function e(t,n,a){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,a)}if('value'in o)return o.value;var l=o.get;return void 0===l?void 0:l.call(a)},l=function(e,t){if('function'!=typeof t&&null!==t)throw new TypeError('Super expression must either be null or a function, not '+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},i=function(e,t){if(!e)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return t&&('object'==typeof t||'function'==typeof t)?t:e},s=function(e){var n='alert',r='bs.alert',l='.'+r,i=e.fn[n],s={CLOSE:'close'+l,CLOSED:'closed'+l,CLICK_DATA_API:'click'+l+'.data-api'},d={ALERT:'alert',FADE:'fade',SHOW:'show'},c=function(){function n(e){a(this,n),this._element=e}return o(n,[{key:'close',value:function(e){e=e||this._element;var t=this._getRootElement(e),n=this._triggerCloseEvent(t);n.isDefaultPrevented()||this._removeElement(t)}},{key:'dispose',value:function(){e.removeData(this._element,r),this._element=null}},{key:'_getRootElement',value:function(n){var a=t.getSelectorFromElement(n),o=!1;return a&&(o=e(a)[0]),o||(o=e(n).closest('.'+d.ALERT)[0]),o}},{key:'_triggerCloseEvent',value:function(t){var n=e.Event(s.CLOSE);return e(t).trigger(n),n}},{key:'_removeElement',value:function(n){var a=this;return e(n).removeClass(d.SHOW),t.supportsTransitionEnd()&&e(n).hasClass(d.FADE)?void e(n).one(t.TRANSITION_END,function(e){return a._destroyElement(n,e)}).emulateTransitionEnd(150):void this._destroyElement(n)}},{key:'_destroyElement',value:function(t){e(t).detach().trigger(s.CLOSED).remove()}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(r);o||(o=new n(this),a.data(r,o)),'close'===t&&o[t](this)})}},{key:'_handleDismiss',value:function(e){return function(t){t&&t.preventDefault(),e.close(this)}}},{key:'VERSION',get:function(){return'4.0.0-beta'}}]),n}();return e(document).on(s.CLICK_DATA_API,{DISMISS:'[data-dismiss="alert"]'}.DISMISS,c._handleDismiss(new c)),e.fn[n]=c._jQueryInterface,e.fn[n].Constructor=c,e.fn[n].noConflict=function(){return e.fn[n]=i,c._jQueryInterface},c}(jQuery),d=function(e){var t='button',n='bs.button',r='.'+n,l='.data-api',i=e.fn[t],s={ACTIVE:'active',BUTTON:'btn',FOCUS:'focus'},d={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:'input',ACTIVE:'.active',BUTTON:'.btn'},c={CLICK_DATA_API:'click'+r+l,FOCUS_BLUR_DATA_API:'focus'+r+l+' '+('blur'+r+l)},_=function(){function t(e){a(this,t),this._element=e}return o(t,[{key:'toggle',value:function(){var t=!0,n=!0,a=e(this._element).closest(d.DATA_TOGGLE)[0];if(a){var o=e(this._element).find(d.INPUT)[0];if(o){if('radio'===o.type)if(o.checked&&e(this._element).hasClass(s.ACTIVE))t=!1;else{var r=e(a).find(d.ACTIVE)[0];r&&e(r).removeClass(s.ACTIVE)}if(t){if(o.hasAttribute('disabled')||a.hasAttribute('disabled')||o.classList.contains('disabled')||a.classList.contains('disabled'))return;o.checked=!e(this._element).hasClass(s.ACTIVE),e(o).trigger('change')}o.focus(),n=!1}}n&&this._element.setAttribute('aria-pressed',!e(this._element).hasClass(s.ACTIVE)),t&&e(this._element).toggleClass(s.ACTIVE)}},{key:'dispose',value:function(){e.removeData(this._element,n),this._element=null}}],[{key:'_jQueryInterface',value:function(a){return this.each(function(){var o=e(this).data(n);o||(o=new t(this),e(this).data(n,o)),'toggle'===a&&o[a]()})}},{key:'VERSION',get:function(){return'4.0.0-beta'}}]),t}();return e(document).on(c.CLICK_DATA_API,d.DATA_TOGGLE_CARROT,function(t){t.preventDefault();var n=t.target;e(n).hasClass(s.BUTTON)||(n=e(n).closest(d.BUTTON)),_._jQueryInterface.call(e(n),'toggle')}).on(c.FOCUS_BLUR_DATA_API,d.DATA_TOGGLE_CARROT,function(t){var n=e(t.target).closest(d.BUTTON)[0];e(n).toggleClass(s.FOCUS,/^focus(in)?$/.test(t.type))}),e.fn[t]=_._jQueryInterface,e.fn[t].Constructor=_,e.fn[t].noConflict=function(){return e.fn[t]=i,_._jQueryInterface},_}(jQuery),c=function(e){var r='carousel',l='bs.carousel',i='.'+l,s='.data-api',d=e.fn[r],c={interval:5e3,keyboard:!0,slide:!1,pause:'hover',wrap:!0},_={interval:'(number|boolean)',keyboard:'boolean',slide:'(boolean|string)',pause:'(string|boolean)',wrap:'boolean'},u={NEXT:'next',PREV:'prev',LEFT:'left',RIGHT:'right'},p={SLIDE:'slide'+i,SLID:'slid'+i,KEYDOWN:'keydown'+i,MOUSEENTER:'mouseenter'+i,MOUSELEAVE:'mouseleave'+i,TOUCHEND:'touchend'+i,LOAD_DATA_API:'load'+i+s,CLICK_DATA_API:'click'+i+s},g={CAROUSEL:'carousel',ACTIVE:'active',SLIDE:'slide',RIGHT:'carousel-item-right',LEFT:'carousel-item-left',NEXT:'carousel-item-next',PREV:'carousel-item-prev',ITEM:'carousel-item'},m={ACTIVE:'.active',ACTIVE_ITEM:'.active.carousel-item',ITEM:'.carousel-item',NEXT_PREV:'.carousel-item-next, .carousel-item-prev',INDICATORS:'.carousel-indicators',DATA_SLIDE:'[data-slide], [data-slide-to]',DATA_RIDE:'[data-ride="carousel"]'},f=function(){function s(t,n){a(this,s),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(n),this._element=e(t)[0],this._indicatorsElement=e(this._element).find(m.INDICATORS)[0],this._addEventListeners()}return o(s,[{key:'next',value:function(){this._isSliding||this._slide(u.NEXT)}},{key:'nextWhenVisible',value:function(){document.hidden||this.next()}},{key:'prev',value:function(){this._isSliding||this._slide(u.PREV)}},{key:'pause',value:function(n){n||(this._isPaused=!0),e(this._element).find(m.NEXT_PREV)[0]&&t.supportsTransitionEnd()&&(t.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null}},{key:'cycle',value:function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))}},{key:'to',value:function(t){var n=this;this._activeElement=e(this._element).find(m.ACTIVE_ITEM)[0];var a=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||0>t)){if(this._isSliding)return void e(this._element).one(p.SLID,function(){return n.to(t)});if(a===t)return this.pause(),void this.cycle();var o=t>a?u.NEXT:u.PREV;this._slide(o,this._items[t])}}},{key:'dispose',value:function(){e(this._element).off(i),e.removeData(this._element,l),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null}},{key:'_getConfig',value:function(n){return n=e.extend({},c,n),t.typeCheckConfig(r,n,_),n}},{key:'_addEventListeners',value:function(){var t=this;this._config.keyboard&&e(this._element).on(p.KEYDOWN,function(e){return t._keydown(e)}),'hover'===this._config.pause&&(e(this._element).on(p.MOUSEENTER,function(e){return t.pause(e)}).on(p.MOUSELEAVE,function(e){return t.cycle(e)}),'ontouchstart'in document.documentElement&&e(this._element).on(p.TOUCHEND,function(){t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval)}))}},{key:'_keydown',value:function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next();break;default:}}},{key:'_getItemIndex',value:function(t){return this._items=e.makeArray(e(t).parent().find(m.ITEM)),this._items.indexOf(t)}},{key:'_getItemByDirection',value:function(e,t){var n=e===u.NEXT,a=e===u.PREV,o=this._getItemIndex(t),r=this._items.length-1;if((a&&0===o||n&&o===r)&&!this._config.wrap)return t;var l=e===u.PREV?-1:1,i=(o+l)%this._items.length;return-1==i?this._items[this._items.length-1]:this._items[i]}},{key:'_triggerSlideEvent',value:function(t,n){var a=this._getItemIndex(t),o=this._getItemIndex(e(this._element).find(m.ACTIVE_ITEM)[0]),r=e.Event(p.SLIDE,{relatedTarget:t,direction:n,from:o,to:a});return e(this._element).trigger(r),r}},{key:'_setActiveIndicatorElement',value:function(t){if(this._indicatorsElement){e(this._indicatorsElement).find(m.ACTIVE).removeClass(g.ACTIVE);var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&e(n).addClass(g.ACTIVE)}}},{key:'_slide',value:function(n,a){var o,r,l,i=this,s=e(this._element).find(m.ACTIVE_ITEM)[0],d=this._getItemIndex(s),c=a||s&&this._getItemByDirection(n,s),_=this._getItemIndex(c),f=!!this._interval;if(n===u.NEXT?(o=g.LEFT,r=g.NEXT,l=u.LEFT):(o=g.RIGHT,r=g.PREV,l=u.RIGHT),c&&e(c).hasClass(g.ACTIVE))return void(this._isSliding=!1);var E=this._triggerSlideEvent(c,l);if(!E.isDefaultPrevented()&&s&&c){this._isSliding=!0,f&&this.pause(),this._setActiveIndicatorElement(c);var h=e.Event(p.SLID,{relatedTarget:c,direction:l,from:d,to:_});t.supportsTransitionEnd()&&e(this._element).hasClass(g.SLIDE)?(e(c).addClass(r),t.reflow(c),e(s).addClass(o),e(c).addClass(o),e(s).one(t.TRANSITION_END,function(){e(c).removeClass(o+' '+r).addClass(g.ACTIVE),e(s).removeClass(g.ACTIVE+' '+r+' '+o),i._isSliding=!1,setTimeout(function(){return e(i._element).trigger(h)},0)}).emulateTransitionEnd(600)):(e(s).removeClass(g.ACTIVE),e(c).addClass(g.ACTIVE),this._isSliding=!1,e(this._element).trigger(h)),f&&this.cycle()}}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this).data(l),o=e.extend({},c,e(this).data());'object'===('undefined'==typeof t?'undefined':n(t))&&e.extend(o,t);var r='string'==typeof t?t:o.slide;if(a||(a=new s(this,o),e(this).data(l,a)),'number'==typeof t)a.to(t);else if('string'==typeof r){if(void 0===a[r])throw new Error('No method named "'+r+'"');a[r]()}else o.interval&&(a.pause(),a.cycle())})}},{key:'_dataApiClickHandler',value:function(n){var a=t.getSelectorFromElement(this);if(a){var o=e(a)[0];if(o&&e(o).hasClass(g.CAROUSEL)){var r=e.extend({},e(o).data(),e(this).data()),i=this.getAttribute('data-slide-to');i&&(r.interval=!1),s._jQueryInterface.call(e(o),r),i&&e(o).data(l).to(i),n.preventDefault()}}}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return c}}]),s}();return e(document).on(p.CLICK_DATA_API,m.DATA_SLIDE,f._dataApiClickHandler),e(window).on(p.LOAD_DATA_API,function(){e(m.DATA_RIDE).each(function(){var t=e(this);f._jQueryInterface.call(t,t.data())})}),e.fn[r]=f._jQueryInterface,e.fn[r].Constructor=f,e.fn[r].noConflict=function(){return e.fn[r]=d,f._jQueryInterface},f}(jQuery),_=function(e){var r='collapse',l='bs.collapse',i='.'+l,s=e.fn[r],d=600,c={toggle:!0,parent:''},_={toggle:'boolean',parent:'string'},u={SHOW:'show'+i,SHOWN:'shown'+i,HIDE:'hide'+i,HIDDEN:'hidden'+i,CLICK_DATA_API:'click'+i+'.data-api'},p={SHOW:'show',COLLAPSE:'collapse',COLLAPSING:'collapsing',COLLAPSED:'collapsed'},g={WIDTH:'width',HEIGHT:'height'},m={ACTIVES:'.show, .collapsing',DATA_TOGGLE:'[data-toggle="collapse"]'},f=function(){function s(n,o){a(this,s),this._isTransitioning=!1,this._element=n,this._config=this._getConfig(o),this._triggerArray=e.makeArray(e('[data-toggle="collapse"][href="#'+n.id+'"],'+('[data-toggle="collapse"][data-target="#'+n.id+'"]')));for(var r=e(m.DATA_TOGGLE),l=0;l<r.length;l++){var i=r[l],d=t.getSelectorFromElement(i);null!==d&&0<e(d).filter(n).length&&this._triggerArray.push(i)}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}return o(s,[{key:'toggle',value:function(){e(this._element).hasClass(p.SHOW)?this.hide():this.show()}},{key:'show',value:function(){var n=this;if(!(this._isTransitioning||e(this._element).hasClass(p.SHOW))){var a,o;if(this._parent&&(a=e.makeArray(e(this._parent).children().children(m.ACTIVES)),!a.length&&(a=null)),!(a&&(o=e(a).data(l),o&&o._isTransitioning))){var r=e.Event(u.SHOW);if(e(this._element).trigger(r),!r.isDefaultPrevented()){a&&(s._jQueryInterface.call(e(a),'hide'),!o&&e(a).data(l,null));var i=this._getDimension();e(this._element).removeClass(p.COLLAPSE).addClass(p.COLLAPSING),this._element.style[i]=0,this._triggerArray.length&&e(this._triggerArray).removeClass(p.COLLAPSED).attr('aria-expanded',!0),this.setTransitioning(!0);var c=function(){e(n._element).removeClass(p.COLLAPSING).addClass(p.COLLAPSE).addClass(p.SHOW),n._element.style[i]='',n.setTransitioning(!1),e(n._element).trigger(u.SHOWN)};if(!t.supportsTransitionEnd())return void c();var _=i[0].toUpperCase()+i.slice(1);e(this._element).one(t.TRANSITION_END,c).emulateTransitionEnd(d),this._element.style[i]=this._element['scroll'+_]+'px'}}}}},{key:'hide',value:function(){var n=this;if(!this._isTransitioning&&e(this._element).hasClass(p.SHOW)){var a=e.Event(u.HIDE);if(e(this._element).trigger(a),!a.isDefaultPrevented()){var o=this._getDimension();if(this._element.style[o]=this._element.getBoundingClientRect()[o]+'px',t.reflow(this._element),e(this._element).addClass(p.COLLAPSING).removeClass(p.COLLAPSE).removeClass(p.SHOW),this._triggerArray.length)for(var r=0;r<this._triggerArray.length;r++){var l=this._triggerArray[r],i=t.getSelectorFromElement(l);if(null!==i){var s=e(i);s.hasClass(p.SHOW)||e(l).addClass(p.COLLAPSED).attr('aria-expanded',!1)}}this.setTransitioning(!0);var c=function(){n.setTransitioning(!1),e(n._element).removeClass(p.COLLAPSING).addClass(p.COLLAPSE).trigger(u.HIDDEN)};return this._element.style[o]='',t.supportsTransitionEnd()?void e(this._element).one(t.TRANSITION_END,c).emulateTransitionEnd(d):void c()}}}},{key:'setTransitioning',value:function(e){this._isTransitioning=e}},{key:'dispose',value:function(){e.removeData(this._element,l),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null}},{key:'_getConfig',value:function(n){return n=e.extend({},c,n),n.toggle=!!n.toggle,t.typeCheckConfig(r,n,_),n}},{key:'_getDimension',value:function(){var t=e(this._element).hasClass(g.WIDTH);return t?g.WIDTH:g.HEIGHT}},{key:'_getParent',value:function(){var t=this,n=e(this._config.parent)[0],a='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return e(n).find(a).each(function(e,n){t._addAriaAndCollapsedClass(s._getTargetFromElement(n),[n])}),n}},{key:'_addAriaAndCollapsedClass',value:function(t,n){if(t){var a=e(t).hasClass(p.SHOW);n.length&&e(n).toggleClass(p.COLLAPSED,!a).attr('aria-expanded',a)}}}],[{key:'_getTargetFromElement',value:function(n){var a=t.getSelectorFromElement(n);return a?e(a)[0]:null}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(l),r=e.extend({},c,a.data(),'object'===('undefined'==typeof t?'undefined':n(t))&&t);if(!o&&r.toggle&&/show|hide/.test(t)&&(r.toggle=!1),o||(o=new s(this,r),a.data(l,o)),'string'==typeof t){if(void 0===o[t])throw new Error('No method named "'+t+'"');o[t]()}})}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return c}}]),s}();return e(document).on(u.CLICK_DATA_API,m.DATA_TOGGLE,function(n){/input|textarea/i.test(n.target.tagName)||n.preventDefault();var a=e(this),o=t.getSelectorFromElement(this);e(o).each(function(){var t=e(this),n=t.data(l),o=n?'toggle':a.data();f._jQueryInterface.call(t,o)})}),e.fn[r]=f._jQueryInterface,e.fn[r].Constructor=f,e.fn[r].noConflict=function(){return e.fn[r]=s,f._jQueryInterface},f}(jQuery),u=function(e){var r='modal',l='bs.modal',i='.'+l,s=e.fn[r],d=300,c=150,_={backdrop:!0,keyboard:!0,focus:!0,show:!0},u={backdrop:'(boolean|string)',keyboard:'boolean',focus:'boolean',show:'boolean'},p={HIDE:'hide'+i,HIDDEN:'hidden'+i,SHOW:'show'+i,SHOWN:'shown'+i,FOCUSIN:'focusin'+i,RESIZE:'resize'+i,CLICK_DISMISS:'click.dismiss'+i,KEYDOWN_DISMISS:'keydown.dismiss'+i,MOUSEUP_DISMISS:'mouseup.dismiss'+i,MOUSEDOWN_DISMISS:'mousedown.dismiss'+i,CLICK_DATA_API:'click'+i+'.data-api'},g={SCROLLBAR_MEASURER:'modal-scrollbar-measure',BACKDROP:'modal-backdrop',OPEN:'modal-open',FADE:'fade',SHOW:'show'},m={DIALOG:'.modal-dialog',DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:'.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',NAVBAR_TOGGLER:'.navbar-toggler'},f=function(){function s(t,n){a(this,s),this._config=this._getConfig(n),this._element=t,this._dialog=e(t).find(m.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return o(s,[{key:'toggle',value:function(e){return this._isShown?this.hide():this.show(e)}},{key:'show',value:function(n){var a=this;if(!this._isTransitioning){t.supportsTransitionEnd()&&e(this._element).hasClass(g.FADE)&&(this._isTransitioning=!0);var o=e.Event(p.SHOW,{relatedTarget:n});e(this._element).trigger(o),this._isShown||o.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),e(document.body).addClass(g.OPEN),this._setEscapeEvent(),this._setResizeEvent(),e(this._element).on(p.CLICK_DISMISS,m.DATA_DISMISS,function(e){return a.hide(e)}),e(this._dialog).on(p.MOUSEDOWN_DISMISS,function(){e(a._element).one(p.MOUSEUP_DISMISS,function(t){e(t.target).is(a._element)&&(a._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return a._showElement(n)}))}}},{key:'hide',value:function(n){var a=this;if(n&&n.preventDefault(),!this._isTransitioning&&this._isShown){var o=t.supportsTransitionEnd()&&e(this._element).hasClass(g.FADE);o&&(this._isTransitioning=!0);var r=e.Event(p.HIDE);e(this._element).trigger(r),!this._isShown||r.isDefaultPrevented()||(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),e(document).off(p.FOCUSIN),e(this._element).removeClass(g.SHOW),e(this._element).off(p.CLICK_DISMISS),e(this._dialog).off(p.MOUSEDOWN_DISMISS),o?e(this._element).one(t.TRANSITION_END,function(e){return a._hideModal(e)}).emulateTransitionEnd(d):this._hideModal())}}},{key:'dispose',value:function(){e.removeData(this._element,l),e(window,document,this._element,this._backdrop).off(i),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null}},{key:'handleUpdate',value:function(){this._adjustDialog()}},{key:'_getConfig',value:function(n){return n=e.extend({},_,n),t.typeCheckConfig(r,n,u),n}},{key:'_showElement',value:function(n){var a=this,o=t.supportsTransitionEnd()&&e(this._element).hasClass(g.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display='block',this._element.removeAttribute('aria-hidden'),this._element.scrollTop=0,o&&t.reflow(this._element),e(this._element).addClass(g.SHOW),this._config.focus&&this._enforceFocus();var r=e.Event(p.SHOWN,{relatedTarget:n}),l=function(){a._config.focus&&a._element.focus(),a._isTransitioning=!1,e(a._element).trigger(r)};o?e(this._dialog).one(t.TRANSITION_END,l).emulateTransitionEnd(d):l()}},{key:'_enforceFocus',value:function(){var t=this;e(document).off(p.FOCUSIN).on(p.FOCUSIN,function(n){document===n.target||t._element===n.target||e(t._element).has(n.target).length||t._element.focus()})}},{key:'_setEscapeEvent',value:function(){var t=this;this._isShown&&this._config.keyboard?e(this._element).on(p.KEYDOWN_DISMISS,function(e){27===e.which&&(e.preventDefault(),t.hide())}):!this._isShown&&e(this._element).off(p.KEYDOWN_DISMISS)}},{key:'_setResizeEvent',value:function(){var t=this;this._isShown?e(window).on(p.RESIZE,function(e){return t.handleUpdate(e)}):e(window).off(p.RESIZE)}},{key:'_hideModal',value:function(){var t=this;this._element.style.display='none',this._element.setAttribute('aria-hidden',!0),this._isTransitioning=!1,this._showBackdrop(function(){e(document.body).removeClass(g.OPEN),t._resetAdjustments(),t._resetScrollbar(),e(t._element).trigger(p.HIDDEN)})}},{key:'_removeBackdrop',value:function(){this._backdrop&&(e(this._backdrop).remove(),this._backdrop=null)}},{key:'_showBackdrop',value:function(n){var a=this,o=e(this._element).hasClass(g.FADE)?g.FADE:'';if(this._isShown&&this._config.backdrop){var r=t.supportsTransitionEnd()&&o;if(this._backdrop=document.createElement('div'),this._backdrop.className=g.BACKDROP,o&&e(this._backdrop).addClass(o),e(this._backdrop).appendTo(document.body),e(this._element).on(p.CLICK_DISMISS,function(e){return a._ignoreBackdropClick?void(a._ignoreBackdropClick=!1):void(e.target!==e.currentTarget||('static'===a._config.backdrop?a._element.focus():a.hide()))}),r&&t.reflow(this._backdrop),e(this._backdrop).addClass(g.SHOW),!n)return;if(!r)return void n();e(this._backdrop).one(t.TRANSITION_END,n).emulateTransitionEnd(c)}else if(!this._isShown&&this._backdrop){e(this._backdrop).removeClass(g.SHOW);var l=function(){a._removeBackdrop(),n&&n()};t.supportsTransitionEnd()&&e(this._element).hasClass(g.FADE)?e(this._backdrop).one(t.TRANSITION_END,l).emulateTransitionEnd(c):l()}else n&&n()}},{key:'_adjustDialog',value:function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+'px'),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+'px')}},{key:'_resetAdjustments',value:function(){this._element.style.paddingLeft='',this._element.style.paddingRight=''}},{key:'_checkScrollbar',value:function(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()}},{key:'_setScrollbar',value:function(){var t=this;if(this._isBodyOverflowing){e(m.FIXED_CONTENT).each(function(n,a){var o=e(a)[0].style.paddingRight,r=e(a).css('padding-right');e(a).data('padding-right',o).css('padding-right',parseFloat(r)+t._scrollbarWidth+'px')}),e(m.NAVBAR_TOGGLER).each(function(n,a){var o=e(a)[0].style.marginRight,r=e(a).css('margin-right');e(a).data('margin-right',o).css('margin-right',parseFloat(r)+t._scrollbarWidth+'px')});var n=document.body.style.paddingRight,a=e('body').css('padding-right');e('body').data('padding-right',n).css('padding-right',parseFloat(a)+this._scrollbarWidth+'px')}}},{key:'_resetScrollbar',value:function(){e(m.FIXED_CONTENT).each(function(t,n){var a=e(n).data('padding-right');'undefined'!=typeof a&&e(n).css('padding-right',a).removeData('padding-right')}),e(m.NAVBAR_TOGGLER).each(function(t,n){var a=e(n).data('margin-right');'undefined'!=typeof a&&e(n).css('margin-right',a).removeData('margin-right')});var t=e('body').data('padding-right');'undefined'!=typeof t&&e('body').css('padding-right',t).removeData('padding-right')}},{key:'_getScrollbarWidth',value:function(){var e=document.createElement('div');e.className=g.SCROLLBAR_MEASURER,document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t}}],[{key:'_jQueryInterface',value:function(t,a){return this.each(function(){var o=e(this).data(l),r=e.extend({},s.Default,e(this).data(),'object'===('undefined'==typeof t?'undefined':n(t))&&t);if(o||(o=new s(this,r),e(this).data(l,o)),'string'==typeof t){if(void 0===o[t])throw new Error('No method named "'+t+'"');o[t](a)}else r.show&&o.show(a)})}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return _}}]),s}();return e(document).on(p.CLICK_DATA_API,m.DATA_TOGGLE,function(n){var a,o=this,r=t.getSelectorFromElement(this);r&&(a=e(r)[0]);var i=e(a).data(l)?'toggle':e.extend({},e(a).data(),e(this).data());('A'===this.tagName||'AREA'===this.tagName)&&n.preventDefault();var s=e(a).one(p.SHOW,function(t){t.isDefaultPrevented()||s.one(p.HIDDEN,function(){e(o).is(':visible')&&o.focus()})});f._jQueryInterface.call(e(a),i,this)}),e.fn[r]=f._jQueryInterface,e.fn[r].Constructor=f,e.fn[r].noConflict=function(){return e.fn[r]=s,f._jQueryInterface},f}(jQuery),p=function(e){if('undefined'==typeof Popper)throw new Error('Bootstrap tooltips require Popper.js (https://popper.js.org)');var r='tooltip',l='bs.tooltip',i='.'+l,s=e.fn[r],d=/(^|\s)bs-tooltip\S+/g,c={animation:'boolean',template:'string',title:'(string|element|function)',trigger:'string',delay:'(number|object)',html:'boolean',selector:'(string|boolean)',placement:'(string|function)',offset:'(number|string)',container:'(string|element|boolean)',fallbackPlacement:'(string|array)'},_={AUTO:'auto',TOP:'top',RIGHT:'right',BOTTOM:'bottom',LEFT:'left'},u={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:!1,selector:!1,placement:'top',offset:0,container:!1,fallbackPlacement:'flip'},p={SHOW:'show',OUT:'out'},g={HIDE:'hide'+i,HIDDEN:'hidden'+i,SHOW:'show'+i,SHOWN:'shown'+i,INSERTED:'inserted'+i,CLICK:'click'+i,FOCUSIN:'focusin'+i,FOCUSOUT:'focusout'+i,MOUSEENTER:'mouseenter'+i,MOUSELEAVE:'mouseleave'+i},m={FADE:'fade',SHOW:'show'},f={TOOLTIP:'.tooltip',TOOLTIP_INNER:'.tooltip-inner',ARROW:'.arrow'},E={HOVER:'hover',FOCUS:'focus',CLICK:'click',MANUAL:'manual'},h=function(){function s(e,t){a(this,s),this._isEnabled=!0,this._timeout=0,this._hoverState='',this._activeTrigger={},this._popper=null,this.element=e,this.config=this._getConfig(t),this.tip=null,this._setListeners()}return o(s,[{key:'enable',value:function(){this._isEnabled=!0}},{key:'disable',value:function(){this._isEnabled=!1}},{key:'toggleEnabled',value:function(){this._isEnabled=!this._isEnabled}},{key:'toggle',value:function(t){if(t){var n=this.constructor.DATA_KEY,a=e(t.currentTarget).data(n);a||(a=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(n,a)),a._activeTrigger.click=!a._activeTrigger.click,a._isWithActiveTrigger()?a._enter(null,a):a._leave(null,a)}else{if(e(this.getTipElement()).hasClass(m.SHOW))return void this._leave(null,this);this._enter(null,this)}}},{key:'dispose',value:function(){clearTimeout(this._timeout),e.removeData(this.element,this.constructor.DATA_KEY),e(this.element).off(this.constructor.EVENT_KEY),e(this.element).closest('.modal').off('hide.bs.modal'),this.tip&&e(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null}},{key:'show',value:function(){var n=this;if('none'===e(this.element).css('display'))throw new Error('Please use show on visible elements');var a=e.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){e(this.element).trigger(a);var o=e.contains(this.element.ownerDocument.documentElement,this.element);if(a.isDefaultPrevented()||!o)return;var r=this.getTipElement(),l=t.getUID(this.constructor.NAME);r.setAttribute('id',l),this.element.setAttribute('aria-describedby',l),this.setContent(),this.config.animation&&e(r).addClass(m.FADE);var i='function'==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,d=this._getAttachment(i);this.addAttachmentClass(d);var c=!1===this.config.container?document.body:e(this.config.container);e(r).data(this.constructor.DATA_KEY,this),e.contains(this.element.ownerDocument.documentElement,this.tip)||e(r).appendTo(c),e(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new Popper(this.element,r,{placement:d,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:f.ARROW}},onCreate:function(e){e.originalPlacement!==e.placement&&n._handlePopperPlacementChange(e)},onUpdate:function(e){n._handlePopperPlacementChange(e)}}),e(r).addClass(m.SHOW),'ontouchstart'in document.documentElement&&e('body').children().on('mouseover',null,e.noop);var _=function(){n.config.animation&&n._fixTransition();var t=n._hoverState;n._hoverState=null,e(n.element).trigger(n.constructor.Event.SHOWN),t===p.OUT&&n._leave(null,n)};t.supportsTransitionEnd()&&e(this.tip).hasClass(m.FADE)?e(this.tip).one(t.TRANSITION_END,_).emulateTransitionEnd(s._TRANSITION_DURATION):_()}}},{key:'hide',value:function(n){var a=this,o=this.getTipElement(),r=e.Event(this.constructor.Event.HIDE),l=function(){a._hoverState!==p.SHOW&&o.parentNode&&o.parentNode.removeChild(o),a._cleanTipClass(),a.element.removeAttribute('aria-describedby'),e(a.element).trigger(a.constructor.Event.HIDDEN),null!==a._popper&&a._popper.destroy(),n&&n()};e(this.element).trigger(r),r.isDefaultPrevented()||(e(o).removeClass(m.SHOW),'ontouchstart'in document.documentElement&&e('body').children().off('mouseover',null,e.noop),this._activeTrigger[E.CLICK]=!1,this._activeTrigger[E.FOCUS]=!1,this._activeTrigger[E.HOVER]=!1,t.supportsTransitionEnd()&&e(this.tip).hasClass(m.FADE)?e(o).one(t.TRANSITION_END,l).emulateTransitionEnd(150):l(),this._hoverState='')}},{key:'update',value:function(){null!==this._popper&&this._popper.scheduleUpdate()}},{key:'isWithContent',value:function(){return!!this.getTitle()}},{key:'addAttachmentClass',value:function(t){e(this.getTipElement()).addClass('bs-tooltip-'+t)}},{key:'getTipElement',value:function(){return this.tip=this.tip||e(this.config.template)[0]}},{key:'setContent',value:function(){var t=e(this.getTipElement());this.setElementContent(t.find(f.TOOLTIP_INNER),this.getTitle()),t.removeClass(m.FADE+' '+m.SHOW)}},{key:'setElementContent',value:function(t,a){var o=this.config.html;'object'===('undefined'==typeof a?'undefined':n(a))&&(a.nodeType||a.jquery)?o?!e(a).parent().is(t)&&t.empty().append(a):t.text(e(a).text()):t[o?'html':'text'](a)}},{key:'getTitle',value:function(){var e=this.element.getAttribute('data-original-title');return e||(e='function'==typeof this.config.title?this.config.title.call(this.element):this.config.title),e}},{key:'_getAttachment',value:function(e){return _[e.toUpperCase()]}},{key:'_setListeners',value:function(){var t=this,n=this.config.trigger.split(' ');n.forEach(function(n){if('click'===n)e(t.element).on(t.constructor.Event.CLICK,t.config.selector,function(e){return t.toggle(e)});else if(n!==E.MANUAL){var a=n===E.HOVER?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,o=n===E.HOVER?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;e(t.element).on(a,t.config.selector,function(e){return t._enter(e)}).on(o,t.config.selector,function(e){return t._leave(e)})}e(t.element).closest('.modal').on('hide.bs.modal',function(){return t.hide()})}),this.config.selector?this.config=e.extend({},this.config,{trigger:'manual',selector:''}):this._fixTitle()}},{key:'_fixTitle',value:function(){var e=n(this.element.getAttribute('data-original-title'));(this.element.getAttribute('title')||'string'!==e)&&(this.element.setAttribute('data-original-title',this.element.getAttribute('title')||''),this.element.setAttribute('title',''))}},{key:'_enter',value:function(t,n){var a=this.constructor.DATA_KEY;return(n=n||e(t.currentTarget).data(a),n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(a,n)),t&&(n._activeTrigger['focusin'===t.type?E.FOCUS:E.HOVER]=!0),e(n.getTipElement()).hasClass(m.SHOW)||n._hoverState===p.SHOW)?void(n._hoverState=p.SHOW):(clearTimeout(n._timeout),n._hoverState=p.SHOW,n.config.delay&&n.config.delay.show?void(n._timeout=setTimeout(function(){n._hoverState===p.SHOW&&n.show()},n.config.delay.show)):void n.show())}},{key:'_leave',value:function(t,n){var a=this.constructor.DATA_KEY;if(n=n||e(t.currentTarget).data(a),n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(a,n)),t&&(n._activeTrigger['focusout'===t.type?E.FOCUS:E.HOVER]=!1),!n._isWithActiveTrigger())return clearTimeout(n._timeout),n._hoverState=p.OUT,n.config.delay&&n.config.delay.hide?void(n._timeout=setTimeout(function(){n._hoverState===p.OUT&&n.hide()},n.config.delay.hide)):void n.hide()}},{key:'_isWithActiveTrigger',value:function(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1}},{key:'_getConfig',value:function(n){return n=e.extend({},this.constructor.Default,e(this.element).data(),n),n.delay&&'number'==typeof n.delay&&(n.delay={show:n.delay,hide:n.delay}),n.title&&'number'==typeof n.title&&(n.title=n.title.toString()),n.content&&'number'==typeof n.content&&(n.content=n.content.toString()),t.typeCheckConfig(r,n,this.constructor.DefaultType),n}},{key:'_getDelegateConfig',value:function(){var e={};if(this.config)for(var t in this.config)this.constructor.Default[t]!==this.config[t]&&(e[t]=this.config[t]);return e}},{key:'_cleanTipClass',value:function(){var t=e(this.getTipElement()),n=t.attr('class').match(d);null!==n&&0<n.length&&t.removeClass(n.join(''))}},{key:'_handlePopperPlacementChange',value:function(e){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(e.placement))}},{key:'_fixTransition',value:function(){var t=this.getTipElement(),n=this.config.animation;null!==t.getAttribute('x-placement')||(e(t).removeClass(m.FADE),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this).data(l),o='object'===('undefined'==typeof t?'undefined':n(t))&&t;if((a||!/dispose|hide/.test(t))&&(a||(a=new s(this,o),e(this).data(l,a)),'string'==typeof t)){if(void 0===a[t])throw new Error('No method named "'+t+'"');a[t]()}})}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return u}},{key:'NAME',get:function(){return r}},{key:'DATA_KEY',get:function(){return l}},{key:'Event',get:function(){return g}},{key:'EVENT_KEY',get:function(){return i}},{key:'DefaultType',get:function(){return c}}]),s}();return e.fn[r]=h._jQueryInterface,e.fn[r].Constructor=h,e.fn[r].noConflict=function(){return e.fn[r]=s,h._jQueryInterface},h}(jQuery),g=function(e){var t='popover',r='bs.popover',s='.'+r,d=e.fn[t],c=/(^|\s)bs-popover\S+/g,_=e.extend({},p.Default,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),u=e.extend({},p.DefaultType,{content:'(string|element|function)'}),g={FADE:'fade',SHOW:'show'},m={TITLE:'.popover-header',CONTENT:'.popover-body'},f={HIDE:'hide'+s,HIDDEN:'hidden'+s,SHOW:'show'+s,SHOWN:'shown'+s,INSERTED:'inserted'+s,CLICK:'click'+s,FOCUSIN:'focusin'+s,FOCUSOUT:'focusout'+s,MOUSEENTER:'mouseenter'+s,MOUSELEAVE:'mouseleave'+s},E=function(d){function p(){return a(this,p),i(this,(p.__proto__||Object.getPrototypeOf(p)).apply(this,arguments))}return l(p,d),o(p,[{key:'isWithContent',value:function(){return this.getTitle()||this._getContent()}},{key:'addAttachmentClass',value:function(t){e(this.getTipElement()).addClass('bs-popover-'+t)}},{key:'getTipElement',value:function(){return this.tip=this.tip||e(this.config.template)[0]}},{key:'setContent',value:function(){var t=e(this.getTipElement());this.setElementContent(t.find(m.TITLE),this.getTitle()),this.setElementContent(t.find(m.CONTENT),this._getContent()),t.removeClass(g.FADE+' '+g.SHOW)}},{key:'_getContent',value:function(){return this.element.getAttribute('data-content')||('function'==typeof this.config.content?this.config.content.call(this.element):this.config.content)}},{key:'_cleanTipClass',value:function(){var t=e(this.getTipElement()),n=t.attr('class').match(c);null!==n&&0<n.length&&t.removeClass(n.join(''))}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this).data(r),o='object'===('undefined'==typeof t?'undefined':n(t))?t:null;if((a||!/destroy|hide/.test(t))&&(a||(a=new p(this,o),e(this).data(r,a)),'string'==typeof t)){if(void 0===a[t])throw new Error('No method named "'+t+'"');a[t]()}})}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return _}},{key:'NAME',get:function(){return t}},{key:'DATA_KEY',get:function(){return r}},{key:'Event',get:function(){return f}},{key:'EVENT_KEY',get:function(){return s}},{key:'DefaultType',get:function(){return u}}]),p}(p);return e.fn[t]=E._jQueryInterface,e.fn[t].Constructor=E,e.fn[t].noConflict=function(){return e.fn[t]=d,E._jQueryInterface},E}(jQuery),m=function(r){var l='scrollspy',i='bs.scrollspy',s='.'+i,d=r.fn[l],c={offset:10,method:'auto',target:''},_={offset:'number',method:'string',target:'(string|element)'},u={ACTIVATE:'activate'+s,SCROLL:'scroll'+s,LOAD_DATA_API:'load'+s+'.data-api'},p={DROPDOWN_ITEM:'dropdown-item',DROPDOWN_MENU:'dropdown-menu',ACTIVE:'active'},g={DATA_SPY:'[data-spy="scroll"]',ACTIVE:'.active',NAV_LIST_GROUP:'.nav, .list-group',NAV_LINKS:'.nav-link',LIST_ITEMS:'.list-group-item',DROPDOWN:'.dropdown',DROPDOWN_ITEMS:'.dropdown-item',DROPDOWN_TOGGLE:'.dropdown-toggle'},m={OFFSET:'offset',POSITION:'position'},f=function(){function d(e,t){var n=this;a(this,d),this._element=e,this._scrollElement='BODY'===e.tagName?window:e,this._config=this._getConfig(t),this._selector=this._config.target+' '+g.NAV_LINKS+','+(this._config.target+' '+g.LIST_ITEMS+',')+(this._config.target+' '+g.DROPDOWN_ITEMS),this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,r(this._scrollElement).on(u.SCROLL,function(e){return n._process(e)}),this.refresh(),this._process()}return o(d,[{key:'refresh',value:function(){var e=this,n=this._scrollElement===this._scrollElement.window?m.OFFSET:m.POSITION,a='auto'===this._config.method?n:this._config.method,o=a===m.POSITION?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight();var l=r.makeArray(r(this._selector));l.map(function(e){var n,l=t.getSelectorFromElement(e);if(l&&(n=r(l)[0]),n){var i=n.getBoundingClientRect();if(i.width||i.height)return[r(n)[a]().top+o,l]}return null}).filter(function(e){return e}).sort(function(e,t){return e[0]-t[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})}},{key:'dispose',value:function(){r.removeData(this._element,i),r(this._scrollElement).off(s),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null}},{key:'_getConfig',value:function(e){if(e=r.extend({},c,e),'string'!=typeof e.target){var n=r(e.target).attr('id');n||(n=t.getUID(l),r(e.target).attr('id',n)),e.target='#'+n}return t.typeCheckConfig(l,e,_),e}},{key:'_getScrollTop',value:function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop}},{key:'_getScrollHeight',value:function(){return this._scrollElement.scrollHeight||e(document.body.scrollHeight,document.documentElement.scrollHeight)}},{key:'_getOffsetHeight',value:function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height}},{key:'_process',value:function(){var e=this._getScrollTop()+this._config.offset,t=this._getScrollHeight(),n=this._config.offset+t-this._getOffsetHeight();if(this._scrollHeight!==t&&this.refresh(),e>=n){var a=this._targets[this._targets.length-1];return void(this._activeTarget!==a&&this._activate(a))}if(this._activeTarget&&e<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var o,r=this._offsets.length;r--;)o=this._activeTarget!==this._targets[r]&&e>=this._offsets[r]&&(void 0===this._offsets[r+1]||e<this._offsets[r+1]),o&&this._activate(this._targets[r])}},{key:'_activate',value:function(e){this._activeTarget=e,this._clear();var t=this._selector.split(',');t=t.map(function(t){return t+'[data-target="'+e+'"],'+(t+'[href="'+e+'"]')});var n=r(t.join(','));n.hasClass(p.DROPDOWN_ITEM)?(n.closest(g.DROPDOWN).find(g.DROPDOWN_TOGGLE).addClass(p.ACTIVE),n.addClass(p.ACTIVE)):(n.addClass(p.ACTIVE),n.parents(g.NAV_LIST_GROUP).prev(g.NAV_LINKS+', '+g.LIST_ITEMS).addClass(p.ACTIVE)),r(this._scrollElement).trigger(u.ACTIVATE,{relatedTarget:e})}},{key:'_clear',value:function(){r(this._selector).filter(g.ACTIVE).removeClass(p.ACTIVE)}}],[{key:'_jQueryInterface',value:function(e){return this.each(function(){var t=r(this).data(i),a='object'===('undefined'==typeof e?'undefined':n(e))&&e;if(t||(t=new d(this,a),r(this).data(i,t)),'string'==typeof e){if(void 0===t[e])throw new Error('No method named "'+e+'"');t[e]()}})}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return c}}]),d}();return r(window).on(u.LOAD_DATA_API,function(){for(var e,t=r.makeArray(r(g.DATA_SPY)),n=t.length;n--;)e=r(t[n]),f._jQueryInterface.call(e,e.data())}),r.fn[l]=f._jQueryInterface,r.fn[l].Constructor=f,r.fn[l].noConflict=function(){return r.fn[l]=d,f._jQueryInterface},f}(jQuery),f=function(e){var n='tab',r='bs.tab',l='.'+r,i=e.fn[n],s={HIDE:'hide'+l,HIDDEN:'hidden'+l,SHOW:'show'+l,SHOWN:'shown'+l,CLICK_DATA_API:'click'+l+'.data-api'},d={DROPDOWN_MENU:'dropdown-menu',ACTIVE:'active',DISABLED:'disabled',FADE:'fade',SHOW:'show'},c={DROPDOWN:'.dropdown',NAV_LIST_GROUP:'.nav, .list-group',ACTIVE:'.active',DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',DROPDOWN_TOGGLE:'.dropdown-toggle',DROPDOWN_ACTIVE_CHILD:'> .dropdown-menu .active'},_=function(){function n(e){a(this,n),this._element=e}return o(n,[{key:'show',value:function(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&e(this._element).hasClass(d.ACTIVE)||e(this._element).hasClass(d.DISABLED))){var a,o,r=e(this._element).closest(c.NAV_LIST_GROUP)[0],l=t.getSelectorFromElement(this._element);r&&(o=e.makeArray(e(r).find(c.ACTIVE)),o=o[o.length-1]);var i=e.Event(s.HIDE,{relatedTarget:this._element}),_=e.Event(s.SHOW,{relatedTarget:o});if(o&&e(o).trigger(i),e(this._element).trigger(_),!(_.isDefaultPrevented()||i.isDefaultPrevented())){l&&(a=e(l)[0]),this._activate(this._element,r);var u=function(){var t=e.Event(s.HIDDEN,{relatedTarget:n._element}),a=e.Event(s.SHOWN,{relatedTarget:o});e(o).trigger(t),e(n._element).trigger(a)};a?this._activate(a,a.parentNode,u):u()}}}},{key:'dispose',value:function(){e.removeData(this._element,r),this._element=null}},{key:'_activate',value:function(n,a,o){var r=this,l=e(a).find(c.ACTIVE)[0],i=o&&t.supportsTransitionEnd()&&l&&e(l).hasClass(d.FADE),s=function(){return r._transitionComplete(n,l,i,o)};l&&i?e(l).one(t.TRANSITION_END,s).emulateTransitionEnd(150):s(),l&&e(l).removeClass(d.SHOW)}},{key:'_transitionComplete',value:function(n,a,o,r){if(a){e(a).removeClass(d.ACTIVE);var l=e(a.parentNode).find(c.DROPDOWN_ACTIVE_CHILD)[0];l&&e(l).removeClass(d.ACTIVE),a.setAttribute('aria-expanded',!1)}if(e(n).addClass(d.ACTIVE),n.setAttribute('aria-expanded',!0),o?(t.reflow(n),e(n).addClass(d.SHOW)):e(n).removeClass(d.FADE),n.parentNode&&e(n.parentNode).hasClass(d.DROPDOWN_MENU)){var i=e(n).closest(c.DROPDOWN)[0];i&&e(i).find(c.DROPDOWN_TOGGLE).addClass(d.ACTIVE),n.setAttribute('aria-expanded',!0)}r&&r()}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(r);if(o||(o=new n(this),a.data(r,o)),'string'==typeof t){if(void 0===o[t])throw new Error('No method named "'+t+'"');o[t]()}})}},{key:'VERSION',get:function(){return'4.0.0-beta'}}]),n}();return e(document).on(s.CLICK_DATA_API,c.DATA_TOGGLE,function(t){t.preventDefault(),_._jQueryInterface.call(e(this),'show')}),e.fn[n]=_._jQueryInterface,e.fn[n].Constructor=_,e.fn[n].noConflict=function(){return e.fn[n]=i,_._jQueryInterface},_}(jQuery),E=function(){function e(){if(window.QUnit)return!1;var e=document.createElement('bmd');for(var t in a)if(void 0!==e.style[t])return a[t];return!1}var t=!1,n='',a={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'};return function(){for(var o in t=e(),a)n+=' '+a[o]}(),{transitionEndSupported:function(){return t},transitionEndSelector:function(){return n},isChar:function(e){return'undefined'==typeof e.which||'number'==typeof e.which&&0<e.which&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&8!==e.which&&9!==e.which&&13!==e.which&&16!==e.which&&17!==e.which&&20!==e.which&&27!==e.which},assert:function(e,t,n){if(t)throw void 0===!e&&e.css('border','1px solid red'),console.error(n,e),n},describe:function(e){return void 0===e?'undefined':0===e.length?'(no matching elements)':e[0].outerHTML.split('>')[0]+'>'}}}(jQuery),h=function(e){var t={BMD_FORM_GROUP:'bmd-form-group',IS_FILLED:'is-filled',IS_FOCUSED:'is-focused'},n={BMD_FORM_GROUP:'.'+t.BMD_FORM_GROUP},r={},l=function(){function l(t,n){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};for(var i in a(this,l),this.$element=t,this.config=e.extend(!0,{},r,n),o)this[i]=o[i]}return o(l,[{key:'dispose',value:function(e){this.$element.data(e,null),this.$element=null,this.config=null}},{key:'addFormGroupFocus',value:function(){this.$element.prop('disabled')||this.$bmdFormGroup.addClass(t.IS_FOCUSED)}},{key:'removeFormGroupFocus',value:function(){this.$bmdFormGroup.removeClass(t.IS_FOCUSED)}},{key:'removeIsFilled',value:function(){this.$bmdFormGroup.removeClass(t.IS_FILLED)}},{key:'addIsFilled',value:function(){this.$bmdFormGroup.addClass(t.IS_FILLED)}},{key:'findMdbFormGroup',value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,a=this.$element.closest(n.BMD_FORM_GROUP);return 0===a.length&&t&&e.error('Failed to find '+n.BMD_FORM_GROUP+' for '+E.describe(this.$element)),a}}]),l}();return l}(jQuery),y=function(e){var t={FORM_GROUP:'form-group',BMD_FORM_GROUP:'bmd-form-group',BMD_LABEL:'bmd-label',BMD_LABEL_STATIC:'bmd-label-static',BMD_LABEL_PLACEHOLDER:'bmd-label-placeholder',BMD_LABEL_FLOATING:'bmd-label-floating',HAS_DANGER:'has-danger',IS_FILLED:'is-filled',IS_FOCUSED:'is-focused',INPUT_GROUP:'input-group'},n={FORM_GROUP:'.'+t.FORM_GROUP,BMD_FORM_GROUP:'.'+t.BMD_FORM_GROUP,BMD_LABEL_WILDCARD:'label[class^=\''+t.BMD_LABEL+'\'], label[class*=\' '+t.BMD_LABEL+'\']'},s={validate:!1,formGroup:{required:!1},bmdFormGroup:{template:'<span class=\''+t.BMD_FORM_GROUP+'\'></span>',create:!0,required:!0},label:{required:!1,selectors:['.form-control-label','> label'],className:t.BMD_LABEL_STATIC},requiredClasses:[],invalidComponentMatches:[],convertInputSizeVariations:!0},d={"form-control-lg":'bmd-form-group-lg',"form-control-sm":'bmd-form-group-sm'},c=function(c){function _(t,n){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};a(this,_);var r=i(this,(_.__proto__||Object.getPrototypeOf(_)).call(this,t,e.extend(!0,{},s,n),o));return r._rejectInvalidComponentMatches(),r.rejectWithoutRequiredStructure(),r._rejectWithoutRequiredClasses(),r.$formGroup=r.findFormGroup(r.config.formGroup.required),r.$bmdFormGroup=r.resolveMdbFormGroup(),r.$bmdLabel=r.resolveMdbLabel(),r.resolveMdbFormGroupSizing(),r.addFocusListener(),r.addChangeListener(),''!=r.$element.val()&&r.addIsFilled(),r}return l(_,c),o(_,[{key:'dispose',value:function(e){r(_.prototype.__proto__||Object.getPrototypeOf(_.prototype),'dispose',this).call(this,e),this.$bmdFormGroup=null,this.$formGroup=null}},{key:'rejectWithoutRequiredStructure',value:function(){}},{key:'addFocusListener',value:function(){var e=this;this.$element.on('focus',function(){e.addFormGroupFocus()}).on('blur',function(){e.removeFormGroupFocus()})}},{key:'addChangeListener',value:function(){var e=this;this.$element.on('keydown paste',function(t){E.isChar(t)&&e.addIsFilled()}).on('keyup change',function(){if(e.isEmpty()?e.removeIsFilled():e.addIsFilled(),e.config.validate){var t='undefined'==typeof e.$element[0].checkValidity||e.$element[0].checkValidity();t?e.removeHasDanger():e.addHasDanger()}})}},{key:'addHasDanger',value:function(){this.$bmdFormGroup.addClass(t.HAS_DANGER)}},{key:'removeHasDanger',value:function(){this.$bmdFormGroup.removeClass(t.HAS_DANGER)}},{key:'isEmpty',value:function(){return null===this.$element.val()||void 0===this.$element.val()||''===this.$element.val()}},{key:'resolveMdbFormGroup',value:function(){var e=this.findMdbFormGroup(!1);return(void 0===e||0===e.length)&&(this.config.bmdFormGroup.create&&(void 0===this.$formGroup||0===this.$formGroup.length)?this.outerElement().parent().hasClass(t.INPUT_GROUP)?this.outerElement().parent().wrap(this.config.bmdFormGroup.template):this.outerElement().wrap(this.config.bmdFormGroup.template):this.$formGroup.addClass(t.BMD_FORM_GROUP),e=this.findMdbFormGroup(this.config.bmdFormGroup.required)),e}},{key:'outerElement',value:function(){return this.$element}},{key:'resolveMdbLabel',value:function(){var e=this.$bmdFormGroup.find(n.BMD_LABEL_WILDCARD);return(void 0===e||0===e.length)&&(e=this.findMdbLabel(this.config.label.required),void 0===e||0===e.length||e.addClass(this.config.label.className)),e}},{key:'findMdbLabel',value:function(){var t,a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,o=null,r=!0,l=!1;try{for(var i,s,d=this.config.label.selectors[Symbol.iterator]();!(r=(i=d.next()).done)&&(s=i.value,o=e.isFunction(s)?s(this):this.$bmdFormGroup.find(s),!(void 0!==o&&0<o.length));r=!0);}catch(e){l=!0,t=e}finally{try{!r&&d.return&&d.return()}finally{if(l)throw t}}return 0===o.length&&a&&e.error('Failed to find '+n.BMD_LABEL_WILDCARD+' within form-group for '+E.describe(this.$element)),o}},{key:'findFormGroup',value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,a=this.$element.closest(n.FORM_GROUP);return 0===a.length&&t&&e.error('Failed to find '+n.FORM_GROUP+' for '+E.describe(this.$element)),a}},{key:'resolveMdbFormGroupSizing',value:function(){if(this.config.convertInputSizeVariations)for(var e in d)this.$element.hasClass(e)&&this.$bmdFormGroup.addClass(d[e])}},{key:'_rejectInvalidComponentMatches',value:function(){var e,t=!0,n=!1;try{for(var a,o,r=this.config.invalidComponentMatches[Symbol.iterator]();!(t=(a=r.next()).done);t=!0)o=a.value,o.rejectMatch(this.constructor.name,this.$element)}catch(t){n=!0,e=t}finally{try{!t&&r.return&&r.return()}finally{if(n)throw e}}}},{key:'_rejectWithoutRequiredClasses',value:function(){var t,n=!0,a=!1;try{for(var o,r=this.config.requiredClasses[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value,i=!1;if(-1!==l.indexOf('||')){var s=l.split('||'),d=!0,c=!1,_=void 0;try{for(var u,p,g=s[Symbol.iterator]();!(d=(u=g.next()).done);d=!0)if(p=u.value,this.$element.hasClass(p)){i=!0;break}}catch(e){c=!0,_=e}finally{try{!d&&g.return&&g.return()}finally{if(c)throw _}}}else this.$element.hasClass(l)&&(i=!0);i||e.error(this.constructor.name+' element: '+E.describe(this.$element)+' requires class: '+l)}}catch(e){a=!0,t=e}finally{try{!n&&r.return&&r.return()}finally{if(a)throw t}}}}]),_}(h);return c}(jQuery),A=function(e){var t={label:{required:!1}},n={LABEL:'label'},r=function(r){function s(n,o,r){a(this,s);var l=i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,n,e.extend(!0,{},t,o),r));return l.decorateMarkup(),l}return l(s,r),o(s,[{key:'decorateMarkup',value:function(){var t=e(this.config.template);this.$element.after(t),!1!==this.config.ripples&&t.bmdRipples()}},{key:'outerElement',value:function(){return this.$element.parent().closest('.'+this.outerClass)}},{key:'rejectWithoutRequiredStructure',value:function(){E.assert(this.$element,'label'===!this.$element.parent().prop('tagName'),this.constructor.name+'\'s '+E.describe(this.$element)+' parent element should be <label>.'),E.assert(this.$element,!this.outerElement().hasClass(this.outerClass),this.constructor.name+'\'s '+E.describe(this.$element)+' outer element should have class '+this.outerClass+'.')}},{key:'addFocusListener',value:function(){var e=this;this.$element.closest(n.LABEL).hover(function(){e.addFormGroupFocus()},function(){e.removeFormGroupFocus()})}},{key:'addChangeListener',value:function(){var e=this;this.$element.change(function(){e.$element.blur()})}}]),s}(y);return r}(jQuery),v=function(e){var t='checkbox',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={template:'<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'},_=function(s){function d(n,o){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{inputType:t,outerClass:t};return a(this,d),i(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,n,e.extend(!0,c,o),r))}return l(d,s),o(d,[{key:'dispose',value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:n;r(d.prototype.__proto__||Object.getPrototypeOf(d.prototype),'dispose',this).call(this,e)}}],[{key:'matches',value:function(e){return'checkbox'===e.attr('type')}},{key:'rejectMatch',value:function(e,t){E.assert(this.$element,this.matches(t),e+' component element '+E.describe(t)+' is invalid for type=\'checkbox\'.')}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new d(a,t),a.data(n,o))})}}]),d}(A);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),C=function(e){var t='checkboxInline',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={bmdFormGroup:{create:!1,required:!1}},_=function(t){function s(t,n){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{inputType:'checkbox',outerClass:'checkbox-inline'};return a(this,s),i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,{},c,n),o))}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(v);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),I=function(e){var t='collapseInline',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={ANY_INPUT:'input, select, textarea'},_={IN:'in',COLLAPSE:'collapse',COLLAPSING:'collapsing',COLLAPSED:'collapsed',WIDTH:'width'},u={},p=function(t){function s(t,n){a(this,s);var o=i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,{},u,n)));o.$bmdFormGroup=o.findMdbFormGroup(!0);var r=t.data('target');o.$collapse=e(r),E.assert(t,0===o.$collapse.length,'Cannot find collapse target for '+E.describe(t)),E.assert(o.$collapse,!o.$collapse.hasClass(_.COLLAPSE),E.describe(o.$collapse)+' is expected to have the \''+_.COLLAPSE+'\' class.  It is being targeted by '+E.describe(t));var l=o.$bmdFormGroup.find(c.ANY_INPUT);return 0<l.length&&(o.$input=l.first()),o.$collapse.hasClass(_.WIDTH)||o.$collapse.addClass(_.WIDTH),o.$input&&(o.$collapse.on('shown.bs.collapse',function(){o.$input.focus()}),o.$input.blur(function(){o.$collapse.collapse('hide')})),o}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n),this.$bmdFormGroup=null,this.$collapse=null,this.$input=null}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(h);return e.fn[s]=p._jQueryInterface,e.fn[s].Constructor=p,e.fn[s].noConflict=function(){return e.fn[s]=d,p._jQueryInterface},p}(jQuery),T=function(e){var t='file',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={},_={FILE:t,IS_FILE:'is-file'},u={FILENAMES:'input.form-control[readonly]'},p=function(t){function s(t,n){a(this,s);var o=i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,c,n)));return o.$bmdFormGroup.addClass(_.IS_FILE),o}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}},{key:'outerElement',value:function(){return this.$element.parent().closest('.'+_.FILE)}},{key:'rejectWithoutRequiredStructure',value:function(){E.assert(this.$element,'label'===!this.outerElement().prop('tagName'),this.constructor.name+'\'s '+E.describe(this.$element)+' parent element '+E.describe(this.outerElement())+' should be <label>.'),E.assert(this.$element,!this.outerElement().hasClass(_.FILE),this.constructor.name+'\'s '+E.describe(this.$element)+' parent element '+E.describe(this.outerElement())+' should have class .'+_.FILE+'.')}},{key:'addFocusListener',value:function(){var e=this;this.$bmdFormGroup.on('focus',function(){e.addFormGroupFocus()}).on('blur',function(){e.removeFormGroupFocus()})}},{key:'addChangeListener',value:function(){var t=this;this.$element.on('change',function(){var n='';e.each(t.$element.files,function(e,t){n+=t.name+'  , '}),n=n.substring(0,n.length-2),n?t.addIsFilled():t.removeIsFilled(),t.$bmdFormGroup.find(u.FILENAMES).val(n)})}}],[{key:'matches',value:function(e){return'file'===e.attr('type')}},{key:'rejectMatch',value:function(e,t){E.assert(this.$element,this.matches(t),e+' component element '+E.describe(t)+' is invalid for type=\'file\'.')}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(y);return e.fn[s]=p._jQueryInterface,e.fn[s].Constructor=p,e.fn[s].noConflict=function(){return e.fn[s]=d,p._jQueryInterface},p}(jQuery),O=function(e){var t='radio',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={template:'<span class=\'bmd-radio\'></span>'},_=function(s){function d(n,o){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{inputType:t,outerClass:t};return a(this,d),i(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,n,e.extend(!0,c,o),r))}return l(d,s),o(d,[{key:'dispose',value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:n;r(d.prototype.__proto__||Object.getPrototypeOf(d.prototype),'dispose',this).call(this,e)}}],[{key:'matches',value:function(e){return'radio'===e.attr('type')}},{key:'rejectMatch',value:function(e,t){E.assert(this.$element,this.matches(t),e+' component element '+E.describe(t)+' is invalid for type=\'radio\'.')}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new d(a,t),a.data(n,o))})}}]),d}(A);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),N=function(e){var t='radioInline',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={bmdFormGroup:{create:!1,required:!1}},_=function(t){function s(t,n){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{inputType:'radio',outerClass:'radio-inline'};return a(this,s),i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,{},c,n),o))}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(O);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),b=function(e){var t={requiredClasses:['form-control']},n=function(n){function o(n,r){a(this,o);var l=i(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,n,e.extend(!0,t,r)));return l.isEmpty()&&l.removeIsFilled(),l}return l(o,n),o}(y);return n}(jQuery),k=function(e){var t='select',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={requiredClasses:['form-control||custom-select']},_=function(t){function s(t,n){a(this,s);var o=i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,c,n)));return o.addIsFilled(),o}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}}],[{key:'matches',value:function(e){return'select'===e.prop('tagName')}},{key:'rejectMatch',value:function(e,t){E.assert(this.$element,this.matches(t),e+' component element '+E.describe(t)+' is invalid for <select>.')}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(b);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),D=function(e){var t='switch',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={template:'<span class=\'bmd-switch-track\'></span>'},_=function(t){function s(t,n){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{inputType:'checkbox',outerClass:'switch'};return a(this,s),i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,{},c,n),o))}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(v);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),S=function(e){var t='text',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={},_=function(t){function s(t,n){return a(this,s),i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,c,n)))}return l(s,t),o(s,[{key:'dispose',value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:n;r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,e)}}],[{key:'matches',value:function(e){return'text'===e.attr('type')}},{key:'rejectMatch',value:function(e,t){E.assert(this.$element,this.matches(t),e+' component element '+E.describe(t)+' is invalid for type=\'text\'.')}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(b);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),R=function(e){var t='textarea',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={},_=function(t){function s(t,n){return a(this,s),i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,c,n)))}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}}],[{key:'matches',value:function(e){return'textarea'===e.prop('tagName')}},{key:'rejectMatch',value:function(e,t){E.assert(this.$element,this.matches(t),e+' component element '+E.describe(t)+' is invalid for <textarea>.')}},{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(b);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery),M=function(e){if('undefined'==typeof Popper)throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');var r='dropdown',l='bs.dropdown',i='.'+l,s='.data-api',d=e.fn[r],c=27,_=32,u=9,p=/38|40|27/,g={HIDE:'hide'+i,HIDDEN:'hidden'+i,SHOW:'show'+i,SHOWN:'shown'+i,CLICK:'click'+i,CLICK_DATA_API:'click'+i+s,KEYDOWN_DATA_API:'keydown'+i+s,KEYUP_DATA_API:'keyup'+i+s,TRANSITION_END:'transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd'},m={DISABLED:'disabled',SHOW:'show',SHOWING:'showing',HIDING:'hiding',DROPUP:'dropup',MENURIGHT:'dropdown-menu-right',MENULEFT:'dropdown-menu-left'},f={DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:'.dropdown form',MENU:'.dropdown-menu',NAVBAR_NAV:'.navbar-nav',VISIBLE_ITEMS:'.dropdown-menu .dropdown-item:not(.disabled)'},E={TOP:'top-start',TOPEND:'top-end',BOTTOM:'bottom-start',BOTTOMEND:'bottom-end'},h={placement:E.BOTTOM,offset:0,flip:!0},y={placement:'string',offset:'(number|string)',flip:'boolean'},A=function(){function s(e,t){a(this,s),this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}return o(s,[{key:'toggle',value:function(){var t=this;if(!(this._element.disabled||e(this._element).hasClass(m.DISABLED))){var n=s._getParentFromElement(this._element),a=e(this._menu).hasClass(m.SHOW);if(s._clearMenus(),!a){var o={relatedTarget:this._element},r=e.Event(g.SHOW,o);if(e(n).trigger(r),!r.isDefaultPrevented()){var l=this._element;e(n).hasClass(m.DROPUP)&&(e(this._menu).hasClass(m.MENULEFT)||e(this._menu).hasClass(m.MENURIGHT))&&(l=n),this._popper=new Popper(l,this._menu,this._getPopperConfig()),'ontouchstart'in document.documentElement&&!e(n).closest(f.NAVBAR_NAV).length&&e('body').children().on('mouseover',null,e.noop),this._element.focus(),this._element.setAttribute('aria-expanded',!0),e(this._menu).one(g.TRANSITION_END,function(){e(n).trigger(e.Event(g.SHOWN,o)),e(t._menu).removeClass(m.SHOWING)}),e(this._menu).addClass(m.SHOW+' '+m.SHOWING),e(n).addClass(m.SHOW)}}}}},{key:'dispose',value:function(){e.removeData(this._element,l),e(this._element).off(i),this._element=null,this._menu=null,null!==this._popper&&this._popper.destroy(),this._popper=null}},{key:'update',value:function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()}},{key:'_addEventListeners',value:function(){var t=this;e(this._element).on(g.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})}},{key:'_getConfig',value:function(n){var a=e(this._element).data();return void 0!==a.placement&&(a.placement=E[a.placement.toUpperCase()]),n=e.extend({},this.constructor.Default,e(this._element).data(),n),t.typeCheckConfig(r,n,this.constructor.DefaultType),n}},{key:'_getMenuElement',value:function(){if(!this._menu){var t=s._getParentFromElement(this._element);this._menu=e(t).find(f.MENU)[0]}return this._menu}},{key:'_getPlacement',value:function(){var t=e(this._element).parent(),n=this._config.placement;return t.hasClass(m.DROPUP)||this._config.placement===E.TOP?(n=E.TOP,e(this._menu).hasClass(m.MENURIGHT)&&(n=E.TOPEND)):e(this._menu).hasClass(m.MENURIGHT)&&(n=E.BOTTOMEND),n}},{key:'_detectNavbar',value:function(){return 0<e(this._element).closest('.navbar').length}},{key:'_getPopperConfig',value:function(){var e={placement:this._getPlacement(),modifiers:{offset:{offset:this._config.offset},flip:{enabled:this._config.flip}}};return this._inNavbar&&(e.modifiers.applyStyle={enabled:!this._inNavbar}),e}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this).data(l),o='object'===('undefined'==typeof t?'undefined':n(t))?t:null;if(a||(a=new s(this,o),e(this).data(l,a)),'string'==typeof t){if(void 0===a[t])throw new Error('No method named "'+t+'"');a[t]()}})}},{key:'_clearMenus',value:function(t){if(!(t&&(3===t.which||'keyup'===t.type&&t.which!==u)))for(var n,a=e.makeArray(e(f.DATA_TOGGLE)),o=function(n){var o=s._getParentFromElement(a[n]),r=e(a[n]).data(l),i={relatedTarget:a[n]};if(!r)return'continue';var d=r._menu;if(!e(o).hasClass(m.SHOW))return'continue';if(t&&('click'===t.type&&/input|textarea/i.test(t.target.tagName)||'keyup'===t.type&&t.which===u)&&e.contains(o,t.target))return'continue';var c=e.Event(g.HIDE,i);return e(o).trigger(c),c.isDefaultPrevented()?'continue':void(('ontouchstart'in document.documentElement)&&e('body').children().off('mouseover',null,e.noop),a[n].setAttribute('aria-expanded','false'),e(d).addClass(m.HIDING).removeClass(m.SHOW),e(o).removeClass(m.SHOW),e(d).one(g.TRANSITION_END,function(){e(o).trigger(e.Event(g.HIDDEN,i)),e(d).removeClass(m.HIDING)}))},r=0;r<a.length;r++)n=o(r),'continue'===n}},{key:'_getParentFromElement',value:function(n){var a,o=t.getSelectorFromElement(n);return o&&(a=e(o)[0]),a||n.parentNode}},{key:'_dataApiKeydownHandler',value:function(t){if(!(!p.test(t.which)||/button/i.test(t.target.tagName)&&t.which===_||/input|textarea/i.test(t.target.tagName))&&(t.preventDefault(),t.stopPropagation(),!(this.disabled||e(this).hasClass(m.DISABLED)))){var n=s._getParentFromElement(this),a=e(n).hasClass(m.SHOW);if(!a&&(t.which!==c||t.which!==_)||a&&(t.which===c||t.which===_)){if(t.which===c){var o=e(n).find(f.DATA_TOGGLE)[0];e(o).trigger('focus')}return void e(this).trigger('click')}var r=e(n).find(f.VISIBLE_ITEMS).get();if(r.length){var l=r.indexOf(t.target);38===t.which&&0<l&&l--,40===t.which&&l<r.length-1&&l++,0>l&&(l=0),r[l].focus()}}}},{key:'VERSION',get:function(){return'4.0.0-beta'}},{key:'Default',get:function(){return h}},{key:'DefaultType',get:function(){return y}}]),s}();return e(document).on(g.KEYDOWN_DATA_API,f.DATA_TOGGLE,A._dataApiKeydownHandler).on(g.KEYDOWN_DATA_API,f.MENU,A._dataApiKeydownHandler).on(g.CLICK_DATA_API+' '+g.KEYUP_DATA_API,A._clearMenus).on(g.CLICK_DATA_API,f.DATA_TOGGLE,function(t){t.preventDefault(),t.stopPropagation(),A._jQueryInterface.call(e(this),'toggle')}).on(g.CLICK_DATA_API,f.FORM_CHILD,function(t){t.stopPropagation()}),e.fn[r]=A._jQueryInterface,e.fn[r].Constructor=A,e.fn[r].noConflict=function(){return e.fn[r]=d,A._jQueryInterface},A}(jQuery),L=function(e){var t={CANVAS:'bmd-layout-canvas',CONTAINER:'bmd-layout-container',BACKDROP:'bmd-layout-backdrop'},n={CANVAS:'.'+t.CANVAS,CONTAINER:'.'+t.CONTAINER,BACKDROP:'.'+t.BACKDROP},s={canvas:{create:!0,required:!0,template:'<div class="'+t.CANVAS+'"></div>'},backdrop:{create:!0,required:!0,template:'<div class="'+t.BACKDROP+'"></div>'}},d=function(t){function d(t,n){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};a(this,d);var r=i(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,t,e.extend(!0,{},s,n),o));return r.$container=r.findContainer(!0),r.$backdrop=r.resolveBackdrop(),r.resolveCanvas(),r}return l(d,t),o(d,[{key:'dispose',value:function(e){r(d.prototype.__proto__||Object.getPrototypeOf(d.prototype),'dispose',this).call(this,e),this.$container=null,this.$backdrop=null}},{key:'resolveCanvas',value:function(){var e=this.findCanvas(!1);return(void 0===e||0===e.length)&&(this.config.canvas.create&&this.$container.wrap(this.config.canvas.template),e=this.findCanvas(this.config.canvas.required)),e}},{key:'findCanvas',value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.$container,o=a.closest(n.CANVAS);return 0===o.length&&t&&e.error('Failed to find '+n.CANVAS+' for '+E.describe(a)),o}},{key:'resolveBackdrop',value:function(){var e=this.findBackdrop(!1);return(void 0===e||0===e.length)&&(this.config.backdrop.create&&this.$container.append(this.config.backdrop.template),e=this.findBackdrop(this.config.backdrop.required)),e}},{key:'findBackdrop',value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.$container,o=a.find('> '+n.BACKDROP);return 0===o.length&&t&&e.error('Failed to find '+n.BACKDROP+' for '+E.describe(a)),o}},{key:'findContainer',value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.$element,o=a.closest(n.CONTAINER);return 0===o.length&&t&&e.error('Failed to find '+n.CONTAINER+' for '+E.describe(a)),o}}]),d}(h);return d}(jQuery),P=function(e){var t='drawer',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={ESCAPE:27},_={IN:'in',DRAWER_IN:'bmd-drawer-in',DRAWER_OUT:'bmd-drawer-out',DRAWER:'bmd-layout-drawer',CONTAINER:'bmd-layout-container'},u={focusSelector:'a, button, input'},p=function(t){function s(t,n){a(this,s);var o=i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,{},u,n)));return o.$toggles=e('[data-toggle="drawer"][href="#'+o.$element[0].id+'"], [data-toggle="drawer"][data-target="#'+o.$element[0].id+'"]'),o._addAria(),o.$backdrop.keydown(function(e){e.which===c.ESCAPE&&o.hide()}).click(function(){o.hide()}),o.$element.keydown(function(e){e.which===c.ESCAPE&&o.hide()}),o.$toggles.click(function(){o.toggle()}),o}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n),this.$toggles=null}},{key:'toggle',value:function(){this._isOpen()?this.hide():this.show()}},{key:'show',value:function(){if(!(this._isForcedClosed()||this._isOpen())){this.$toggles.attr('aria-expanded',!0),this.$element.attr('aria-expanded',!0),this.$element.attr('aria-hidden',!1);var e=this.$element.find(this.config.focusSelector);0<e.length&&e.first().focus(),this.$container.addClass(_.DRAWER_IN),this.$backdrop.addClass(_.IN)}}},{key:'hide',value:function(){this._isOpen()&&(this.$toggles.attr('aria-expanded',!1),this.$element.attr('aria-expanded',!1),this.$element.attr('aria-hidden',!0),this.$container.removeClass(_.DRAWER_IN),this.$backdrop.removeClass(_.IN))}},{key:'_isOpen',value:function(){return this.$container.hasClass(_.DRAWER_IN)}},{key:'_isForcedClosed',value:function(){return this.$container.hasClass(_.DRAWER_OUT)}},{key:'_addAria',value:function(){var e=this._isOpen();this.$element.attr('aria-expanded',e),this.$element.attr('aria-hidden',e),this.$toggles.length&&this.$toggles.attr('aria-expanded',e)}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(L);return e.fn[s]=p._jQueryInterface,e.fn[s].Constructor=p,e.fn[s].noConflict=function(){return e.fn[s]=d,p._jQueryInterface},p}(jQuery),U=function(t){var n='ripples',r='bmd.'+n,l='bmd'+(n.charAt(0).toUpperCase()+n.slice(1)),i=t.fn[l],s={CONTAINER:'ripple-container',DECORATOR:'ripple-decorator'},d={CONTAINER:'.'+s.CONTAINER,DECORATOR:'.'+s.DECORATOR},c={container:{template:'<div class=\''+s.CONTAINER+'\'></div>'},decorator:{template:'<div class=\''+s.DECORATOR+'\'></div>'},trigger:{start:'mousedown touchstart',end:'mouseup mouseleave touchend'},touchUserAgentRegex:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,duration:500},_=function(){function n(e,o){var r=this;a(this,n),this.$element=e,this.config=t.extend(!0,{},c,o),this.$element.on(this.config.trigger.start,function(e){r._onStartRipple(e)})}return o(n,[{key:'dispose',value:function(){this.$element.data(r,null),this.$element=null,this.$container=null,this.$decorator=null,this.config=null}},{key:'_onStartRipple',value:function(e){var t=this;if(!(this._isTouch()&&'mousedown'===e.type)){this._findOrCreateContainer();var n=this._getRelY(e),a=this._getRelX(e);(n||a)&&(this.$decorator.css({left:a,top:n,"background-color":this._getRipplesColor()}),this._forceStyleApplication(),this.rippleOn(),setTimeout(function(){t.rippleEnd()},this.config.duration),this.$element.on(this.config.trigger.end,function(){t.$decorator&&(t.$decorator.data('mousedown','off'),'off'===t.$decorator.data('animating')&&t.rippleOut())}))}}},{key:'_findOrCreateContainer',value:function(){(!this.$container||0<!this.$container.length)&&(this.$element.append(this.config.container.template),this.$container=this.$element.find(d.CONTAINER)),this.$container.append(this.config.decorator.template),this.$decorator=this.$container.find(d.DECORATOR)}},{key:'_forceStyleApplication',value:function(){return window.getComputedStyle(this.$decorator[0]).opacity}},{key:'_getRelX',value:function(e){var t=this.$container.offset(),n=null;return this._isTouch()?(e=e.originalEvent,n=1===e.touches.length&&e.touches[0].pageX-t.left):n=e.pageX-t.left,n}},{key:'_getRelY',value:function(e){var t=this.$container.offset(),n=null;return this._isTouch()?(e=e.originalEvent,n=1===e.touches.length&&e.touches[0].pageY-t.top):n=e.pageY-t.top,n}},{key:'_getRipplesColor',value:function(){var e=this.$element.data('ripple-color')?this.$element.data('ripple-color'):window.getComputedStyle(this.$element[0]).color;return e}},{key:'_isTouch',value:function(){return this.config.touchUserAgentRegex.test(navigator.userAgent)}},{key:'rippleEnd',value:function(){this.$decorator&&(this.$decorator.data('animating','off'),'off'===this.$decorator.data('mousedown')&&this.rippleOut(this.$decorator))}},{key:'rippleOut',value:function(){var e=this;this.$decorator.off(),E.transitionEndSupported()?this.$decorator.addClass('ripple-out'):this.$decorator.animate({opacity:0},100,function(){e.$decorator.trigger('transitionend')}),this.$decorator.on(E.transitionEndSelector(),function(){e.$decorator&&(e.$decorator.remove(),e.$decorator=null)})}},{key:'rippleOn',value:function(){var t=this,n=this._getNewSize();E.transitionEndSupported()?this.$decorator.css({"-ms-transform":'scale('+n+')',"-moz-transform":'scale('+n+')',"-webkit-transform":'scale('+n+')',transform:'scale('+n+')'}).addClass('ripple-on').data('animating','on').data('mousedown','on'):this.$decorator.animate({width:2*e(this.$element.outerWidth(),this.$element.outerHeight()),height:2*e(this.$element.outerWidth(),this.$element.outerHeight()),"margin-left":-1*e(this.$element.outerWidth(),this.$element.outerHeight()),"margin-top":-1*e(this.$element.outerWidth(),this.$element.outerHeight()),opacity:0.2},this.config.duration,function(){t.$decorator.trigger('transitionend')})}},{key:'_getNewSize',value:function(){return 2.5*(e(this.$element.outerWidth(),this.$element.outerHeight())/this.$decorator.outerWidth())}}],[{key:'_jQueryInterface',value:function(e){return this.each(function(){var a=t(this),o=a.data(r);o||(o=new n(a,e),a.data(r,o))})}}]),n}();return t.fn[l]=_._jQueryInterface,t.fn[l].Constructor=_,t.fn[l].noConflict=function(){return t.fn[l]=i,_._jQueryInterface},_}(jQuery),w=function(e){var t='autofill',n='bmd.'+t,s='bmd'+(t.charAt(0).toUpperCase()+t.slice(1)),d=e.fn[s],c={},_=function(t){function s(t,n){a(this,s);var o=i(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t,e.extend(!0,{},c,n)));return o._watchLoading(),o._attachEventHandlers(),o}return l(s,t),o(s,[{key:'dispose',value:function(){r(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),'dispose',this).call(this,n)}},{key:'_watchLoading',value:function(){var e=this;setTimeout(function(){clearInterval(e._onLoading)},1e4)}},{key:'_onLoading',value:function(){setInterval(function(){e('input[type!=checkbox]').each(function(t,n){var a=e(n);a.val()&&a.val()!==a.attr('value')&&a.trigger('change')})},100)}},{key:'_attachEventHandlers',value:function(){var t=null;e(document).on('focus','input',function(n){var a=e(n.currentTarget).closest('form').find('input').not('[type=file]');t=setInterval(function(){a.each(function(t,n){var a=e(n);a.val()!==a.attr('value')&&a.trigger('change')})},100)}).on('blur','.form-group input',function(){clearInterval(t)})}}],[{key:'_jQueryInterface',value:function(t){return this.each(function(){var a=e(this),o=a.data(n);o||(o=new s(a,t),a.data(n,o))})}}]),s}(h);return e.fn[s]=_._jQueryInterface,e.fn[s].Constructor=_,e.fn[s].noConflict=function(){return e.fn[s]=d,_._jQueryInterface},_}(jQuery);Popper.Defaults.modifiers.computeStyle.gpuAcceleration=!1;(function(t){var e='bootstrapMaterialDesign',n='bmd.'+e,r=e,l=t.fn[r],i={global:{validate:!1,label:{className:'bmd-label-static'}},autofill:{selector:'body'},checkbox:{selector:'.checkbox > label > input[type=checkbox]'},checkboxInline:{selector:'label.checkbox-inline > input[type=checkbox]'},collapseInline:{selector:'.bmd-collapse-inline [data-toggle="collapse"]'},drawer:{selector:'.bmd-layout-drawer'},file:{selector:'input[type=file]'},radio:{selector:'.radio > label > input[type=radio]'},radioInline:{selector:'label.radio-inline > input[type=radio]'},ripples:{selector:['.btn:not(.btn-link):not(.ripple-none)','.card-image:not(.ripple-none)','.navbar a:not(.ripple-none)','.dropdown-menu a:not(.ripple-none)','.nav-tabs a:not(.ripple-none)','.pagination li:not(.active):not(.disabled) a:not(.ripple-none)','.ripple']},select:{selector:['select']},switch:{selector:'.switch > label > input[type=checkbox]'},text:{selector:['input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])']},textarea:{selector:['textarea']},arrive:!0,instantiation:['ripples','checkbox','checkboxInline','collapseInline','drawer','radio','radioInline','switch','text','textarea','select','autofill']},s=function(){function e(n,o){var r=this;a(this,e),this.$element=n,this.config=t.extend(!0,{},i,o);var l,s=t(document),d=!0,c=!1;try{for(var _,u=function(){var e=_.value,n=r.config[e];if(n){var a=r._resolveSelector(n);n=t.extend(!0,{},r.config.global,n);var o=''+(e.charAt(0).toUpperCase()+e.slice(1)),l='bmd'+o;try{t(a)[l](n),document.arrive&&r.config.arrive&&s.arrive(a,function(){t(this)[l](n)})}catch(o){var i='Failed to instantiate component: $(\''+a+'\')['+l+']('+n+')';throw console.error(i,o,'\nSelected elements: ',t(a)),o}}},p=this.config.instantiation[Symbol.iterator]();!(d=(_=p.next()).done);d=!0)u()}catch(e){c=!0,l=e}finally{try{!d&&p.return&&p.return()}finally{if(c)throw l}}}return o(e,[{key:'dispose',value:function(){this.$element.data(n,null),this.$element=null,this.config=null}},{key:'_resolveSelector',value:function(e){var t=e.selector;return Array.isArray(t)&&(t=t.join(', ')),t}}],[{key:'_jQueryInterface',value:function(a){return this.each(function(){var o=t(this),r=o.data(n);r||(r=new e(o,a),o.data(n,r))})}}]),e}();return t.fn[r]=s._jQueryInterface,t.fn[r].Constructor=s,t.fn[r].noConflict=function(){return t.fn[r]=l,s._jQueryInterface},s})(jQuery)})();
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("AgoraRTC",[],t):"object"==typeof exports?exports.AgoraRTC=t():e.AgoraRTC=t()}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=37)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(19),o=function(){var e,t,i,o,r,a,s=0;return e=function(e){e>4?e=4:e<0&&(e=0),s=e},t=function(){var e=arguments[0],t=arguments;if(!(e<s))switch(e){case 0:t[0]=(0,n.getTimestamp)()+" DEBUG:",console.log.apply(console,t);break;case 1:t[0]=(0,n.getTimestamp)()+" INFO:",console.log.apply(console,t);break;case 2:t[0]=(0,n.getTimestamp)()+" WARN:",console.warn.apply(console,t);break;case 3:t[0]=(0,n.getTimestamp)()+" ERROR:",console.error.apply(console,t);break;default:return t[0]=(0,n.getTimestamp)()+" DEFAULT:",void console.log.apply(console,t)}},i=function(){for(var e=[0],i=0;i<arguments.length;i++)e.push(arguments[i]);t.apply(this,e)},o=function(){for(var e=[1],i=0;i<arguments.length;i++)e.push(arguments[i]);t.apply(this,e)},r=function(){for(var e=[2],i=0;i<arguments.length;i++)e.push(arguments[i]);t.apply(this,e)},a=function(){for(var e=[3],i=0;i<arguments.length;i++)e.push(arguments[i]);t.apply(this,e)},{DEBUG:0,INFO:1,WARNING:2,ERROR:3,NONE:4,setLogLevel:e,log:t,debug:i,info:o,warning:r,error:a}}();t.default=o},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=m();return e.name&&"Chrome"===e.name},o=function(){var e=m();return e.name&&"Safari"===e.name},r=function(){var e=m();return e.name&&"Firefox"===e.name},a=function(){var e=m();return e.name&&"OPR"===e.name},s=function(){var e=m();return e.name&&"MQQBrowser"===e.name},d=function(){var e=m();return e.name&&"MicroMessenger"===e.name},c=function(){var e=p();return"Linux"===e||"Mac OS X"===e||"Mac OS"===e||-1!==e.indexOf("Windows")},u=function(){var e=p();return"Android"===e||"iOS"===e},l=function(){return m().version},p=function(){return m().os},f=function(){var e,t=navigator.userAgent,i=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];if(/trident/i.test(i[1]))return e=/\brv[ :]+(\d+)/g.exec(t)||[],{name:"IE",version:e[1]||""};"Chrome"===i[1]&&null!=(e=t.match(/(OPR(?=\/))\/?(\d+)/i))&&(i=e),"Chrome"===i[1]&&null!=(e=t.match(/(mqqbrowser(?=\/))\/?(\d+)/i))&&(i=e),"Chrome"===i[1]&&null!=(e=t.match(/(micromessenger(?=\/))\/?(\d+)/i))&&(i=e),"Safari"===i[1]&&null!=(e=t.match(/version\/(\d+)/i))&&(i[2]=e[1]);var n=void 0,o=[{s:"Windows 10",r:/(Windows 10.0|Windows NT 10.0)/},{s:"Windows 8.1",r:/(Windows 8.1|Windows NT 6.3)/},{s:"Windows 8",r:/(Windows 8|Windows NT 6.2)/},{s:"Windows 7",r:/(Windows 7|Windows NT 6.1)/},{s:"Windows Vista",r:/Windows NT 6.0/},{s:"Windows Server 2003",r:/Windows NT 5.2/},{s:"Windows XP",r:/(Windows NT 5.1|Windows XP)/},{s:"Windows 2000",r:/(Windows NT 5.0|Windows 2000)/},{s:"Windows ME",r:/(Win 9x 4.90|Windows ME)/},{s:"Windows 98",r:/(Windows 98|Win98)/},{s:"Windows 95",r:/(Windows 95|Win95|Windows_95)/},{s:"Windows NT 4.0",r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},{s:"Windows CE",r:/Windows CE/},{s:"Windows 3.11",r:/Win16/},{s:"Android",r:/Android/},{s:"Open BSD",r:/OpenBSD/},{s:"Sun OS",r:/SunOS/},{s:"Linux",r:/(Linux|X11)/},{s:"iOS",r:/(iPhone|iPad|iPod)/},{s:"Mac OS X",r:/Mac OS X/},{s:"Mac OS",r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:"QNX",r:/QNX/},{s:"UNIX",r:/UNIX/},{s:"BeOS",r:/BeOS/},{s:"OS/2",r:/OS\/2/},{s:"Search Bot",r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}];for(var r in o){var a=o[r];if(a.r.test(navigator.userAgent)){n=a.s;break}}return{name:i[1],version:i[2],os:n}},m=function(){var e=f();return function(){return e}}();t.getBrowserInfo=m,t.getBrowserVersion=l,t.getBrowserOS=p,t.isChrome=n,t.isSafari=o,t.isFireFox=r,t.isOpera=a,t.isQQBrowser=s,t.isWeChatBrowser=d,t.isSupportedPC=c,t.isSupportedMobile=u},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e={};return e.dispatcher={},e.dispatcher.eventListeners={},e.addEventListener=function(t,i){void 0===e.dispatcher.eventListeners[t]&&(e.dispatcher.eventListeners[t]=[]),e.dispatcher.eventListeners[t].push(i)},e.on=e.addEventListener,e.removeEventListener=function(t,i){var n;-1!==(n=e.dispatcher.eventListeners[t].indexOf(i))&&e.dispatcher.eventListeners[t].splice(n,1)},e.dispatchEvent=function(t){var i;for(i in e.dispatcher.eventListeners[t.type])e.dispatcher.eventListeners[t.type].hasOwnProperty(i)&&"function"==typeof e.dispatcher.eventListeners[t.type][i]&&e.dispatcher.eventListeners[t.type][i](t)},e.dispatchSocketEvent=function(t){var i;for(i in e.dispatcher.eventListeners[t.type])e.dispatcher.eventListeners[t.type].hasOwnProperty(i)&&"function"==typeof e.dispatcher.eventListeners[t.type][i]&&e.dispatcher.eventListeners[t.type][i](t.msg)},e},o=function(e){var t={};return t.type=e.type,t},r=function(e){var t=o(e);return t.stream=e.stream,t.reason=e.reason,t.msg=e.msg,t},a=function(e){var t=o(e);return t.uid=e.uid,t.attr=e.attr,t.stream=e.stream,t},s=function(e){var t=o(e);return t.msg=e.msg,t},d=function(e){var t=o(e);return t.url=e.url,t.reason=e.reason,t};t.EventDispatcher=n,t.StreamEvent=r,t.ClientEvent=a,t.MediaEvent=s,t.LiveStreamingEvent=d},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(){return(0,u.default)().replace(/-/g,"").toUpperCase()}Object.defineProperty(t,"__esModule",{value:!0}),t.safeCall=t.vsResHack=t.CSCrashRecord=t.audioLevelHelper=t.generateSessionId=t.checkSystemRequirements=void 0;var r=i(1),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(r),s=i(0),d=n(s),c=i(28),u=n(c),l=function(){var e=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.msGetUserMedia||navigator.mozGetUserMedia||navigator.mediaDevices&&navigator.mediaDevices.getUserMedia,i=window.WebSocket,n=!!e&&!!t&&!!i,o=!1;return d.default.debug(a.getBrowserInfo(),"isAPISupport:"+n),a.isChrome()&&a.getBrowserVersion()>=58&&"iOS"!==a.getBrowserOS()&&(o=!0),a.isFireFox()&&a.getBrowserVersion()>=56&&(o=!0),a.isOpera()&&a.getBrowserVersion()>=45&&(o=!0),a.isSafari()&&a.getBrowserVersion()>=11&&(o=!0),a.isSupportedPC()||a.isSupportedMobile()||(o=!1),n&&o},p=function(){var e=arguments[0];if("function"==typeof e){var t=Array.prototype.slice.call(arguments,1);e.apply(null,t)}},f=new(window.AudioContext||window.webkitAudioContext),m=function(e){return this.audioContext=f,this.sourceNode=e.otWebkitAudioSource||this.audioContext.createMediaStreamSource(e),this.analyser=this.audioContext.createAnalyser(),this.timeDomainData=new Uint8Array(this.analyser.frequencyBinCount),this.sourceNode.connect(this.analyser),this.getAudioLevel=function(){if(this.analyser){this.analyser.getByteTimeDomainData(this.timeDomainData);for(var e=0,t=0;t<this.timeDomainData.length;t++)e=Math.max(e,Math.abs(this.timeDomainData[t]-128));return e/128}return d.default.warning("can't find analyser in audioLevelHelper"),0},this},v={shouldBlock:function(){if(localStorage){var e=JSON.parse(localStorage.getItem("agoraCSCrashRecord"));return!!(e&&e.length>6)&&(new Date).getTime()-e[e.length-6]-1e4<0}return!1},record:function(e){if(localStorage){var t=JSON.parse(localStorage.getItem("agoraCSCrashRecord"));t=!t||t.length>50?[]:t,t.push(e),localStorage.setItem("agoraCSCrashRecord",JSON.stringify(t))}}},g=function(e,t,i){try{var n=document.createElement("video");n.setAttribute("autoplay",""),n.setAttribute("muted",""),n.setAttribute("playsinline",""),n.setAttribute("style","position: absolute; top: 0; left: 0; width:1px; high:1px;"),document.body.appendChild(n),n.addEventListener("playing",function(e){a.isFireFox()?n.videoWidth&&(t(n.videoWidth,n.videoHeight),document.body.removeChild(n)):(t(n.videoWidth,n.videoHeight),document.body.removeChild(n))}),n.srcObject=e}catch(e){i(e)}};t.checkSystemRequirements=l,t.generateSessionId=o,t.audioLevelHelper=m,t.CSCrashRecord=v,t.vsResHack=g,t.safeCall=p},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SUBSCRIBE=t.PUBLISH=t.JOIN_GATEWAY=t.JOIN_CHOOSE_SERVER=t.SESSION_INIT=t.report=void 0;var n=i(5),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(n),r=i(0),a=(function(e){e&&e.__esModule}(r),i(11)),s={type:null,sid:null,lts:null,succ:null,cname:null,uid:null,peerid:null,cid:null,elaps:null,extend:null,vid:0},d=function(){var e={};return e.list={},e.url=(0,a.shouldUseHttps)()?"https://"+o.EVENT_REPORT_DOMAIN+":6443/events/report":"http://"+o.EVENT_REPORT_DOMAIN+":6080/events/report",e.urlBackup=(0,a.shouldUseHttps)()?"https://"+o.EVENT_REPORT_BACKUP_DOMAIN+":6443/events/report":"http://"+o.EVENT_REPORT_BACKUP_DOMAIN+'":6080/events/report',e.sessionInit=function(t,i){i.sid=t;var n=Object.assign(s,i);e.list[t]||(n.startTime=+new Date);var r=Object.assign({},n);delete n.appid,delete n.mode,e.list[t]=n,r.extend=null,r.ver=o.VERSION,r.type="session_init",r.browser=navigator.userAgent,r.lts=+new Date,r.elaps=r.lts-r.startTime,e.send(r)},e.joinChooseServer=function(t,i,n){var o;o=n?Object.assign(e.list[t],i):Object.assign({},e.list[t],i),o.type="join_choose_server";var r=+new Date;o.ev_elaps=r-o.lts,o.elaps=r-o.startTime,o.lts=r,o.serverList=JSON.stringify(o.serverList),e.send(o)},e.joinGateway=function(t,i){var n=Object.assign(e.list[t],i);n.type="join_gateway";var o=+new Date;n.ev_elaps=o-n.lts,n.elaps=o-n.startTime,n.lts=o,e.send(n)},e.publish=function(t,i){var n=Object.assign({},e.list[t],i);n.type="publish";var o=+new Date;n.ev_elaps=o-n.lts,n.elaps=o-n.startTime,n.lts=o,e.send(n)},e.subscribe=function(t,i){var n=Object.assign({},e.list[t],i);n.type="subscribe";var o=+new Date;n.ev_elaps=o-n.lts,n.elaps=o-n.startTime,n.lts=o,e.send(n)},e.firstRemoteFrame=function(t,i){var n=Object.assign({},e.list[t],i);n.type="first_remote_frame",n.lts=+new Date,n.elaps=n.lts-n.startTime,e.send(n)},e.streamSwitch=function(t,i){var n=Object.assign({},e.list[t],i);n.type="stream_switch",n.isdual=i.isdual,n.lts=+new Date,n.elaps=n.lts-n.startTime,e.send(n)},e.audioSendingStopped=function(t,i){var n=Object.assign({},e.list[t],i);n.type="audio_sending_stopped",n.lts=+new Date,n.elaps=n.lts-n.startTime,e.send(n)},e.videoSendingStopped=function(t,i){var n=Object.assign({},e.list[t],i);n.type="video_sending_stopped",n.lts=+new Date,n.elaps=n.lts-n.startTime,e.send(n)},e.send=function(t){try{(0,a.post)(e.url,t,null,function(i){(0,a.post)(e.urlBackup,t,null,function(e){},{timeout:1e4})},{timeout:1e4})}catch(e){}},e}();t.report=d,t.SESSION_INIT="session_init",t.JOIN_CHOOSE_SERVER="join_choose_server",t.JOIN_GATEWAY="join_gateway",t.PUBLISH="publish",t.SUBSCRIBE="subscribe"},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=["webcs-1.agora.io","webcs-2.agora.io"],o=["webcs-3.agora.io","webcs-4.agora.io"];t.GIT_VERSION="release_20180109_01-92-gc640220",t.VERSION="2.1.0",t.WEBCS_DOMAIN=n,t.WEBCS_DOMAIN_BACKUP_LIST=o,t.EVENT_REPORT_DOMAIN="webcollector-1.agora.io",t.EVENT_REPORT_BACKUP_DOMAIN="webcollector-2.agora.io",t.WEBCS_BACKUP_CONNECT_TIMEOUT=6e3,t.HTTP_CONNECT_TIMEOUT=5e3},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(2),o=function(e){var t=(0,n.EventDispatcher)(e);return t.url=".",t};t.default=o},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getDevices=t.createStream=t.Stream=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=i(16),a=n(r),s=i(21),d=n(s),c=i(10),u=i(2),l=i(0),p=n(l),f=i(1),m=i(27),v=i(3),g=i(4),S=function(e){function t(){return null!==window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)&&window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1]<=35}function i(){return null!==window.navigator.userAgent.match("Firefox")}function n(t,i){return{width:{ideal:t},height:{ideal:i},deviceId:e.cameraId?{exact:e.cameraId}:void 0}}var r=(0,u.EventDispatcher)();if(r.params=Object.assign({},e),r.stream=e.stream,r.aux_stream=void 0,r.url=e.url,r.onClose=void 0,r.local=!1,r.video=!!e.video,r.audio=!!e.audio,r.screen=!!e.screen,r.screenAttributes={width:1920,height:1080,maxFr:5,minFr:1},r.videoSize=e.videoSize,r.player=void 0,r.audioLevelHelper=null,e.attributes=e.attributes||{},r.videoEnabled=!0,r.audioEnabled=!0,r.lowStream=null,r.videoWidth=0,r.videoHeight=0,r.mirror=!1!==e.mirror,!(void 0===r.videoSize||r.videoSize instanceof Array&&4===r.videoSize.length))throw Error("Invalid Video Size");r.videoSize=[640,480,640,480],void 0!==e.local&&!0!==e.local||(r.local=!0),r.initialized=!r.local;var s={true:!0,unspecified:!0,"90p_1":n(160,90),"120p_1":n(160,120),"120p_3":n(120,120),"120p_4":n(212,120),"180p_1":n(320,180),"180p_3":n(180,180),"180p_4":n(240,180),"240p_1":n(320,240),"240p_3":n(240,240),"240p_4":n(424,240),"360p_1":n(640,360),"360p_3":n(360,360),"360p_4":n(640,360),"360p_6":n(360,360),"360p_7":n(480,360),"360p_8":n(480,360),"360p_9":n(640,360),"360p_10":n(640,360),"360p_11":n(640,360),"480p_1":n(640,480),"480p_2":n(640,480),"480p_3":n(480,480),"480p_4":n(640,480),"480p_6":n(480,480),"480p_8":n(848,480),"480p_9":n(848,480),"480p_10":n(640,480),"720p_1":n(1280,720),"720p_2":n(1280,720),"720p_3":n(1280,720),"720p_5":n(960,720),"720p_6":n(960,720),"1080p_1":n(1920,1080),"1080p_2":n(1920,1080),"1080p_3":n(1920,1080),"1080p_5":n(1920,1080),"1440p_1":n(2560,1440),"1440p_2":n(2560,1440),"4k_1":n(3840,2160),"4k_3":n(3840,2160)};return r.unmuteAudio=void 0,r.muteAudio=void 0,r.unmuteVideo=void 0,r.muteVideo=void 0,r.setVideoResolution=function(t){return t+="",void 0!==s[t]&&(e.video=s[t],e.attributes=e.attributes||{},e.attributes.resolution=t,!0)},r.setVideoFrameRate=function(t){return!(0,f.isFireFox)()&&("object"===(void 0===t?"undefined":o(t))&&t instanceof Array&&t.length>1&&(e.attributes=e.attributes||{},e.attributes.minFrameRate=t[0],e.attributes.maxFrameRate=t[1],!0))},r.setVideoBitRate=function(t){return"object"===(void 0===t?"undefined":o(t))&&t instanceof Array&&t.length>1&&(e.attributes=e.attributes||{},e.attributes.minVideoBW=t[0],e.attributes.maxVideoBW=t[1],!0)},r.setScreenProfile=function(e){if("string"==typeof e&&r.screen){switch(e){case"480p_1":r.screenAttributes.width=640,r.screenAttributes.height=480,r.screenAttributes.maxFr=5,r.screenAttributes.minFr=1;break;case"480p_2":r.screenAttributes.width=640,r.screenAttributes.height=480,r.screenAttributes.maxFr=30,r.screenAttributes.minFr=25;break;case"720p_1":r.screenAttributes.width=1280,r.screenAttributes.height=720,r.screenAttributes.maxFr=5,r.screenAttributes.minFr=1;break;case"720p_2":r.screenAttributes.width=1280,r.screenAttributes.height=720,r.screenAttributes.maxFr=30,r.screenAttributes.minFr=25;break;case"1080p_1":r.screenAttributes.width=1920,r.screenAttributes.height=1080,r.screenAttributes.maxFr=5,r.screenAttributes.minFr=1;break;case"1080p_2":r.screenAttributes.width=1920,r.screenAttributes.height=1080,r.screenAttributes.maxFr=30,r.screenAttributes.minFr=25}return!0}return!1},r.setVideoProfileCustom=function(e){r.setVideoResolution(e[0]),r.setVideoFrameRate([e[1],e[1]]),r.setVideoBitRate([e[2],e[2]])},r.setVideoProfile=function(e){if(r.profile=e,"string"==typeof e&&r.video){switch(e){case"120p":case"120P":case"120p_1":case"120P_1":r.setVideoResolution("120p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,65]);break;case"120p_3":case"120P_3":r.setVideoResolution("120p_3"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,50]);break;case"180p":case"180P":case"180p_1":case"180P_1":r.setVideoResolution("180p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,140]);break;case"180p_3":case"180P_3":r.setVideoResolution("180p_3"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,100]);break;case"180p_4":case"180P_4":r.setVideoResolution("180p_4"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,120]);break;case"240p":case"240P":case"240p_1":case"240P_1":r.setVideoResolution("240p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,200]);break;case"240p_3":case"240P_3":r.setVideoResolution("240p_3"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,140]);break;case"240p_4":case"240P_4":r.setVideoResolution("240p_4"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([10,220]);break;case"360p":case"360P":case"360p_1":case"360P_1":r.setVideoResolution("360p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,400]);break;case"360p_3":case"360P_3":r.setVideoResolution("360p_3"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,260]);break;case"360p_4":case"360P_4":r.setVideoResolution("360p_4"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,600]);break;case"360p_6":case"360P_6":r.setVideoResolution("360p_6"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,400]);break;case"360p_7":case"360P_7":r.setVideoResolution("360p_7"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,320]);break;case"360p_8":case"360P_8":r.setVideoResolution("360p_8"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,490]);break;case"360p_9":case"360P_9":r.setVideoResolution("360p_9"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,800]);break;case"360p_10":case"360P_10":r.setVideoResolution("360p_10"),r.setVideoFrameRate([24,24]),r.setVideoBitRate([20,800]);break;case"360p_11":case"360P_11":r.setVideoResolution("360p_11"),r.setVideoFrameRate([24,24]),r.setVideoBitRate([20,1e3]);break;case"480p":case"480P":case"480p_1":case"480P_1":r.setVideoResolution("480p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,500]);break;case"480p_2":case"480P_2":r.setVideoResolution("480p_2"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,1e3]);break;case"480p_3":case"480P_3":r.setVideoResolution("480p_3"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,400]);break;case"480p_4":case"480P_4":r.setVideoResolution("480p_4"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,750]);break;case"480p_6":case"480P_6":r.setVideoResolution("480p_6"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,600]);break;case"480p_8":case"480P_8":r.setVideoResolution("480p_8"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,610]);break;case"480p_9":case"480P_9":r.setVideoResolution("480p_9"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([20,930]);break;case"480p_10":case"480P_10":r.setVideoResolution("480p_10"),r.setVideoFrameRate([10,10]),r.setVideoBitRate([20,400]);break;case"720p":case"720P":case"720p_1":case"720P_1":r.setVideoResolution("720p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([30,1130]);break;case"720p_2":case"720P_2":r.setVideoResolution("720p_2"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([30,2e3]);break;case"720p_3":case"720P_3":r.setVideoResolution("720p_3"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([30,1710]);break;case"720p_5":case"720P_5":r.setVideoResolution("720p_5"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([30,910]);break;case"720p_6":case"720P_6":r.setVideoResolution("720p_6"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([30,1380]);break;case"1080p":case"1080P":case"1080p_1":case"1080P_1":r.setVideoResolution("1080p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([50,2080]);break;case"1080p_2":case"1080P_2":r.setVideoResolution("1080p_2"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([50,3e3]);break;case"1080p_3":case"1080P_3":r.setVideoResolution("1080p_3"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([50,3150]);break;case"1080p_5":case"1080P_5":r.setVideoResolution("1080p_5"),r.setVideoFrameRate([60,60]),r.setVideoBitRate([50,4780]);break;case"1440p":case"1440P":case"1440p_1":case"1440P_1":r.setVideoResolution("1440p_1"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([50,4850]);break;case"1440p_2":case"1440P_2":r.setVideoResolution("1440p_2"),r.setVideoFrameRate([60,60]),r.setVideoBitRate([50,7350]);break;case"4k":case"4K":case"4k_1":case"4K_1":r.setVideoResolution("4k_1"),r.setVideoFrameRate([30,30]),r.setVideoBitRate([50,8910]);break;case"4k_3":case"4K_3":r.setVideoResolution("4k_3"),r.setVideoFrameRate([60,60]),r.setVideoBitRate([50,13500]);break;default:r.setVideoResolution("480p_1"),r.setVideoFrameRate([15,15]),r.setVideoBitRate([20,500])}return!0}return!1},r.getId=function(){return e.streamID},r.getAttributes=function(){return e.screen?r.screenAttributes:e.attributes},r.hasAudio=function(){return r.audio},r.hasVideo=function(){return r.video},r.hasScreen=function(){return r.screen},r.isVideoOn=function(){return r.hasVideo&&r.videoEnabled},r.isAudioOn=function(){return r.hasAudio&&r.audioEnabled},r.init=function(n,a){var s=((new Date).getTime(),arguments[2]);if(void 0===s&&(s=2),!0===r.initialized)return void("function"==typeof a&&a({type:"warning",msg:"STREAM_ALREADY_INITIALIZED"}));if(!0!==r.local)return void("function"==typeof a&&a({type:"warning",msg:"STREAM_NOT_LOCAL"}));try{if((e.audio||e.video||e.screen)&&void 0===e.url){p.default.debug("Requested access to local media");var d=e.video;if(e.screen)var u={video:d,audio:e.audio,screen:!0,data:!0,extensionId:e.extensionId,attributes:r.screenAttributes,fake:e.fake};else{var u={video:d,audio:e.audio,fake:e.fake};if(!t()){var l=30,m=30;void 0!==e.attributes.minFrameRate&&(l=e.attributes.minFrameRate),void 0!==e.attributes.maxFrameRate&&(m=e.attributes.maxFrameRate),i()?!0===u.video?(u.video={width:{ideal:r.videoSize[0]},height:{ideal:r.videoSize[1]},frameRate:{ideal:l,max:m}},r.setVideoBitRate([500,500])):"object"===o(u.video)&&(u.video.frameRate={ideal:l,max:m}):(!0===u.audio&&(u.audio=!e.microphoneId||{deviceId:{exact:e.microphoneId}}),!0===u.video?(u.video={width:{ideal:r.videoSize[0]},height:{ideal:r.videoSize[1]},frameRate:{ideal:l,max:m}},r.setVideoBitRate([500,500])):"object"===o(u.video)&&(u.video.frameRate={ideal:l,max:m}))}}p.default.debug(u);var g=Object.assign({},u);if((0,c.GetUserMedia)(g,function(t){p.default.debug("User has granted access to local media"),r.dispatchEvent({type:"accessAllowed"}),r.stream=t,r.initialized=!0,n&&n(),r.hasVideo()&&(0,v.vsResHack)(t,function(e,t){r.videoWidth=e,r.videoHeight=t},function(e){p.default.warning("vsResHack failed:"+e)}),e.screen&&(0,f.isChrome)()&&r.stream&&r.stream.getVideoTracks()[0]&&(r.stream.getVideoTracks()[0].onended=function(){r.dispatchEvent({type:"stopScreenSharing"})})},function(e){var t={type:"error",msg:e.name||e};switch(t.msg){case"Starting video failed":case"TrackStartError":if(r.videoSize=void 0,s>0)return void setTimeout(function(){r.init(n,a,s-1)},1);t.msg="MEDIA_OPTION_INVALID";break;case"DevicesNotFoundError":t.msg="DEVICES_NOT_FOUND";break;case"NotSupportedError":t.msg="NOT_SUPPORTED";break;case"PermissionDeniedError":t.msg="PERMISSION_DENIED",r.dispatchEvent({type:"accessDenied"});break;case"PERMISSION_DENIED":r.dispatchEvent({type:"accessDenied"});break;case"InvalidStateError":t.msg="PERMISSION_DENIED",r.dispatchEvent({type:"accessDenied"});break;case"NotAllowedError":r.dispatchEvent({type:"accessDenied"});break;case"ConstraintNotSatisfiedError":t.msg="CONSTRAINT_NOT_SATISFIED";break;default:t.msg||(t.msg="UNDEFINED")}p.default.error("Media access:",t.msg),"function"==typeof a&&a(t)}),e.screen&&e.audio){var S={video:!1,audio:u.audio};p.default.debug(S),(0,c.GetUserMedia)(S,function(e){p.default.info("User has granted access to auxiliary local media."),r.dispatchEvent({type:"accessAllowed"}),r.aux_stream=e},function(e){var t={type:"error",msg:e.name||e};switch(t.msg){case"Starting video failed":case"TrackStartError":if(r.videoSize=void 0,s>0)return void setTimeout(function(){r.init(n,a,s-1)},1);t.msg="MEDIA_OPTION_INVALID";break;case"DevicesNotFoundError":t.msg="DEVICES_NOT_FOUND";break;case"NotSupportedError":t.msg="NOT_SUPPORTED";break;case"PermissionDeniedError":case"InvalidStateError":t.msg="PERMISSION_DENIED",r.dispatchEvent({type:"accessDenied"});break;case"PERMISSION_DENIED":case"NotAllowedError":r.dispatchEvent({type:"accessDenied"});break;case"ConstraintNotSatisfiedError":t.msg="CONSTRAINT_NOT_SATISFIED";break;default:t.msg||(t.msg="UNDEFINED")}p.default.error("Media access:",t.msg),"function"==typeof a&&a(t)})}}else"function"==typeof a&&a({type:"warning",msg:"STREAM_HAS_NO_MEDIA_ATTRIBUTES"})}catch(e){p.default.error("Stream init:",e),"function"==typeof a&&a({type:"error",msg:e.message||e})}},r.close=function(){if(p.default.debug("Close stream with id",e.streamID),void 0!==r.stream){var t=r.stream.getTracks();for(var i in t)t.hasOwnProperty(i)&&t[i].stop();r.stream=void 0}r.initialized=!1,r.unmuteAudio=void 0,r.muteAudio=void 0,r.unmuteVideo=void 0,r.muteVideo=void 0,r.lowStream&&r.lowStream.close()},r.enableAudio=function(){return p.default.debug("Enable audio stream with id",e.streamID),!(!r.hasAudio()||!r.initialized||void 0===r.stream||!0===r.stream.getAudioTracks()[0].enabled)&&(void 0!==r.unmuteAudio&&r.unmuteAudio(),r.audioEnabled=!0,r.stream.getAudioTracks()[0].enabled=!0,!0)},r.disableAudio=function(){return p.default.debug("Disable audio stream with id",e.streamID),!!(r.hasAudio()&&r.initialized&&void 0!==r.stream&&r.stream.getAudioTracks()[0].enabled)&&(void 0!==r.muteAudio&&r.muteAudio(),r.audioEnabled=!1,r.stream.getAudioTracks()[0].enabled=!1,r.sid&&g.report.audioSendingStopped(r.sid,{succ:!0,reason:"muteAudio"}),!0)},r.enableVideo=function(){return p.default.debug("Enable video stream with id",e.streamID),!(!r.initialized||void 0===r.stream||!r.stream.getVideoTracks().length||!0===r.stream.getVideoTracks()[0].enabled)&&(void 0!==r.unmuteVideo&&r.unmuteVideo(),r.videoEnabled=!0,r.stream.getVideoTracks()[0].enabled=!0,r.lowStream&&r.lowStream.enableVideo(),!0)},r.disableVideo=function(){return p.default.debug("Disable video stream with id",e.streamID),!!(r.initialized&&void 0!==r.stream&&r.stream.getVideoTracks().length&&r.stream.getVideoTracks()[0].enabled)&&(void 0!==r.muteVideo&&r.muteVideo(),r.videoEnabled=!1,r.stream.getVideoTracks()[0].enabled=!1,r.lowStream&&r.lowStream.disableVideo(),r.sid&&g.report.videoSendingStopped(r.sid,{succ:!0,reason:"muteVideo"}),!0)},r.play=function(e,t){r.showing=!1,!r.local||r.video||r.screen?void 0!==e&&(r.player=new a.default({id:r.getId(),stream:r,elementID:e,options:void 0,url:t}),r.showing=!0):r.hasAudio()&&(r.player=new d.default({id:r.getId(),stream:r,elementID:e,options:void 0,url:t}),r.showing=!0)},r.stop=function(){p.default.debug("Stop stream player with id",e.streamID),void 0!==r.player&&r.player.destroy()},r.getStats=function(e){r.pc&&r.pc.getStats?r.pc.getStats(function(t){if(r.pc.isSubscriber){var i=(0,m.subscribeStatsFilter)(t);(0,f.isFireFox)()&&(i.videoReceivedResolutionHeight=r.videoHeight+"",i.videoReceivedResolutionWidth=r.videoWidth+""),e&&e((0,m.subscribeStatsFilter)(t))}else{var i=(0,m.publishStatsFilter)(t);(0,f.isChrome)()||(i.videoSendResolutionHeight=r.videoHeight+"",i.videoSendResolutionWidth=r.videoWidth+""),!(0,f.isChrome)()&&r.uplinkStats&&(i.videoSendBandwidth=r.uplinkStats.uplink_available_bandwidth+"",i.videoSendPacketsLost=r.uplinkStats.uplink_cumulative_lost+""),e&&e(i)}}):p.default.warning("use getStats after peerConnection established")},r.getAudioLevel=function(){return r.audioLevelHelper?r.audioLevelHelper.getAudioLevel():r.stream?0!==r.stream.getAudioTracks().length?(r.audioLevelHelper=new v.audioLevelHelper(r.stream),r.audioLevelHelper.getAudioLevel()):void p.default.warning("can't get audioLevel beacuse no audio trace in stream"):(p.default.warning("can't get audioLevel beacuse no stream exist"),0)},r},_=function(e){return p.default.debug("Create stream with id",e.streamID),S(e)},h=function(e,t){navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices||(p.default.warning("enumerateDevices() not supported."),t&&t("enumerateDevices() not supported")),navigator.mediaDevices.enumerateDevices().then(function(t){return e(t)}).catch(function(e){return t&&t(e.name+": "+e.message)})};t.Stream=S,t.createStream=_,t.getDevices=h},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={FAILED:"FAILED",INVALID_KEY:"INVALID_KEY",INVALID_OPERATION:"INVALID_OPERATION",INVALID_PARAMETER:"INVALID_PARAMETER",INVALID_LOCAL_STREAM:"INVALID_LOCAL_STREAM",INVALID_REMOTE_STREAM:"INVALID_REMOTE_STREAM",INVALID_DYNAMIC_KEY:"INVALID_DYNAMIC_KEY",DYNAMIC_KEY_TIMEOUT:"DYNAMIC_KEY_TIMEOUT",NO_VOCS_AVAILABLE:"NO_VOCS_AVAILABLE",NO_VOS_AVAILABLE:"ERR_NO_VOS_AVAILABLE",JOIN_CHANNEL_TIMEOUT:"ERR_JOIN_CHANNEL_TIMEOUT",NO_AVAILABLE_CHANNEL:"NO_AVAILABLE_CHANNEL",LOOKUP_CHANNEL_TIMEOUT:"LOOKUP_CHANNEL_TIMEOUT",LOOKUP_CHANNEL_REJECTED:"LOOKUP_CHANNEL_REJECTED",OPEN_CHANNEL_TIMEOUT:"OPEN_CHANNEL_TIMEOUT",OPEN_CHANNEL_REJECTED:"OPEN_CHANNEL_REJECTED",REQUEST_DEFERRED:"REQUEST_DEFERRED",SOCKET_ERROR:"SOCKET_ERROR",SOCKET_DISCONNECTED:"SOCKET_DISCONNECTED",PEERCONNECTION_FAILED:"PEERCONNECTION_FAILED",CONNECT_GATEWAY_ERROR:"CONNECT_GATEWAY_ERROR",SERVICE_NOT_AVAILABLE:"SERVICE_NOT_AVAILABLE",JOIN_CHANNEL_FAILED:"JOIN_CHANNEL_FAILED",PUBLISH_STREAM_FAILED:"PUBLISH_STREAM_FAILED",UNPUBLISH_STREAM_FAILED:"UNPUBLISH_STREAM_FAILED",SUBSCRIBE_STREAM_FAILED:"SUBSCRIBE_STREAM_FAILED",UNSUBSCRIBE_STREAM_FAILED:"UNSUBSCRIBE_STREAM_FAILED",NO_SUCH_REMOTE_STREAM:"NO_SUCH_REMOTE_STREAM",ERR_FAILED:"1",ERR_INVALID_VENDOR_KEY:"101",ERR_INVALID_CHANNEL_NAME:"102",WARN_NO_AVAILABLE_CHANNEL:"103",WARN_LOOKUP_CHANNEL_TIMEOUT:"104",WARN_LOOKUP_CHANNEL_REJECTED:"105",WARN_OPEN_CHANNEL_TIMEOUT:"106",WARN_OPEN_CHANNEL_REJECTED:"107",WARN_REQUEST_DEFERRED:"108",ERR_DYNAMIC_KEY_TIMEOUT:"109",ERR_INVALID_DYNAMIC_KEY:"110",ERR_NO_VOCS_AVAILABLE:"2000",ERR_NO_VOS_AVAILABLE:"2001",ERR_JOIN_CHANNEL_TIMEOUT:"2002",IOS_NOT_SUPPORT:"iOS not support dualStream",SHARING_SCREEN_NOT_SUPPORT:"sharing screen not support dualStream",STILL_ON_PUBLISHING:"Can't open or close low-Stream when publishing or unpublish high-stream"};t.default=n},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(6),r=n(o),a=i(17),s=n(a),d=function(e){var t,i,n=(0,r.default)({});return n.elementID=e.elementID,n.id=e.id,n.url=e.url,n.div=document.createElement("div"),n.div.setAttribute("id","bar_"+n.id),n.bar=document.createElement("div"),n.bar.setAttribute("style","width: 100%; height: 15%; max-height: 30px; position: absolute; bottom: 0; right: 0; background-color: rgba(255,255,255,0.62)"),n.bar.setAttribute("id","subbar_"+n.id),n.link=document.createElement("a"),n.link.setAttribute("href","http://www.lynckia.com/"),n.link.setAttribute("target","_blank"),n.logo=document.createElement("img"),n.logo.setAttribute("style","width: 100%; height: 100%; max-width: 30px; position: absolute; top: 0; left: 2px;"),n.logo.setAttribute("alt","Lynckia"),i=function(e){"block"!==e?e="none":clearTimeout(t),n.div.setAttribute("style","width: 100%; height: 100%; position: absolute; bottom: 0; right: 0; display:"+e)},n.display=function(){i("block")},n.hide=function(){t=setTimeout(i,1e3)},document.getElementById(n.elementID).appendChild(n.div),n.div.appendChild(n.bar),e.stream.screen||void 0!==e.options&&void 0!==e.options.speaker&&!0!==e.options.speaker||(n.speaker=new s.default({elementID:"subbar_"+n.id,id:n.id,stream:e.stream,media:e.media,url:n.url})),n.display(),n.hide(),n};t.default=d},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.GetUserMedia=t.Connection=void 0;var o=i(22),r=n(o),a=i(23),s=n(a),d=i(24),c=n(d),u=i(25),l=n(u),p=i(26),f=n(p),m=i(0),v=n(m),g=103,S=function(e){var t={};if(e.session_id=g+=1,"undefined"!=typeof window&&window.navigator)if(null!==window.navigator.userAgent.match("Firefox"))t.browser="mozilla",t=(0,f.default)(e);else if(window.navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome"))v.default.debug("Safari"),t=(0,c.default)(e),t.browser="safari";else if(window.navigator.userAgent.indexOf("MSIE "))t=(0,s.default)(e),t.browser="ie";else if(window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1]>=26)t=(0,s.default)(e),t.browser="chrome-stable";else{if(!(window.navigator.userAgent.toLowerCase().indexOf("chrome")>=40))throw t.browser="none","WebRTC stack not available";t=(0,r.default)(e),t.browser="chrome-canary"}else v.default.error("Publish/subscribe video/audio streams not supported yet"),t=(0,l.default)(e);return t},_=function(e,t,i){if(navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,e.screen)if(v.default.debug("Screen access requested"),null!==window.navigator.userAgent.match("Firefox")){var n={};void 0!=e.video.mandatory?(n.video=e.video,n.video.mediaSource="window"):n={video:{mediaSource:"window"}},navigator.getMedia(n,t,i)}else if(null!==window.navigator.userAgent.match("Chrome")){if(window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1]<34)return void i({code:"This browser does not support screen sharing"});var o="okeephmleflklcdebijnponpabbmmgeo";e.extensionId&&(v.default.debug("extensionId supplied, using "+e.extensionId),o=e.extensionId),v.default.debug("Screen access on chrome stable, looking for extension");try{chrome.runtime.sendMessage(o,{getStream:!0},function(o){if(void 0===o){v.default.debug("Access to screen denied");return void i({code:"Access to screen denied"})}var r=o.streamId,a=e.attributes.width,s=e.attributes.height,d=e.attributes.maxFr,c=e.attributes.minFr;n={video:{mandatory:{chromeMediaSource:"desktop",chromeMediaSourceId:r,maxHeight:s,maxWidth:a,maxFrameRate:d,minFrameRate:c}}},navigator.getMedia(n,t,i)})}catch(e){v.default.debug("AgoraRTC screensharing plugin is not accessible");var r={code:"no_plugin_present"};return void i(r)}}else v.default.debug("This browser does not support screenSharing");else window.navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")?navigator.mediaDevices.getUserMedia(e).then(t).catch(i):"undefined"!=typeof navigator&&navigator.getMedia?navigator.getMedia(e,t,i):v.default.error("Video/audio streams not supported yet")};t.Connection=S,t.GetUserMedia=_},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.shouldUseHttps=t.post=void 0;var n=i(5),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(n),r=function(e,t,i,n){var r=new XMLHttpRequest;r.timeout=t.timeout||o.HTTP_CONNECT_TIMEOUT,r.open("POST",e,!0),r.setRequestHeader("Content-type","application/json; charset=utf-8"),r.onload=function(e){i&&i(r.responseText)},r.onerror=function(t){n&&n(t,e)},r.ontimeout=function(t){n&&n(t,e)},r.send(JSON.stringify(t))},a=function(){return"https:"==document.location.protocol};t.post=r,t.shouldUseHttps=a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){e&&e.apply(this,[].slice.call(arguments,1))};t.default=n},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getGatewayList=void 0;var o=i(5),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(o),a=i(0),s=n(a),d=i(8),c=(n(d),i(11)),u=i(4),l=i(3),p=function(e,t,i,n){var o=(new Date).getTime(),r={key:t.appId,cname:t.cname,uid:t.uid};(0,c.post)(e,r,function(r){var a=JSON.parse(r),s=a.error;void 0!=s?(u.report.joinChooseServer(t.sid,{lts:o,succ:!1,csAddr:e,serverList:null,ec:s}),n("Get server node failed ["+s+"]",e)):i(a,e)},function(e,i){"timeout"===e.type?(u.report.joinChooseServer(t.sid,{lts:o,succ:!1,csAddr:i,serverList:null,ec:"timeout"}),n("Connect choose server timeout",i)):u.report.joinChooseServer(t.sid,{lts:o,succ:!1,csAddr:i,serverList:null,ec:"server_wrong"})})},f=function(e,t,i){var n=(new Date).getTime(),o=!1;l.CSCrashRecord.record(n);for(var a=function(i,r){o?u.report.joinChooseServer(e.sid,{lts:n,succ:!0,csAddr:r,serverList:i.gateway_addr,cid:i.cid+"",uid:i.uid+"",ec:null},!1):(clearTimeout(g),o=!0,s.default.debug("Get gateway address:",i.gateway_addr),t(i),u.report.joinChooseServer(e.sid,{lts:n,succ:!0,csAddr:r,serverList:i.gateway_addr,cid:i.cid+"",uid:i.uid+"",ec:null},!0))},d=function(e,t){s.default.error(e,t)},f=r.WEBCS_DOMAIN,m=0;m<f.length;++m){var v;v=(0,c.shouldUseHttps)()?"https://"+f[m]+":5668/getwebgw/jsonp":"http://"+f[m]+":5669/getwebgw/jsonp",p(v,e,a,d)}var g=setTimeout(function(){if(!o)for(var t=r.WEBCS_DOMAIN_BACKUP_LIST,i=0;i<t.length;++i){var n;n=(0,c.shouldUseHttps)()?"https://"+t[i]+":5668/getwebgw/jsonp":"http://"+t[i]+":5669/getwebgw/jsonp",p(n,e,a,d)}},1e3);setTimeout(function(){o||i()},r.WEBCS_BACKUP_CONNECT_TIMEOUT)},m=function(e,t,i){var n=!1,o=null,r=1;!function a(){if(l.CSCrashRecord.shouldBlock())return s.default.warning("CS connetion crash too many times in 10s"),i&&i();n||f(e,function(e){n=!0,clearTimeout(o),t(e)},function(){s.default.debug("Request gateway list will be restart in "+r+"s"),o=setTimeout(function(){a()},1e3*r),r=r>=3600?3600:2*r})}()};t.getGatewayList=m},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=i(7),a=i(32),s=n(a),d=i(10),c=i(2),u=i(0),l=n(u),p=i(8),f=n(p),m=i(12),v=n(m),g=i(13),S=i(5),_=i(4),h=i(3),b=i(1),E=function(e){function t(){for(var e in L.remoteStreams)if(L.remoteStreams.hasOwnProperty(e)){var t=L.remoteStreams[e];t.stop(),t.close(),delete L.remoteStreams[e],void 0!==t.pc&&(t.pc.close(),t.pc=void 0)}}var i=!1,n=function(){return{_type:"ping"}},a=function(){return{_type:"join1",message:{appId:e.appId,key:L.key,channel:L.joinInfo.cname,uid:L.uid,version:S.VERSION,browser:navigator.userAgent,mode:e.mode,role:e.role,config:L.config}}},u=function(){return{_type:"leave"}},p=function(e){return{_type:"control",message:e}},m=function(e){return{_type:"token",message:e}},E=function(){return{_type:"p2p_lost",message:null}},R=function(e){return{_type:"unpublish",message:e}},I=function(e){return{_type:"unsubscribe",message:e}},y=function(e,t){return{_type:"switchVideoStream",message:{id:e,type:t}}},A=function(e,t){return{_type:"publish",options:e,sdp:t}},C=function(e){return{_type:"publish_stats",options:{stats:e},sdp:null}},w=function(e){return{_type:"publish_stats_low",options:{stats:e},sdp:null}},O=function(e,t){return{_type:"subscribe",options:e,sdp:t}},T=function(e,t){return{_type:"subscribe_stats",options:{id:e,stats:t},sdp:null}},N=function(e,t){return{_type:"start_live_streaming",message:{url:e,transcodingEnabled:t}}},D=function(e){return{_type:"stop_live_streaming",message:{url:e}}},k=function(e){return{_type:"set_live_transcoding",message:{transcoding:e}}},L=(0,c.EventDispatcher)(e);L.socket=void 0,L.state=0,L.mode=e.mode,L.role=e.role,L.codec=e.codec,L.config={},L.timers={},L.timer_counter={},L.localStreams={},L.remoteStreams={},L.attemps=1,L.p2p_attemps=1,L.audioLevel={},L.activeSpeaker=void 0,L.firstFrameTimer=new Map,L.liveStreams=new Map;var M=v.default;L.remoteVideoStreamTypes={REMOTE_VIDEO_STREAM_HIGH:0,REMOTE_VIDEO_STREAM_LOW:1,REMOTE_VIDEO_STREAM_MEDIUM:2},L.configPublisher=function(e){L.config=e},L.join=function(e,t,i,o){var r=(new Date).getTime(),s=e.uid;return 0!==L.state?(o&&o(f.default.INVALID_OPERATION),_.report.joinGateway(e.sid,{lts:r,succ:!1,ec:f.default.INVALID_OPERATION,addr:null}),void l.default.error("Server already in connecting/connected state")):null!==s&&void 0!==s&&parseInt(s)!==s?(o&&o(f.default.INVALID_PARAMETER),_.report.joinGateway(e.sid,{lts:r,succ:!1,ec:f.default.INVALID_PARAMETER,addr:null}),void l.default.error("Input uid is invalid")):(L.joinInfo=e,L.uid=s,L.key=t,L.state=1,void U(e,function(t){L.stunServerUrl=t.stunServerUrl,L.turnServer=t.turnServer,L.state=2,l.default.debug("Connected to gateway server"),L.pingTimer=setInterval(function(){x(n(),function(){},function(e){})},3e3),x(a(),function(t){_.report.joinGateway(e.sid,{lts:r,succ:!0,ec:null,vid:t.vid,addr:L.socket.getURL()}),i(L.uid)},function(t){l.default.error("User join failed ["+t+"]"),t===f.default.ERR_INVALID_VENDOR_KEY?t=f.default.INVALID_KEY:t===f.default.ERR_INVALID_DYNAMIC_KEY?t=f.default.INVALID_DYNAMIC_KEY:t===f.default.ERR_DYNAMIC_KEY_TIMEOUT?t=f.default.DYNAMIC_KEY_TIMEOUT:t===f.default.ERR_NO_VOCS_AVAILABLE?t=f.default.NO_VOCS_AVAILABLE:t===f.default.ERR_NO_VOS_AVAILABLE?t=f.default.NO_VOS_AVAILABLE:t===f.default.ERR_JOIN_CHANNEL_TIMEOUT?t=f.default.JOIN_CHANNEL_TIMEOUT:t===f.default.ERR_FAILED?t=f.default.FAILED:t===f.default.WARN_NO_AVAILABLE_CHANNEL?t=f.default.NO_AVAILABLE_CHANNEL:t===f.default.WARN_LOOKUP_CHANNEL_TIMEOUT?t=f.default.LOOKUP_CHANNEL_TIMEOUT:t===f.default.WARN_LOOKUP_CHANNEL_REJECTED?t=f.default.LOOKUP_CHANNEL_REJECTED:t===f.default.WARN_OPEN_CHANNEL_TIMEOUT?t=f.default.OPEN_CHANNEL_TIMEOUT:t===f.default.WARN_OPEN_CHANNEL_REJECTED?t=f.default.OPEN_CHANNEL_REJECTED:t===f.default.WARN_REQUEST_DEFERRED&&(t=f.default.REQUEST_DEFERRED),o&&o(t),_.report.joinGateway(e.sid,{lts:r,succ:!1,ec:t,addr:L.socket.getURL()})})},function(t){t=JSON.stringify(t),l.default.error("User join failed ["+t+"]"),o&&o(t),_.report.joinGateway(e.sid,{lts:r,succ:!1,ec:t,addr:L.socket.getURL()})}))},L.leave=function(e,i){if(2!=L.state)return void M(e);clearInterval(L.pingTimer);for(var n in L.timers)L.timers.hasOwnProperty(n)&&clearInterval(L.timers[n]);x(u(),function(t){L.socket.close(),L.socket=void 0,l.default.info("Leave channal success"),e&&e(t)},i);for(var n in L.localStreams)if(L.localStreams.hasOwnProperty(n)){var o=L.localStreams[n];delete L.localStreams[n],void 0!==o.pc&&(o.pc.close(),o.pc=void 0)}t(),L.state=0},L.publish=function(e,t,i){var n=(new Date).getTime();if(e.publishLTS=n,"object"!==(void 0===e?"undefined":o(e))||null===e)return l.default.error("Invalid local stream"),i&&i(f.default.INVALID_LOCAL_STREAM),void _.report.publish(L.joinInfo.sid,{lts:n,succ:!1,ec:f.default.INVALID_LOCAL_STREAM});if(null===e.stream&&void 0===e.url)return l.default.error("Invalid local media stream"),i&&i(f.default.INVALID_LOCAL_STREAM),void _.report.publish(L.joinInfo.sid,{lts:n,succ:!1,ec:f.default.INVALID_LOCAL_STREAM});if(2!==L.state)return l.default.error("User is not in the session"),i&&i(f.default.INVALID_OPERATION),void _.report.publish(L.joinInfo.sid,{lts:n,succ:!1,ec:f.default.INVALID_OPERATION});var r=e.getAttributes()||{};e.local&&void 0===L.localStreams[e.getId()]&&(e.hasAudio()||e.hasVideo()||e.hasScreen())&&(void 0!==e.url?B(A({state:"url",audio:e.hasAudio(),video:e.hasVideo(),attributes:e.getAttributes(),mode:L.mode},e.url),function(t,i){"success"===t?(e.getUserId=function(){return i},L.localStreams[i]=e,e.onClose=function(){L.unpublish(e)}):l.default.error("Publish local stream failed",t)}):(L.localStreams[e.getId()]=e,e.pc=(0,d.Connection)({callback:function(o){l.default.debug("SDP exchange in publish : send offer --  ",JSON.parse(o)),B(A({state:"offer",id:e.getId(),audio:e.hasAudio(),video:e.hasVideo()||e.hasScreen(),attributes:e.getAttributes(),mode:L.mode,codec:L.codec},o),function(r,a){if("error"===r)return l.default.error("Publish local stream failed"),i&&i(f.default.PUBLISH_STREAM_FAILED),void _.report.publish(L.joinInfo.sid,{lts:n,succ:!1,localSDP:o,ec:f.default.PUBLISH_STREAM_FAILED});e.pc.onsignalingmessage=function(t){e.pc.onsignalingmessage=function(){},B(A({state:"ok",id:e.getId(),audio:e.hasAudio(),video:e.hasVideo(),screen:e.hasScreen(),attributes:e.getAttributes(),mode:L.mode},t)),e.getUserId=function(){return a.id},l.default.info("Local stream published with uid",a.id),e.onClose=function(){L.unpublish(e)},e.unmuteAudio=function(){x(p({action:"audio-out-on",streamId:e.getId()}),function(){},function(){})},e.unmuteVideo=function(){x(p({action:"video-out-on",streamId:e.getId()}),function(){},function(){})},e.muteAudio=function(){x(p({action:"audio-out-off",streamId:e.getId()}),function(){},function(){})},e.muteVideo=function(){x(p({action:"video-out-off",streamId:e.getId()}),function(){},function(){})}},e.pc.oniceconnectionstatechange=function(o){"failed"===o?(void 0!=L.timers[e.getId()]&&clearInterval(L.timers[e.getId()]),x(E(),function(){},function(){}),L.socket.disconnect(),l.default.error("Publisher connection is lost"),i&&i(f.default.PEERCONNECTION_FAILED),_.report.publish(L.joinInfo.sid,{lts:n,succ:!1,ec:f.default.PEERCONNECTION_FAILED})):"connected"===o&&(t&&t(),_.report.publish(L.joinInfo.sid,{lts:n,succ:!0,ec:null}))},l.default.debug("SDP exchange in publish : receive answer --  ",JSON.parse(r)),e.pc.processSignalingMessage(r)})},audio:e.hasAudio(),video:e.hasVideo(),screen:e.hasScreen(),isSubscriber:!1,iceServers:[],stunServerUrl:L.stunServerUrl,turnServer:L.turnServer,maxAudioBW:r.maxAudioBW,minVideoBW:r.minVideoBW,maxVideoBW:r.maxVideoBW,mode:L.mode,codec:L.codec}),e.pc.addStream(e.stream),l.default.debug("PeerConnection add stream :",e.stream),L.timers[e.getId()]=setInterval(function(){e&&e.pc&&e.pc.getStats&&e.pc.getStatsRate(function(t){t.forEach(function(t){-1===t.id.indexOf("outbound_rtp")&&-1===t.id.indexOf("OutboundRTP")||"video"!==t.mediaType||(t.googFrameWidthSent=e.videoWidth+"",t.googFrameHeightSent=e.videoHeight+""),e.getUserId&&(e.getId()===e.getUserId()?x(C(t),null,null):x(w(t),null,null))})})},3e3),void 0!==e.aux_stream&&(e.pc.addStream(e.aux_stream),l.default.debug("PeerConnection add stream :",e.aux_stream))))},L.unpublish=function(e,t,i){return"object"!==(void 0===e?"undefined":o(e))||null===e?(M(i,f.default.INVALID_LOCAL_STREAM),void l.default.error("Invalid local stream")):2!==L.state?(M(i,f.default.INVALID_OPERATION),void l.default.error("User not in the session")):(void 0!=L.timers[e.getId()]&&clearInterval(L.timers[e.getId()]),void(void 0!==L.socket?e.local&&void 0!==L.localStreams[e.getId()]?(delete L.localStreams[e.getId()],x(R(e.getUserId()),function(n){if("error"===n)return M(i,f.default.UNPUBLISH_STREAM_FAILED),void l.default.error("Unpublish stream failed");(e.hasAudio()||e.hasVideo()||e.hasScreen())&&void 0===e.url&&void 0!==e.pc&&(e.pc.close(),e.pc=void 0),e.onClose=void 0,e.unmuteAudio=void 0,e.muteAudio=void 0,e.unmuteVideo=void 0,e.muteVideo=void 0,t&&t()},i)):(M(i,f.default.INVALID_LOCAL_STREAM),l.default.error("Invalid local stream")):(M(i,f.default.INVALID_OPERATION),l.default.error("User not in the session"))))},L.subscribe=function(e,t){var i=(new Date).getTime();return e.subscribeLTS=i,"object"!==(void 0===e?"undefined":o(e))||null===e?(t&&t(f.default.INVALID_REMOTE_STREAM),_.report.subscribe(L.joinInfo.sid,{lts:i,succ:!1,peerid:e.getId()+"",ec:f.default.INVALID_REMOTE_STREAM}),void l.default.error("Invalid remote stream")):2!==L.state?(t&&t(f.default.INVALID_OPERATION),_.report.subscribe(L.joinInfo.sid,{lts:i,succ:!1,peerid:e.getId()+"",ec:f.default.INVALID_OPERATION}),void l.default.error("User is not in the session")):void(!e.local&&L.remoteStreams.hasOwnProperty(e.getId())&&(e.hasAudio()||e.hasVideo()||e.hasScreen())?(e.pc=(0,d.Connection)({callback:function(t){l.default.debug("SDP exchange in subscribe : send offer --  ",JSON.parse(t)),B(O({streamId:e.getId(),audio:!0,video:!0,mode:L.mode,codec:L.codec},t),function(t){if("error"===t)return l.default.error("Subscribe remote stream failed, closing stream ",e.getId()),void e.close();l.default.debug("SDP exchange in subscribe : receive answer --  ",JSON.parse(t)),e.pc.processSignalingMessage(t)})},nop2p:!0,audio:!0,video:!0,screen:e.hasScreen(),isSubscriber:!0,iceServers:[],stunServerUrl:L.stunServerUrl,turnServer:L.turnServer}),e.pc.onaddstream=function(t,i){if("ontrack"===i&&"video"===t.track.kind||"onaddstream"===i){if(l.default.info("Remote stream subscribed with uid ",e.getId()),L.remoteStreams[e.getId()].stream="onaddstream"===i?t.stream:t.streams[0],L.remoteStreams[e.getId()].hasVideo()){if((0,b.isFireFox)()){var n=L.remoteStreams[e.getId()].stream;(0,h.vsResHack)(n,function(t,i){e.videoWidth=t,e.videoHeight=i},function(e){return l.default.warning("vsResHack failed:"+e)})}}else L.remoteStreams[e.getId()].disableVideo();var o=(0,c.StreamEvent)({type:"stream-subscribed",stream:L.remoteStreams[e.getId()]});L.dispatchEvent(o)}e.unmuteAudio=function(){x(p({action:"audio-in-on",streamId:e.getId()}),function(){},function(){})},e.muteAudio=function(){x(p({action:"audio-in-off",streamId:e.getId()}),function(){},function(){})},e.unmuteVideo=function(){x(p({action:"video-in-on",streamId:e.getId()}),function(){},function(){})},e.muteVideo=function(){x(p({action:"video-in-off",streamId:e.getId()}),function(){},function(){})}},L.timers[e.getId()]=setInterval(function(){e&&e.pc&&e.pc.getStats&&e.pc.getStatsRate(function(t){t.forEach(function(t){-1!==t.id.indexOf("inbound_rtp")&&"video"===t.mediaType&&(t.googFrameWidthReceived=e.videoWidth+"",t.googFrameHeightReceived=e.videoHeight+""),B(T(e.getId(),t),null,null)})})},3e3),L.audioLevel[e.getId()]=0,L.timers[e.getId()+"audio"]=setInterval(function(){e&&e.pc&&e.pc.getStats&&e.pc.getStats(function(t){t.forEach(function(t){if("audio"===t.mediaType){if(t.audioOutputLevel>5e3){L.audioLevel[e.getId()]<20&&(L.audioLevel[e.getId()]+=1);for(var i in L.audioLevel)parseInt(i)!==e.getId()&&L.audioLevel[i]>0&&(L.audioLevel[i]-=1)}var n=Object.keys(L.audioLevel),o=n.sort(function(e,t){return L.audioLevel[t]-L.audioLevel[e]});if(L.activeSpeaker!==o[0]){var r=(0,c.ClientEvent)({type:"active-speaker",uid:o[0]});L.dispatchEvent(r),L.activeSpeaker=o[0],l.default.debug("Update active speaker:"+L.activeSpeaker)}}})})},50),e.pc.oniceconnectionstatechange=function(n){"failed"===n?(void 0!=L.timers[e.getId()]&&(clearInterval(L.timers[e.getId()]),clearInterval(L.timers[e.getId()]+"audio")),x(E(),function(){},function(){}),L.socket.disconnect(),l.default.error("Subscriber connection is lost",e.getId()),t&&t(f.default.PEERCONNECTION_FAILED),_.report.subscribe(L.joinInfo.sid,{lts:i,succ:!1,peerid:e.getId()+"",ec:f.default.PEERCONNECTION_FAILED})):"connected"===n&&(_.report.subscribe(L.joinInfo.sid,{lts:i,succ:!0,peerid:e.getId()+"",ec:null}),L.firstFrameTimer.set(e.getId(),setInterval(function(){e.pc?e.pc.getStats(function(t){t.forEach(function(t){-1===t.id.indexOf("recv")&&-1===t.id.indexOf("inbound_rtp")&&-1===t.id.indexOf("InboundRTP")||"video"===t.mediaType&&(t.framesDecoded>0||t.googFramesDecoded>0)&&(clearInterval(L.firstFrameTimer.get(e.getId())),L.firstFrameTimer.delete(e.getId()),_.report.firstRemoteFrame(L.joinInfo.sid,{lts:(new Date).getTime(),peerid:e.getId()+"",succ:!0,width:+t.googFrameWidthReceived,height:+t.googFrameHeightReceived}))})}):(clearInterval(L.firstFrameTimer.get(e.getId())),L.firstFrameTimer.delete(e.getId()))},100)))}):(t&&t(f.default.INVALID_REMOTE_STREAM),_.report.subscribe(L.joinInfo.sid,{lts:i,succ:!1,peerid:e.getId()+"",ec:f.default.INVALID_REMOTE_STREAM}),l.default.error("Invalid remote stream")))},L.unsubscribe=function(e,t){return"object"!==(void 0===e?"undefined":o(e))||null===e?(M(t,f.default.INVALID_REMOTE_STREAM),void l.default.error("Invalid remote stream")):2!==L.state?(M(t,f.default.INVALID_OPERATION),void l.default.error("User is not in the session")):(void 0!=L.timers[e.getId()]&&(clearInterval(L.timers[e.getId()]),clearInterval(L.timers[e.getId()]+"audio")),void 0!=L.audioLevel[e.getId()]&&delete L.audioLevel[e.getId()],void 0!=L.timer_counter[e.getId()]&&delete L.timer_counter[e.getId()],L.remoteStreams.hasOwnProperty(e.getId())?L.socket?e.local?(M(t,f.default.INVALID_REMOTE_STREAM),void l.default.error("Invalid remote stream")):(e.close(),delete L.remoteStreams[e.getId()],void x(I(e.getId()),function(i){if("error"===i)return M(t,f.default.UNSUBSCRIBE_STREAM_FAILED),void l.default.error("Unsubscribe remote stream failed",e.getId());l.default.info("Unsubscrib stream success")},t)):(M(t,f.default.INVALID_OPERATION),void l.default.error("User is not in the session")):void M(t,f.default.NO_SUCH_REMOTE_STREAM))},L.setRemoteVideoStreamType=function(e,t){if(l.default.debug("Switching remote video stream "+e.getId()+" to "+t),"object"!==(void 0===e?"undefined":o(e))||null===e)return void l.default.error("Invalid remote stream");if(2!==L.state)return void l.default.error("User is not in the session");if(!e.local){switch(t){case L.remoteVideoStreamTypes.REMOTE_VIDEO_STREAM_HIGH:case L.remoteVideoStreamTypes.REMOTE_VIDEO_STREAM_LOW:case L.remoteVideoStreamTypes.REMOTE_VIDEO_STREAM_MEDIUM:break;default:return}x(y(e.getId(),t),null,null)}},L.startLiveStreaming=function(e,t){if(L.liveStreams.set(e,t),l.default.debug("Start live streaming "+e+" transcodingEnabled "+t),2!==L.state)return void l.default.error("User is not in the session");x(N(e,t),null,null)},L.stopLiveStreaming=function(e){if(l.default.debug("Stop live streaming "+e),2!==L.state)return void l.default.error("User is not in the session");L.liveStreams.delete(e),x(D(e),null,null)},L.setLiveTranscoding=function(e){if(L.transcoding=e,l.default.debug("Set live transcoding "+e),2!==L.state)return void l.default.error("User is not in the session");x(k(e),null,null)};var V=function(e){return 1e3*Math.min(30,Math.pow(2,e)-1)},P=function(){L.key?(l.default.info("Re-joining to channel "+L.joinInfo.cname),L.join(L.joinInfo,L.key,function(e){l.default.info("User "+e+" is re-joined to "+L.joinInfo.cname);for(var t in L.localStreams)if(void 0!==L.localStreams[t]){var i=L.localStreams[t];delete L.localStreams[t],void 0!==i.pc&&(i.pc.close(),i.pc=void 0)}L.dispatchEvent((0,c.ClientEvent)({type:"rejoin"})),L.liveStreams&&L.liveStreams.size&&L.liveStreams.forEach(function(e,t){e&&L.setLiveTranscoding(L.transcoding),L.startLiveStreaming(t,e)})},function(e){if(l.default.error("Re-join to channel failed ["+e+"]"),e===f.default.ERR_INVALID_VENDOR_KEY){var t=(0,c.StreamEvent)({type:"error",reason:f.default.INVALID_KEY});L.dispatchEvent(t)}else if(e===f.default.ERR_INVALID_DYNAMIC_KEY){var t=(0,c.StreamEvent)({type:"error",reason:f.default.INVALID_DYNAMIC_KEY});L.dispatchEvent(t)}else if(e===f.default.ERR_DYNAMIC_KEY_TIMEOUT){var t=(0,c.StreamEvent)({type:"error",reason:f.default.DYNAMIC_KEY_TIMEOUT});L.dispatchEvent(t);var i=V(L.attemps);l.default.error("Connect to server failed [Channel key timeout], attempt to recover [#"+L.attemps+"] after "+i/1e3+" seconds");setTimeout(function(){L.attemps++,void 0!==L.socket&&L.socket.disconnect()},i)}})):l.default.error("Connection recover failed [Invalid channel key]")},F=function(e){L.socket=(0,s.default)(e,{sid:L.joinInfo.sid})},U=function(e,n,o){void 0!==L.socket?L.socket.socket.connect():(F(e.gatewayAddr),L.socket.on("onUplinkStats",function(e){L.localStreams[L.uid]&&(L.localStreams[L.uid].uplinkStats=e)}),L.socket.on("connect",function(){L.attemps=1,x(m(e),n,o)}),L.socket.on("reconnect",function(){l.default.debug("Try to reconnect choose server and get gateway list again "),(0,g.getGatewayList)(L.joinInfo,function(e){L.socket.reconnect(e.gateway_addr)})}),L.socket.on("connect_error",function(e){for(var n in L.timers)L.timers.hasOwnProperty(n)&&clearInterval(L.timers[n]);for(var n in L.remoteStreams)if(L.remoteStreams.hasOwnProperty(n)){var o=L.remoteStreams[n],r=(0,c.ClientEvent)({type:"stream-removed",uid:o.getId(),stream:o});L.dispatchEvent(r)}if(t(),1!=i){clearInterval(L.pingTimer),L.state=0,L.socket=void 0;var r=(0,c.StreamEvent)({type:"error",reason:f.default.SOCKET_ERROR});L.dispatchEvent(r);var a=V(L.attemps);l.default.error("Connect to server error ["+JSON.stringify(e)+"], attempt to recover [#"+L.attemps+"] after "+a/1e3+" seconds");setTimeout(function(){L.attemps++,P()},a)}}),L.socket.on("disconnect",function(e){if(0!==L.state){L.state=0;for(var n in L.timers)L.timers.hasOwnProperty(n)&&clearInterval(L.timers[n]);for(var n in L.remoteStreams)if(L.remoteStreams.hasOwnProperty(n)){var o=L.remoteStreams[n],r=(0,c.ClientEvent)({type:"stream-removed",uid:o.getId(),stream:o});L.dispatchEvent(r)}if(t(),1!=i){clearInterval(L.pingTimer),L.socket=void 0;var r=(0,c.StreamEvent)({type:"error",reason:f.default.SOCKET_DISCONNECTED});L.dispatchEvent(r);var a=V(L.attemps);l.default.error("Disconnect from server ["+e+"], attempt to recover [#"+L.attemps+"] after "+a/1e3+" seconds");setTimeout(function(){L.attemps++,P()},a)}}}),L.socket.on("onAddAudioStream",function(e){if(void 0===L.remoteStreams[e.id]){var t=(0,r.Stream)({streamID:e.id,local:!1,audio:e.audio,video:e.video,screen:e.screen,attributes:e.attributes});L.remoteStreams[e.id]=t;var i=(0,c.StreamEvent)({type:"stream-added",stream:t});L.dispatchEvent(i)}}),L.socket.on("onAddVideoStream",function(e){if(l.default.info("Newly added remote stream with uid",e.id),void 0===L.remoteStreams[e.id]){var t=(0,r.Stream)({streamID:e.id,local:!1,audio:e.audio,video:e.video,screen:e.screen,attributes:e.attributes});L.remoteStreams[e.id]=t;var i=(0,c.StreamEvent)({type:"stream-added",stream:t});L.dispatchEvent(i)}else if(void 0!==L.remoteStreams[e.id].stream){L.remoteStreams[e.id].video=!0,L.remoteStreams[e.id].enableVideo(),l.default.info("Stream changed: enable video "+e.id);var n=L.remoteStreams[e.id],o=n.player.elementID;n.stop(),n.play(o)}else{var t=(0,r.Stream)({streamID:e.id,local:!1,audio:!0,video:!0,screen:!1,attributes:e.attributes});L.remoteStreams[e.id]=t,l.default.info("Stream changed: modify video "+e.id)}}),L.socket.on("onRemoveStream",function(e){var t=L.remoteStreams[e.id];if(!t)return void console.log("ERROR stream ",e.id," not found onRemoveStream ",e);delete L.remoteStreams[e.id];var i=(0,c.StreamEvent)({type:"stream-removed",stream:t});L.dispatchEvent(i),t.close(),void 0!==t.pc&&(t.pc.close(),t.pc=void 0)}),L.socket.on("onPublishStream",function(e){var t=L.localStreams[e.id],i=(0,c.StreamEvent)({type:"stream-published",stream:t});L.dispatchEvent(i)}),L.socket.on("mute_audio",function(e){l.default.info("rcv peer mute audio");var t=(0,c.ClientEvent)({type:"mute-audio",uid:e.peerid});L.dispatchEvent(t)}),L.socket.on("unmute_audio",function(e){l.default.info("rcv peer unmute audio");var t=(0,c.ClientEvent)({type:"unmute-audio",uid:e.peerid});L.dispatchEvent(t)}),L.socket.on("mute_video",function(e){l.default.info("rcv peer mute video");var t=(0,c.ClientEvent)({type:"mute-video",uid:e.peerid});L.dispatchEvent(t)}),L.socket.on("unmute_video",function(e){l.default.info("rcv peer unmute video");var t=(0,c.ClientEvent)({type:"unmute-video",uid:e.peerid});L.dispatchEvent(t)}),L.socket.on("user_banned",function(e){l.default.info("user banned uid:"+e.id+"error:"+e.errcode);var t=(0,c.ClientEvent)({type:"client-banned",uid:e.id,attr:e.errcode});L.dispatchEvent(t),i=!0,leave()}),L.socket.on("onP2PLost",function(e){if(l.default.debug("p2plost:",e),"publish"===e.event){var t=L.localStreams[e.uid];t&&_.report.publish(L.joinInfo.sid,{lts:t.publishLTS,succ:!1,ec:"DTLS failed"})}if("subscribe"===e.event){var i=L.remoteStreams[e.uid];i&&_.report.subscribe(L.joinInfo.sid,{lts:i.subscribeLTS,succ:!1,peerid:e.uid+"",ec:"DTLS failed"})}L.socket.disconnect()}),L.socket.on("onPeerLeave",function(e){var t=(0,c.ClientEvent)({type:"peer-leave",uid:e.id});if(L.remoteStreams.hasOwnProperty(e.id)&&(t.stream=L.remoteStreams[e.id]),L.dispatchEvent(t),L.remoteStreams.hasOwnProperty(e.id)){l.default.info("closing stream on peer leave",e.id);var i=L.remoteStreams[e.id];i.close(),delete L.remoteStreams[e.id],void 0!==i.pc&&(i.pc.close(),i.pc=void 0)}L.timers.hasOwnProperty(e.id)&&(clearInterval(L.timers[e.id]),delete L.timers[e.id]),void 0!=L.audioLevel[e.id]&&delete L.audioLevel[e.id],void 0!=L.timer_counter[e.id]&&delete L.timer_counter[e.id]}),L.socket.on("onUplinkStats",function(e){}),L.socket.on("liveStreamingStarted",function(e){var t=(0,c.LiveStreamingEvent)({type:"liveStreamingStarted",url:e.url});L.dispatchEvent(t)}),L.socket.on("liveStreamingFailed",function(e){var t=(0,c.LiveStreamingEvent)({type:"liveStreamingFailed",url:e.url});L.dispatchEvent(t)}),L.socket.on("liveStreamingStopped",function(e){var t=(0,c.LiveStreamingEvent)({type:"liveStreamingStopped",url:e.url});L.dispatchEvent(t)}),L.socket.on("liveTranscodingUpdated",function(e){var t=(0,c.LiveStreamingEvent)({type:"liveTranscodingUpdated",reason:e.reason});L.dispatchEvent(t)}))},x=function(e,t,i){if(void 0===L.socket)return M(i,f.default.INVALID_OPERATION),void l.default.error("No socket available");try{L.socket.emitSimpleMessage(e,function(e,n){"success"===e?"function"==typeof t&&t(n):"function"==typeof i&&i(n)})}catch(t){M(i,f.default.SOCKET_ERROR),l.default.error("Socket emit message failed"+JSON.stringify(e)),l.default.error(t)}},B=function(e,t){if(void 0===L.socket)return void l.default.error("Error in sendSimpleSdp [socket not ready]");try{L.socket.emitSimpleMessage(e,function(e,i){void 0!==t&&t(e,i)})}catch(e){l.default.error("Error in sendSimpleSdp ["+e+"]")}};return L};t.default=E},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.LiveTranscoding=t.TranscodingUser=t.VIDEO_CODEC_PROFILE_HIGH=t.VIDEO_CODEC_PROFILE_MAIN=t.VIDEO_CODEC_PROFILE_BASELINE=t.AUDIO_SAMPLE_RATE_48000=t.AUDIO_SAMPLE_RATE_44100=t.AUDIO_SAMPLE_RATE_32000=t.createLiveClient=t.createRtcClient=t.createClient=void 0;var o=i(14),r=n(o),a=i(0),s=n(a),d=i(8),c=n(d),u=i(3),l=i(13),p=i(4),f=i(1),m=i(34),v=i(7),g=function(e){var t={};return t.key=void 0,t.highStream=null,t.lowStream=null,t.isDualStream=!1,t.highStreamState=2,t.lowStreamState=2,t._getVideoCameraIdByLabel=function(e,t,i){(0,v.getDevices)(function(n){var o=!0,r=!1,a=void 0;try{for(var s,d=n[Symbol.iterator]();!(o=(s=d.next()).done);o=!0){var c=s.value;if(c.label===e&&"videoinput"===c.kind)return t(c.deviceId)}}catch(e){r=!0,a=e}finally{try{!o&&d.return&&d.return()}finally{if(r)throw a}}return i()},i)},t.init=function(t,i,n){s.default.info("Initializing AgoraRTC client"),e.appId=t,e.sessionId=(0,u.generateSessionId)(),i()},t.configPublisher=function(e){t.gatewayClient.configPublisher(e)},t.enableDualStream=function(i,n){if("iOS"===(0,f.getBrowserOS)())return p.report.streamSwitch(e.sessionId,{lts:(new Date).getTime(),isdual:!0,succ:!1}),n&&n(c.default.IOS_NOT_SUPPORT);p.report.streamSwitch(e.sessionId,{lts:(new Date).getTime(),isdual:!0,succ:!0}),t.isDualStream=!0,0===t.highStreamState?t._publishLowStream(i,n):1===t.highStreamState?n&&n(c.default.STILL_ON_PUBLISHING):i&&i()},t.disableDualStream=function(i,n){p.report.streamSwitch(e.sessionId,{lts:(new Date).getTime(),isdual:!1,succ:!0}),t.isDualStream=!1,0===t.highStreamState?t._unpublishLowStream(i,n):1===t.highStreamState?n&&n(c.default.STILL_ON_PUBLISHING):i&&i()},t._createLowStream=function(e,i){if(!t.highStream||!t.highStream.stream)return s.default.warning("Can't create low-stream without highStream");var n=Object.assign({},t.highStream.params);if(n.streamID+=1,n.audio=!1,n.video){var o=t.highStream.stream.getVideoTracks()[0];o||i("can not get hight-stream video track"),t._getVideoCameraIdByLabel(o.label,function(r){n.cameraId=r;var a=new v.Stream(n);a.setVideoProfileCustom((0,m.simMap)(t.highStream.profile)),a.init(function(){t.highStream.lowStream=a,o.enabled||a.disableVideo(),e&&e(a)},function(){return i("can not get hight-stream video track")})})}},t._getLowStream=function(e,i){t.lowStream?e(t.lowStream):t._createLowStream(function(i){t.lowStream=i,e(t.lowStream)},i)},t._publishLowStream=function(e,i){return 2!==t.lowStreamState?(s.default.warning("Can't publish low-stream when low-stream already publish"),i&&i()):t.highStream&&t.highStream.hasScreen()?i&&i(c.default.SHARING_SCREEN_NOT_SUPPORT):void t._getLowStream(function(n){t.lowStreamState=1,t.gatewayClient.publish(n,function(){t.lowStreamState=0,e&&e()},function(e){s.default.debug("publish low stream failed"),i&&i(e)})},i)},t._unpublishLowStream=function(e,i){if(0!==t.lowStreamState)return s.default.warning("Can't unpublish low-stream when low-stream not ever publish"),i&&i();t.lowStream&&(t.gatewayClient.unpublish(t.lowStream,function(){},function(e){s.default.debug("unpublish low stream failed"),i&&i(e)}),t.lowStream.close(),t.lowStream=null,t.lowStreamState=2,e&&e())},t.join=function(i,n,o,r,a){t.highStream=null,t.lowStream=null,t.isDualStream=!1,t.highStreamState=2,t.lowStreamState=2;var d={appId:e.appId,sid:e.sessionId,cname:n,uid:o};p.report.sessionInit(e.sessionId,{lts:(new Date).getTime(),cname:n,appid:e.appId,mode:e.mode,succ:!0}),(0,l.getGatewayList)(d,function(o){s.default.info("Joining channel: "+n),t.key=i||e.appId,d.cid=o.cid,d.uid=o.uid,d.gatewayAddr=o.gateway_addr,t.gatewayClient.join(d,t.key,function(e){s.default.info("Join channal "+n+" success"),r(e)},a)},a)},t.renewChannelKey=function(e,i,n){void 0===t.key&&((0,u.safeCall)(n,c.default.INVALID_OPERATION),s.default.error("renewChannelKey should not be called before user join")),t.key=e,(0,u.safeCall)(i)},t.leave=function(e,i){s.default.info("Leaving channel"),t.gatewayClient.leave(e,i)},t.publish=function(i,n){if(2!==t.highStreamState)return s.default.warning("Can't publish stream when stream already publish",i.getId()),n&&n("stream already publish");s.default.info("Publishing stream, uid: ",i.getId()),t.highStream=i,t.highStreamState=1,t.gatewayClient.publish(i,function(){i.sid=e.sessionId,t.highStreamState=0,s.default.info("Publish success, uid:",i.getId()),t.isDualStream&&t._publishLowStream(null,n)},n)},t.unpublish=function(e,i){if(0!==t.highStreamState)return s.default.warning("Can't unpublish stream when stream not publish"),i&&i("stream not publish");s.default.info("Unpublish stream, uid: ",e.getId()),t.isDualStream&&t.lowStream?(t._unpublishLowStream(null,i),t.gatewayClient.unpublish(e,null,i),t.highStreamState=2,s.default.info("Unpublish stream success, uid:",e.getId())):(t.gatewayClient.unpublish(e,null,i),t.highStreamState=2,s.default.info("Unpublish stream success, uid:",e.getId()))},t.subscribe=function(e,i){s.default.info("Subscribe stream, uid: ",e.getId()),t.gatewayClient.subscribe(e,i)},t.unsubscribe=function(e,i){s.default.info("Unsubscribe stream, uid: ",e.getId()),t.gatewayClient.unsubscribe(e,i)},t.setRemoteVideoStreamType=function(e,i){t.gatewayClient.setRemoteVideoStreamType(e,i)},t.startLiveStreaming=function(e,i){t.gatewayClient.startLiveStreaming(e,i)},t.stopLiveStreaming=function(e){t.gatewayClient.stopLiveStreaming(e)},t.setLiveTranscoding=function(e){Object.assign(_,e),t.gatewayClient.setLiveTranscoding(_)},t.gatewayClient=(0,r.default)(e),t.on=t.gatewayClient.on,t.on("rejoin",function(){var e=2===t.highStreamState?2:0;t.highStream&&0===e&&(s.default.info("publish after rejoin"),t.highStreamState=2,t.lowStreamState=2,t.publish(t.highStream,function(e){e&&s.default.info(e)}))}),t},S={uid:0,x:0,y:0,width:0,height:0,zOrder:0,alpha:1},_={width:640,height:360,videoBitrate:400,videoFramerate:15,lowLatency:!1,audioSampleRate:48e3,audioBitrate:48,audioChannels:1,videoGop:30,videoCodecProfile:100,userCount:0,userConfigExtraInfo:{},backgroundColor:0,transcodingUsers:[]},h=function(e){return e&&"interop"===e.mode?(s.default.info("Creating client , MODE : Interop"),g({mode:"live"})):e&&"h264_interop"===e.mode?(s.default.info("Creating client , MODE : h264_interop"),g({mode:"live",codec:"h264"})):(s.default.info("Creating client , MODE : web-only"),g({mode:"rtc"}))},b=function(){return s.default.info("Creating client , MODE : rtc"),s.default.warning("createRtcClient is deprecated."),g({mode:"rtc"})},E=function(e){var t="host";return e&&"audience"===e.role&&(t=e.role),s.default.info("Creating client , MODE : live"),s.default.warning("createLiveClient is deprecated."),g({mode:"live",role:t})};t.createClient=h,t.createRtcClient=b,t.createLiveClient=E,t.AUDIO_SAMPLE_RATE_32000=32e3,t.AUDIO_SAMPLE_RATE_44100=44100,t.AUDIO_SAMPLE_RATE_48000=48e3,t.VIDEO_CODEC_PROFILE_BASELINE=66,t.VIDEO_CODEC_PROFILE_MAIN=77,t.VIDEO_CODEC_PROFILE_HIGH=100,t.TranscodingUser=S,t.LiveTranscoding=_},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(6),r=n(o),a=i(9),s=(n(a),i(18)),d=n(s),c=i(0),u=n(c),l=i(20),p=function(e){var t=(0,r.default)({});return t.id=e.id,t.url=e.url,t.stream=e.stream.stream,t.elementID=e.elementID,t.destroy=function(){t.video.srcObject=null,t.audio.srcObject=null,t.video.pause(),delete t.resizer,document.getElementById(t.div.id)&&t.parentNode.removeChild(t.div)},t.resize=function(){var i=t.container.offsetWidth,n=t.container.offsetHeight;e.stream.screen?.75*i<n?(t.video.style.width=i+"px",t.video.style.height=.75*i+"px",t.video.style.top=-(.75*i/2-n/2)+"px",t.video.style.left="0px"):(t.video.style.height=n+"px",t.video.style.width=4/3*n+"px",t.video.style.left=-(4/3*n/2-i/2)+"px",t.video.style.top="0px"):i===t.containerWidth&&n===t.containerHeight||(.75*i>n?(t.video.style.width=i+"px",t.video.style.height=.75*i+"px",t.video.style.top=-(.75*i/2-n/2)+"px",t.video.style.left="0px"):(t.video.style.height=n+"px",t.video.style.width=4/3*n+"px",t.video.style.left=-(4/3*n/2-i/2)+"px",t.video.style.top="0px")),t.containerWidth=i,t.containerHeight=n},t.div=document.createElement("div"),t.div.setAttribute("id","player_"+t.id),e.stream.video?t.div.setAttribute("style","width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;"):t.div.setAttribute("style","width: 100%; height: 100%; position: relative; overflow: hidden;"),t.video=document.createElement("video"),t.video.setAttribute("id","video"+t.id),e.stream.local&&!e.stream.screen?e.stream.mirror?t.video.setAttribute("style","width: 100%; height: 100%; position: absolute; transform: rotateY(180deg);"):t.video.setAttribute("style","width: 100%; height: 100%; position: absolute; "):e.stream.video?(t.video.setAttribute("style","width: 100%; height: 100%; position: absolute;"),window.navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")&&t.video.setAttribute("controls","")):e.stream.screen?t.video.setAttribute("style","width: 100%; height: 100%; position: absolute;"):t.video.setAttribute("style","width: 100%; height: 100%; position: absolute; display: none;"),t.video.setAttribute("autoplay",""),t.video.setAttribute("muted",""),t.video.setAttribute("playsinline",""),e.stream.local&&(t.video.volume=0,t.video.setAttribute("muted","")),t.audio=document.createElement("audio"),t.audio.setAttribute("id","audio"+t.id),t.audio.setAttribute("autoplay",""),e.stream.local&&(t.audio.volume=0,t.audio.setAttribute("muted","")),void 0!==t.elementID?(document.getElementById(t.elementID).appendChild(t.div),t.container=document.getElementById(t.elementID)):(document.body.appendChild(t.div),t.container=document.body),t.parentNode=t.div.parentNode,t.div.appendChild(t.video),t.div.appendChild(t.audio),t.video.addEventListener("playing",function(e){!function e(){if(t.video.videoWidth*t.video.videoHeight>4)return void u.default.debug("video dimensions:",t.video.videoWidth,t.video.videoHeight);setTimeout(e,50)}()}),t.containerWidth=0,t.containerHeight=0,t.resizer=new d.default(t.container,t.resize),t.resize(),(0,l.attachMediaStream)(document.getElementById("video"+t.id),e.stream.stream),(0,l.attachMediaStream)(document.getElementById("audio"+t.id),e.stream.stream),t};t.default=p},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(6),o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=function(e){var t,i,n,r=(0,o.default)({}),a=50;return r.elementID=e.elementID,r.media=e.media,r.id=e.id,void 0!==e.url&&(r.url=e.url),r.stream=e.stream,r.div=document.createElement("div"),r.div.setAttribute("style","width: 40%; height: 100%; max-width: 32px; position: absolute; right: 0;z-index:0;"),r.icon=document.createElement("img"),r.icon.setAttribute("id","volume_"+r.id),r.icon.setAttribute("src",r.url+"/assets/sound48.png"),r.icon.setAttribute("style","width: 80%; height: 100%; position: absolute;"),r.div.appendChild(r.icon),r.stream.local?(i=function(){r.media.muted=!0,r.icon.setAttribute("src",r.url+"/assets/mute48.png")},n=function(){r.media.muted=!1,r.icon.setAttribute("src",r.url+"/assets/sound48.png")},r.icon.onclick=function(){r.media.muted?n():i()}):(r.picker=document.createElement("input"),r.picker.setAttribute("id","picker_"+r.id),r.picker.type="range",r.picker.min=0,r.picker.max=100,r.picker.step=10,r.picker.value=a,r.picker.setAttribute("orient","vertical"),r.div.appendChild(r.picker),r.media.volume=r.picker.value/100,r.media.muted=!1,r.picker.oninput=function(){r.picker.value>0?(r.media.muted=!1,r.icon.setAttribute("src",r.url+"/assets/sound48.png")):(r.media.muted=!0,r.icon.setAttribute("src",r.url+"/assets/mute48.png")),r.media.volume=r.picker.value/100},t=function(e){r.picker.setAttribute("style","background: transparent; width: 32px; height: 100px; position: absolute; bottom: 90%; z-index: 1;"+r.div.offsetHeight+"px; right: 0px; -webkit-appearance: slider-vertical; display: "+e)},i=function(){r.icon.setAttribute("src",r.url+"/assets/mute48.png"),a=r.picker.value,r.picker.value=0,r.media.volume=0,r.media.muted=!0},n=function(){r.icon.setAttribute("src",r.url+"/assets/sound48.png"),r.picker.value=a,r.media.volume=r.picker.value/100,r.media.muted=!1},r.icon.onclick=function(){r.media.muted?n():i()},r.div.onmouseover=function(){t("block")},r.div.onmouseout=function(){t("none")},t("none")),document.getElementById(r.elementID).appendChild(r.div),r};t.default=r},function(e,t,i){var n,o;!function(r,a){n=a,void 0!==(o="function"==typeof n?n.call(t,i,t,e):n)&&(e.exports=o)}(0,function(){function e(e,t){var i=Object.prototype.toString.call(e),n="[object Array]"===i||"[object NodeList]"===i||"[object HTMLCollection]"===i||"[object Object]"===i||"undefined"!=typeof jQuery&&e instanceof jQuery||"undefined"!=typeof Elements&&e instanceof Elements,o=0,r=e.length;if(n)for(;o<r;o++)t(e[o]);else t(e)}if("undefined"==typeof window)return null;var t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return window.setTimeout(e,20)},i=function(n,o){function r(){var e=[];this.add=function(t){e.push(t)};var t,i;this.call=function(){for(t=0,i=e.length;t<i;t++)e[t].call()},this.remove=function(n){var o=[];for(t=0,i=e.length;t<i;t++)e[t]!==n&&o.push(e[t]);e=o},this.length=function(){return e.length}}function a(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):e.style[t]}function s(e,i){if(e.resizedAttached){if(e.resizedAttached)return void e.resizedAttached.add(i)}else e.resizedAttached=new r,e.resizedAttached.add(i);e.resizeSensor=document.createElement("div"),e.resizeSensor.className="resize-sensor";var n="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",o="position: absolute; left: 0; top: 0; transition: 0s;";e.resizeSensor.style.cssText=n,e.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+n+'"><div style="'+o+'"></div></div><div class="resize-sensor-shrink" style="'+n+'"><div style="'+o+' width: 200%; height: 200%"></div></div>',e.appendChild(e.resizeSensor),"static"==a(e,"position")&&(e.style.position="relative");var s,d,c,u,l=e.resizeSensor.childNodes[0],p=l.childNodes[0],f=e.resizeSensor.childNodes[1],m=e.offsetWidth,v=e.offsetHeight,g=function(){p.style.width="100000px",p.style.height="100000px",l.scrollLeft=1e5,l.scrollTop=1e5,f.scrollLeft=1e5,f.scrollTop=1e5};g();var S=function(){d=0,s&&(m=c,v=u,e.resizedAttached&&e.resizedAttached.call())},_=function(){c=e.offsetWidth,u=e.offsetHeight,s=c!=m||u!=v,s&&!d&&(d=t(S)),g()},h=function(e,t,i){e.attachEvent?e.attachEvent("on"+t,i):e.addEventListener(t,i)};h(l,"scroll",_),h(f,"scroll",_)}e(n,function(e){s(e,o)}),this.detach=function(e){i.detach(n,e)}};return i.detach=function(t,i){e(t,function(e){e.resizedAttached&&"function"==typeof i&&(e.resizedAttached.remove(i),e.resizedAttached.length())||e.resizeSensor&&(e.contains(e.resizeSensor)&&e.removeChild(e.resizeSensor),delete e.resizeSensor,delete e.resizedAttached)})},i})},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=new Date;return e.toTimeString().split(" ")[0]+":"+e.getMilliseconds()};t.getTimestamp=n},function(e,t,i){"use strict";function n(e){return new Promise(function(t,i){r(e,t,i)})}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=null,a=null,s=null,d=null,c=null,u=null,l={log:function(){},extractVersion:function(e,t,i){var n=e.match(t);return n&&n.length>=i&&parseInt(n[i])}};if("object"===("undefined"==typeof window?"undefined":o(window))&&(!window.HTMLMediaElement||"srcObject"in window.HTMLMediaElement.prototype||Object.defineProperty(window.HTMLMediaElement.prototype,"srcObject",{get:function(){return"mozSrcObject"in this?this.mozSrcObject:this._srcObject},set:function(e){"mozSrcObject"in this?this.mozSrcObject=e:(this._srcObject=e,this.src=URL.createObjectURL(e))}}),r=window.navigator&&window.navigator.getUserMedia),a=function(e,t){e.srcObject=t},s=function(e,t){e.srcObject=t.srcObject},"undefined"!=typeof window&&window.navigator)if(navigator.mozGetUserMedia&&window.mozRTCPeerConnection){if(l.log("This appears to be Firefox"),d="firefox",c=l.extractVersion(navigator.userAgent,/Firefox\/([0-9]+)\./,1),u=31,window.RTCPeerConnection=function(e,t){if(c<38&&e&&e.iceServers){for(var i=[],n=0;n<e.iceServers.length;n++){var o=e.iceServers[n];if(o.hasOwnProperty("urls"))for(var r=0;r<o.urls.length;r++){var a={url:o.urls[r]};0===o.urls[r].indexOf("turn")&&(a.username=o.username,a.credential=o.credential),i.push(a)}else i.push(e.iceServers[n])}e.iceServers=i}return new mozRTCPeerConnection(e,t)},window.RTCSessionDescription||(window.RTCSessionDescription=mozRTCSessionDescription),window.RTCIceCandidate||(window.RTCIceCandidate=mozRTCIceCandidate),r=function(e,t,i){var n=function(e){if("object"!==(void 0===e?"undefined":o(e))||e.require)return e;var t=[];return Object.keys(e).forEach(function(i){if("require"!==i&&"advanced"!==i&&"mediaSource"!==i){var n=e[i]="object"===o(e[i])?e[i]:{ideal:e[i]};if(void 0===n.min&&void 0===n.max&&void 0===n.exact||t.push(i),void 0!==n.exact&&("number"==typeof n.exact?n.min=n.max=n.exact:e[i]=n.exact,delete n.exact),void 0!==n.ideal){e.advanced=e.advanced||[];var r={};"number"==typeof n.ideal?r[i]={min:n.ideal,max:n.ideal}:r[i]=n.ideal,e.advanced.push(r),delete n.ideal,Object.keys(n).length||delete e[i]}}}),t.length&&(e.require=t),e};return c<38&&(l.log("spec: "+JSON.stringify(e)),e.audio&&(e.audio=n(e.audio)),e.video&&(e.video=n(e.video)),l.log("ff37: "+JSON.stringify(e))),navigator.mozGetUserMedia(e,t,i)},navigator.getUserMedia=r,navigator.mediaDevices||(navigator.mediaDevices={getUserMedia:n,addEventListener:function(){},removeEventListener:function(){}}),navigator.mediaDevices.enumerateDevices=navigator.mediaDevices.enumerateDevices||function(){return new Promise(function(e){e([{kind:"audioinput",deviceId:"default",label:"",groupId:""},{kind:"videoinput",deviceId:"default",label:"",groupId:""}])})},c<41){var p=navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);navigator.mediaDevices.enumerateDevices=function(){return p().then(void 0,function(e){if("NotFoundError"===e.name)return[];throw e})}}}else if(navigator.webkitGetUserMedia&&window.webkitRTCPeerConnection){l.log("This appears to be Chrome"),d="chrome",c=l.extractVersion(navigator.userAgent,/Chrom(e|ium)\/([0-9]+)\./,2),u=38,window.RTCPeerConnection=function(e,t){e&&e.iceTransportPolicy&&(e.iceTransports=e.iceTransportPolicy);var i=new webkitRTCPeerConnection(e,t),n=i.getStats.bind(i);return i.getStats=function(e,t,i){var o=this,r=arguments;if(arguments.length>0&&"function"==typeof e)return n(e,t);var a=function(e){var t={};return e.result().forEach(function(e){var i={id:e.id,timestamp:e.timestamp,type:e.type};e.names().forEach(function(t){i[t]=e.stat(t)}),t[i.id]=i}),t};if(arguments.length>=2){var s=function(e){r[1](a(e))};return n.apply(this,[s,arguments[0]])}return new Promise(function(t,i){1===r.length&&null===e?n.apply(o,[function(e){t.apply(null,[a(e)])},i]):n.apply(o,[t,i])})},i},["createOffer","createAnswer"].forEach(function(e){var t=webkitRTCPeerConnection.prototype[e];webkitRTCPeerConnection.prototype[e]=function(){var e=this;if(arguments.length<1||1===arguments.length&&"object"===o(arguments[0])){var i=1===arguments.length?arguments[0]:void 0;return new Promise(function(n,o){t.apply(e,[n,o,i])})}return t.apply(this,arguments)}}),["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){var t=webkitRTCPeerConnection.prototype[e];webkitRTCPeerConnection.prototype[e]=function(){var e=arguments,i=this;return new Promise(function(n,o){t.apply(i,[e[0],function(){n(),e.length>=2&&e[1].apply(null,[])},function(t){o(t),e.length>=3&&e[2].apply(null,[t])}])})}});var f=function(e){if("object"!==(void 0===e?"undefined":o(e))||e.mandatory||e.optional)return e;var t={};return Object.keys(e).forEach(function(i){if("require"!==i&&"advanced"!==i&&"mediaSource"!==i){var n="object"===o(e[i])?e[i]:{ideal:e[i]};void 0!==n.exact&&"number"==typeof n.exact&&(n.min=n.max=n.exact);var r=function(e,t){return e?e+t.charAt(0).toUpperCase()+t.slice(1):"deviceId"===t?"sourceId":t};if(void 0!==n.ideal){t.optional=t.optional||[];var a={};"number"==typeof n.ideal?(a[r("min",i)]=n.ideal,t.optional.push(a),a={},a[r("max",i)]=n.ideal,t.optional.push(a)):(a[r("",i)]=n.ideal,t.optional.push(a))}void 0!==n.exact&&"number"!=typeof n.exact?(t.mandatory=t.mandatory||{},t.mandatory[r("",i)]=n.exact):["min","max"].forEach(function(e){void 0!==n[e]&&(t.mandatory=t.mandatory||{},t.mandatory[r(e,i)]=n[e])})}}),e.advanced&&(t.optional=(t.optional||[]).concat(e.advanced)),t};if(r=function(e,t,i){return e.audio&&(e.audio=f(e.audio)),e.video&&(e.video=f(e.video)),l.log("chrome: "+JSON.stringify(e)),navigator.webkitGetUserMedia(e,t,i)},navigator.getUserMedia=r,navigator.mediaDevices||(navigator.mediaDevices={getUserMedia:n,enumerateDevices:function(){return new Promise(function(e){var t={audio:"audioinput",video:"videoinput"};return MediaStreamTrack.getSources(function(i){e(i.map(function(e){return{label:e.label,kind:t[e.kind],deviceId:e.id,groupId:""}}))})})}}),navigator.mediaDevices.getUserMedia){var m=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=function(e){return l.log("spec:   "+JSON.stringify(e)),e.audio=f(e.audio),e.video=f(e.video),l.log("chrome: "+JSON.stringify(e)),m(e)}}else navigator.mediaDevices.getUserMedia=function(e){return n(e)};void 0===navigator.mediaDevices.addEventListener&&(navigator.mediaDevices.addEventListener=function(){l.log("Dummy mediaDevices.addEventListener called.")}),void 0===navigator.mediaDevices.removeEventListener&&(navigator.mediaDevices.removeEventListener=function(){l.log("Dummy mediaDevices.removeEventListener called.")}),a=function(e,t){c>=43?e.srcObject=t:void 0!==e.src?e.src=URL.createObjectURL(t):l.log("Error attaching stream to element.")},s=function(e,t){c>=43?e.srcObject=t.srcObject:e.src=t.src}}else navigator.mediaDevices&&navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)?(l.log("This appears to be Edge"),d="edge",c=l.extractVersion(navigator.userAgent,/Edge\/(\d+).(\d+)$/,2),u=12):l.log("Browser does not appear to be WebRTC-capable");else l.log("This does not appear to be a browser"),d="not a browser";var v={};try{Object.defineProperty(v,"version",{set:function(e){c=e}})}catch(e){}var g;"undefined"!=typeof window&&(g=window.RTCPeerConnection),e.exports={RTCPeerConnection:g,getUserMedia:r,attachMediaStream:a,reattachMediaStream:s,webrtcDetectedBrowser:d,webrtcDetectedVersion:c,webrtcMinimumVersion:u,webrtcTesting:v,webrtcUtils:l}},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(6),r=n(o),a=i(9),s=n(a),d=i(0),c=n(d),u=i(1),l=function(e){var t,i,n=(0,r.default)({});if(n.id=e.id,n.url=e.url,n.stream=e.stream.stream,n.elementID=e.elementID,n.audio=document.createElement("audio"),n.audio.setAttribute("id","stream"+n.id),n.audio.setAttribute("style","width: 100%; height: 100%; position: absolute"),n.audio.setAttribute("autoplay","autoplay"),e.stream.local&&(n.audio.volume=0),e.stream.local&&(n.audio.volume=0),void 0!==n.elementID?(n.destroy=function(){n.audio.pause(),n.parentNode.removeChild(n.div)},t=function(){n.bar.display()},i=function(){n.bar.hide()},n.div=document.createElement("div"),n.div.setAttribute("id","player_"+n.id),n.div.setAttribute("style","width: 100%; height: 100%; position: relative; overflow: hidden;"),document.getElementById(n.elementID).appendChild(n.div),n.container=document.getElementById(n.elementID),n.parentNode=n.div.parentNode,n.div.appendChild(n.audio),n.bar=new s.default({elementID:"player_"+n.id,id:n.id,stream:e.stream,media:n.audio,options:e.options,url:n.url}),e.stream.local?n.div.onmouseover=i:n.div.onmouseover=t,n.div.onmouseout=i):(n.destroy=function(){n.audio.pause(),n.parentNode.removeChild(n.audio)},document.body.appendChild(n.audio),n.parentNode=document.body),c.default.debug("Creating URL from stream "+n.stream),(0,u.isSafari)())n.audio.srcObject=n.stream;else{var o=window.URL||webkitURL;n.stream_url=o.createObjectURL(n.stream),n.audio.src=n.stream_url}return n};t.default=l},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(0),o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=function(e){var t={},i=webkitRTCPeerConnection;t.pc_config={iceServers:[]},t.con={optional:[{DtlsSrtpKeyAgreement:!0}]},e.iceServers instanceof Array?t.pc_config.iceServers=e.iceServers:(e.stunServerUrl&&(e.stunServerUrl instanceof Array?e.stunServerUrl.map(function(e){"string"==typeof e&&""!==e&&t.pc_config.iceServers.push({url:e})}):"string"==typeof e.stunServerUrl&&""!==e.stunServerUrl&&t.pc_config.iceServers.push({url:e.stunServerUrl})),e.turnServer&&(e.turnServer instanceof Array?e.turnServer.map(function(e){"string"==typeof e.url&&""!==e.url&&t.pc_config.iceServers.push({username:e.username,credential:e.password,url:e.url})}):"string"==typeof e.turnServer.url&&""!==e.turnServer.url&&t.pc_config.iceServers.push({username:e.turnServer.username,credential:e.turnServer.password,url:e.turnServer.url}))),void 0===e.audio&&(e.audio=!0),void 0===e.video&&(e.video=!0),t.mediaConstraints={mandatory:{OfferToReceiveVideo:e.video,OfferToReceiveAudio:e.audio}},t.roapSessionId=103,t.peerConnection=new i(t.pc_config,t.con),t.peerConnection.onicecandidate=function(e){e.candidate?t.iceCandidateCount+=1:(o.default.debug("PeerConnection State: "+t.peerConnection.iceGatheringState),void 0===t.ices&&(t.ices=0),t.ices=t.ices+1,t.ices>=1&&t.moreIceComing&&(t.moreIceComing=!1,t.markActionNeeded()))};var n=function(t){var i,n;return e.minVideoBW&&e.maxVideoBW&&(i=t.match(/m=video.*\r\n/),n=i[0]+"b=AS:"+e.maxVideoBW+"\r\n",t=t.replace(i[0],n),o.default.debug("Set Video Bitrate - min:"+e.minVideoBW+" max:"+e.maxVideoBW)),e.maxAudioBW&&(i=t.match(/m=audio.*\r\n/),n=i[0]+"b=AS:"+e.maxAudioBW+"\r\n",t=t.replace(i[0],n)),t};return t.processSignalingMessage=function(e){var i,o=JSON.parse(e);t.incomingMessage=o,"new"===t.state?"OFFER"===o.messageType?(i={sdp:o.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(i)),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+o.messageType+" in state "+t.state):"offer-sent"===t.state?"ANSWER"===o.messageType?(i={sdp:o.sdp,type:"answer"},i.sdp=n(i.sdp),t.peerConnection.setRemoteDescription(new RTCSessionDescription(i)),t.sendOK(),t.state="established"):"pr-answer"===o.messageType?(i={sdp:o.sdp,type:"pr-answer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(i))):"offer"===o.messageType?t.error("Not written yet"):t.error("Illegal message for this state: "+o.messageType+" in state "+t.state):"established"===t.state&&("OFFER"===o.messageType?(i={sdp:o.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(i)),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+o.messageType+" in state "+t.state))},t.addStream=function(e){t.peerConnection.addStream(e),t.markActionNeeded()},t.removeStream=function(){t.markActionNeeded()},t.close=function(){t.state="closed",t.peerConnection.close()},t.markActionNeeded=function(){t.actionNeeded=!0,t.doLater(function(){t.onstablestate()})},t.doLater=function(e){window.setTimeout(e,1)},t.onstablestate=function(){var e;if(t.actionNeeded){if("new"===t.state||"established"===t.state)t.peerConnection.createOffer(function(e){if(e.sdp=n(e.sdp),o.default.debug("Changed",e.sdp),e.sdp!==t.prevOffer)return t.peerConnection.setLocalDescription(e),t.state="preparing-offer",void t.markActionNeeded();o.default.debug("Not sending a new offer")},function(e){o.default.debug("peer connection create offer failed ",e)},t.mediaConstraints);else if("preparing-offer"===t.state){if(t.moreIceComing)return;t.prevOffer=t.peerConnection.localDescription.sdp,t.sendMessage("OFFER",t.prevOffer),t.state="offer-sent"}else if("offer-received"===t.state)t.peerConnection.createAnswer(function(e){if(t.peerConnection.setLocalDescription(e),t.state="offer-received-preparing-answer",t.iceStarted)return void t.markActionNeeded();var i=new Date;o.default.debug(i.getTime()+": Starting ICE in responder"),t.iceStarted=!0},function(e){o.default.debug("peer connection create answer failed ",e)},t.mediaConstraints);else if("offer-received-preparing-answer"===t.state){if(t.moreIceComing)return;e=t.peerConnection.localDescription.sdp,t.sendMessage("ANSWER",e),t.state="established"}else t.error("Dazed and confused in state "+t.state+", stopping here");t.actionNeeded=!1}},t.sendOK=function(){t.sendMessage("OK")},t.sendMessage=function(e,i){var n={};n.messageType=e,n.sdp=i,"OFFER"===e?(n.offererSessionId=t.sessionId,n.answererSessionId=t.otherSessionId,n.seq=t.sequenceNumber+=1,n.tiebreaker=Math.floor(429496723*Math.random()+1)):(n.offererSessionId=t.incomingMessage.offererSessionId,n.answererSessionId=t.sessionId,n.seq=t.incomingMessage.seq),t.onsignalingmessage(JSON.stringify(n))},t.error=function(e){throw"Error in RoapOnJsep: "+e},t.sessionId=t.roapSessionId+=1,t.sequenceNumber=0,t.actionNeeded=!1,t.iceStarted=!1,t.moreIceComing=!0,t.iceCandidateCount=0,t.onsignalingmessage=e.callback,t.peerConnection.onopen=function(){t.onopen&&t.onopen()},t.peerConnection.onaddstream=function(e){t.onaddstream&&t.onaddstream(e)},t.peerConnection.onremovestream=function(e){t.onremovestream&&t.onremovestream(e)},t.peerConnection.oniceconnectionstatechange=function(e){t.oniceconnectionstatechange&&t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)},t.onaddstream=null,t.onremovestream=null,t.state="new",t.markActionNeeded(),t};t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(0),o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=function(e){var t={},i=RTCPeerConnection;t.isSubscriber=e.isSubscriber,t.pc_config={iceServers:[]},t.con={optional:[{DtlsSrtpKeyAgreement:!0}]},e.iceServers instanceof Array?t.pc_config.iceServers=e.iceServers:(e.stunServerUrl&&(e.stunServerUrl instanceof Array?e.stunServerUrl.map(function(e){"string"==typeof e&&""!==e&&t.pc_config.iceServers.push({url:e})}):"string"==typeof e.stunServerUrl&&""!==e.stunServerUrl&&t.pc_config.iceServers.push({url:e.stunServerUrl})),e.turnServer&&(e.turnServer instanceof Array?e.turnServer.map(function(e){"string"==typeof e.url&&""!==e.url&&t.pc_config.iceServers.push({username:e.username,credential:e.password,url:e.url})}):"string"==typeof e.turnServer.url&&""!==e.turnServer.url&&t.pc_config.iceServers.push({username:e.turnServer.username,credential:e.turnServer.password,url:e.turnServer.url}))),void 0===e.audio&&(e.audio=!0),void 0===e.video&&(e.video=!0),t.mediaConstraints={mandatory:{OfferToReceiveVideo:e.video,OfferToReceiveAudio:e.audio}},t.roapSessionId=103,t.peerConnection=new i(t.pc_config,t.con),t.peerConnection.onicecandidate=function(e){e.candidate?(0===t.iceCandidateCount&&(t.timeout=setTimeout(function(){t.moreIceComing&&(t.moreIceComing=!1,t.markActionNeeded())},1e3)),t.iceCandidateCount=t.iceCandidateCount+1):(o.default.debug("PeerConnection State: "+t.peerConnection.iceGatheringState),clearTimeout(t.timeout),void 0===t.ices&&(t.ices=0),t.ices=t.ices+1,t.ices>=1&&t.moreIceComing&&(t.moreIceComing=!1,t.markActionNeeded()))};var n=function(t){return e.screen&&(t=t.replace("a=x-google-flag:conference\r\n","")),t},r=function(t){var i,n;return e.minVideoBW&&e.maxVideoBW&&(i=t.match(/m=video.*\r\n/),n=i[0]+"b=AS:"+e.maxVideoBW+"\r\n",t=t.replace(i[0],n),o.default.debug("Set Video Bitrate - min:"+e.minVideoBW+" max:"+e.maxVideoBW)),e.maxAudioBW&&(i=t.match(/m=audio.*\r\n/),n=i[0]+"b=AS:"+e.maxAudioBW+"\r\n",t=t.replace(i[0],n)),t};return t.processSignalingMessage=function(e){var i,o=JSON.parse(e);t.incomingMessage=o,"new"===t.state?"OFFER"===o.messageType?(i={sdp:o.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(i)),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+o.messageType+" in state "+t.state):"offer-sent"===t.state?"ANSWER"===o.messageType?(i={sdp:o.sdp,type:"answer"},i.sdp=n(i.sdp),i.sdp=r(i.sdp),t.peerConnection.setRemoteDescription(new RTCSessionDescription(i)),t.sendOK(),t.state="established"):"pr-answer"===o.messageType?(i={sdp:o.sdp,type:"pr-answer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(i))):"offer"===o.messageType?t.error("Not written yet"):t.error("Illegal message for this state: "+o.messageType+" in state "+t.state):"established"===t.state&&("OFFER"===o.messageType?(i={sdp:o.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(i)),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+o.messageType+" in state "+t.state))},t.getStatsRate=function(e){t.getStats(function(t){e(t)})},t.getStats=function(e){t.peerConnection.getStats(null,function(i){var n=[],o=[],r=null;Object.keys(i).forEach(function(e){var t=i[e];o.push(t),"ssrc"!==t.type&&"VideoBwe"!==t.type||(r=t.timestamp,n.push(t))}),n.push({id:"time",startTime:t.connectedTime,timestamp:r||new Date}),e(n,o)})},t.addStream=function(e){t.peerConnection.addStream(e),t.markActionNeeded()},t.removeStream=function(){t.markActionNeeded()},t.close=function(){t.state="closed",t.peerConnection.close()},t.markActionNeeded=function(){t.actionNeeded=!0,t.doLater(function(){t.onstablestate()})},t.doLater=function(e){window.setTimeout(e,1)},t.onstablestate=function(){var e;if(t.actionNeeded){if("new"===t.state||"established"===t.state)t.peerConnection.createOffer(function(e){if(e.sdp=r(e.sdp),e.sdp!==t.prevOffer)return t.peerConnection.setLocalDescription(e),t.state="preparing-offer",void t.markActionNeeded();o.default.debug("Not sending a new offer")},function(e){o.default.debug("peer connection create offer failed ",e)},t.mediaConstraints);else if("preparing-offer"===t.state){if(t.moreIceComing)return;t.prevOffer=t.peerConnection.localDescription.sdp,t.sendMessage("OFFER",t.prevOffer),t.state="offer-sent"}else if("offer-received"===t.state)t.peerConnection.createAnswer(function(e){if(t.peerConnection.setLocalDescription(e),t.state="offer-received-preparing-answer",t.iceStarted)return void t.markActionNeeded();var i=new Date;o.default.debug(i.getTime()+": Starting ICE in responder"),t.iceStarted=!0},function(e){o.default.debug("peer connection create answer failed ",e)},t.mediaConstraints);else if("offer-received-preparing-answer"===t.state){if(t.moreIceComing)return;e=t.peerConnection.localDescription.sdp,t.sendMessage("ANSWER",e),t.state="established"}else t.error("Dazed and confused in state "+t.state+", stopping here");t.actionNeeded=!1}},t.sendOK=function(){t.sendMessage("OK")},t.sendMessage=function(e,i){var n={};n.messageType=e,n.sdp=i,"OFFER"===e?(n.offererSessionId=t.sessionId,n.answererSessionId=t.otherSessionId,n.seq=t.sequenceNumber+=1,n.tiebreaker=Math.floor(429496723*Math.random()+1)):(n.offererSessionId=t.incomingMessage.offererSessionId,n.answererSessionId=t.sessionId,n.seq=t.incomingMessage.seq),t.onsignalingmessage(JSON.stringify(n))},t.error=function(e){throw"Error in RoapOnJsep: "+e},t.sessionId=t.roapSessionId+=1,t.sequenceNumber=0,t.actionNeeded=!1,t.iceStarted=!1,t.moreIceComing=!0,t.iceCandidateCount=0,t.onsignalingmessage=e.callback,t.peerConnection.ontrack=function(e){t.onaddstream&&(t.onaddstream(e,"ontrack"),t.peerConnection.onaddstream=null)},t.peerConnection.onaddstream=function(e){t.onaddstream&&(t.onaddstream(e,"onaddstream"),t.peerConnection.ontrack=null)},t.peerConnection.onremovestream=function(e){t.onremovestream&&t.onremovestream(e)},t.peerConnection.oniceconnectionstatechange=function(e){"connected"===e.currentTarget.iceConnectionState&&(t.connectedTime=new Date),t.oniceconnectionstatechange&&t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)},t.onaddstream=null,t.onremovestream=null,t.state="new",t.markActionNeeded(),t};t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(0),o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=function(e){var t={};RTCPeerConnection;t.isSubscriber=e.isSubscriber,t.pc_config={iceServers:[{urls:["stun:72.251.224.27:3478"]}],bundlePolicy:"max-bundle"},t.con={optional:[{DtlsSrtpKeyAgreement:!0}]},e.iceServers instanceof Array?t.pc_config.iceServers=e.iceServers:(e.stunServerUrl&&(e.stunServerUrl instanceof Array?e.stunServerUrl.map(function(e){"string"==typeof e&&""!==e&&t.pc_config.iceServers.push({url:e})}):"string"==typeof e.stunServerUrl&&""!==e.stunServerUrl&&t.pc_config.iceServers.push({url:e.stunServerUrl})),e.turnServer&&(e.turnServer instanceof Array?e.turnServer.map(function(e){"string"==typeof e.url&&""!==e.url&&t.pc_config.iceServers.push({username:e.username,credential:e.password,url:e.url})}):"string"==typeof e.turnServer.url&&""!==e.turnServer.url&&t.pc_config.iceServers.push({username:e.turnServer.username,credential:e.turnServer.password,url:e.turnServer.url}))),void 0===e.audio&&(e.audio=!0),void 0===e.video&&(e.video=!0),t.mediaConstraints={mandatory:{OfferToReceiveVideo:e.video,OfferToReceiveAudio:e.audio}},t.roapSessionId=103,t.peerConnection=new RTCPeerConnection({iceServers:[{urls:["stun:webcs.agora.io:3478","stun:stun.l.google.com:19302"]}],bundlePolicy:"max-bundle"}),t.peerConnection.onicecandidate=function(i){o.default.debug("PeerConnection: ",e.session_id,i),i.candidate?(0===t.iceCandidateCount&&(t.timeout=setTimeout(function(){t.moreIceComing&&(t.moreIceComing=!1,t.markActionNeeded())},1e3)),t.iceCandidateCount=t.iceCandidateCount+1):(o.default.debug("PeerConnection State: "+t.peerConnection.iceGatheringState),clearTimeout(t.timeout),void 0===t.ices&&(t.ices=0),t.ices=t.ices+1,t.ices>=1&&t.moreIceComing&&(t.moreIceComing=!1,t.markActionNeeded()))};var i=function(t){return e.screen&&(t=t.replace("a=x-google-flag:conference\r\n","")),t},n=function(t){var i,n;return e.minVideoBW&&e.maxVideoBW&&(i=t.match(/m=video.*\r\n/),n=i[0]+"b=AS:"+e.maxVideoBW+"\r\n",t=t.replace(i[0],n),o.default.debug("Set Video Bitrate - min:"+e.minVideoBW+" max:"+e.maxVideoBW)),e.maxAudioBW&&(i=t.match(/m=audio.*\r\n/),n=i[0]+"b=AS:"+e.maxAudioBW+"\r\n",t=t.replace(i[0],n)),t};t.processSignalingMessage=function(e){var o,r=JSON.parse(e);t.incomingMessage=r,"new"===t.state?"OFFER"===r.messageType?(o={sdp:r.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(o)),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+r.messageType+" in state "+t.state):"offer-sent"===t.state?"ANSWER"===r.messageType?(o={sdp:r.sdp,type:"answer"},o.sdp=i(o.sdp),o.sdp=n(o.sdp),o.sdp=o.sdp.replace(/a=x-google-flag:conference\r\n/g,""),t.peerConnection.setRemoteDescription(new RTCSessionDescription(o)),t.sendOK(),t.state="established"):"pr-answer"===r.messageType?(o={sdp:r.sdp,type:"pr-answer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(o))):"offer"===r.messageType?t.error("Not written yet"):t.error("Illegal message for this state: "+r.messageType+" in state "+t.state):"established"===t.state&&("OFFER"===r.messageType?(o={sdp:r.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new RTCSessionDescription(o)),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+r.messageType+" in state "+t.state))};var r={id:"",type:"",mediaType:"",googCodecName:"opus",aecDivergentFilterFraction:"0",audioInputLevel:"0",bytesSent:"0",packetsSent:"0",googEchoCancellationReturnLoss:"0",googEchoCancellationReturnLossEnhancement:"0"},a={id:"",type:"",mediaType:"",googCodecName:"h264"===e.codec?"H264":"VP8",bytesSent:"0",packetsLost:"0",packetsSent:"0",googAdaptationChanges:"0",googAvgEncodeMs:"0",googEncodeUsagePercent:"0",googFirsReceived:"0",googFrameHeightSent:"0",googFrameHeightInput:"0",googFrameRateInput:"0",googFrameRateSent:"0",googFrameWidthSent:"0",googFrameWidthInput:"0",googNacksReceived:"0",googPlisReceived:"0",googRtt:"0",googFramesEncoded:"0"},s={id:"",type:"",mediaType:"",audioOutputLevel:"0",bytesReceived:"0",packetsLost:"0",packetsReceived:"0",googAccelerateRate:"0",googCurrentDelayMs:"0",googDecodingCNG:"0",googDecodingCTN:"0",googDecodingCTSG:"0",googDecodingNormal:"0",googDecodingPLC:"0",googDecodingPLCCNG:"0",googExpandRate:"0",googJitterBufferMs:"0",googJitterReceived:"0",googPreemptiveExpandRate:"0",googPreferredJitterBufferMs:"0",googSecondaryDecodedRate:"0",googSpeechExpandRate:"0"},d={id:"",type:"",mediaType:"",googTargetDelayMs:"0",packetsLost:"0",googDecodeMs:"0",googMaxDecodeMs:"0",googRenderDelayMs:"0",googFrameWidthReceived:"0",googFrameHeightReceived:"0",googFrameRateReceived:"0",googFrameRateDecoded:"0",googFrameRateOutput:"0",googFramesDecoded:"0",googFrameReceived:"0",googJitterBufferMs:"0",googCurrentDelayMs:"0",googMinPlayoutDelayMs:"0",googNacksSent:"0",googPlisSent:"0",googFirsSent:"0",bytesReceived:"0",packetsReceived:"0"},c={id:"bweforvideo",type:"VideoBwe",googAvailableSendBandwidth:"0",googAvailableReceiveBandwidth:"0",googActualEncBitrate:"0",googRetransmitBitrate:"0",googTargetEncBitrate:"0",googBucketDelay:"0",googTransmitBitrate:"0"},u=0,l=0,p=0;return t.getStatsRate=function(e){t.getStats(function(t){t.forEach(function(e){"outbound-rtp"===e.type&&"video"===e.mediaType&&e.googFramesEncoded&&(e.googFrameRateSent=((e.googFramesEncoded-u)/3).toString(),u=e.googFramesEncoded),"inbound-rtp"===e.type&&-1!=e.id.indexOf("55543")&&(e.googFrameRateReceived&&(e.googFrameRateReceived=((e.googFrameReceived-p)/3).toString(),p=e.googFrameReceived),e.googFrameRateDecoded&&(e.googFrameRateDecoded=((e.googFramesDecoded-l)/3).toString(),l=e.googFramesDecoded))}),e(t)})},t.getStats=function(e){var i=[];t.peerConnection.getStats().then(function(n){n.forEach(function(e){i.push(e),"outbound-rtp"===e.type&&"audio"===e.mediaType&&(r.id=e.id,r.type=e.type,r.mediaType=e.mediaType,r.bytesSent=e.bytesSent?e.bytesSent+"":"0",r.packetsSent=e.packetsSent?e.packetsSent+"":"0"),"outbound-rtp"===e.type&&"video"===e.mediaType&&(a.id=e.id,a.type=e.type,a.mediaType=e.mediaType,a.bytesSent=e.bytesSent?e.bytesSent+"":"0",a.packetsSent=e.packetsSent?e.packetsSent+"":"0",a.googPlisReceived=e.pliCount?e.pliCount+"":"0",a.googNacksReceived=e.nackCount?e.nackCount+"":"0",a.googFirsReceived=e.firCount?e.firCount+"":"0",a.googFramesEncoded=e.framesEncoded?e.framesEncoded+"":"0"),"inbound-rtp"===e.type&&-1!=e.id.indexOf("44444")&&(s.id=e.id,s.type=e.type,s.mediaType="audio",s.packetsReceived=e.packetsReceived?e.packetsReceived+"":"0",s.bytesReceived=e.bytesReceived?e.bytesReceived+"":"0",s.packetsLost=e.packetsLost?e.packetsLost+"":"0",s.packetsReceived=e.packetsReceived?e.packetsReceived+"":"0",s.googJitterReceived=e.jitter?e.jitter+"":"0"),"inbound-rtp"===e.type&&-1!=e.id.indexOf("55543")&&(d.id=e.id,d.type=e.type,d.mediaType="video",d.packetsReceived=e.packetsReceived?e.packetsReceived+"":"0",d.bytesReceived=e.bytesReceived?e.bytesReceived+"":"0",d.packetsLost=e.packetsLost?e.packetsLost+"":"0",d.googJitterBufferMs=e.jitter?e.jitter+"":"0",d.googNacksSent=e.nackCount?e.nackCount+"":"0",d.googPlisSent=e.pliCount?e.pliCount+"":"0",d.googFirsSent=e.firCount?e.firCount+"":"0"),"track"===e.type&&-1!=e.id.indexOf("55543")&&(d.googFrameWidthReceived=e.frameWidth?e.frameWidth+"":"0",d.googFrameHeightReceived=e.frameHeight?e.frameHeight+"":"0",d.googFrameReceived=e.framesReceived?e.framesReceived+"":"0",d.googFramesDecoded=e.framesDecoded?e.framesDecoded+"":"0"),"track"===e.type&&-1!=e.id.indexOf("44444")&&(s.audioOutputLevel=e.audioLevel+"",r.audioInputLevel=e.audioLevel+""),"candidate-pair"===e.type&&(0==e.availableIncomingBitrate?c.googAvailableSendBandwidth=e.availableOutgoingBitrate+"":c.googAvailableReceiveBandwidth=e.availableIncomingBitrate+"")});var o=[c,r,a,s,d];o.push({id:"time",startTime:t.connectedTime,timestamp:new Date}),e(o,i)}).catch(function(e){console.error(e)})},t.addStream=function(e){window.navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")?e.getTracks().forEach(function(i){return t.peerConnection.addTrack(i,e)}):t.peerConnection.addStream(e),t.markActionNeeded()},t.removeStream=function(){t.markActionNeeded()},t.close=function(){t.state="closed",t.peerConnection.close()},t.markActionNeeded=function(){t.actionNeeded=!0,t.doLater(function(){t.onstablestate()})},t.doLater=function(e){window.setTimeout(e,1)},t.onstablestate=function(){var i;if(t.actionNeeded){if("new"===t.state||"established"===t.state){if(e.isSubscriber&&window.navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")){var r=t.peerConnection.addTransceiver("audio"),a=t.peerConnection.addTransceiver("video");r.setDirection("recvonly"),a.setDirection("recvonly")}t.peerConnection.createOffer(t.mediaConstraints).then(function(i){if(i.sdp=n(i.sdp),e.isSubscriber||(i.sdp=i.sdp.replace(/a=extmap:4 urn:3gpp:video-orientation\r\n/g,"")),i.sdp!==t.prevOffer)return t.peerConnection.setLocalDescription(i),t.state="preparing-offer",void t.markActionNeeded();o.default.debug("Not sending a new offer")}).catch(function(e){o.default.debug("peer connection create offer failed ",e)})}else if("preparing-offer"===t.state){if(t.moreIceComing)return;t.prevOffer=t.peerConnection.localDescription.sdp,t.sendMessage("OFFER",t.prevOffer),t.state="offer-sent"}else if("offer-received"===t.state)t.peerConnection.createAnswer(function(e){if(t.peerConnection.setLocalDescription(e),t.state="offer-received-preparing-answer",t.iceStarted)return void t.markActionNeeded();var i=new Date;o.default.debug(i.getTime()+": Starting ICE in responder"),t.iceStarted=!0},function(e){o.default.debug("peer connection create answer failed ",e)},t.mediaConstraints);else if("offer-received-preparing-answer"===t.state){if(t.moreIceComing)return;i=t.peerConnection.localDescription.sdp,t.sendMessage("ANSWER",i),t.state="established"}else t.error("Dazed and confused in state "+t.state+", stopping here");t.actionNeeded=!1}},t.sendOK=function(){t.sendMessage("OK")},t.sendMessage=function(e,i){var n={};n.messageType=e,n.sdp=i,"OFFER"===e?(n.offererSessionId=t.sessionId,n.answererSessionId=t.otherSessionId,n.seq=t.sequenceNumber+=1,n.tiebreaker=Math.floor(429496723*Math.random()+1)):(n.offererSessionId=t.incomingMessage.offererSessionId,n.answererSessionId=t.sessionId,n.seq=t.incomingMessage.seq),t.onsignalingmessage(JSON.stringify(n))},t.error=function(e){throw"Error in RoapOnJsep: "+e},t.sessionId=t.roapSessionId+=1,t.sequenceNumber=0,t.actionNeeded=!1,t.iceStarted=!1,t.moreIceComing=!0,t.iceCandidateCount=0,t.onsignalingmessage=e.callback,t.peerConnection.ontrack=function(e){t.onaddstream&&t.onaddstream(e,"ontrack")},t.peerConnection.onremovestream=function(e){t.onremovestream&&t.onremovestream(e)},t.peerConnection.oniceconnectionstatechange=function(e){"connected"===e.currentTarget.iceConnectionState&&(t.connectedTime=new Date),t.oniceconnectionstatechange&&t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)},t.onaddstream=null,t.onremovestream=null,t.state="new",t.markActionNeeded(),t};t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e={};return e.addStream=function(){},e};t.default=n},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(0),o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=function(e){var t={},i=(mozRTCPeerConnection,mozRTCSessionDescription),n=!1;t.isSubscriber=e.isSubscriber,t.pc_config={iceServers:[]},e.iceServers instanceof Array?e.iceServers.map(function(e){0===e.url.indexOf("stun:")&&t.pc_config.iceServers.push({url:e.url})}):e.stunServerUrl&&(e.stunServerUrl instanceof Array?e.stunServerUrl.map(function(e){"string"==typeof e&&""!==e&&t.pc_config.iceServers.push({url:e})}):"string"==typeof e.stunServerUrl&&""!==e.stunServerUrl&&t.pc_config.iceServers.push({url:e.stunServerUrl})),void 0===e.audio&&(e.audio=!0),void 0===e.video&&(e.video=!0),t.mediaConstraints={offerToReceiveAudio:e.audio,offerToReceiveVideo:e.video,mozDontOfferDataChannel:!0},t.roapSessionId=103,t.peerConnection=new RTCPeerConnection(t.pc_config),t.peerConnection.onicecandidate=function(e){e.candidate?t.iceCandidateCount+=1:(o.default.debug("PeerConnection State: "+t.peerConnection.iceGatheringState),void 0===t.ices&&(t.ices=0),t.ices=t.ices+1,t.ices>=1&&t.moreIceComing&&(t.moreIceComing=!1,t.markActionNeeded()))},t.processSignalingMessage=function(e){var n,r=JSON.parse(e);t.incomingMessage=r,"new"===t.state?"OFFER"===r.messageType?(r.sdp=u(r.sdp),n={sdp:r.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new i(n),function(){o.default.debug("setRemoteDescription succeeded")},function(e){o.default.info("setRemoteDescription failed: "+e.name)}),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+r.messageType+" in state "+t.state):"offer-sent"===t.state?"ANSWER"===r.messageType?(r.sdp=u(r.sdp),r.sdp=r.sdp.replace(/ generation 0/g,""),r.sdp=r.sdp.replace(/ udp /g," UDP "),r.sdp=r.sdp.replace(/a=group:BUNDLE audio video/,"a=group:BUNDLE sdparta_0 sdparta_1"),r.sdp=r.sdp.replace(/a=mid:audio/,"a=mid:sdparta_0"),r.sdp=r.sdp.replace(/a=mid:video/,"a=mid:sdparta_1"),n={sdp:r.sdp,type:"answer"},t.peerConnection.setRemoteDescription(new i(n),function(){o.default.debug("setRemoteDescription succeeded")},function(e){o.default.info("setRemoteDescription failed: "+e)}),t.sendOK(),t.state="established"):"pr-answer"===r.messageType?(n={sdp:r.sdp,type:"pr-answer"},t.peerConnection.setRemoteDescription(new i(n),function(){o.default.debug("setRemoteDescription succeeded")},function(e){o.default.info("setRemoteDescription failed: "+e.name)})):"offer"===r.messageType?t.error("Not written yet"):t.error("Illegal message for this state: "+r.messageType+" in state "+t.state):"established"===t.state&&("OFFER"===r.messageType?(n={sdp:r.sdp,type:"offer"},t.peerConnection.setRemoteDescription(new i(n),function(){o.default.debug("setRemoteDescription succeeded")},function(e){o.default.info("setRemoteDescription failed: "+e.name)}),t.state="offer-received",t.markActionNeeded()):t.error("Illegal message for this state: "+r.messageType+" in state "+t.state))};var r={id:"",type:"",mediaType:"opus",googCodecName:"opus",aecDivergentFilterFraction:"0",audioInputLevel:"0",bytesSent:"0",packetsSent:"0",googEchoCancellationReturnLoss:"0",googEchoCancellationReturnLossEnhancement:"0"},a={id:"",type:"",mediaType:"",googCodecName:"h264"===e.codec?"H264":"VP8",bytesSent:"0",packetsLost:"0",packetsSent:"0",googAdaptationChanges:"0",googAvgEncodeMs:"0",googEncodeUsagePercent:"0",googFirsReceived:"0",googFrameHeightSent:"0",googFrameHeightInput:"0",googFrameRateInput:"0",googFrameRateSent:"0",googFrameWidthSent:"0",googFrameWidthInput:"0",googNacksReceived:"0",googPlisReceived:"0",googRtt:"0"},s={id:"",type:"",mediaType:"",audioOutputLevel:"0",bytesReceived:"0",packetsLost:"0",packetsReceived:"0",googAccelerateRate:"0",googCurrentDelayMs:"0",googDecodingCNG:"0",googDecodingCTN:"0",googDecodingCTSG:"0",googDecodingNormal:"0",googDecodingPLC:"0",googDecodingPLCCNG:"0",googExpandRate:"0",googJitterBufferMs:"0",googJitterReceived:"0",googPreemptiveExpandRate:"0",googPreferredJitterBufferMs:"0",googSecondaryDecodedRate:"0",googSpeechExpandRate:"0"},d={id:"",type:"",mediaType:"",googTargetDelayMs:"0",packetsLost:"0",googDecodeMs:"0",googMaxDecodeMs:"0",googRenderDelayMs:"0",googFrameWidthReceived:"0",googFrameHeightReceived:"0",googFrameRateReceived:"0",googFrameRateDecoded:"0",googFrameRateOutput:"0",googJitterBufferMs:"0",googCurrentDelayMs:"0",googMinPlayoutDelayMs:"0",googNacksSent:"0",googPlisSent:"0",googFirsSent:"0",bytesReceived:"0",packetsReceived:"0",googFramesDecoded:"0"},c=0;t.getStatsRate=function(e){t.getStats(function(t){t.forEach(function(e){"inboundrtp"===e.type&&"video"===e.mediaType&&e.googFrameRateDecoded&&(e.googFrameRateDecoded=((e.googFramesDecoded-c)/3).toString(),c=e.googFramesDecoded)}),e(t)})},t.getStats=function(e){t.peerConnection.getStats().then(function(i){var n=[];Object.keys(i).forEach(function(e){var t=i[e];n.push(t),"outboundrtp"===t.type&&"video"===t.mediaType&&(a.id=t.id,a.type=t.type,a.mediaType=t.mediaType,a.bytesSent=t.bytesSent?t.bytesSent+"":"0",a.packetsSent=t.packetsSent?t.packetsSent+"":"0",a.googPlisReceived=t.pliCount?t.pliCount+"":"0",a.googNacksReceived=t.nackCount?t.nackCount+"":"0",a.googFirsReceived=t.firCount?t.firCount+"":"0",a.googFrameRateSent=t.framerateMean?t.framerateMean+"":"0"),"outboundrtp"===t.type&&"audio"===t.mediaType&&(r.id=t.id,r.type=t.type,r.mediaType=t.mediaType,r.bytesSent=t.bytesSent?t.bytesSent+"":"0",r.packetsSent=t.packetsSent?t.packetsSent+"":"0"),"inboundrtp"!==t.type||"audio"!==t.mediaType||t.isRemote||(s.id=t.id,s.type=t.type,s.mediaType=t.mediaType,s.bytesReceived=t.bytesReceived?t.bytesReceived+"":"0",s.packetsLost=t.packetsLost?t.packetsLost+"":"0",s.packetsReceived=t.packetsReceived?t.packetsReceived+"":"0",s.googJitterReceived=t.jitter?t.jitter+"":"0"),"inboundrtp"!==t.type||"video"!==t.mediaType||t.isRemote||(d.id=t.id,d.type=t.type,d.mediaType=t.mediaType,d.bytesReceived=t.bytesReceived?t.bytesReceived+"":"0",d.googFrameRateReceived=t.framerateMean?t.framerateMean+"":"0",d.googFramesDecoded=t.framesDecoded?t.framesDecoded+"":"0",d.packetsLost=t.packetsLost?t.packetsLost+"":"0",d.packetsReceived=t.packetsReceived?t.packetsReceived+"":"0",d.googJitterBufferMs=t.jitter?t.jitter+"":"0",d.googNacksSent=t.nackCount?t.nackCount+"":"0",d.googPlisSent=t.pliCount?t.pliCount+"":"0",d.googFirsSent=t.firCount?t.firCount+"":"0"),-1!==t.id.indexOf("outbound_rtcp_video")&&(a.packetsLost=t.packetsLost?t.packetsLost+"":"0")});var o=[a,r,s,d];o.push({id:"time",startTime:t.connectedTime,timestamp:new Date}),e(o,n)},function(e){o.default.error(e)})},t.addStream=function(e){n=!0,t.peerConnection.addStream(e),t.markActionNeeded()},t.removeStream=function(){t.markActionNeeded()},t.close=function(){t.state="closed",t.peerConnection.close()},t.markActionNeeded=function(){t.actionNeeded=!0,t.doLater(function(){t.onstablestate()})},t.doLater=function(e){window.setTimeout(e,1)},t.onstablestate=function(){if(t.actionNeeded){if("new"===t.state||"established"===t.state){n&&(t.mediaConstraints=void 0),function(){t.peerConnection.createOffer(function(e){if(e.sdp=u(e.sdp),e.sdp=e.sdp.replace(/a=extmap:1 http:\/\/www.webrtc.org\/experiments\/rtp-hdrext\/abs-send-time/,"a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"),e.sdp!==t.prevOffer)return t.peerConnection.setLocalDescription(e),t.state="preparing-offer",void t.markActionNeeded();o.default.debug("Not sending a new offer")},function(e){o.default.debug("Ups! create offer failed ",e)},t.mediaConstraints)}()}else if("preparing-offer"===t.state){if(t.moreIceComing)return;t.prevOffer=t.peerConnection.localDescription.sdp,t.sendMessage("OFFER",t.prevOffer),t.state="offer-sent"}else if("offer-received"===t.state)t.peerConnection.createAnswer(function(e){if(t.peerConnection.setLocalDescription(e),t.state="offer-received-preparing-answer",t.iceStarted)return void t.markActionNeeded();var i=new Date;o.default.debug(i.getTime()+": Starting ICE in responder"),t.iceStarted=!0},function(){o.default.debug("Ups! Something went wrong")});else if("offer-received-preparing-answer"===t.state){if(t.moreIceComing)return;var e=t.peerConnection.localDescription.sdp;t.sendMessage("ANSWER",e),t.state="established"}else t.error("Dazed and confused in state "+t.state+", stopping here");t.actionNeeded=!1}},t.sendOK=function(){t.sendMessage("OK")},t.sendMessage=function(e,i){var n={};n.messageType=e,n.sdp=i,"OFFER"===e?(n.offererSessionId=t.sessionId,n.answererSessionId=t.otherSessionId,n.seq=t.sequenceNumber+=1,n.tiebreaker=Math.floor(429496723*Math.random()+1)):(n.offererSessionId=t.incomingMessage.offererSessionId,n.answererSessionId=t.sessionId,n.seq=t.incomingMessage.seq),t.onsignalingmessage(JSON.stringify(n))},t.error=function(e){throw"Error in RoapOnJsep: "+e},t.sessionId=t.roapSessionId+=1,t.sequenceNumber=0,t.actionNeeded=!1,t.iceStarted=!1,t.moreIceComing=!0,t.iceCandidateCount=0,t.onsignalingmessage=e.callback,t.peerConnection.ontrack=function(e){t.onaddstream&&t.onaddstream(e,"ontrack")},t.peerConnection.onremovestream=function(e){t.onremovestream&&t.onremovestream(e)},t.peerConnection.oniceconnectionstatechange=function(e){"connected"===e.currentTarget.iceConnectionState&&(t.connectedTime=new Date),t.oniceconnectionstatechange&&t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)};var u=function(t){if(e.video&&e.maxVideoBW){var i=t.match(/m=video.*\r\n/);if(null==i&&(i=t.match(/m=video.*\n/)),i&&i.length>0){var n=i[0]+"b=TIAS:"+1e3*e.maxVideoBW+"\r\n";t=t.replace(i[0],n)}}if(e.audio&&e.maxAudioBW){var i=t.match(/m=audio.*\r\n/);if(null==i&&(i=t.match(/m=audio.*\n/)),i&&i.length>0){var n=i[0]+"b=TIAS:"+1e3*e.maxAudioBW+"\r\n";t=t.replace(i[0],n)}}return t};return t.onaddstream=null,t.onremovestream=null,t.state="new",t.markActionNeeded(),t};t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){var t={audioSendBytes:"0",audioSendPackets:"0",videoSendBytes:"0",videoSendPackets:"0",videoSendPacketsLost:"0",videoSendFrameRate:"0",videoSendBandwidth:"0",videoSendResolutionWidth:"0",videoSendResolutionHeight:"0",audioCodecName:"",videoCodecName:"",timestamp:"",startTime:"",duration:"0"};return e.forEach(function(e){"VideoBwe"===e.type?t.videoSendBandwidth=e.googAvailableSendBandwidth:-1!==e.id.indexOf("send")||-1!==e.id.indexOf("outbound_rtp")||-1!==e.id.indexOf("OutboundRTP")?"audio"===e.mediaType?(t.audioSendBytes=e.bytesSent,t.audioSendPackets=e.packetsSent,t.audioCodecName=e.googCodecName):(t.videoSendBytes=e.bytesSent,t.videoSendPackets=e.packetsSent,t.videoSendPacketsLost=e.packetsLost,t.videoSendFrameRate=e.googFrameRateSent,t.videoSendResolutionWidth=e.googFrameWidthSent,t.videoSendResolutionHeight=e.googFrameHeightSent,t.videoCodecName=e.googCodecName):"time"===e.id&&(t.timestamp=e.timestamp,t.startTime=e.startTime)}),t.timestamp instanceof Date&&t.startTime instanceof Date&&(t.duration=Math.floor((t.timestamp.getTime()-t.startTime.getTime())/1e3)+""),t},o=function(e){var t={audioReceiveBytes:"0",audioReceivePackets:"0",audioReceivePacketsLost:"0",videoReceiveBytes:"0",videoReceivePackets:"0",videoReceivePacketsLost:"0",videoReceiveFrameRate:"0",videoReceiveDecodeFrameRate:"0",videoReceiveBandwidth:"0",videoReceivedResolutionWidth:"0",videoReceivedResolutionHeight:"0",timestamp:"",startTime:"",duration:"0"};return e.forEach(function(e){"VideoBwe"===e.type?t.videoReceiveBandwidth=e.googAvailableReceiveBandwidth:-1!==e.id.indexOf("recv")||-1!==e.id.indexOf("inbound_rtp")||-1!==e.id.indexOf("InboundRTP")?"audio"===e.mediaType?(t.audioReceiveBytes=e.bytesReceived,t.audioReceivePackets=e.packetsReceived,t.audioReceivePacketsLost=e.packetsLost):(t.videoReceiveBytes=e.bytesReceived,t.videoReceivePacketsLost=e.packetsLost,t.videoReceivePackets=e.packetsReceived,t.videoReceiveFrameRate=e.googFrameRateReceived,t.videoReceiveDecodeFrameRate=e.googFrameRateDecoded,t.videoReceivedResolutionWidth=e.googFrameWidthReceived,t.videoReceivedResolutionHeight=e.googFrameHeightReceived):"time"===e.id&&(t.timestamp=e.timestamp,t.startTime=e.startTime)}),t.timestamp instanceof Date&&t.startTime instanceof Date&&(t.duration=Math.floor((t.timestamp.getTime()-t.startTime.getTime())/1e3)+""),t};t.publishStatsFilter=n,t.subscribeStatsFilter=o},function(e,t,i){function n(e,t,i){var n=t&&i||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var a=e.random||(e.rng||o)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[n+s]=a[s];return t||r(a)}var o=i(29),r=i(31);e.exports=n},function(e,t,i){(function(t){var i,n=t.crypto||t.msCrypto;if(n&&n.getRandomValues){var o=new Uint8Array(16);i=function(){return n.getRandomValues(o),o}}if(!i){var r=new Array(16);i=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}e.exports=i}).call(t,i(30))},function(e,t){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t){function i(e,t){var i=t||0,o=n;return o[e[i++]]+o[e[i++]]+o[e[i++]]+o[e[i++]]+"-"+o[e[i++]]+o[e[i++]]+"-"+o[e[i++]]+o[e[i++]]+"-"+o[e[i++]]+o[e[i++]]+"-"+o[e[i++]]+o[e[i++]]+o[e[i++]]+o[e[i++]]+o[e[i++]]+o[e[i++]]}for(var n=[],o=0;o<256;++o)n[o]=(o+256).toString(16).substr(1);e.exports=i},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(33),o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=i(2),a=function(e,t){var i={};return i.connect=function(){t.host=e,i.signal=(0,o.default)(t),i.on=i.signal.on,i.dispatchEvent=i.signal.dispatchEvent,i.signal.on("onopen",function(e){i.signal.onEvent=function(e){i.dispatchEvent((0,r.MediaEvent)({type:e.event,msg:e}))},i.dispatchEvent((0,r.MediaEvent)({type:"connect",msg:e}))}),i.signal.on("onError",function(e){var t=e.msg;onError(t.code,"error")})},i.disconnect=function(){i.signal.disconnect()},i.close=function(){i.signal.close()},i.getURL=function(){return i.signal.getURL()},i.reconnect=function(e){i.signal.creatConnection(e)},i.emitSimpleMessage=function(e,t){i.signal.sendSignalCommand(e,t)},i.connect(),i};t.default=a},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(2),r=i(12),a=n(r),s=i(0),d=n(s),c=i(4),u=function(e){var t=(0,o.EventDispatcher)(e);return t.needReconnect=!0,t.isTimeout=!1,t.isInit=!0,t.hostIndex=0,t.requestID=0,e.host instanceof Array?t.host=e.host:t.host=[e.host],t.Reconnection=function(e){t.host=e||t.host,t.hostIndex=0,t.creatConnection()},t.getURL=function(){return t.connection.url},t.creatConnection=function(){if(t.hostIndex>=t.host.length)return t.hostIndex=0,void t.dispatchEvent((0,o.MediaEvent)({type:"reconnect"}));d.default.debug("start connect:"+t.host[t.hostIndex]),t.lts=(new Date).getTime(),t.connection=new WebSocket("wss://"+t.host[t.hostIndex++]),t.connection.onopen=function(e){d.default.debug("websockect opened"),t.isTimeout=!1,t.isInit=!1,clearTimeout(t.timeoutCheck),t.dispatchEvent((0,o.MediaEvent)({type:"onopen",event:e,socket:t}))},t.connection.onmessage=function(e){var i=JSON.parse(e.data);i.hasOwnProperty("_id")?t.dispatchEvent((0,o.MediaEvent)({type:i._id,msg:i})):i.hasOwnProperty("_type")&&t.dispatchSocketEvent((0,o.MediaEvent)({type:i._type,msg:i.message}))},t.connection.onclose=function(i){t.needReconnect?t.isTimeout||t.isInit?(d.default.debug("websockect connect timeout"),c.report.joinGateway(e.sid,{lts:t.lts,succ:!1,ec:"timeout",addr:t.connection.url}),t.creatConnection()):t.dispatchEvent((0,o.MediaEvent)({type:"disconnect",event:i})):(d.default.debug("websockect closeed"),(0,a.default)(e.onFailure,i),clearTimeout(t.timeoutCheck),t.dispatchEvent((0,o.MediaEvent)({type:"close",event:i})),t.connection.onopen=void 0,t.connection.onclose=void 0,t.connection.onerror=void 0,t.connection.onmessage=void 0,t.connection=void 0)},t.connection.onerror=function(e){};setTimeout(function(){t.connection&&t.connection.readyState!=WebSocket.OPEN&&(t.isTimeout=!0,t.connection.close())},5e3)},t.creatConnection(),t.sendMessage=function(e,i){t.connection&&t.connection.readyState==WebSocket.OPEN?t.connection.send(JSON.stringify(e)):i({error:"Gateway not connected"})},t.disconnect=function(){t.needReconnect=!0,t.connection.close()},t.close=function(){t.needReconnect=!1,t.connection.close()},t.sendSignalCommand=function(e,i){e._id="_request_"+t.requestID,t.requestID+=1,"publish_stats"!==e._type&&"subscribe_stats"!==e._type&&"publish_stats_low"!==e._type&&t.on(e._id,function(n){i&&i(n.msg._result,n.msg.message),delete t.dispatcher.eventListeners[e._id]}),t.sendMessage(e,function(e){e.reason="NOT_CONNECTED",i&&i(e.reason,e)})},t};t.default=u},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.simMap=void 0;var n=i(1),o=function(e){var t;switch(e){case"120p":case"120p_1":t=["120p_1","120p_1","120p_1"];break;case"120p_3":t=["120p_3","120p_3","120p_3"];break;case"180p":case"180p_1":t=["90p_1","90p_1","180p_1"];break;case"180p_3":t=["120p_3","120p_3","180p_3"];break;case"180p_4":t=["120p_1","120p_1","180p_4"];break;case"240p":case"240p_1":t=["120p_1","120p_1","240p_1"];break;case"240p_3":t=["120p_3","120p_3","240p_3"];break;case"240p_4":t=["120p_4","120p_4","240p_4"];break;case"360p":case"360p_1":case"360p_4":case"360p_9":case"360p_10":case"360p_11":t=["90p_1","90p_1","360p_1"];break;case"360p_3":case"360p_6":t=["120p_3","120p_3","360p_3"];break;case"360p_7":case"360p_8":t=["120p_1","120p_1","360p_7"];break;case"480p":case"480p_1":case"480p_2":case"480p_4":case"480p_10":t=["120p_1","120p_1","480p_1"];break;case"480p_3":case"480p_6":t=["120p_3","120p_3","480p_3"];break;case"480p_8":case"480p_9":t=["120p_4","120p_4","480p_8"];break;case"720p":case"720p_1":case"720p_2":case"720p_3":t=["90p_1","90p_1","720p_1"];break;case"720p_5":case"720p_6":t=["120p_1","120p_1","720p_5"];break;case"1080p":case"1080p_1":case"1080p_2":case"1080p_3":case"1080p_5":t=["90p_1","90p_1","1080p_1"];break;case"1440p":case"1440p_1":case"1440p_2":t=["90p_1","90p_1","1440p_1"];break;case"4k":case"4k_1":case"4k_3":t=["90p_1","90p_1","4k_1"];break;default:t=["120p_1","120p_1","360p_7"]}return(0,n.isFireFox)()?[t[1],30,100]:(0,n.isSafari)()?[t[2],15,100]:[t[0],15,100]};t.simMap=o},,,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Logger=t.checkSystemRequirements=t.getDevices=t.createStream=t.createClient=t.LiveTranscoding=t.TranscodingUser=t.VIDEO_CODEC_PROFILE_HIGH=t.VIDEO_CODEC_PROFILE_MAIN=t.VIDEO_CODEC_PROFILE_BASELINE=t.AUDIO_SAMPLE_RATE_48000=t.AUDIO_SAMPLE_RATE_44100=t.AUDIO_SAMPLE_RATE_32000=void 0;var n=i(15),o=i(7),r=i(3),a=i(0),s=function(e){return e&&e.__esModule?e:{default:e}}(a);t.AUDIO_SAMPLE_RATE_32000=n.AUDIO_SAMPLE_RATE_32000,t.AUDIO_SAMPLE_RATE_44100=n.AUDIO_SAMPLE_RATE_44100,t.AUDIO_SAMPLE_RATE_48000=n.AUDIO_SAMPLE_RATE_48000,t.VIDEO_CODEC_PROFILE_BASELINE=n.VIDEO_CODEC_PROFILE_BASELINE,t.VIDEO_CODEC_PROFILE_MAIN=n.VIDEO_CODEC_PROFILE_MAIN,t.VIDEO_CODEC_PROFILE_HIGH=n.VIDEO_CODEC_PROFILE_HIGH,t.TranscodingUser=n.TranscodingUser,t.LiveTranscoding=n.LiveTranscoding,t.createClient=n.createClient,t.createStream=o.createStream,t.getDevices=o.getDevices,t.checkSystemRequirements=r.checkSystemRequirements,t.Logger=s.default}])});
//# sourceMappingURL=AgoraRTC-production.js.map
Signal_=function(vid){var SUCCESS=0,LOGOUT_E_OTHER=100,LOGOUT_E_USER=101,LOGOUT_E_NET=102,LOGOUT_E_KICKED=103,LOGOUT_E_PACKET=104,LOGOUT_E_TOKENEXPIRED=105,LOGOUT_E_OLDVERSION=106,LOGOUT_E_TOKENWRONG=107,LOGOUT_E_ALREADY_LOGOUT=108,LOGIN_E_OTHER=200,LOGIN_E_NET=201,LOGIN_E_FAILED=202,LOGIN_E_CANCEL=203,LOGIN_E_TOKENEXPIRED=204,LOGIN_E_OLDVERSION=205,LOGIN_E_TOKENWRONG=206,LOGIN_E_TOKEN_KICKED=207,LOGIN_E_ALREADY_LOGIN=208,JOINCHANNEL_E_OTHER=300,SENDMESSAGE_E_OTHER=400,SENDMESSAGE_E_TIMEOUT=401,QUERYUSERNUM_E_OTHER=500,QUERYUSERNUM_E_TIMEOUT=501,QUERYUSERNUM_E_BYUSER=502,LEAVECHANNEL_E_OTHER=600,LEAVECHANNEL_E_KICKED=601,LEAVECHANNEL_E_BYUSER=602,LEAVECHANNEL_E_LOGOUT=603,LEAVECHANNEL_E_DISCONN=604,INVITE_E_OTHER=700,INVITE_E_REINVITE=701,INVITE_E_NET=702,INVITE_E_PEEROFFLINE=703,INVITE_E_TIMEOUT=704,INVITE_E_CANTRECV=705,GENERAL_E=1e3,GENERAL_E_FAILED=1001,GENERAL_E_UNKNOWN=1002,GENERAL_E_NOT_LOGIN=1003,GENERAL_E_WRONG_PARAM=1004,GENERAL_E_LARGE_PARAM=1005;function shuffle(arr){var j,x,i;for(i=arr.length;i;i--){j=Math.floor(Math.random()*i);x=arr[i-1];arr[i-1]=arr[j];arr[j]=x}}this.lbs_url1=["https://lbs-1-sig.agora.io","https://lbs-2-sig.agora.io"];this.lbs_url2=["https://lbs-3-sig.agora.io","https://lbs-4-sig.agora.io"];function timedGetText(url,time,callback){var request=new XMLHttpRequest;var timeout=false;var timer=setTimeout(function(){timeout=true;request.abort();callback("timeout","")},time);request.open("GET",url);request.onreadystatechange=function(){if(request.readyState!==4)return;if(timeout)return;clearTimeout(timer);if(request.status===200){callback("",request.responseText)}};request.send(null)}function timedConnectWebsockt(url,milliseconds){var timeout=false;var timer=setTimeout(function(){timeout=true},milliseconds)}this.vid=vid;this.appid=vid;var signal=this;function split_python(a,s,n){var x=a.split(s,n);var offset=0;for(var i in x){offset+=s.length+x[i].length}x.push(a.substr(offset));return x}var Session=function(account,token){this.onLoginSuccess="";this.onLoginFailed="";this.onLogout="";this.onInviteReceived="";this.onMessageInstantReceive="";this.account=account;this.state="session_state_logining";this.line="";this.uid=0;this.dbg=false;var session=this;session.lbs_state="requesting";var server_urls=[];shuffle(server_urls);session.idx=0;session.socket=null;var dbg=function(){if(session.dbg){var x=[];for(var i in arguments)x.push(arguments[i]);console.log.apply(null,["Agora sig dbg :"].concat(x))}};var format_ws_url=function(x){var host=x[0].replace(/\./g,"-")+"-sig-web.agora.io";var port=x[1]+1;return"wss://"+host+":"+port+"/"};session.logout=function(){if(session.state=="session_state_logined"&&session.onLogout){session.call2("user_logout",{line:session.line},function(err,data){session.fire_logout(LOGOUT_E_USER);session.socket.close()})}else if(session.state=="session_state_logining"){session.state=="session_state_logout";session.fire_logout(LOGOUT_E_USER)}};session.fire_login_failed=function(reason){try{if(session.state=="session_state_logining"&&session.onLoginFailed){session.onLoginFailed(reason)}}catch(e){console.error(e)}finally{session.state="session_state_logout"}};session.fire_logout=function(reason){if(!reason){reason=0}try{if(session.state=="session_state_logined"&&session.onLogout){session.onLogout(reason)}}catch(e){console.error(e)}finally{session.state="session_state_logout"}};var do_lbs=function(retry,urls,idx){if(session.lbs_state!="requesting"){return}var url=urls[idx];timedGetText(url+"/getaddr?vid="+vid,5e3,function(err,data){if(err){if(retry-1>0){do_lbs(retry-1,urls,(idx+1)%urls.length)}else{session.fire_login_failed(LOGIN_E_NET)}}else{if(session.lbs_state!="requesting"){return}session.lbs_state="completed";server_urls=JSON.parse(data).web;do_connect();do_connect()}})};var do_connect=function(){if(0){session.socket=io.connect("http://125.88.159.176:3000/")}else{if(session.state=="session_state_logining"){var socket=new function(){var url=format_ws_url(server_urls[session.idx]);session.idx=(session.idx+1)%server_urls.length;var websocket=new WebSocket(url);websocket.state="CONNECTING";setTimeout(function(){if(websocket.readyState==websocket.CONNECTING){websocket.close();return}},6e3);websocket.onopen=function(evt){if(session.state=="session_state_logout"){websocket.close()}else if(session.state=="session_state_logining"&&session.socket==null){session.socket=socket;websocket.state="OPEN";dbg("on conn open");session.go_login();for(var i in bufs){websocket.send(JSON.stringify(bufs[i]))}}else{websocket.close()}};websocket.onclose=function(evt){if(websocket.state=="OPEN"){fire("_close","");dbg("on conn close")}if(websocket.state=="CONNECTING"){do_connect()}};websocket.onmessage=function(evt){var msg=evt.data;var x=JSON.parse(msg);var name=x[0];fire(x[0],x[1])};websocket.onerror=function(evt){websocket.state="CLOSED";if(session.idx<server_urls.length&&evt.target.readyState==evt.target.CLOSED){do_connect();return}dbg("on conn error");if(session.state=="session_state_logined"&&session.socket==socket){session.fire_logout("conn error")}else if(session.state=="session_state_logining"&&session.socket==socket){session.fire_login_failed(LOGIN_E_NET)}};var evts={};var fire=function(evt,args){if(evt in evts){evts[evt](args)}};var bufs=[];this.on=function(evt,f){evts[evt]=f};this.emit=function(evt,args){if(websocket.readyState==0){bufs.push([evt,args]);return}websocket.send(JSON.stringify([evt,args]))};this.close=function(){websocket.close()}}}}var ping_i=0;var start_ping=function(){setTimeout(function(){if(session.state!="session_state_logined"){return}ping_i++;dbg("send ping",ping_i);session.socket.emit("ping",ping_i);start_ping()},1e3*10)};session.go_login=function(){if(session.line==""){session.socket.emit("login",{vid:vid,account:account,uid:0,token:token,device:"websdk",ip:""});session.socket.on("login_ret",function(x){var err=x[0];var ret=JSON.parse(x[1]);dbg("login ret",err,ret);if(!err&&ret["result"]=="ok"){session.uid=ret["uid"];session.line=ret["line"];session.state="session_state_logined";start_ping();start_tick();try{if(session.onLoginSuccess){session.onLoginSuccess(session.uid)}}catch(e){console.error(e)}finally{schedule_poll()}}else{if(err==""){err=ret["reason"]}try{if(session.onLoginFailed){var e=err=="kick"?LOGIN_E_TOKEN_KICKED:err=="TokenErrorExpired"?LOGIN_E_TOKENEXPIRED:err.startsWith("TokenError")?LOGIN_E_TOKENWRONG:LOGIN_E_NET;session.fire_login_failed(e)}}catch(e){console.error(e)}}})}else{session.socket.emit("line_login",{line:session.line})}var callid=0;var calltable={};var call_obj_table={};session.call2=function(func,args,cb){callid++;calltable[callid]=[func,args,cb];dbg("call ",[func,callid,args]);session.socket.emit("call2",[func,callid,args])};session.socket.on("call2-ret",function(msg){var callid=msg[0];var err=msg[1];var data=msg[2];if(callid in calltable){var cb=calltable[callid][2];if(err==""){try{data=JSON.parse(data);if(data.result!="ok"){err=data.data.result}}catch(e){err="wrong resp:"+data}}if(cb)cb(err,data)}});var is_ok=function(err,msg){return err==""};var channel;var proc_msg1=function(src,t,content){if(t=="channel_msg"){}};var decode_msg=function(msg){if(msg.startsWith("msg-v2 ")){var r=split_python(msg," ",6);if(r.length==7){var src=r[1];var t=r[4];var content=r[6];return[src,t,content]}}return null};session.socket.on("pong",function(msg){dbg("recv pong")});session.socket.on("close",function(msg){session.fire_logout(0);session.socket.close()});session.socket.on("_close",function(msg){session.fire_logout(0)});var process_msg=function(msg){var tmp=msg;var src=tmp[0];var t=tmp[1];var content=tmp[2];if(t=="instant"){try{if(session.onMessageInstantReceive)session.onMessageInstantReceive(src,0,content)}catch(e){console.error(e)}}if(t.startsWith("voip_")){var root=JSON.parse(content);var channel=root.channel;var peer=root.peer;var extra=root.extra;var peeruid=root.peeruid;var call;if(t=="voip_invite"){call=new Call(channel,peer,peeruid,extra);session.call2("voip_invite_ack",{line:session.line,channelName:channel,peer:peer,extra:""})}else{call=call_obj_table[channel+peer];if(!call){return}}if(t=="voip_invite"){try{if(session.onInviteReceived)session.onInviteReceived(call)}catch(e){console.error(e)}}if(t=="voip_invite_ack"){try{if(call.onInviteReceivedByPeer)call.onInviteReceivedByPeer(extra)}catch(e){console.error(e)}}if(t=="voip_invite_accept"){try{if(call.onInviteAcceptedByPeer)call.onInviteAcceptedByPeer(extra)}catch(e){console.error(e)}}if(t=="voip_invite_refuse"){try{if(call.onInviteRefusedByPeer)call.onInviteRefusedByPeer(extra)}catch(e){console.error(e)}}if(t=="voip_invite_failed"){try{if(call.onInviteFailed)call.onInviteFailed(extra)}catch(e){console.error(e)}}if(t=="voip_invite_bye"){try{if(call.onInviteEndByPeer)call.onInviteEndByPeer(extra)}catch(e){console.error(e)}}if(t=="voip_invite_msg"){try{if(call.onInviteMsg)call.onInviteMsg(extra)}catch(e){console.error(e)}}}};var get_time_in_ms=function(){return Date.now()};var m_ver_clear=0;var m_ver_notify=0;var m_ver_ack=0;var m_last_active_time=0;var m_time_poll_last=0;var m_is_polling=false;var schedule_poll=function(){if(m_is_polling)return;m_is_polling=true;session.call2("user_getmsg",{line:session.line,ver_clear:m_ver_clear,max:30},function(err,data){if(err==""){var resp=data;var ver_clear_old=m_ver_clear;m_ver_clear=resp["ver_clear"];m_ver_ack=m_ver_clear;for(var i in resp["msgs"]){var v=resp["msgs"][i][0];var line=resp["msgs"][i][1];process_msg(decode_msg(line));m_ver_clear=v}if(resp["msgs"].length==30||m_ver_clear<m_ver_notify){schedule_poll()}m_last_active_time=get_time_in_ms()}m_is_polling=false;m_time_poll_last=get_time_in_ms()})};var schedule_poll_tail=function(){m_time_poll_last=get_time_in_ms()};var start_tick=function(){setTimeout(function(){if(session.state=="session_state_logout"){return}if(session.state=="session_state_logined"){var t=get_time_in_ms();if(m_ver_ack<m_ver_clear&&t-m_time_poll_last>1e3){schedule_poll()}else if(t-m_time_poll_last>=1e3*60){schedule_poll()}}start_tick()},100)};session.socket.on("notify",function(msg){dbg("recv notify ",msg);if(typeof msg=="string"){msg=split_python(msg," ",2);msg=msg.slice(1)}var e=msg[0];if(e=="channel2"){var cid=msg[1];var msgid=msg[2];if(channel.m_channel_msgid!=0&&channel.m_channel_msgid+1>msgid){dbg("ignore channel msg",cid,msgid,channel.m_channel_msgid);return}channel.m_channel_msgid=msgid;var tmp=decode_msg(msg[3]);if(tmp){var src=tmp[0];var t=tmp[1];var content=tmp[2];var jj=JSON.parse(content);if(t=="channel_msg"){try{if(channel.onMessageChannelReceive){channel.onMessageChannelReceive(jj.account,jj.uid,jj.msg)}}catch(e){console.error(e)}}if(t=="channel_user_join"){try{if(channel.onChannelUserJoined){channel.onChannelUserJoined(jj.account,jj.uid)}}catch(e){console.error(e)}}if(t=="channel_user_leave"){try{if(channel.onChannelUserLeaved){channel.onChannelUserLeaved(jj.account,jj.uid)}}catch(e){console.error(e)}}if(t=="channel_attr_update"){try{if(channel.onChannelAttrUpdated){channel.onChannelAttrUpdated(jj.name,jj.value,jj.type)}}catch(e){console.error(e)}}}}if(e=="msg"){m_ver_notify=msg[1];schedule_poll()}if(e=="recvmsg"){var r=JSON.parse(msg[1]);var v=r[0];var line=r[1];if(v==m_ver_clear+1){process_msg(decode_msg(line));m_ver_clear=v;schedule_poll_tail()}else{m_ver_notify=v;schedule_poll()}}});session.messageInstantSend=function(peer,msg,cb){session.call2("user_sendmsg",{line:session.line,peer:peer,flag:"v1:E:3600",t:"instant",content:msg},function(err,data){if(cb)cb(!is_ok(err,data))})};session.invoke=function(func,args,cb){if(func.startsWith("io.agora.signal.")){var f=func.split(".")[3];args.line=session.line;session.call2(f,args,function(err,ret){if(cb){cb(err,ret)}})}};var Call=function(channelID,peer,extra){this.onInviteReceivedByPeer="";this.onInviteAcceptedByPeer="";this.onInviteRefusedByPeer="";this.onInviteFailed="";this.onInviteEndByPeer="";this.onInviteEndByMyself="";this.onInviteMsg="";var call=this;this.channelName=channelID;this.peer=peer;this.extra=extra;call_obj_table[channelID+peer]=call;this.channelInviteUser2=function(){extra=extra||"";session.call2("voip_invite",{line:session.line,channelName:channelID,peer:peer,extra:extra},function(err,msg){if(is_ok(err,msg)){}else{try{call.onInviteFailed(err)}catch(e){console.error(e)}}})};this.channelInviteAccept=function(extra){extra=extra||"";session.call2("voip_invite_accept",{line:session.line,channelName:channelID,peer:peer,extra:extra})};this.channelInviteRefuse=function(extra){extra=extra||"";session.call2("voip_invite_refuse",{line:session.line,channelName:channelID,peer:peer,extra:extra})};this.channelInviteDTMF=function(dtmf){session.call2("voip_invite_msg",{line:session.line,channelName:channelID,peer:peer,extra:JSON.stringify({msgtype:"dtmf",msgdata:dtmf})})};this.channelInviteEnd=function(extra){extra=extra||"";session.call2("voip_invite_bye",{line:session.line,channelName:channelID,peer:peer,extra:extra});try{if(call.onInviteEndByMyself)call.onInviteEndByMyself("")}catch(e){console.error(e)}}};session.channelInviteUser2=function(channelID,peer,extra){var call=new Call(channelID,peer,extra);call.channelInviteUser2();return call};session.channelJoin=function(name){if(session.state!="session_state_logined"){dbg("You should log in first.");return}channel=new function(){this.onChannelJoined="";this.onChannelJoinFailed="";this.onChannelLeaved="";this.onChannelUserList="";this.onChannelUserJoined="";this.onChannelUserLeaved="";this.onChannelUserList="";this.onChannelAttrUpdated="";this.onMessageChannelReceive="";this.name=name;this.state="joining";this.m_channel_msgid=0;this.messageChannelSend=function(msg,f){session.call2("channel_sendmsg",{line:session.line,name:name,msg:msg},function(err,msg){if(f){f()}})};this.channelLeave=function(f){session.call2("channel_leave",{line:session.line,name:name},function(err,msg){channel.state="leaved";if(f){f()}else{try{if(channel.onChannelLeaved){channel.onChannelLeaved(0)}}catch(e){console.error(e)}}})};this.channelSetAttr=function(k,v,f){session.call2("channel_set_attr",{line:session.line,channel:name,name:k,value:v},function(err,msg){if(f){f()}})};this.channelDelAttr=function(k,f){session.call2("channel_del_attr",{line:session.line,channel:name,name:k},function(err,msg){if(f){f()}})};this.channelClearAttr=function(f){session.call2("channel_clear_attr",{line:session.line,channel:name},function(err,msg){if(f){f()}})}};session.call2("channel_join",{line:session.line,name:name},function(err,msg){if(err==""){channel.state="joined";try{if(channel.onChannelJoined){channel.onChannelJoined()}}catch(e){console.error(e)}var r=msg;try{if(channel.onChannelUserList){channel.onChannelUserList(r.list)}}catch(e){console.error(e)}try{if(channel.onChannelAttrUpdated){for(var k in r.attrs){channel.onChannelAttrUpdated(k,r.attrs[k],"update")}}}catch(e){console.error(e)}}else{try{if(channel.onChannelJoinFailed){channel.onChannelJoinFailed(err)}}catch(e){console.error(e)}}});return channel}}};session.socket=null;shuffle(signal.lbs_url1);shuffle(signal.lbs_url2);do_lbs(2,signal.lbs_url1,0);do_lbs(2,signal.lbs_url2,0)};this.login=function(account,token){return new Session(account,token)}};Signal=function(vid){return new Signal_(vid)};
/*! howler.js v2.0.5 | (c) 2013-2017, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._counter=1e3,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.mobileAutoEnable=!0,e._setup(),e},volume:function(e){var o=this||n;if(e=parseFloat(e),o.ctx||_(),void 0!==e&&e>=0&&e<=1){if(o._volume=e,o._muted)return o;o.usingWebAudio&&(o.masterGain.gain.value=e);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.volume=u._volume*e)}return o}return o._volume},mute:function(e){var o=this||n;o.ctx||_(),o._muted=e,o.usingWebAudio&&(o.masterGain.gain.value=e?0:o._volume);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.muted=!!e||u._muted)}return o},unload:function(){for(var e=this||n,o=e._howls.length-1;o>=0;o--)e._howls[o].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx?e.ctx.state||"running":"running",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{var o=new Audio;void 0===o.oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{var o=new Audio;o.muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,o=null;try{o="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!o||"function"!=typeof o.canPlayType)return e;var t=o.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!t&&!o.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(o.canPlayType("audio/x-flac;")||o.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||n,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator&&e._navigator.userAgent),t=!!("ontouchend"in window||e._navigator&&e._navigator.maxTouchPoints>0||e._navigator&&e._navigator.msMaxTouchPoints>0);if(!e._mobileEnabled&&e.ctx&&(o||t)){e._mobileEnabled=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var r=function(){n._autoResume();var o=e.ctx.createBufferSource();o.buffer=e._scratchBuffer,o.connect(e.ctx.destination),void 0===o.start?o.noteOn(0):o.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),o.onended=function(){o.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchstart",r,!0),document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchstart",r,!0),document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&n.usingWebAudio){for(var o=0;o<e._howls.length;o++)if(e._howls[o]._webAudio)for(var t=0;t<e._howls[o]._sounds.length;t++)if(!e._howls[o]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,o=function(e){var n=this;if(!e.src||0===e.src.length)return void console.error("An array of source files must be passed with any new Howl.");n.init(e)};o.prototype={init:function(e){var o=this;return n.ctx||_(),o._autoplay=e.autoplay||!1,o._format="string"!=typeof e.format?e.format:[e.format],o._html5=e.html5||!1,o._muted=e.mute||!1,o._loop=e.loop||!1,o._pool=e.pool||5,o._preload="boolean"!=typeof e.preload||e.preload,o._rate=e.rate||1,o._sprite=e.sprite||{},o._src="string"!=typeof e.src?e.src:[e.src],o._volume=void 0!==e.volume?e.volume:1,o._xhrWithCredentials=e.xhrWithCredentials||!1,o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._onend=e.onend?[{fn:e.onend}]:[],o._onfade=e.onfade?[{fn:e.onfade}]:[],o._onload=e.onload?[{fn:e.onload}]:[],o._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],o._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],o._onpause=e.onpause?[{fn:e.onpause}]:[],o._onplay=e.onplay?[{fn:e.onplay}]:[],o._onstop=e.onstop?[{fn:e.onstop}]:[],o._onmute=e.onmute?[{fn:e.onmute}]:[],o._onvolume=e.onvolume?[{fn:e.onvolume}]:[],o._onrate=e.onrate?[{fn:e.onrate}]:[],o._onseek=e.onseek?[{fn:e.onseek}]:[],o._onresume=[],o._webAudio=n.usingWebAudio&&!o._html5,void 0!==n.ctx&&n.ctx&&n.mobileAutoEnable&&n._enableMobileAudio(),n._howls.push(o),o._autoplay&&o._queue.push({event:"play",action:function(){o.play()}}),o._preload&&o.load(),o},load:function(){var e=this,o=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var u,i;if(e._format&&e._format[r])u=e._format[r];else{if("string"!=typeof(i=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}u=/^data:audio\/([^;,]+);/i.exec(i),u||(u=/\.([^.]+)$/.exec(i.split("?",1)[0])),u&&(u=u[1].toLowerCase())}if(u||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),u&&n.codecs(u)){o=e._src[r];break}}return o?(e._src=o,e._state="loading","https:"===window.location.protocol&&"http:"===o.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new t(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,o){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e){e="__default";for(var a=0,u=0;u<t._sounds.length;u++)t._sounds[u]._paused&&!t._sounds[u]._ended&&(a++,r=t._sounds[u]._id);1===a?e=null:r=null}}var i=r?t._soundById(r):t._inactiveSound();if(!i)return null;if(r&&!e&&(e=i._sprite||"__default"),"loaded"!==t._state){i._sprite=e,i._ended=!1;var d=i._id;return t._queue.push({event:"play",action:function(){t.play(d)}}),d}if(r&&!i._paused)return o||setTimeout(function(){t._emit("play",i._id)},0),i._id;t._webAudio&&n._autoResume();var _=Math.max(0,i._seek>0?i._seek:t._sprite[e][0]/1e3),s=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-_),l=1e3*s/Math.abs(i._rate);i._paused=!1,i._ended=!1,i._sprite=e,i._seek=_,i._start=t._sprite[e][0]/1e3,i._stop=(t._sprite[e][0]+t._sprite[e][1])/1e3,i._loop=!(!i._loop&&!t._sprite[e][2]);var c=i._node;if(t._webAudio){var f=function(){t._refreshBuffer(i);var e=i._muted||t._muted?0:i._volume;c.gain.setValueAtTime(e,n.ctx.currentTime),i._playStart=n.ctx.currentTime,void 0===c.bufferSource.start?i._loop?c.bufferSource.noteGrainOn(0,_,86400):c.bufferSource.noteGrainOn(0,_,s):i._loop?c.bufferSource.start(0,_,86400):c.bufferSource.start(0,_,s),l!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),l)),o||setTimeout(function(){t._emit("play",i._id)},0)};"running"===n.state?f():(t.once("resume",f),t._clearTimer(i._id))}else{var p=function(){c.currentTime=_,c.muted=i._muted||t._muted||n._muted||c.muted,c.volume=i._volume*n.volume(),c.playbackRate=i._rate;try{if(c.play(),c.paused)return void t._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.");l!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),l)),o||t._emit("play",i._id)}catch(e){t._emit("playerror",i._id,e)}},v=window&&window.ejecta||!c.readyState&&n._navigator.isCocoonJS;if(4===c.readyState||v)p();else{var m=function(){p(),c.removeEventListener(n._canPlayEvent,m,!1)};c.addEventListener(n._canPlayEvent,m,!1),t._clearTimer(i._id)}}return i._id},pause:function(e){var n=this;if("loaded"!==n._state)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused&&(r._seek=n.seek(o[t]),r._rateSeek=0,r._paused=!0,n._stopFade(o[t]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var o=this;if("loaded"!==o._state)return o._queue.push({event:"stop",action:function(){o.stop(e)}}),o;for(var t=o._getSoundIds(e),r=0;r<t.length;r++){o._clearTimer(t[r]);var a=o._soundById(t[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,o._stopFade(t[r]),a._node&&(o._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),o._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause())),n||o._emit("stop",a._id))}return o},mute:function(e,o){var t=this;if("loaded"!==t._state)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if(void 0===o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),a=0;a<r.length;a++){var u=t._soundById(r[a]);u&&(u._muted=e,t._webAudio&&u._node?u._node.gain.setValueAtTime(e?0:u._volume,n.ctx.currentTime):u._node&&(u._node.muted=!!n._muted||e),t._emit("mute",u._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length||2===r.length&&void 0===r[1]){t._getSoundIds().indexOf(r[0])>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var a;if(!(void 0!==e&&e>=0&&e<=1))return a=o?t._soundById(o):t._sounds[0],a?a._volume:0;if("loaded"!==t._state)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;void 0===o&&(t._volume=e),o=t._getSoundIds(o);for(var u=0;u<o.length;u++)(a=t._soundById(o[u]))&&(a._volume=e,r[2]||t._stopFade(o[u]),t._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(e,n.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=e*n.volume()),t._emit("volume",a._id));return t},fade:function(e,o,t,r){var a=this;if("loaded"!==a._state)return a._queue.push({event:"fade",action:function(){a.fade(e,o,t,r)}}),a;a.volume(e,r);for(var u=a._getSoundIds(r),i=0;i<u.length;i++){var d=a._soundById(u[i]);if(d){if(r||a._stopFade(u[i]),a._webAudio&&!d._muted){var _=n.ctx.currentTime,s=_+t/1e3;d._volume=e,d._node.gain.setValueAtTime(e,_),d._node.gain.linearRampToValueAtTime(o,s)}a._startFadeInterval(d,e,o,t,u[i])}}return a},_startFadeInterval:function(e,n,o,t,r){var a=this,u=n,i=n>o?"out":"in",d=Math.abs(n-o),_=d/.01,s=_>0?t/_:t;s<4&&(_=Math.ceil(_/(4/s)),s=4),e._interval=setInterval(function(){_>0&&(u+="in"===i?.01:-.01),u=Math.max(0,u),u=Math.min(1,u),u=Math.round(100*u)/100,a._webAudio?(void 0===r&&(a._volume=u),e._volume=u):a.volume(u,e._id,!0),(o<n&&u<=o||o>n&&u>=o)&&(clearInterval(e._interval),e._interval=null,a.volume(o,e._id),a._emit("fade",e._id))},s)},_stopFade:function(e){var o=this,t=o._soundById(e);return t&&t._interval&&(o._webAudio&&t._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(t._interval),t._interval=null,o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(o=t._soundById(parseInt(r[0],10)))&&o._loop;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=t._getSoundIds(n),u=0;u<a.length;u++)(o=t._soundById(a[u]))&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e,e&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop)));return t},rate:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if("number"!=typeof e)return i=t._soundById(o),i?i._rate:t._rate;if("loaded"!==t._state)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;void 0===o&&(t._rate=e),o=t._getSoundIds(o);for(var d=0;d<o.length;d++)if(i=t._soundById(o[d])){i._rateSeek=t.seek(o[d]),i._playStart=t._webAudio?n.ctx.currentTime:i._playStart,i._rate=e,t._webAudio&&i._node&&i._node.bufferSource?i._node.bufferSource.playbackRate.value=e:i._node&&(i._node.playbackRate=e);var _=t.seek(o[d]),s=(t._sprite[i._sprite][0]+t._sprite[i._sprite][1])/1e3-_,l=1e3*s/Math.abs(i._rate);!t._endTimers[o[d]]&&i._paused||(t._clearTimer(o[d]),t._endTimers[o[d]]=setTimeout(t._ended.bind(t,i),l)),t._emit("rate",i._id)}return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):t._sounds.length&&(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if(void 0===o)return t;if("loaded"!==t._state)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var i=t._soundById(o);if(i){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var d=t.playing(o)?n.ctx.currentTime-i._playStart:0,_=i._rateSeek?i._rateSeek-i._seek:0;return i._seek+(_+d*Math.abs(i._rate))}return i._node.currentTime}var s=t.playing(o);s&&t.pause(o,!0),i._seek=e,i._ended=!1,t._clearTimer(o),s&&t.play(o,!0),!t._webAudio&&i._node&&(i._node.currentTime=e),t._emit("seek",o)}return t},playing:function(e){var n=this;if("number"==typeof e){var o=n._soundById(e);return!!o&&!o._paused}for(var t=0;t<n._sounds.length;t++)if(!n._sounds[t]._paused)return!0;return!1},duration:function(e){var n=this,o=n._duration,t=n._soundById(e);return t&&(o=n._sprite[t._sprite][1]/1e3),o},state:function(){return this._state},unload:function(){for(var e=this,o=e._sounds,t=0;t<o.length;t++){if(o[t]._paused||e.stop(o[t]._id),!e._webAudio){/MSIE |Trident\//.test(n._navigator&&n._navigator.userAgent)||(o[t]._node.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"),o[t]._node.removeEventListener("error",o[t]._errorFn,!1),o[t]._node.removeEventListener(n._canPlayEvent,o[t]._loadFn,!1)}delete o[t]._node,e._clearTimer(o[t]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1)}var u=!0;for(t=0;t<n._howls.length;t++)if(n._howls[t]._src===e._src){u=!1;break}return r&&u&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,a=r["_on"+e];return"function"==typeof n&&a.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e],a=0;if("number"==typeof n&&(o=n,n=null),n||o)for(a=0;a<r.length;a++){var u=o===r[a].id;if(n===r[a].fn&&u||!n&&u){r.splice(a,1);break}}else if(e)t["_on"+e]=[];else{var i=Object.keys(t);for(a=0;a<i.length;a++)0===i[a].indexOf("_on")&&Array.isArray(t[i[a]])&&(t[i[a]]=[])}return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[a].fn),0),r[a].once&&t.off(e,r[a].fn,r[a].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite;if(!o._webAudio&&e._node&&!e._node.paused)return setTimeout(o._ended.bind(o,e),100),o;var r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id,!0).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),a)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,o._clearTimer(e._id),o._cleanBuffer(e._node),n._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new t(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(o<=n)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if(void 0===e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[o._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=e._rate,o},_cleanBuffer:function(e){var n=this;if(n._scratchBuffer){e.bufferSource.onended=null,e.bufferSource.disconnect(0);try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}}return e.bufferSource=null,n}};var t=function(e){this._parent=e,this.init()};t.prototype={init:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,o._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=n._muted||e._muted||e._parent._muted?0:e._volume;return o._webAudio?(e._node=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(t,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t*n.volume(),e._node.load()),e},reset:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,o=e._parent;o._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(o._sprite).length&&(o._sprite={__default:[0,1e3*o._duration]}),"loaded"!==o._state&&(o._state="loaded",o._emit("load"),o._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void d(e);if(/^data:[^;]+;base64,/.test(n)){for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),a=0;a<o.length;++a)t[a]=o.charCodeAt(a);i(t.buffer,e)}else{var _=new XMLHttpRequest;_.open("GET",n,!0),_.withCredentials=e._xhrWithCredentials,_.responseType="arraybuffer",_.onload=function(){var n=(_.status+"")[0];if("0"!==n&&"2"!==n&&"3"!==n)return void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");i(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},u(_)}},u=function(e){try{e.send()}catch(n){e.onerror()}},i=function(e,o){n.ctx.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(r[o._src]=e,d(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},d=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},_=function(){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),o=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=o?parseInt(o[1],10):null;if(e&&t&&t<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());(n._navigator&&n._navigator.standalone&&!r||n._navigator&&!n._navigator.standalone&&!r)&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.value=n._muted?0:1,n.masterGain.connect(n.ctx.destination)),n._setup()};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:o}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=o),"undefined"!=typeof window?(window.HowlerGlobal=e,window.Howler=n,window.Howl=o,window.Sound=t):"undefined"!=typeof global&&(global.HowlerGlobal=e,global.Howler=n,global.Howl=o,global.Sound=t)}();
/*! Spatial Plugin */
!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(n){var e=this;if(!e.ctx||!e.ctx.listener)return e;for(var t=e._howls.length-1;t>=0;t--)e._howls[t].stereo(n);return e},HowlerGlobal.prototype.pos=function(n,e,t){var o=this;return o.ctx&&o.ctx.listener?(e="number"!=typeof e?o._pos[1]:e,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof n?o._pos:(o._pos=[n,e,t],o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(n,e,t,o,r,a){var i=this;if(!i.ctx||!i.ctx.listener)return i;var p=i._orientation;return e="number"!=typeof e?p[1]:e,t="number"!=typeof t?p[2]:t,o="number"!=typeof o?p[3]:o,r="number"!=typeof r?p[4]:r,a="number"!=typeof a?p[5]:a,"number"!=typeof n?p:(i._orientation=[n,e,t,o,r,a],i.ctx.listener.setOrientation(n,e,t,o,r,a),i)},Howl.prototype.init=function(n){return function(e){var t=this;return t._orientation=e.orientation||[1,0,0],t._stereo=e.stereo||null,t._pos=e.pos||null,t._pannerAttr={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:360,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:360,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:0,distanceModel:void 0!==e.distanceModel?e.distanceModel:"inverse",maxDistance:void 0!==e.maxDistance?e.maxDistance:1e4,panningModel:void 0!==e.panningModel?e.panningModel:"HRTF",refDistance:void 0!==e.refDistance?e.refDistance:1,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:1},t._onstereo=e.onstereo?[{fn:e.onstereo}]:[],t._onpos=e.onpos?[{fn:e.onpos}]:[],t._onorientation=e.onorientation?[{fn:e.onorientation}]:[],n.call(this,e)}}(Howl.prototype.init),Howl.prototype.stereo=function(e,t){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(e,t)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof e)return o._stereo;o._stereo=e,o._pos=[e,0,0]}for(var a=o._getSoundIds(t),i=0;i<a.length;i++){var p=o._soundById(a[i]);if(p){if("number"!=typeof e)return p._stereo;p._stereo=e,p._pos=[e,0,0],p._node&&(p._pannerAttr.panningModel="equalpower",p._panner&&p._panner.pan||n(p,r),"spatial"===r?p._panner.setPosition(e,0,0):p._panner.pan.value=e),o._emit("stereo",p._id)}}return o},Howl.prototype.pos=function(e,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"pos",action:function(){a.pos(e,t,o,r)}}),a;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof e)return a._pos;a._pos=[e,t,o]}for(var i=a._getSoundIds(r),p=0;p<i.length;p++){var s=a._soundById(i[p]);if(s){if("number"!=typeof e)return s._pos;s._pos=[e,t,o],s._node&&(s._panner&&!s._panner.pan||n(s,"spatial"),s._panner.setPosition(e,t,o)),a._emit("pos",s._id)}}return a},Howl.prototype.orientation=function(e,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"orientation",action:function(){a.orientation(e,t,o,r)}}),a;if(t="number"!=typeof t?a._orientation[1]:t,o="number"!=typeof o?a._orientation[2]:o,void 0===r){if("number"!=typeof e)return a._orientation;a._orientation=[e,t,o]}for(var i=a._getSoundIds(r),p=0;p<i.length;p++){var s=a._soundById(i[p]);if(s){if("number"!=typeof e)return s._orientation;s._orientation=[e,t,o],s._node&&(s._panner||(s._pos||(s._pos=a._pos||[0,0,-.5]),n(s,"spatial")),s._panner.setOrientation(e,t,o)),a._emit("orientation",s._id)}}return a},Howl.prototype.pannerAttr=function(){var e,t,o,r=this,a=arguments;if(!r._webAudio)return r;if(0===a.length)return r._pannerAttr;if(1===a.length){if("object"!=typeof a[0])return o=r._soundById(parseInt(a[0],10)),o?o._pannerAttr:r._pannerAttr;e=a[0],void 0===t&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),r._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:r._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:r._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:r._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:r._panningModel})}else 2===a.length&&(e=a[0],t=parseInt(a[1],10));for(var i=r._getSoundIds(t),p=0;p<i.length;p++)if(o=r._soundById(i[p])){var s=o._pannerAttr;s={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:s.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:s.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:s.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:s.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:s.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:s.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:s.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:s.panningModel};var l=o._panner;l?(l.coneInnerAngle=s.coneInnerAngle,l.coneOuterAngle=s.coneOuterAngle,l.coneOuterGain=s.coneOuterGain,l.distanceModel=s.distanceModel,l.maxDistance=s.maxDistance,l.refDistance=s.refDistance,l.rolloffFactor=s.rolloffFactor,l.panningModel=s.panningModel):(o._pos||(o._pos=r._pos||[0,0,-.5]),n(o,"spatial"))}return r},Sound.prototype.init=function(n){return function(){var e=this,t=e._parent;e._orientation=t._orientation,e._stereo=t._stereo,e._pos=t._pos,e._pannerAttr=t._pannerAttr,n.call(this),e._stereo?t.stereo(e._stereo):e._pos&&t.pos(e._pos[0],e._pos[1],e._pos[2],e._id)}}(Sound.prototype.init),Sound.prototype.reset=function(n){return function(){var e=this,t=e._parent;return e._orientation=t._orientation,e._pos=t._pos,e._pannerAttr=t._pannerAttr,n.call(this)}}(Sound.prototype.reset);var n=function(n,e){e=e||"spatial","spatial"===e?(n._panner=Howler.ctx.createPanner(),n._panner.coneInnerAngle=n._pannerAttr.coneInnerAngle,n._panner.coneOuterAngle=n._pannerAttr.coneOuterAngle,n._panner.coneOuterGain=n._pannerAttr.coneOuterGain,n._panner.distanceModel=n._pannerAttr.distanceModel,n._panner.maxDistance=n._pannerAttr.maxDistance,n._panner.refDistance=n._pannerAttr.refDistance,n._panner.rolloffFactor=n._pannerAttr.rolloffFactor,n._panner.panningModel=n._pannerAttr.panningModel,n._panner.setPosition(n._pos[0],n._pos[1],n._pos[2]),n._panner.setOrientation(n._orientation[0],n._orientation[1],n._orientation[2])):(n._panner=Howler.ctx.createStereoPanner(),n._panner.pan.value=n._stereo),n._panner.connect(n._node),n._paused||n._parent.pause(n._id,!0).play(n._id)}}();
/*!
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
//# sourceMappingURL=md5.min.js.map
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(a){return void 0!==a&&null!==a}a(document).ready(function(){a("body").append("<div id=snackbar-container/>")});var c={events:{},on:function(a,b){this.events[a]=this.events[a]||[],this.events[a].push(b)},off:function(a){this.events[a]&&delete this.events[a]},emit:function(a,b){this.events[a]&&this.events[a].forEach(function(a){a(b)})}};a(document).on("click","[data-toggle=snackbar]",function(){a(this).snackbar("toggle")}).on("click","#snackbar-container .snackbar",function(){a(this).snackbar("hide")}),a.snackbar=function(d){if(b(d)&&d===Object(d)){var e,f=!1;d=Object.assign({},a.snackbar.defaults,d),b(d.id)?a("#"+d.id).length?e=a("#"+d.id):(e=a("<div/>").attr("id",""+d.id).attr("class","snackbar"),f=!0):(d.id="snackbar"+Date.now(),e=a("<div/>").attr("id",d.id).attr("class","snackbar"),f=!0);var g=e.hasClass("snackbar-opened");b(d.style)?(g?e.attr("class","snackbar snackbar-opened "+d.style):e.attr("class","snackbar "+d.style),e.attr("data-style",d.style)):g?e.attr("class","snackbar snackbar-opened"):e.attr("class","snackbar"),d.htmlAllowed=!!b(d.htmlAllowed)&&d.htmlAllowed,d.timeout=b(d.timeout)?d.timeout:3e3,e.attr("data-timeout",d.timeout),d.content=d.htmlAllowed?d.content:a("<p>"+d.content+"</p>").text(),b(d.onClose)&&c.on(d.id,d.onClose),b(d.htmlAllowed)&&e.attr("data-html-allowed",d.htmlAllowed),b(d.content)&&(e.find(".snackbar-content").length?e.find(".snackbar-content").html(d.content):e.prepend("<span class=snackbar-content>"+d.content+"</span>"),e.attr("data-content",d.content)),f?e.appendTo("#snackbar-container"):e.insertAfter("#snackbar-container .snackbar:last-child"),b(d.action)&&"toggle"==d.action&&(d.action=g?"hide":"show");var h=Date.now();e.data("animationId1",h),setTimeout(function(){e.data("animationId1")===h&&(b(d.action)&&"show"!=d.action?b(d.action)&&"hide"==d.action&&(e.removeClass("snackbar-opened"),c.emit(d.id),c.off(d.id)):e.addClass("snackbar-opened"))},50);var i=Date.now();return e.data("animationId2",i),0!==d.timeout&&setTimeout(function(){e.data("animationId2")===i&&(e.removeClass("snackbar-opened"),c.emit(d.id),c.off(d.id))},d.timeout),e}return!1},a.snackbar.defaults={},a.fn.snackbar=function(c){if(void 0!==c){var d={};if(this.hasClass("snackbar"))return d={id:this.attr("id"),content:a(this).attr("data-content"),style:a(this).attr("data-style"),timeout:parseInt(a(this).attr("data-timeout")),htmlAllowed:a(this).attr("data-html-allowed")},"show"!==c&&"hide"!==c&&"toggle"!=c||(d.action=c),a.snackbar(d);b(c)&&"show"!==c&&"hide"!==c&&"toggle"!=c||(d={content:a(this).attr("data-content"),style:a(this).attr("data-style"),timeout:a(this).attr("data-timeout"),htmlAllowed:a(this).attr("data-html-allowed")}),b(c)&&(d.id=this.attr("data-snackbar-id"),"show"!==c&&"hide"!==c&&"toggle"!=c||(d.action=c));var e=a.snackbar(d);return this.attr("data-snackbar-id",e.attr("id")),e}}});
//# sourceMappingURL=snackbar.min.js.map
var SignalingToken = (function () {
    var exports = {};

    exports.get = function(appid, appcertificate, account, validDays){
        var expiredTime = parseInt(new Date().getTime() / 1000)+ 3600* 24 *  validDays;
        var token_items = [];

        //append SDK VERSION
        token_items.push("1");

        //append appid
        token_items.push(appid);

        //expired time
        token_items.push(expiredTime);

        //md5 account + appid + appcertificate + expiredtime
        token_items.push(md5(account + appid + appcertificate + expiredTime));

        return token_items.join(":");
    }

    //convenience function to get token valid within 1 day
    exports.get1DayToken = function(appid, appcertificate, account){
        return this.get(appid, appcertificate, account, 1);
    }

    return exports;
}());