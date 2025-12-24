const FavoriteController = require('../controllers/favorite.controller');

module.exports = app => {
    app.get('/api/favorites', FavoriteController.findAllFavorites);
    app.get('/api/favorites/user/:userId', FavoriteController.findFavoritesByUserId);
    app.get('/api/favorites/:id', FavoriteController.findFavorite);
    app.post('/api/favorites', FavoriteController.createFavorite);
    app.patch('/api/favorites/:id', FavoriteController.updateFavorite);
    app.delete('/api/favorites/:id', FavoriteController.deleteFavorite);
}
