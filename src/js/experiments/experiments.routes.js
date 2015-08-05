var controller = require('./experiments.controller');

module.exports = function(router){
    router.get('/experiments', controller.findAll);
    router.get('/experiments/:id', controller.findById);
    router.post('/experiments', controller.create);
    router.put('/experiments/:id', controller.update);
    router.delete('/experiments/:id', controller.delete);
};

