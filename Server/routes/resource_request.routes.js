const ResourceRequestController = require('../controllers/resource_request.controller');

module.exports = app => {
    app.get('/api/resource-requests', ResourceRequestController.findAllRequests);
    app.get('/api/resource-requests/:id', ResourceRequestController.findOneRequest);
    app.post('/api/resource-requests', ResourceRequestController.createRequest);
    app.patch('/api/resource-requests/:id', ResourceRequestController.updateRequest);
    app.delete('/api/resource-requests/:id', ResourceRequestController.deleteRequest);
}
