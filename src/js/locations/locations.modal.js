var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var locationSchema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    experiment: { type: ObjectId, required: true },
    created_at: Date
});

module.exports = mongoose.model('Location', locationSchema);