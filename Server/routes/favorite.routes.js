const express = require("express");
const router = express.Router();
const FavoriteController = require('../controllers/favorite.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', FavoriteController.findAllFavorites);
router.get('/user/:userId', FavoriteController.findFavoritesByUserId);
router.get('/:id', FavoriteController.findFavorite);
router.post('/', FavoriteController.createFavorite);
router.patch('/:id', FavoriteController.updateFavorite);
router.delete('/:id', FavoriteController.deleteFavorite);

module.exports = router;
