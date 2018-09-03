exports.kelvin2Celsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
};

exports.temperaturePlaylist = (celsius) => {
    if(celsius > 30) {
        return 'party';
    }
    if(celsius <= 30 && celsius >= 15) {
        return 'pop';
    }
    if(celsius >= 10 && celsius <= 14) {
        return 'rock';
    }
    return 'classical';
};