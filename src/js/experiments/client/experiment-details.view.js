var LocationView = require('../../locations/client/location-item.view.client');
var LocationCollection = require('../../locations/client/location.collection.client');
var ExperimentCollection = require('../../experiments/client/experiment.collection.client');

module.exports = Backbone.View.extend({
    el: '#container',
    template: _.template($('#experiment-details-template').html()),
    experimentCollection: new ExperimentCollection(),

    initialize: function (options) {
        var self = this;
        var experimentId = options.experimentId;

        this.experimentCollection.fetch().done(function(){
            self.model = self.experimentCollection.findWhere({_id: experimentId});
            self.locationCollection = new LocationCollection([], { experimentId: self.model.get('_id') });

            self.locationCollection.fetch().done(function(){
                self.render();
                self.addAll();
            });
        });
    },
    addOne: function(location){
        var view = new LocationView({model: location});
        $('#location-list').append(view.render().el);
    },
    addAll: function(){
        this.$('#location-list').html('');
        this.locationCollection.each(this.addOne, this);
    },
    render: function(){
        this.$el.html(this.template(this.model.toTemplateJSON()));
        return this;
    }
});

