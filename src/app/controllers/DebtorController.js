const Debtor = require('../models/Debtor')

class DebtorController {
  async index (req, res) {
    const debtors = await Debtor.find({})

    return res.json(debtors)
  }

  async show (req, res) {
    const debtor = await Debtor.findById(req.params.id)

    return res.json(debtor)
  }

  async store (req, res) {
    const debtor = await Debtor.create({ ...req.body, user: req.userId })

    return res.json(debtor)
  }

  async update (req, res) {
    const debtor = await Debtor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(debtor)
  }

  async destroy (req, res) {
    await Debtor.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new DebtorController()
