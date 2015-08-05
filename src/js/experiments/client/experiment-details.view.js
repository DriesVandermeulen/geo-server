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