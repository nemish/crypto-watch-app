const { updatePrice } = require('./models/helpers');
const Currency = require('./models/Currency');


// milliseconds
const REFRESH_TIME = 5 * 60 * 1000;

const runHandlers = () => {
  console.log(`Tick handlers at ${Date.now()}`);
  Currency.find({
    $or: [{
      lastUpdated: null
    }, {
      lastUpdated: {$lt: Date.now() - REFRESH_TIME}
    }]
  }, (err, items) => {
    console.log(`Items count to update ${items.length}`);
    items.forEach(item => {
      console.log(`Running update price job for ${item.code}`)
      updatePrice(item);
    });
  })
}

let interval = null;

module.exports = {
  start: () => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(runHandlers, 5000);
  }
}