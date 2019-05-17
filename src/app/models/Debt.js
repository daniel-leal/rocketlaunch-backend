const mongoose = require('mongoose')

const DebtSchema = new mongoose.Schema({
  amount_paid: {
    type: Number,
    required: true,
    default: 0.0
  },
  date: {
    type: Date,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  debtor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debtor',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Debt', DebtSchema)
