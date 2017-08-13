import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
	describe('Smoke Tests', () => {
		// search generic
		it('should exist the search method', () => {
			expect(search).to.exist;
		});

		// searchAlbuns
		it('should exist the searchAlbuns method', () => {
			expect(searchAlbuns).to.exist;
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
		let fetchedStub;
		let promise;

		beforeEach(() => {
			fetchedStub = sinon.stub(global, 'fetch');

			promise = fetchedStub.returnsPromise();
		});

		afterEach(() => {
			fetchedStub.restore();
		});

		it('should call fetch function', () => {
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
});
