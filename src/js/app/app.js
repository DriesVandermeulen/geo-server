var ExperimentOverviewView = require('../experiments/client/experiment-overview.view');
var ExperimentDetailView = require('../experiments/client/experiment-details.view');


var appRouter = Backbone.Router.extend({

    initialize: function() {
    },

    routes: {
        "": "getAllExperiments",
        "experiments": "getAllExperiments",
        "experiments/:id": "getExperimentById"
    },

    getAllExperiments: function () {
        this.experimentOverview = new ExperimentOverviewView();
        this.experimentOverview.render();
    },

    getExperimentById: function (id) {
        this.experimentDetail = new ExperimentDetailView({ experimentId: id });
        //this.experimentDetail.render();
    }
});

new appRouter();
Backbone.history.start();


