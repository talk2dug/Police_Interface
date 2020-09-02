
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RallyComputer');


var schema = mongoose.Schema({
    lastUpdated: Date,
    weather: {},
})

schema.set('toJSON', {
    virtuals: true
});
var weatherData = mongoose.model('weather', schema, 'weathers')

module.exports = weatherData;