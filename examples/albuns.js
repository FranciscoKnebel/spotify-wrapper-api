import { searchAlbums } from '../src/main';

global.fetch = require('node-fetch');

searchAlbums('Beatles').then(data => data.albums.items.map(item => console.log(item.name)));
