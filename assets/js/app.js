(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{"../experiments/client/experiment-details.view":2,"../experiments/client/experiment-overview.view":4}],2:[function(require,module,exports){
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
                self.generateMap();
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
    generateMap: function(){
        var firstLocation = this.locationCollection.models[0];
        var lastLocation = this.locationCollection.models[this.locationCollection.models.length-1];
        var mapCanvas = document.getElementById('google-map');
        var mapOptions = {
            center: new google.maps.LatLng(firstLocation.attributes.latitude, firstLocation.attributes.longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var markers = [];

        var firstMarker = new google.maps.Marker({
            position: new google.maps.LatLng(firstLocation.attributes.latitude, firstLocation.attributes.longitude),
            map: map,
            title: firstLocation.created_at_formatted_time()
        });
        var lastMarker = new google.maps.Marker({
            position: new google.maps.LatLng(lastLocation.attributes.latitude, lastLocation.attributes.longitude),
            map: map,
            title: lastLocation.created_at_formatted_time()
        });

        markers.push(firstMarker);
        markers.push(lastMarker);

        var flightPlanCoordinates = [];

        this.locationCollection.each(function(location){
            flightPlanCoordinates.push(new google.maps.LatLng(location.attributes.latitude, location.attributes.longitude))
        });

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        flightPath.setMap(map);

        this.map = map;
        this.markers = markers;
        this.flightPath = flightPath;
    },
    render: function(){
        this.$el.html(this.template(this.model.toTemplateJSON()));
        return this;
    }
});
},{"../../experiments/client/experiment.collection.client":5,"../../locations/client/location-item.view.client":7,"../../locations/client/location.collection.client":8}],3:[function(require,module,exports){
module.exports = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#experiment-item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toTemplateJSON()));
        return this;
    }
});






},{}],4:[function(require,module,exports){
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


},{"./experiment-item.view.client":3,"./experiment.collection.client":5}],5:[function(require,module,exports){
var Experiment = require('./experiment.model.client');

module.exports = Backbone.Collection.extend({
    model: Experiment,
    url : "/api/experiments"
});
},{"./experiment.model.client":6}],6:[function(require,module,exports){
module.exports = Backbone.Model.extend({
    defaults: {
        _id: '',
        __v: '',
        name: '',
        created_at: ''
    },
    created_at_formatted: function() {
        var date = new Date(this.created_at);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    },
    restUrl : function() {
        return this.id ? "/api/experiments" : "/api/experiments/" + this._id;
    },
    routerUrl : function() {
        return this.id ? "/#/experiments" : "/#/experiments/" + this._id;
    },
    toTemplateJSON: function() {
        var attr = this.toJSON();
        attr.restUrl = this.restUrl;
        attr.routerUrl = this.routerUrl;
        attr.created_at_formatted = this.created_at_formatted;
        return attr;
    }
});
},{}],7:[function(require,module,exports){
module.exports = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#location-item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toTemplateJSON()));
        return this;
    }
});






},{}],8:[function(require,module,exports){
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
},{"./location.model.client":9}],9:[function(require,module,exports){
module.exports = Backbone.Model.extend({
    defaults: {
        _id: '',
        __v: '',
        latitude: '',
        longitude: '',
        experiment: '',
        created_at: ''
    },
    created_at_formatted: function() {
        var date = new Date(this.created_at);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    },
    created_at_formatted_time: function() {
        var date = new Date(this.created_at);
        return date.getHours() + ':' + date.getMinutes();
    },
    toTemplateJSON: function() {
        var attr = this.toJSON();
        attr.created_at_formatted = this.created_at_formatted;
        attr.created_at_formatted_time = this.created_at_formatted_time;
        return attr;
    }
});
},{}]},{},[1]);
