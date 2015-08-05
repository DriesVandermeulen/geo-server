var Experiment = require('./experiment.model.client');

module.exports = Backbone.Collection.extend({
    model: Experiment,
    url : "/api/experiments"
});