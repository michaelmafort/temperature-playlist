const {temperaturePlaylist, kelvin2Celsius} = require('./utils');

test('when temperature is hot, listen party music', () => {
    expect(temperaturePlaylist(31)).toBe('party');
    expect(temperaturePlaylist(33)).toBe('party');
});

test('when temperature is about 15 and 30 graus celsius, listen pop music', () => {
    for(let i = 15; i < 30; i++) {
        expect(temperaturePlaylist(i)).toBe('pop');
    }
});

test('when temperature is about 10 and 14 graus celsius, listen rock music', () => {
    for(let i = 10; i < 14; i++) {
        expect(temperaturePlaylist(i)).toBe('rock');
    }
});

test('when temperature is low than 10 graus celsius, listen classical music', () => {
    for(let i = -5; i < 10; i++) {
        expect(temperaturePlaylist(i)).toBe('classical');
    }
});

test('zero celsius equals 273.15 kelvins', () => {
    for(let i = 0; i < 32; i++) {
        expect(kelvin2Celsius(i+273.15)).toBe(i);
    }
});