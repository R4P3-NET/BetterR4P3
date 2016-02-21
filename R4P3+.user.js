// ==UserScript==
// @name         R4P3+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Better R4P3.net
// @author       Bluscream
// @match        https://r4p3.net/*
// @grant        none
// @require      
// ==/UserScript==

function rape() {
    this.addLink = function(href, title) {
            $('.Menu.JsOnly.tabMenu.membersTabLinks .secondaryContent.blockLinksList').append('<li><a href="'+href+'" target="_blank">'+title+'</a></li>');
        };
}

(function() {
    'use strict';
    $( document ).ready(function() {
        r4p3.addLink('https://discord.gg/0lNtGnKrr957kozq', 'R4P3 Discord');
    });
})();