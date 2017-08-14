import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
	let fetchedStub;
	let promise;

	beforeEach(() => {
		fetchedStub = sinon.stub(global, 'fetch');

		promise = fetchedStub.returnsPromise();
	});

	afterEach(() => {
		fetchedStub.restore();
	});

	describe('Smoke Tests', () => {
		// search generic
		it('should exist the search method', () => {
			expect(search).to.exist;
		});

		// searchAlbums
		it('should exist the searchAlbums method', () => {
			expect(searchAlbums).to.exist;
		});

		// searchArtists
		it('should exist the searchArtists method', () => {
			expect(searchArtists).to.exist;
		});

		// searchTracks
		it('should exist the searchTracks method', () => {
			expect(searchTracks).to.exist;
		});

		// searchPlaylists
		it('should exist the searchPlaylists method', () => {
			expect(searchPlaylists).to.exist;
		});
	});

	describe('Generic Search', () => {
		it('should call the fetch function', () => {
			search();
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should receive the correct URL to fetch', () => {
			context('passing one type', () => {
				search('Incubus', 'artist');
				expect(fetchedStub).to.have.been
					.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

				search('Incubus', 'album');
				expect(fetchedStub).to.have.been
					.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
			});

			context('passing more than one type', () => {
				search('Incubus', ['artist', 'album']);
				expect(fetchedStub).to.have.been
					.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
			});
		});

		it('should return the json data from the promise', () => {
			promise.resolves({ body: 'json' });

			const artists = search('Incubus', 'artists');

			expect(artists.resolveValue).to.be.eql({ body: 'json' });
		});
	});

	describe('Search Artists', () => {
		it('should call the fetch function', () => {
			searchArtists('Incubus');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			searchArtists('Incubus');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
		});
	});

	describe('Search Albums', () => {
		it('should call the fetch function', () => {
			searchAlbums('Nevermind');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			searchAlbums('Nevermind');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nevermind&type=album');
		});
	});

	describe('Search Tracks', () => {
		it('should call the fetch function', () => {
			searchTracks('Hello');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			searchTracks('Hello');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Hello&type=track');
		});
	});

	describe('Search Playlists', () => {
		it('should call the fetch function', () => {
			searchPlaylists('Sad');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			searchPlaylists('Sad');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Sad&type=playlist');
		});
	});
});
