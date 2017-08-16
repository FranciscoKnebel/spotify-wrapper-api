import {
	search,
	searchArtists,
	searchAlbums,
	searchTracks,
	searchPlaylists,
} from './search';

import {
	getAlbum,
	getAlbums,
	getAlbumTracks,
} from './album';

import { API_URL } from './config';

export default class SpotifyWrapper {
	constructor(options) {
		if (options === undefined) {
			options = {};
		}

		this.apiURL = options.apiURL || API_URL;
		this.token = options.token;
	}
}
