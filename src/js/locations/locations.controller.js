var ObjectId = require('mongoose').Types.ObjectId;
var Location = require('./locations.modal');

exports.findAll = function(req, res) {

    Location.find({}, function(err, locations) {
        if (err) throw err;

        res.send(locations);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;

    Location.findById(id, function(err, location) {
        if (err) throw err;

        res.send(location);
    });
};

exports.findAllByExperiment = function(req, res) {
    var experimentId = req.params.experimentId;

    Location.find({experiment: new ObjectId(experimentId)}, function(err, locations) {
        if (err) throw err;

        res.send(locations);
    });
};

exports.create = function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var experiment = req.body.experiment;

    var newLocation = Location({
        latitude: latitude,
        longitude: longitude,
        experiment: experiment,
        created_at: new Date()
    });

    newLocation.save(function(err, location) {
        if (err) throw err;

        res.send(location);
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var experiment = req.body.experiment;

    Location.findByIdAndUpdate(id, { latitude: latitude, longitude: longitude, experiment : experiment }, function(err, location) {
        if (err) throw err;

        res.send(location);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Location.findByIdAndRemove(id, function(err) {
        if (err) throw err;

        res.send();
    });
};

