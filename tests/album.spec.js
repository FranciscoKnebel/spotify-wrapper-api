import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
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
			expect(getAlbum).to.exist;
		});

		it('should have a getAlbumTracks method', () => {
			expect(getAlbumTracks).to.exist;
		});
	});

	describe('getAlbum', () => {
		it('should call the fetch method', () => {
			getAlbum();

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

			getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ album: 'name' });

			const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
			expect(album.resolveValue).to.be.eql({ album: 'name' });
		});
	});

	describe('getAlbums', () => {
		it('should call the fetch method', () => {
			getAlbums();

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');

			getAlbums(['4aawyAB9vmqN3uQ7FjRGTz', '4aawyAB9vmqN3uQ7FjRGTx']);
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTz,4aawyAB9vmqN3uQ7FjRGTx');
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ album: 'name' });

			const album = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
			expect(album.resolveValue).to.be.eql({ album: 'name' });
		});
	});

	describe('getAlbumTracks', () => {
		it('should call the fetch method', () => {
			getAlbumTracks();

			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

			getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTz');
			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTz/tracks');
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ album: 'name' });

			const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
			expect(tracks.resolveValue).to.be.eql({ album: 'name' });
		});
	});
});
