import { expect } from 'chai';

import SpotifyWrapper from '../src/index';

describe('Spotify Wrapper Library', () => {
	it('should create an instance of Spotify Wrapper', () => {
		const spotify = new SpotifyWrapper();
		expect(spotify).to.be.an.instanceof(SpotifyWrapper);
	});

	it('should receive a token as an option', () => {
		const spotify = new SpotifyWrapper({
			token: 'hash1519981818',
		});

		expect(spotify.token).to.be.equal('hash1519981818');
	});

	it('should be possible to receive an api url as an option', () => {
		const spotify = new SpotifyWrapper({
			apiURL: 'https://api.example.com',
		});

		expect(spotify.apiURL).to.be.equal('https://api.example.com');
	});

	it('should use the default URL if an api url is not passed as an option', () => {
		const spotify = new SpotifyWrapper();

		expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
	});
});
