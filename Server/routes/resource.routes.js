const ResourceController = require('../controllers/resource.controller');

module.exports = app => {
    app.get('/api/resources', ResourceController.findAllResources);
    app.get('/api/resources/:id', ResourceController.findResource);
    app.post('/api/resources', ResourceController.createResource);
    app.patch('/api/resources/:id', ResourceController.updateResource);
    app.delete('/api/resources/:id', ResourceController.deleteResource);
}
