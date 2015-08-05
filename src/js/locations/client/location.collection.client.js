var Location = require('./location.model.client');

module.exports = Backbone.Collection.extend({
    model: Location,
    url : function(){
        return "/api/experiments/" + this.experimentId + "/locations";
    },
    initialize: function(models, options) {
        this.experimentId = options.experimentId;
    }
});