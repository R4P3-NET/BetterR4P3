// ==UserScript==
// @name R4P3+
// @description Better R4P3.net
// @author Bluscream
// @version 1.4.1
// @encoding utf-8
// @icon https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/icon.png
// @homepage https://r4p3.net
// @contactURL https://r4p3.net/members/bluscream.53/
// @supportURL https://github.com/R4P3-NET/BetterR4P3/issues/new
// @contributionURL https://github.com/R4P3-NET/BetterR4P3/compare
// @updateURL https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/R4P3%2B.user.js
// @downloadURL https://github.com/R4P3-NET/BetterR4P3/raw/master/R4P3%2B.user.js
// @require https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @require https://cdn.rawgit.com/ali-saleem/anchorme.js/gh-pages/anchorme.min.js
// @include https://r4p3.net/*
// @grant unsafeWindow
// ==/UserScript==
/*jshint multistr: true */


//r4p3_addDiscord(invite, href);
r4p3_addDiscord = function(invite, href) {
    r4p3_addLink('https://discord.gg/'+invite, 'R4P3 Discord');
    r4p3_addinfoBlock('membersOnline versioninfo Discord', 'block', 'Discord', 'https://discord.gg/'+invite+'', 'R4P3 Discord Server', '<iframe id="discordframe" src="'+href+'" width="230px" height="500px" frameborder="0"></iframe>');
    setTimeout(function(){ $('#discordframe').attr('src', $('#discordframe').attr('src')); }, 60000);
};
//r4p3_addShoutbox();
r4p3_addShoutbox = function(src) {
    $('.breadBoxTop').before('<br><div id="toggleshoutbox" class="noselect">Click to show/hide shoutbox<iframe class="shoutbox" id="shoutbox" WIDTH="100%" HEIGHT="300" title="R4P3 Shoutbox" src="'+src+'" frameborder="0" scrolling="auto"></iframe></div>');//<div class="noselect" id="refreshshoutbox" class="refreshshoutbox">Refresh Shoutbox</div><
    if (localStorage.getItem("shoutbox") == '0') { $("#shoutbox").hide(); }
    setInterval(function(){ $('#shoutbox').attr('src', $('#shoutbox').attr('src'));console.log('[R4P3+] Refreshed Shoutbox'); }, 30000);
    $("#toggleshoutbox").click(function(){ r4p3_checkShoutbox(); });
};
//r4p3_checkShoutbox();
r4p3_checkShoutbox = function() {
    if($('#shoutbox').is(":visible")){
        localStorage.setItem("shoutbox", '0');
    } else {
        localStorage.setItem("shoutbox", '1');
    }
    $('.shoutbox').toggle();
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
//r4p3_changeUserTitle("username", "title");
r4p3_changeUserTitle = function(username, title) {
    $('li a[href^="members/'+username.toLowerCase()+'."]').parent().find('.userTitle').text(title);
};
//r4p3_reorderStaffMember("useraname", prepend);
r4p3_reorderStaffMember = function(username, prepend) {
   if (prepend) {
       $('.section.staffOnline li a[href^="members/'+username.toLowerCase()+'."].avatar').parent().prependTo( '.section.staffOnline .secondaryContent ul' );
    } else {
        $('.section.staffOnline li a[href^="members/'+username.toLowerCase()+'."].avatar').parent().appendTo( '.section.staffOnline .secondaryContent ul' );
    }
};
//r4p3_getTSVersion();
r4p3_getTSVersion = function() {
    API = "https://api.planetteamspeak.com/updatecheck/";
    $.getJSON( API, {
    format: "json"
  })
    .done(function( data ) {
        $('#JSONclientver').html("<font color=\"blue\">"+data.result.clientver+"</font>");
        $('#JSONserverver').html("<font color=\"#094D6F\">"+data.result.serverver+"</font>");
    });
};
//r4p3_getTSClients();
r4p3_getTSClients = function() {
    API = "https://api.planetteamspeak.com/serverstatus/82.211.30.15:9987/";
    $.getJSON( API, {
    format: "json"
  })
    .done(function( data ) {
        $('#JSONclientver').html("<font color=\"blue\">"+data.result.clientver+"</font>");
        $('#JSONserverver').html("<font color=\"#094D6F\">"+data.result.serverver+"</font>");
    });
};
//r4p3_addLink("href", "title");
r4p3_addLink = function(href, title, prepend) {
    if (prepend) {
        $('a[href="https://shop.spreadshirt.com/r4p3/"]').parent().parent().prepend('<li class="addedLink"><a href="'+href+'" target="_blank">'+title+'</a></li>');//$('.Menu.JsOnly.tabMenu.membersTabLinks .secondaryContent.blockLinksList')
    } else {
        $('a[href="https://shop.spreadshirt.com/r4p3/"]').parent().parent().append('<li class="addedLink"><a href="'+href+'" target="_blank">'+title+'</a></li>');
    }
};
//r4p3_addNavTAB(type, href, text);
r4p3_addNavTAB = function(type, href, text, prepend) {
    if (prepend) {
	    $('.publicTabs').prepend('\
	       <li class="navTab '+type+' Popup PopupControl PopupContainerControl PopupOpen">\
	          <a href="'+href+'" class="textLogo"></a>\
	          <a href="'+href+'" class="navLink">'+text+'</a>\
	          <a href="'+href+'" class="SplitCtrl" rel="Menu"></a>\
   	    </li>');
    } else {
	    $('.publicTabs').append('\
	       <li class="navTab '+type+' Popup PopupControl PopupContainerControl PopupOpen">\
	          <a href="'+href+'" class="textLogo"></a>\
	          <a href="'+href+'" class="navLink">'+text+'</a>\
	          <a href="'+href+'" class="SplitCtrl" rel="Menu"></a>\
   	    </li>');
    }
};
//r4p3_addinfoBlock(id, type, title, titlehref, titledesc, content, prepend);
r4p3_addinfoBlock = function(id, type, title, titlehref, titledesc, content, prepend) {
   if (prepend) {
		$('.sidebar').prepend('\
		<div class="section '+id+'">\
			<div class="secondaryContent '+type+'">\
				<h3><a href="'+titlehref+'" title="'+titledesc+'">'+title+'</a></h3>\
				<div>\
					'+content+'\
				</div>\
			</div>\
		</div>\
		');
    } else {
		$('.sidebar').append('\
		<div class="section '+id+'">\
			<div class="secondaryContent '+type+'">\
				<h3><a href="'+titlehref+'" title="'+titledesc+'">'+title+'</a></h3>\
				<div>\
					'+content+'\
				</div>\
			</div>\
		</div>\
		');
    }
};
//r4p3_addForumNODE(clas, id, title, titlehref, content, prepend);
r4p3_addForumNODE = function(clas, id, title, titlehref, content, prepend){
    if (prepend) {
        $('.nodeList.sectionMain').prepend('\
            <li class="node category level_1 node_'+clas+'" id="'+id+'">\
                <div class="nodeInfo categoryNodeInfo categoryStrip">\
                    <div class="categoryText">\
                        <h3 class="nodeTitle"><a href="'+titlehref+'">'+title+'</a></h3>\
                    </div>\
                </div>\
                <ol class="nodeList">\
                    <li class="node category_forum level_2 node_'+clas+'">\
                        <div class="nodeInfo categoryForumNodeInfo ">\
                            '+content+'\
                        </div>\
                    </li>\
                </ol>\
                <span class="tlc"></span>\
                <span class="trc"></span>\
                <span class="blc"></span>\
                <span class="brc"></span>\
            </li>\
        ');
    } else {
        $('.nodeList.sectionMain').append('\
            <li class="node category level_1 node_'+clas+'" id="'+id+'">\
                <div class="nodeInfo categoryNodeInfo categoryStrip">\
                    <div class="categoryText">\
                        <h3 class="nodeTitle"><a href="'+titlehref+'">'+title+'</a></h3>\
                    </div>\
                </div>\
                <ol class="nodeList">\
                    <li class="node category_forum level_2 node_'+clas+'">\
                        <div class="nodeInfo categoryForumNodeInfo ">\
                            '+content+'\
                        </div>\
                    </li>\
                </ol>\
                <span class="tlc"></span>\
                <span class="trc"></span>\
                <span class="blc"></span>\
                <span class="brc"></span>\
            </li>\
        ');
    }
};
//r4p3_addToolbarITEM(clas, title, content);
r4p3_addToolbarITEM = function(clas, title, image, content){
	$('.redactor_toolbar').append('\
		<li class="redactor_btn_group">\
		    <ul>\
		        <li class="redactor_btn_container_'+clas+'">\
		            <a href="javascript:void(null);" title="'+title+'" class="redactor_btn_'+clas+'" style="background:'+image+'" unselectable="on" tabindex="-1"></a>\
		        </li>\
		    </ul>\
		</li>\
	');
    if(content) {
        $('.redactor_toolbar').after('<div class="redactor_dropdown '+clas+'" style="display:none;">'+content+'</div>');//.redactor_dropdown:last
        $('.redactor_btn_presets').click( function(){ $('.redactor_dropdown.'+clas).toggle(); });
    }
};
//r4p3_showMeALL();
r4p3_showMeALL = function(){
    $('*[type="hidden"],*[type="disabled"]').each(function(i,el){
        $(this).removeAttr("type");
        $(this).attr("title", $(this).attr("name"));
    });
};
//r4p3_sendReply(msg);
r4p3_sendReply = function(msg){
    $('.redactor_MessageEditor').contents().find('body[contenteditable="true"]').text(msg);
    $('input[value="Post Reply"]').submit();
};
//r4p3_likeAll(username);
r4p3_likeAll = function(username){
    if(username){
        $('.LikeLink.item.control.like').each(function(i,el){
            if ($(this).parent().parent().parent().parent().attr('data-author') == username) { $(this).click(); }
        });
    } else {
        $('.LikeLink.item.control.like').each(function(i,el){
            $(this).click();
        });
    }
};
//r4p3_unlikeAll(username);
r4p3_unlikeAll = function(username){
    if(username){
        $('.LikeLink.item.control.unlike').each(function(i,el){
            if ($(this).parent().parent().parent().parent().attr('data-author') == username) { $(this).click(); }
        });
    } else {
        $('.LikeLink.item.control.unlike').each(function(i,el){
            $(this).click();
        });
    }
};
//r4p3_toggleAllSpoilers();
r4p3_toggleAllSpoilers = function(){
    $('.button.ToggleTrigger').each(function(i,el){
        $(this).click();
    });
};
//r4p3_parsePosts();
r4p3_parsePosts = function(){
    var audio = "\
			a[href $='.ogg'],a[href $='.OGG'],\
			a[href $='.mid'],a[href $='.MID'],\
			a[href $='.midi'],a[href $='.MIDI'],\
			a[href $='.mp3'],a[href $='.MP3'],\
			a[href $='.wav'],a[href $='.WAV'],\
			a[href $='.wma'],a[href $='.WMA'],\
			a[href $='.ra'],a[href $='.RA'],\
			a[href $='.m4a'],a[href $='.M4A'],\
			a[href $='.ape'],a[href $='.APE'],\
			a[href $='.asf'],a[href $='.ASF'],\
			a[href $='.flac'],a[href $='.FLAC'],\
			a[href $='.speex'],a[href $='.SPEEX'],\
			a[href $='.aac'],a[href $='.aac']\
    ";
    var video = "\
			a[href $='.ogm'],a[href $='.OGM'],\
			a[href $='.mpeg'],a[href $='.MPEG'],\
			a[href $='.mkv'],a[href $='.MKV'],\
			a[href $='.mov'],a[href $='.MOV'],\
			a[href $='.rm'],a[href $='.RM'],\
			a[href $='.divx'],a[href $='.DIVX'],\
			a[href $='.xvid'],a[href $='.XVID'],\
			a[href $='.m4v'],a[href $='.M4V'],\
			a[href $='.mp4'],a[href $='.MP4'],\
			a[href $='.webm'],a[href $='.WEBM']\
	";
    var m = document.getElementsByClassName("message")[0];
    $(".message blockquote>a:not(.AutoEmbed_parsed").filter(audio).each(function(i,el){
        var e = $(el);
        var url = e.attr("href").replace(/http:\/\//gi,"https://");
        var vid = $("</a><br><audio controls preload='metadata'><source src='"+url+"'></audio>");
        var preH = m.scrollHeight;
        e.after().append(vid);
        m.scrollTop+=m.scrollHeight-preH;
    }).addClass("AutoEmbed_parsed");
    $(".message blockquote>a:not(.AutoEmbed_parsed").filter(video).each(function(i,el){
        var e = $(el);
        var url = e.attr("href").replace(/http:\/\//gi,"https://");
        var vid = $("</a><br><div class='embed AutoEmbed'><video width='600px' controls preload='metadata'><source src='"+url+"'></video></div>");
        var preH = m.scrollHeight;
        e.after().append(vid);
        m.scrollTop+=m.scrollHeight-preH;
    }).addClass("AutoEmbed_parsed");
    $(".message blockquote>a:not(.AutoEmbed_parsed").filter('a[href*="pastebin.com/"]').each(function(i,el){
        var e = $(el);
        var url = e.attr("href").replace(/.*?:\/\//g, "");
        url = url.replace("pastebin.com/","");
        var vid = $('<div class="embed AutoEmbed"><iframe src="//pastebin.com/embed_iframe/'+url+'" style="border:none;width:100%;height:300px;"></iframe></div>');
        var preH = m.scrollHeight;
        e.replaceWith(vid);
        m.scrollTop+=m.scrollHeight-preH;
    }).addClass("AutoEmbed_parsed");
    $('.baseHtml.signature.messageText.ugc').each(function(i,el){
        var text = $(this).html();
        text = anchorme.js(text);
        $(this).replaceWith(text);
    });
    //$('body[contenteditable="true"]').val();
};

(function() {
    'use strict';
    //if([window.location.href].startsWith("https://")) { window.location.href = [window.location.href].replace("https://", "http://"); }
    $( document ).ready(function() {
        $('head').append('<link rel="stylesheet" href="https://rawgit.com/R4P3-NET/BetterR4P3/master/css/main.css" type="text/css" />');
        if (localStorage.getItem("theme") == 1) {
            $('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/css/dark.css" type="text/css" />');
        }
        r4p3_getTSVersion();
        r4p3_addinfoBlock('versioninfo JSON ver', 'statsList', 'Latest Teamspeak Versions', 'http://teamspeak.com/downloads', 'Check out the latest stable Teamspeak Versions', '\
              <left><span style="text-align:left;">Client: </span><a href="http://www.teamspeak.com/downloads#client" style="float:right"><b id="JSONclientver">Unknown</b></a><br>\
              <span style="text-align:left;">Server: </span><a href="http://www.teamspeak.com/downloads#server"style="float:right"><b id="JSONserverver">Unknown</b></a>\
        ');
        if (localStorage.getItem("theme") == 1) {
            r4p3_addDiscord("0lNtGnKrr957kozq", "https://discordapp.com/widget?id=136825753957302272&theme=dark");
        } else {
            r4p3_addDiscord("0lNtGnKrr957kozq", "https://discordapp.com/widget?id=136825753957302272&theme=light");
        }
        r4p3_addShoutbox('https://www.freeshoutbox.net/bluscream&');
        r4p3_changeUserTitle('Bluscream', 'BOSS');r4p3_changeUserTitle('Supervisor', 'Co-Admin');
        r4p3_addBanner('Bluscream', 'Blue', 'Bluscream');r4p3_reorderStaffMember('Asphyxia', true);r4p3_reorderStaffMember('Bluscream', true);
        r4p3_delBanner('Supervisor', 'Orange');r4p3_addBanner('Supervisor', 'Orange', 'Restricted', true);r4p3_reorderStaffMember('Supervisor');
        r4p3_parsePosts();
        r4p3_addToolbarITEM('presets', 'Presets',
            "url('data:image/gif;base64,R0lGODlhEAAQANUiANOcNun6/9nw+4aYqz+m//zok+7IbqCfn/n7//v//3OTpO/7/ABVlpyfygCK+PX7+wBGe4Wcwvb9/8/W3ZSNlnGQxrish/3///D5/YKDg/n9/v39/3R1dWuOk4N7f9fZ6s7X58bT6P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACIALAAAAAAQABAAAAZ/QJFwSCwWAcikEkkEFJ7QKKBZaFgplIyHU5gOAYaweOwVWgTotNpCPAgC8Hj80BY0IviKYh+gD90BEgQScn11HwQMIHp7C35CBxiJBBoLlpZ0BEITkyEKHQ+hDwMiDJqTGwiqqwikBBAOEAQXCbW1CLWkIrEOEwO/wMFDDkZGQQA7\') center right no-repeat;", '\
			<a href="javascript:void(null);" unselectable="on" class="icon template approve" style="">\"I approve\"</a>\
			<a href="javascript:void(null);" unselectable="on" class="icon template disapprove" style="">\"I disapprove\"</a>\
		');
        $('.template.approve').click( function(){ r4p3_sendReply('I approve +1');$('.redactor_dropdown.presets').hide(); });
        $('.template.disapprove').click( function(){ r4p3_sendReply('I disapprove -1');$('.redactor_dropdown.presets').hide(); });
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
                        console.log("Theme changed to "+$("#ctrl_theme").text());
                        localstorage.setItem($("#ctrl_theme").val());
                   });
                });
            });
        });
})();
