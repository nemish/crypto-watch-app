const fetch = require('node-fetch')
const Currency = require('../models/Currency');
const User = require('../models/User');
const { updatePrice } = require('../models/helpers');

exports.fetchCurrencies = (req, res, next) => {
  Currency.find({_id: { $in: req.user.currencies }}, (err, currencies) => {
    if (err) {
      return res.status(400).send({
        _error: 'Error while fetching currencies'
      });
    }
    return res.json({
      items: currencies
    });
  })
}

exports.trackCurrency = (req, res, next) => {
  const { currency } = req.body;
  const { user } = req;
  Currency.findOne({apiId: currency.value}, (err, cur) => {
    if (err) {
      return res.status(400).send({_error: err});
    }

    if (cur) {
      user.trackCurrency(cur._id).then(() => {
        return res.json({status: 'added'});
      });
    } else {
      const newCur = new Currency({
        name: currency.data.name,
        code: currency.data.symbol,
        fullName: currency.label,
        apiId: currency.value
      });

      newCur.save().then((created) => {
        user.trackCurrency(created._id).then(() => {
          return updatePrice(newCur);
        }).then(() => {
          res.json({status: 'added'});
        });
      });
    }

  });
}

exports.untrackCurrency = (req, res, next) => {
  const { currency_id } = req.body;
  const { user } = req;
  user.untrackCurrency(currency_id).then(() => {
    return res.json({status: 'deleted'});
  });
}


const API_URL = 'https://min-api.cryptocompare.com/';
const COINS_LIST_API_URL = `${API_URL}data/all/coinlist`;

exports.coinslist = (req, res, next) => {
  fetch(COINS_LIST_API_URL)
    .then(response => response.json())
    .then(data => {
      const options = Object.entries(data.Data).map(([key, item]) => {
        return {
          label: item.FullName,
          value: item.Id,
          data: {
            name: item.CoinName,
            symbol: key
          }
        }
      });
      return res.json({ options });
  });
}
