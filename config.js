const SPOTIFY_TOKEN = process.env.SPOTIFY_TOKEN || 'BQAbtC89aZQuTKfxD1bRXKqIccNbi-d6CqY9EdGzlvODVTXfDNHi8aRBo8NyQhmvuANw60MdHw5W2jQY976_nPo8BMlH-rIiWEzZKNtUKlNzVsqhjESc1WLR-535kKyoWJ19tMH18qxqbsBEdgwnTmuuvQj48zlr2io';// for testing purpose

exports.SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1/users/spotify/playlists/';
exports.spotifyHeaders = {
    'Authorization': 'Bearer ' + SPOTIFY_TOKEN,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
exports.spotifyPlaylists = {
    'party': '37i9dQZF1DX5Ozry5U6G0d',
    'pop': '37i9dQZF1DX50QitC6Oqtn',
    'rock': '37i9dQZF1DXcmaoFmN75bi',
    'classical': '37i9dQZF1DX3PFzdbtx1Us'
};
exports.WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
exports.WEATHER_API_KEY = process.env.WEATHER_API_KEY || '30a6a3ff23a963740908edeaa0dd0a8c'; //for testing purpose
exports.REDIS_HOST = process.env.REDIS_HOST || 'redis';
exports.REDIS_PORT = process.env.REDIS_PORT || 6379;