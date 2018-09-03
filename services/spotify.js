const {httpsGet} = require('../libs/https-client');
const {SPOTIFY_API_ENDPOINT, spotifyPlaylists, spotifyHeaders} = require('../config');

exports.spotify = async (playlist) => {
    return await httpsGet(SPOTIFY_API_ENDPOINT + spotifyPlaylists[playlist] + '/tracks', spotifyHeaders)
        .then((spotifyTracks) => {
            if(spotifyTracks.error) {
                return Promise.reject(spotifyTracks.error.message);
            }
            let tracks = spotifyTracks.items.map((track) => {
                return track.track.name
            });
            return tracks;
        })
        .catch((error) => {
            console.log('Spotify error: ' + error);
            return {code: 500, message: "Spotify API: " + error};
        });
}