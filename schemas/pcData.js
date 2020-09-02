
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RallyComputer');


var schema = mongoose.Schema({
    ComputerName: String,
    currentRally: String,
})

schema.set('toJSON', {
    virtuals: true
});
var pcData = mongoose.model('pcData', schema, 'pcData')


module.exports = pcData;