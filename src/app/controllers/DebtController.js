const Debt = require('../models/Debt')

class DebtController {
  async index (req, res) {
    const debts = await Debt.find({ debtor: req.params.debtor_id }).sort({
      is_active: -1,
      date: -1
    })

    return res.json(debts)
  }

  async show (req, res) {
    const debt = await Debt.findById(req.params.id)

    return res.json(debt)
  }

  async store (req, res) {
    const debt = await Debt.create({
      ...req.body,
      debtor: req.params.debtor_id
    })

    return res.json(debt)
  }

  async update (req, res) {
    const debt = await Debt.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(debt)
  }

  async destroy (req, res) {
    await Debt.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new DebtController()
