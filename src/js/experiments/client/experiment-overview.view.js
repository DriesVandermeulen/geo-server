var ExperimentView = require('./experiment-item.view.client');
var ExperimentsCollection = require('./experiment.collection.client');

module.exports = Backbone.View.extend({
    el: '#container',
    template: _.template($('#experiment-overview-template').html()),
    collection: new ExperimentsCollection(),

    initialize: function() {
        var self = this;

        this.collection.fetch().done(function(){
            self.addAll();
        });
    },
    addOne: function(todo) {
        var view = new ExperimentView({model: todo});
        $('#experiment-list').append(view.render().el);
    },
    addAll: function() {
        this.$('#experiment-list').html('');
        this.collection.each(this.addOne, this);
    },
    render: function() {
        this.$el.html(this.template());
        this.addAll();
    }
});

