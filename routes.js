const passport = require('passport');
const userController = require('./controllers/user');
const currenciesController = require('./controllers/currencies');

const routes = app => {
  /**
   * Controllers (route handlers).
   */

  app.get('/', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    )
  });
  app.post('/login', userController.login);
  app.get('/fetch_current_user', passport.authenticate('jwt', { session: false }), userController.fetchCurrentUser);
  app.post('/track_currency', passport.authenticate('jwt', { session: false }), currenciesController.trackCurrency);
  app.post('/untrack_currency/', passport.authenticate('jwt', { session: false }), currenciesController.untrackCurrency);
  app.get('/currencies/', passport.authenticate('jwt', { session: false }), currenciesController.fetchCurrencies);
  app.get('/coinslist/', currenciesController.coinslist);
}

module.exports = routes;
