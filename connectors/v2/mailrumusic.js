'use strict';

/* global Connector */

Connector.playerSelector = '.l-music__player';

Connector.getTrack = function() {
	var trackNameString = $('.l-music__player__song__name').text();
	return $.trim(trackNameString);
};

Connector.getArtist = function() {
	var trackNameString = $('.l-music__player__song__author').text();
	return $.trim(trackNameString);
};

Connector.isPlaying = function () {
	return $('.l-music__player').hasClass('playing');
};
