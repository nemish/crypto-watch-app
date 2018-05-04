const fetch = require('node-fetch');
const getUrl = ({from, to='EUR'}) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`;

module.exports = {
  updatePrice: item => {
    return fetch(getUrl({from: item.code}))
      .then(res => {
        if (!res.ok) {
          console.log(`Update price fail for ${item.code}`)
          return {};
        }
        return res.json();
      }).then(data => {
        if (!data.EUR) {
          console.log(`No EUR price for ${item.code}`)
          return
        }
        console.log(`Updating price for ${item.code}`)
        if (!item.prices) {
          item.prices = {};
        }
        item.prices.EUR = data.EUR;
        item.lastUpdated = Date.now();
        return item.save().then(() => {
          console.log(`Price updated for ${item.code}`)
        })
      });
  }
}
