import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.dirname(__dirname), '.env') });

export const HEADERS = {
	headers: {
		Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
	},
};

export const API_URL = 'https://api.spotify.com/v1';

export default { HEADERS, API_URL };
