var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

app.use('/api', router);

require('./src/js/experiments/experiments.routes')(router);
require('./src/js/locations/locations.router')(router);

app.use(express.static('assets'));


mongoose.connect('mongodb://localhost/geo');

app.listen(3000);
console.log('Listening on port 3000...');