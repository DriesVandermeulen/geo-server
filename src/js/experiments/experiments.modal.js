var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experimentSchema = new Schema({
    name: { type: String, required: true },
    created_at: Date
});

module.exports = mongoose.model('Experiment', experimentSchema);