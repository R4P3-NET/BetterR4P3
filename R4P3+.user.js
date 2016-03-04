// ==UserScript==
// @name R4P3+
// @description Better R4P3.net
// @author Bluscream
// @version 1.4.2.2
// @encoding utf-8
// @icon https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/icon.png
// @homepage https://r4p3.net
// @contactURL https://r4p3.net/members/bluscream.53/
// @supportURL https://github.com/R4P3-NET/BetterR4P3/issues/new
// @contributionURL https://github.com/R4P3-NET/BetterR4P3/compare
// @updateURL https://cdn.rawgit.com/R4P3-NET/BetterR4P3/master/R4P3%2B.user.js
// @downloadURL https://github.com/R4P3-NET/BetterR4P3/raw/master/R4P3%2B.user.js
// @require https://cdn.rawgit.com/brandonaaron/livequery/master/jquery.livequery.min.js
// @require https://cdn.rawgit.com/ali-saleem/anchorme.js/gh-pages/src/anchorme.min.js
// @include https://r4p3.net/*
// @grant unsafeWindow
// ==/UserScript==
/*jshint multistr: true */
//laxcomma


//r4p3_addDiscord(invite, href);
r4p3_addDiscord = function(invite, href) {
    r4p3_addLink('https://discord.gg/'+invite, 'R4P3 Discord');
    r4p3_addinfoBlock('membersOnline versioninfo Discord', 'block', 'Discord', 'https://discord.gg/'+invite+'', 'R4P3 Discord Server', '<iframe id="discordframe" src="'+href+'" width="230px" height="500px" frameborder="0"></iframe>');
    setTimeout(function(){ $('#discordframe').attr('src', $('#discordframe').attr('src')); }, 60000);
};

//r4p3_addTSBeta();
r4p3_addTSBeta = function(invite, href) {
        r4p3_addinfoBlock('membersOnline versioninfo TwitterBeta', 'block', 'Teamspeak Beta', 'https://twitter.com/TeamspeakBETA', 'Twitter Teamspeak BETA Bot', '\
              <a class="twitter-timeline" href="https://twitter.com/TeamspeakBeta" data-widget-id="705206535950102528">Tweets von @TeamspeakBeta </a>\
              <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="twitter-timeline twitter-timeline-rendered" style="position: static; visibility: visible; display: inline-block; width: 520px; height: 350px; padding: 0px; border: none; max-width: 100%; min-width: 180px; margin-top: 0px; margin-bottom: 0px; min-height: 200px;" data-widget-id="preview" data-user-id="4829141752" title="Twitter Timeline"></iframe>\
              <script id="twitter-wjs" src="https://platform.twitter.com/widgets.js"/>\
        ');
        r4p3_addinfoBlock('membersOnline versioninfo TwitterBeta', 'block', 'Teamspeak Beta', 'https://twitter.com/TeamspeakBETA', 'Twitter Teamspeak BETA Bot', '\
        <iframe id="discordframe" src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2FTeamspeakBETA%2Fstatus%2F702507575745626113" width="230px" height="400px" frameborder="0"></iframe>');
};

//r4p3_addShoutbox();
r4p3_addShoutbox = function(src) {
    $('.breadBoxTop').before('<br><div id="toggleshoutbox" class="noselect">Click to show/hide shoutbox<iframe class="shoutbox" id="shoutbox" WIDTH="100%" HEIGHT="300" title="R4P3 Shoutbox" src="'+src+'" frameborder="0" scrolling="auto"></iframe></div>');//<div class="noselect" id="refreshshoutbox" class="refreshshoutbox">Refresh Shoutbox</div><
    if (localStorage.getItem("shoutbox") == '0') { $("#shoutbox").hide(); }
    setInterval(function(){ $('#shoutbox').attr('src', $('#shoutbox').attr('src'));/*console.log('[R4P3+] Refreshed Shoutbox');*/ }, 30000);
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
//r4p3_addBlockLINK(type, href, text);
r4p3_addBlockLINK = function(href, title, prepend) {
    if (prepend) {
	    $('.blockLinksList').prepend('<li><a href="'+href+'" rel="nofollow">'+title+'</a></li>');
    } else {
	    $('.blockLinksList').append('<li><a href="'+href+'" rel="nofollow">'+title+'</a></li>');
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
//r4p3_editReply(msg, purge);
r4p3_editReply = function(msg, purge){
    var $form = $('#QuickReply') , ed = XenForo.getEditorInForm($form);
    if(!ed) { return false; }
    if(!purge){
        var oldtxt = "";
        if(ed.$editor) {
            oldtxt = ed.$editor.html();
            ed.$editor.html(oldtxt + "\n" + "\n" + msg);
            ed.$el.val(''); // The  new line
        } else {
            oldtxt = $ed.contents().find('body[contenteditable="true"]').text();
            ed.val(oldtxt + "\n" + "\n" + msg);
        }
        $('.redactor_MessageEditor').contents().find('body[contenteditable="true"]').text(oldtxt + "<br><br>"+msg);
    }else{
        $('.redactor_MessageEditor').contents().find('body[contenteditable="true"]').text(msg);
    }
};
//r4p3_sendReply();
r4p3_sendReply = function(){
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
//r4p3_prepareSidebar();
r4p3_prepareSidebar = function(){
    $('.sidebar').find('h3:contains(Quote)').parent().parent().addClass('dailyQuote');
    $('.sidebar>.section').each(function(i,el){
        $(this).attr('id', 'sidebarItem'+i);
    });
    $('.sidebar>.section>.secondaryContent>*:not(h3)').each(function(i,el){
        $(this).wrapAll('<div class="sidebarItemContent"></div>');
        $(this).attr('id', 'sidebarItemContent'+i);
    });
    $('.sidebar>.section>.secondaryContent>h3').each(function(i,el){
        $(this).addClass('sidebarItemHeader');
        $(this).attr('id', 'sidebarItemHeader'+i);
    });
};
//r4p3_makeSideBarItemsToggable();
r4p3_makeSideBarItemsToggable = function(){
    $('.sidebarItemHeader').each(function(i,el){
        var item = $(el).parent().parent().attr('id');
        $(this).append('<a class="noselect" onclick="r4p3_toggleSidebarItem(\''+item+'\');" style="float:right;">(X)</a>');
    });
};
//r4p3_toggleSidebarItem(id);
r4p3_toggleSidebarItem = function(id){
    if($('#'+id).find('.sidebarItemContent').is(":visible")){
        localStorage.setItem("toggled.sidebarItem."+id, '0');
    $('#'+id).find('.sidebarItemContent').hide();
    } else {
        localStorage.setItem("toggled.sidebarItem."+id, '1');
        $('#'+id).find('.sidebarItemContent').show();
    }
};
//r4p3_makeForumSectionsToggable();
r4p3_makeForumSectionsToggable = function(){
    $('.categoryText>.nodeTitle>a').each(function(i,el){
        var item = $(el).parent().parent().parent().parent().attr('id');
        $(this).after('<a class="noselect forumsection'+i+'" onclick="r4p3_toggleForumSection(\''+item+'\');" style="float:right;">(X)</a>');
        if(localStorage.getItem('toggled.forumNode.'+item) == "0"){ $('li[id="'+item+'"]>.nodeList').hide();}
    });
};
//r4p3_toggleForumSection(id);
r4p3_toggleForumSection = function(id){
    if($('li[id="'+id+'"]>.nodeList').is(":visible")){
        localStorage.setItem("toggled.forumNode."+id, '0');
    } else {
        localStorage.setItem("toggled.forumNode."+id, '1');
    }
    $('li[id="'+id+'"]>.nodeList').toggle();
};
/*r4p3_startPoll('Do you love it?', ["Yes", "No", "Maybe", "I hate it!"], 'single', 'default', true, true, true, 'default', 'default', 'default', 0);*/
//r4p3_startPoll(question, answerArray, max_votes_type, max_votes_value, change_vote, public_votes, view_results_unvoted, ctrl_poll_close, close_length, close_units, send);
r4p3_startPoll = function(question, answerArray, max_votes_type, max_votes_value, change_vote, public_votes, view_results_unvoted, ctrl_poll_close, close_length, close_units, send){
    $('#ctrl_poll_question').val(question);
    /* TODO: Parse answerArray*/
    if(answerArray.length > 2){
        for (var i = 2; i < answerArray.length; i++) {
           $('.button.FieldAdder').click();
        }
    }
    for (var ii = 0; ii < answerArray.length; ii++) {
        var ee = $('input[name="poll[responses][]"]:not(.PollQuestionParsed)').first();
        ee.val(answerArray[ii]);
        $(ee).addClass('PollQuestionParsed');
    }
    $('.PollQuestionParsed').removeClass('PollQuestionParsed');
    if(max_votes_type != 'default') { $('input[name="poll[max_votes_type]"][value="'+max_votes_type+'"]').prop('checked', true); }
    if(max_votes_value != 'default') { $('input[name="poll[max_votes_value]"]').val(max_votes_value); }
    if(change_vote != 'default') { $('input[name="poll[change_vote]"]').prop('checked', change_vote); }
    if(public_votes != 'default') { $('input[name="poll[public_votes]"]').prop('checked', public_votes); }
    if(view_results_unvoted != 'default') { $('input[name="poll[view_results_unvoted]"]').prop('checked', view_results_unvoted); }
    if(ctrl_poll_close != 'default') { $('#ctrl_poll_close').val(ctrl_poll_close); }
    if(close_length != 'default') { $('input[name="poll[close_length]"]').val(close_length); }
    if(close_units != 'default') { $('select[name="poll[close_units]"]').val(close_units); }
    if(send) { $('.button.primary').click(); }
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
        if($('.pageContent>.section>a').attr('href') == 'find-new/posts?recent=1'){ window.location.href = "https://r4p3.net/"; }
        r4p3_getTSVersion();
        r4p3_addinfoBlock('versioninfo JSON ver', 'statsList', 'Latest Teamspeak Versions', 'http://teamspeak.com/downloads', 'Check out the latest Teamspeak Versions', '\
			<table class="tg" width="99%">\
			  <tr><td class="tg-yw4l"></td>\
			    <th class="tg-yw4l">Beta</th>\
			    <th class="tg-yw4l">Stable</th></tr>\
			  <tr><th class="tg-yw4l">Client</th>\
			    <td class="tg-zq96"><a href="http://dl.4players.de/ts/releases/pre_releases/client/" target="_blank" id="JSONclientverBETA"><font color="gray">N/A</font></a></td>\
			    <td class="tg-1rg7"><a href="http://www.teamspeak.com/downloads#client" target="_blank" id="JSONclientver"><font color="gray">N/A</font></a></td></tr>\
			  <tr><th class="tg-yw4l">Server</th>\
			    <td class="tg-4oyi"><a href="http://dl.4players.de/ts/releases/pre_releases/server/" target="_blank" id="JSONserververBETA"><font color="gray">N/A</font></a></td>\
			    <td class="tg-cgn1"><a href="http://www.teamspeak.com/downloads#server" target="_blank" id="JSONserverver"><font color="gray">N/A</font></a></td></tr>\
			</table>\
        ');
        //r4p3_addTSBeta();
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
        $('.template.approve').click( function(){ r4p3_editReply('I approve +1');r4p3_sendReply();$('.redactor_dropdown.presets').hide(); });
        $('.template.disapprove').click( function(){ r4p3_editReply('I disapprove -1');r4p3_sendReply();$('.redactor_dropdown.presets').hide(); });
        r4p3_prepareSidebar();
        r4p3_makeSideBarItemsToggable();
        r4p3_makeForumSectionsToggable();
        //r4p3_addBlockLINK("https://r4p3.net/find-new/posts?recent=1", "Recent Posts");
        r4p3_addLink('https://forum.teamspeak.com', 'Teamspeak Forum');
        r4p3_addLink('https://www.planetteamspeak.com/serverlist/result', 'TS Server List');
        r4p3_addLink('http://ts3index.com/?page=stats&sub=server', 'TS Server Stats');
        //$('.dailyQuote>.secondaryContent>h3').click(function() { $('.dailyQuote').toggle();});
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
