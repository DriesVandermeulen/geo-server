var controller = require('./locations.controller');

module.exports = function(router){
    router.get('/locations', controller.findAll);
    router.get('/locations/:id', controller.findById);
    router.post('/locations', controller.create);
    router.put('/locations/:id', controller.update);
    router.delete('/locations/:id', controller.delete);

    router.get('/experiments/:experimentId/locations', controller.findAllByExperiment);
};

