const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  apiId: { type: String, unique: true },
  fullName: { type: String, unique: true },
  code: { type: String, unique: true },
  timestamp: { type: Date, default: Date.now },
  lastUpdated: { type: Date },
  prices: { type: Object },
  trackingByUsersCount: { type: Number }
});

module.exports = mongoose.model('Currency', CurrencySchema);
