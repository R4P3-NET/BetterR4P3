function r4p3() {}
//r4p3.DisableLogging();
r4p3.DisableLogging = function() {
	console_log = console.log;
	console_info = console.info;
	console_warn = console.warn;
	console_error = console.error;
	console_debug = console.log;
	console_count = console.count;
	window['console']['log'] = function() {};
	window['console']['info'] = function() {};
	window['console']['warn'] = function() {};
	window['console']['error'] = function() {};
	window['console']['debug'] = function() {};
	window['console']['count'] = function() {};
};
//r4p3.EnableLogging();
r4p3.EnableLogging = function() {
	if(!console_log){
		return;
	}
	window['console']['log'] = console_log;
	window['console']['info'] = console_info;
	window['console']['warn'] = console_warn;
	window['console']['error'] = console_error;
	window['console']['debug'] = console_debug;
	window['console']['count'] = console_count;
};
//r4p3.log(dbg, "type", "pluginName", "msg");
r4p3.log = function(dbg, type, pluginName, msg) {
	if ( (dbg == "debug") || (dbg == "dbg") || (dbg == 1) ) {
		if (debug == 1) {
			switch(type) {
				case "info":
					console.info("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				case "warn":
					console.warn("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				case "error":
					console.error("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				default:
					console.log("[BetterDiscord] " + pluginName + ": " + msg);
					break;
			};
		} else {
			return;
		}
	} else {
		switch(type) {
			case "info":
				console.info("[BetterDiscord] " + pluginName + ": " + msg);
				break;
			case "warn":
				console.warn("[BetterDiscord] " + pluginName + ": " + msg);
				break;
			case "error":
				console.error("[BetterDiscord] " + pluginName + ": " + msg);
				break;
			default:
				console.log("[BetterDiscord] " + pluginName + ": " + msg);
				break;
		};
	};	
};
//r4p3.appendTo("link", "Element");
r4p3.appendTo = function(link, Element){
	var $head = $("head");
	var $headlinklast = $head.find( link + ":last");
	if ($headlinklast.length){
	   $headlinklast.after(Element);
	}
	else {
	   $head.append(Element);
	};
};
//r4p3.enableTextSelection();
r4p3.enableTextSelection = function() {
	function ats(){
		var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
		jQuery('head').append(jQuery('<style />').html(styles));
		var allowNormal=function(){ return true; };
		jQuery('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv').unbind('contextmenu').unbind('selectstart').unbind('dragstart').unbind('mousedown').unbind('mouseup').unbind('click').attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal).attr('ondragstart',allowNormal);
	}
	function atswp(){
		if(window.jQuery){
		  ats();
		}
		else{
		  window.setTimeout(atswp,100);
		}
	}
	if(window.jQuery){
		ats();
	} else {
		var s=document.createElement('script');
		s.setAttribute('src','http://code.jquery.com/jquery-1.9.1.min.js');
		document.getElementsByTagName('body')[0].appendChild(s);
		atswp();
	}
};
//r4p3.enableAutoComplete();
r4p3.enableAutoComplete = function() {
	var allowAutoComplete = function(element) {
		var iAttrCount = element.attributes.length;
		for (var i = 0; i < iAttrCount; i++) {
			var oAttr = element.attributes[i];
			if (oAttr.name == 'autocomplete') {
				oAttr.value = 'on';
				break;
			}
		}
	};
	var forms = document.getElementsByTagName('form');
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		var elements = form.elements;
		allowAutoComplete(form);
		for (var j = 0; j < elements.length; j++)
		{
			allowAutoComplete(elements[j]);
		}
	}
};
//r4p3.enableButtons();
r4p3.enableButtons = function() {
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i < buttons.length; i++)
	{
		buttons[i].removeAttr('disabled');
	}
};
//r4p3.isNumber("string");
r4p3.isNumber = function(str) {
	if(/^\d+$/.test(str)) {
		return true;
	} else {
		BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "\""+str+"\" is not a valid number.");
		return false;
	}
};
//r4p3.addLink("href", "title");
this.addLink = function(href, title) {
	$('.Menu.JsOnly.tabMenu.membersTabLinks .secondaryContent.blockLinksList').append('<li><a href="'+href+'" target="_blank">'+title+'</a></li>');
};