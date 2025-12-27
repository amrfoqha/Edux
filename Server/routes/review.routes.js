const express = require("express");
const router = express.Router();
const ReviewController = require('../controllers/review.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', ReviewController.findAllReviews);
router.get('/:id', ReviewController.findOneReview);
router.post('/', ReviewController.createReview);
router.patch('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
