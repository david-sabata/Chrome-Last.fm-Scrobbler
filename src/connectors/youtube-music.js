'use strict';

Connector.playerSelector = 'ytmusic-player-bar';

Connector.getTrackArt = () => {
	let trackArtUrl = $('.ytmusic-player-bar.image').attr('src');
	if (trackArtUrl) {
		return trackArtUrl.substring(0, trackArtUrl.lastIndexOf('='));
	}
	return null;
};

Connector.artistSelector = '.ytmusic-player-bar.byline';

Connector.trackSelector = '.ytmusic-player-bar.title';

Connector.albumSelector = '.ytmusic-player-bar.byline';

Connector.timeInfoSelector = '.ytmusic-player-bar.time-info';

Connector.isPlaying = () => $('.ytmusic-player-bar.play-pause-button').attr('title') === 'Pause';

Connector.isScrobblingAllowed = () => $('.ytmusic-player-bar.advertisement').is(':hidden');

let separateArtist = (byline) => byline.split('•')[0];
let separateAlbum = (byline) => byline.split('•')[1];

const filter = new MetadataFilter({
	artist: separateArtist,
	album: separateAlbum
});
Connector.applyFilter(filter);
