export const HEADERS = {
	headers: {
		Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
	},
};

export const API_URL = 'https://api.spotify.com/v1';

export default { HEADERS, API_URL };
