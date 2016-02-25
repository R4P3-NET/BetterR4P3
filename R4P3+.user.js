// ==UserScript==
// @name R4P3+
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
// @require https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @include https://r4p3.net/*
// @grant unsafeWindow
// ==/UserScript==
// @require https://github.com/R4P3-NET/BetterR4P3/raw/master/BetterR4P3.js
/*jshint multistr: true */


//r4p3_addDiscord(invite, href);
r4p3_addDiscord = function(invite, href) {
    r4p3_addLink('https://discord.gg/'+invite, 'R4P3 Discord');
    r4p3_addinfoBlock('membersOnline versioninfo Discord', 'block', 'Discord', 'https://discord.gg/0lNtGnKrr957kozq', 'R4P3 Discord Server', '<iframe src="'+href+'" width="230px" height="500px" frameborder="0"></iframe>');
};
//r4p3_addShoutbox();
r4p3_addShoutbox = function(src) {
    $('.breadBoxTop').before('<p id="toggleshoutbox" class="noselect">Click to show/hide shoutbox<iframe class="shoutbox" id="shoutbox" WIDTH="100%" HEIGHT="300" title="R4P3 Shoutbox" src="'+src+'" frameborder="0" scrolling="auto"></iframe></p>');
    if (localStorage.getItem("shoutbox") == '0') { $("#shoutbox").hide(); }
    $("#toggleshoutbox").click(function(){ r4p3_checkShoutbox(); });
};
r4p3_checkShoutbox = function() {
    if($('#shoutbox').is(":visible")){
        localStorage.setItem("shoutbox", '0');
        //$("#toggleshoutbox").text("Click to show shoutbox");
    } else {
        localStorage.setItem("shoutbox", '1');
        //$("#toggleshoutbox").text("Click to hide shoutbox");
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
        var vid = $('</a><br><div class="embed AutoEmbed"><iframe src="//pastebin.com/embed_iframe/'+url+'" style="border:none;width:100%;height:300px;"></iframe></div>');
        var preH = m.scrollHeight;
        e.after().append(vid);
        m.scrollTop+=m.scrollHeight-preH;
    }).addClass("AutoEmbed_parsed");
};

(function() {
    'use strict';
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
        r4p3_changeUserTitle('Bluscream', 'Administrator');r4p3_changeUserTitle('Supervisor', 'Moderator');
        r4p3_addBanner('Bluscream', 'Blue', 'Bluscream');r4p3_reorderStaffMember('Asphyxia', true);r4p3_reorderStaffMember('Bluscream', true);
        r4p3_delBanner('Supervisor', 'Orange');r4p3_addBanner('Supervisor', 'Orange', 'Restricted', true);r4p3_reorderStaffMember('Supervisor');
        r4p3_parsePosts();
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
