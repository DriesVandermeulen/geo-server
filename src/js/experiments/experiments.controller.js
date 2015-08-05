var Experiment = require('./experiments.modal');

exports.findAll = function(req, res) {

    Experiment.find({}, function(err, users) {
        if (err) throw err;

        res.send(users);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;

    Experiment.findById(id, function(err, experiment) {
        if (err) throw err;

        res.send(experiment);
    });
};

exports.create = function(req, res) {
    var name = req.body.name;

    var newExperiment = Experiment({
        name: name,
        created_at: new Date()
    });

    newExperiment.save(function(err, experiment) {
        if (err) throw err;

        res.send(experiment);
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var name = req.body.name;

    Experiment.findByIdAndUpdate(id, { name: name }, function(err, experiment) {
        if (err) throw err;

        res.send(experiment);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Experiment.findByIdAndRemove(id, function(err) {
        if (err) throw err;

        res.send();
    });
};