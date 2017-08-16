import { searchAlbums } from '../src/search';

global.fetch = require('node-fetch');

searchAlbums('Beatles').then(data => data.albums.items.map(item => console.log(item.name)));
