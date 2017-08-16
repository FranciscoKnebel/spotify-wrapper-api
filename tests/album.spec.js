import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
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
		it('should have a getAlbum method', () => {
			expect(spotify.album.getAlbum).to.exist;
		});

		it('should have a getAlbums method', () => {
			expect(spotify.album.getAlbums).to.exist;
		});

		it('should have a getTracks method', () => {
			expect(spotify.album.getTracks).to.exist;
		});
	});

	describe('getAlbum', () => {
		it('should call the fetch method', () => {
			spotify.album.getAlbum();

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

			spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ album: 'name' });

			const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
			expect(album.resolveValue).to.be.eql({ album: 'name' });
		});
	});

	describe('getAlbums', () => {
		it('should call the fetch method', () => {
			spotify.album.getAlbums();

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');

			spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTz', '4aawyAB9vmqN3uQ7FjRGTx']);
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTz,4aawyAB9vmqN3uQ7FjRGTx');
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ album: 'name' });

			const album = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
			expect(album.resolveValue).to.be.eql({ album: 'name' });
		});
	});

	describe('getTracks', () => {
		it('should call the fetch method', () => {
			spotify.album.getTracks();

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

			spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTz');
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTz/tracks');
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ album: 'name' });

			const tracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
			expect(tracks.resolveValue).to.be.eql({ album: 'name' });
		});
	});
});
