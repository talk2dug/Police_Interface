
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RallyComputer');


var schema = mongoose.Schema({
    Manufactor: String,
    Model: String,
    Year: Number,
    RAClass: String,
    ARAClass: String,
    NASAClass: String,
    CRCClass: String,
    GasMilageTransit: Number,
    GasMilageStage: Number,
})

schema.set('toJSON', {
    virtuals: true
});
var myCar = mongoose.model('MyCar', schema, 'myCar');


module.exports = myCar;