// ==UserScript==
// @name R4P3+
// @namespace https://github.com/R4P3-NET/BetterR4P3
// @description Better R4P3.net
// @author Bluscream
// @version 0.1
// @encoding utf-8
// @icon https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/icon.png
// @homepage https://r4p3.net
// @contactURL https://r4p3.net/members/bluscream.53/
// @supportURL https://github.com/R4P3-NET/BetterR4P3/issues/new
// @contributionURL https://github.com/R4P3-NET/BetterR4P3/compare
// @updateURL https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/R4P3%2B.user.js
// @downloadURL https://github.com/R4P3-NET/BetterR4P3/raw/master/R4P3%2B.user.js
// @require https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/BetterR4P3.js
// @require https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @include https://r4p3.net/*
// @grant unsafeWindow
// ==/UserScript==
// @require https://github.com/R4P3-NET/BetterR4P3/raw/master/BetterR4P3.js

//r4p3_addLink("href", "title");
r4p3_addLink = function(href, title, prepend) {
    if (prepend) {
        $('.Menu.JsOnly.tabMenu.membersTabLinks .secondaryContent.blockLinksList').prepend('<li class="addedLink"><a href="'+href+'" target="_blank">'+title+'</a></li>');
    } else {
        $('.Menu.JsOnly.tabMenu.membersTabLinks .secondaryContent.blockLinksList').append('<li class="addedLink"><a href="'+href+'" target="_blank">'+title+'</a></li>');
    }
};
//r4p3_addBanner("username", "bannercolor", "bannertext");
r4p3_addBanner = function(username, bannercolor, bannertext, prepend) {
    if (prepend) {
        $('li[data-author="'+username+'"] .userText .username').after('<em class="userBanner banner'+bannercolor+' wrapped" itemprop="title"><span class="before"></span><strong class="bannertext" id="bannertext_'+username+'_'+bannercolor+'_'+bannertext+'">'+bannertext+'</strong><span class="after"></span></em>');
    } else {
        $('li[data-author="'+username+'"] .userText').append('<em class="userBanner banner'+bannercolor+' wrapped" itemprop="title"><span class="before"></span><strong class="bannertext" id="bannertext_'+username+'_'+bannercolor+'_'+bannertext+'">'+bannertext+'</strong><span class="after"></span></em>');
    }
};
//r4p3_delBanner("username", "bannercolor");
r4p3_delBanner = function(username, bannercolor) {
	$('li[data-author="'+username+'"] .userText .banner'+bannercolor).remove();
};

(function() {
    'use strict';
    /*jshint multistr: true */
    $( document ).ready(function() {
		//$("head").append('<script id="BetterR4P3" src="https://rawgit.com/R4P3-NET/BetterR4P3/master/BetterR4P3.js"></script>');
        r4p3_addLink('https://discord.gg/0lNtGnKrr957kozq', 'R4P3 Discord');
        r4p3_addBanner('Bluscream', 'Blue', 'Bluscream');
        r4p3_delBanner('Supervisor', 'Orange');r4p3_addBanner('Supervisor', 'Orange', 'Restricted', true);
        $('form[action="account/preferences-save"]').livequery(function(){
            $('.ctrlUnit.submitUnit').before('\
				<h3 class="sectionHeader">Appearance</h3>\
				<fieldset>\
					<input type="hidden" name="theme_id" value="1">\
					<dl class="ctrlUnit">\
						<dt><label for="ctrl_theme">Theme:</label></dt>\
						<dd>\
							<select name="theme" class="textCtrl" id="ctrl_theme">\
									<option value="0">Light (Default)</option>\
									<option value="1">Dark</option>\
							</select>\
						</dd>\
					</dl>\
				</fieldset>\
           ');
            $("#ctrl_theme").val(0);
        });
            $('form[action="account/preferences-save"] .ctrlUnit.submitUnit input[name="save"]').livequery(function(){
                $('form[action="account/preferences-save"] .ctrlUnit.submitUnit input[name="save"]').click(function() {
                   $('#ctrl_theme').livequery(function(){
                        console.log("Theme changed.");
                        console.log("Selected Theme: "+$("#ctrl_theme").val()+" <<<");
                   });
                });
            });
        });
})();