import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
	const spotify = new SpotifyWrapper();
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
		it('should have a search albums method', () => {
			expect(spotify.search.albums).to.exist;
		});

		it('should have a search artists method', () => {
			expect(spotify.search.artists).to.exist;
		});

		it('should have a search tracks method', () => {
			expect(spotify.search.tracks).to.exist;
		});

		it('should have a search playlists method', () => {
			expect(spotify.search.playlists).to.exist;
		});
	});

	describe('Search', () => {
		it('should return the correct data from the promise', () => {
			promise.resolves({ body: 'json' });

			const artist = spotify.search.artists('The Beatles');
			expect(artist.resolveValue).to.be.eql({ body: 'json' });
		});
	});

	describe('Search Artists', () => {
		it('should call the fetch function', () => {
			spotify.search.artists('Incubus');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			spotify.search.artists('Incubus');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
		});
	});

	describe('Search Albums', () => {
		it('should call the fetch function', () => {
			spotify.search.albums('Nevermind');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			spotify.search.albums('Nevermind');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nevermind&type=album');
		});
	});

	describe('Search Tracks', () => {
		it('should call the fetch function', () => {
			spotify.search.tracks('Hello');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			spotify.search.tracks('Hello');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Hello&type=track');
		});
	});

	describe('Search Playlists', () => {
		it('should call the fetch function', () => {
			spotify.search.playlists('Sad');

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should have the correct URL at fetch', () => {
			spotify.search.playlists('Sad');

			expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Sad&type=playlist');
		});
	});
});
