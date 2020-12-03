'use strict';

const symphonySelector = '.player-PlayerInfo__infoEl--2jhHY span:nth-child(3) span:first-child';
const commonNameSelector = '.player-PlayerInfo__infoEl--2jhHY span:nth-child(3) span:nth-child(2)';
const directorSelector = '.player-PlayerInfo__recordingInfo--15VMv>span:first-child span';
const trackSelector = '.player-PlayerInfo__infoEl--2jhHY';
const pauseButtonSelector = '.player-PlayerControls__btn--1r-vy:nth-child(2) .util-IconLabel__component--3Uitr span';

Connector.playerSelector = '.player-PlayerBar__bar--2yos_';

Connector.artistSelector = '.player-PlayerInfo__infoEl--2jhHY span:first-child';

Connector.getTrack = getCurrentTrack;

Connector.getAlbum = getCurrentSymphony;

Connector.currentTimeSelector = '.player-PlayerProgress__progress--2F0qB>span';

Connector.durationSelector = '.player-PlayerProgress__timeTotal--3aHlj span';

Connector.isPlaying = () => Util.getTextFromSelectors(pauseButtonSelector) === 'Pause';

Connector.isScrobblingAllowed = () => Util.getTextFromSelectors('.player-PlayerInfo__recordingInfo--15VMv') !== 'Sponsor message';

function getCurrentTrack() {
	let track = Util.getTextFromSelectors(trackSelector).split(' – ').slice(1).join(': ').trim();
	/*
	 * Remove trailing dash. Example from https://app.idagio.com/albums/saint-saens-violin-sonata-no-1-cello-sonata-no-1-and-piano-trio-no-2
	 * Saint-Saëns • Sonata for Violin and Piano No. 1 in D minor op. 75 R 123 • I. Allegro agitato –
	 * Track without this: "Sonata for Violin and Piano No. 1 in D minor op. 75 R 123: I. Allegro agitato –"
	 * Track with this: "Sonata for Violin and Piano No. 1 in D minor op. 75 R 123: I. Allegro agitato"
	 */
	if (track.slice(-1) === '–') {
		track = track.slice(0, -1);
	}
	return track;
}

function getCurrentSymphony() {
	const symphonyShort = Util.getTextFromSelectors(symphonySelector).split(/ in [A-G]| op. [0-9]| KV [0-9]/)[0];
	const commonName = Util.getTextFromSelectors(commonNameSelector) || '';
	const director = removeParenthesis(Util.getTextFromSelectors(directorSelector));
	return `${symphonyShort}${commonName} (${director})`;
}

function removeParenthesis(text) {
	return text.replace(/\s*\(.*?\)\s*/g, '');
}
