    const express = require('express');
    const app = express();
    const {weather} = require('./services/weather');
    const {spotify} = require('./services/spotify');
    const {kelvin2Celsius, temperaturePlaylist} = require('./libs/utils');

    app.get('/tracks-suggestion', (request, response) => {
        response.set({
            'Content-Type': 'application/json'
        });

        let query = '';
        let lat = request.query.lat;
        let lon = request.query.lon;

        if (request.query.city) {
            query = 'q=' + request.query.city;
        } else if (!!lat && !!lon) {
            query = 'lat=' + lat + '&lon=' + lon;
        }

        weather(query)
            .then((weatherResponse) => {
                let celsius = kelvin2Celsius(weatherResponse.main.temp);
                let playlist = temperaturePlaylist(celsius);

                spotify(playlist).then((spotifyTracks) => {
                    response.send({
                        suggestions: spotifyTracks, 
                        data: {
                            city: weatherResponse.name, 
                            temperature: celsius, 
                            temperatureUnit: 'celsius', 
                            playlistSuggestered: playlist
                        }
                    });
                    
                }).catch((err) => {
                    response.send({code: 500, message: "Spotify Error: " + err + " - Try getting new API-Token: https://developer.spotify.com/console/get-several-tracks/"});
                })
            })
            .catch((err) => {
                response.send({code: 500, message: 'Weather API Error: ' + err});
            });
    });

    app.listen(3000, () => {
        console.log('Webserver running on port 3000.');
    });