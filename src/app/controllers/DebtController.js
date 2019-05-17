const Debt = require('../models/Debt')
const Debtor = require('../models/Debtor')
const User = require('../models/User')
const Mail = require('../services/Mail')

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

  async charge (req, res) {
    const user = await User.findById(req.userId)
    const debtor = await Debtor.findById(req.params.debtor_id)
    const debt = await Debt.findById(req.params.id)

    await Mail.sendMail({
      from: 'danielleal94@gmail.com',
      to: 'diegp@teste.com',
      subject: `Solicitacao de cobrança: ${debt.description}`,
      template: 'charge',
      context: { user, debtor, debt }
    })

    return res.json({ message: 'Email de cobrança enviado com sucesso!' })
  }
}

module.exports = new DebtController()
