const ReviewController = require('../controllers/review.controller');

module.exports = app => {
    app.get('/api/reviews', ReviewController.findAllReviews);
    app.get('/api/reviews/:id', ReviewController.findOneReview);
    app.post('/api/reviews', ReviewController.createReview);
    app.patch('/api/reviews/:id', ReviewController.updateReview);
    app.delete('/api/reviews/:id', ReviewController.deleteReview);
}
