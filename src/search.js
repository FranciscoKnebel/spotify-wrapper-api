function search(type, query) {
	return this.request(`${this.apiURL}/search?q=${query}&type=${type}`);
}

export default function album() {
	return {
		artists: search.bind(this, 'artist'),
		albums: search.bind(this, 'album'),
		tracks: search.bind(this, 'track'),
		playlists: search.bind(this, 'playlist'),
	};
}
