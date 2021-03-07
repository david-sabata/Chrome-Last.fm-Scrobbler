'use strict';

/**
 * Example links to debug and test the connector:
 *
 * https://archive.org/details/AH013_sarin_sunday_-_the_lonely_hike
 * Full album
 *
 * https://archive.org/details/AH003_corwin_trails_-_corwin_trails
 * Full album with numeric prefixes
 *
 * https://archive.org/details/lp_everybody-knows-this-is-nowhere_neil-young-crazy-horse-robin-lane
 * Full album with artist suffixed in track names
 *
 * https://archive.org/details/dont-lie-beets-produce-ny-mix
 * Single track
 */

const artistSelectors = [
	'.key-val-big a span',
	'.item-details-metadata > dl > dd a',
];
const trackSelectors = [
	'.jwrowV2.playing .ttl',
	'.audio-track-list .selected .track-title',
];
const albumSelector = '.thats-left > h1 [itemprop=name]';
const tracksSelector = '.jwrowV2 .ttl';

const numericTrackRegex = /^\d+\w+/;

const filter = MetadataFilter.createFilter({ track: removeNumericPrefixes });

Connector.applyFilter(filter);

function removeNumericPrefixes(track) {
	if (hasAllTracksNumericPrefix(tracksSelector)) {
		return track.trim().replace(/^(\d+\w+)/, '');
	}

	return track;
}

Connector.currentTimeSelector = '.jw-text-elapsed';

Connector.durationSelector = '.jw-text-duration';

Connector.isPlaying = () => {
	const videoElement = document.querySelector('video');

	if (videoElement === null) {
		return false;
	}

	return !videoElement.paused;
};

Connector.playerSelector = '#theatre-ia';

Connector.trackArtSelector = '.album-cover img';

Connector.getTrackInfo = () => {
	const artist = getArtists(artistSelectors);
	let album = Util.getTextFromSelectors(albumSelector);
	let track = Util.getTextFromSelectors(trackSelectors);

	if (track) {
		const [itemTitle, itemArtist] = track
			.split('-')
			.map((item) => item.trim());

		if (artist.includes(itemArtist)) {
			track = itemTitle;
		}
	} else {
		track = album;
		album = null;
	}

	return { artist, track, album };
};

function hasAllTracksNumericPrefix(trackSelector) {
	const tracks = document.querySelectorAll(trackSelector);
	if (tracks.length === 0) {
		return false;
	}

	let hasAllTracksNumericPrefix = true;
	for (const track of tracks) {
		if (!numericTrackRegex.test(track.textContent)) {
			hasAllTracksNumericPrefix = false;
			break;
		}
	}

	return hasAllTracksNumericPrefix;
}

function getArtists(selectors) {
	const artistElements = Util.queryElements(selectors);
	return artistElements && Util.joinArtists(artistElements.toArray());
}
