import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

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

	describe('Request method', () => {
		let fetchedStub;
		let promise;

		beforeEach(() => {
			fetchedStub = sinon.stub(global, 'fetch');
			promise = fetchedStub.returnsPromise();
		});

		afterEach(() => {
			fetchedStub.restore();
		});

		it('should have request method', () => {
			const spotify = new SpotifyWrapper();

			expect(spotify.request).to.exist;
		});

		it('should call fetch when the request method is used', () => {
			const spotify = new SpotifyWrapper({
				token: 'foo_hash',
			});

			spotify.request('url');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the correct URL', () => {
			const spotify = new SpotifyWrapper({
				token: 'foo_hash',
			});

			spotify.request('url');
			expect(fetchedStub).to.have.been.calledWith('url');
		});

		it('should call fetch with the correct header', () => {
			const spotify = new SpotifyWrapper({
				token: 'foo_hash',
			});

			spotify.request('url');
			expect(fetchedStub).to.have.been.calledWith('url', {
				headers: {
					Authorization: 'Bearer foo_hash',
				},
			});
		});

		it('should return the correct data from promise', () => {
			promise.resolves({ data: 'jabumga' });

			const spotify = new SpotifyWrapper({
				token: 'foo_hash',
			});

			const request = spotify.request('url');
			expect(request.resolveValue).to.be.eql({ data: 'jabumga' });
		});
	});
});
