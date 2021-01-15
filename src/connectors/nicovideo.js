'use strict';

const filter = MetadataFilter.createFilter({
	track: removeDecorationText,
});

const videoSelector = '.MainVideoPlayer > video';

Connector.playerSelector = '.PlayerContainer';

Connector.artistSelector = '.VideoOwnerInfo-pageLink';

Connector.trackSelector = '.VideoTitle';

Connector.isPlaying = () => {
	const video = document.querySelector(videoSelector);
	if (!video) {
		return false;
	}

	return video.currentTime > 0 && !video.paused && !video.ended;
};

Connector.applyFilter(filter);

function removeDecorationText(text) {
	// Usual track name on Niconico is something like "【Hatsune Miku】Track Name【Original】"
	const pattern = /(^【[^】]*】\s*|\s*【[^【]*】$|^\[[^\]]*\]\s*|\s*\[[^[]*\]$)/g;
	return text.replaceAll(pattern, '');
}
