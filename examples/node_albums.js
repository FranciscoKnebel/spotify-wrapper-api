/* Execute 'babel-node node_albums.js' */

import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const token = 'BQBqzKgDlXZ1z5wmnhk3P1744LpUygPSJcovIJ3Q72QLB2mBsDM_vx710EJcstkyja3Mgw_fCrO3yf806PaGvE_vvaG0ou20cCKiK1490bUXfoGMPGbFbwGD0D8Iv74dvORqOFCg6lVQhMBmVDc1SA';
const spotify = new SpotifyWrapper({ token });

const albums = spotify.search.albums('Led Zeppelin');
albums.then(data => data.albums.items.map(item => console.log(item.name)));
