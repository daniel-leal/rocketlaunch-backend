const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const controllers = require('./app/controllers')
const validators = require('./app/validators')

/**
 * Home
 */
routes.get('/', (req, res) =>
  res.send({ health: true, version: '1.0', app: 'Uncalote.ME' })
)

/**
 * Auth
 */
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// Daqui pra baixo, precisa estar logado
routes.use(authMiddleware)

/**
 * Debtors
 */
routes.get('/debtors', handle(controllers.DebtorController.index))
routes.get('/debtors/:id', handle(controllers.DebtorController.show))
routes.post(
  '/debtors',
  validate(validators.Debtor),
  handle(controllers.DebtorController.store)
)
routes.put(
  '/debtors/:id',
  validate(validators.Debtor),
  handle(controllers.DebtorController.update)
)
routes.delete('/debtors/:id', handle(controllers.DebtorController.destroy))

/**
 * Debts
 */
routes.get(
  '/debtors/:debtor_id/debts/',
  handle(controllers.DebtController.index)
)
routes.get(
  '/debtors/:debtor_id/debts/:id',
  handle(controllers.DebtController.show)
)
routes.post(
  '/debtors/:debtor_id/debts',
  validate(validators.Debt),
  handle(controllers.DebtController.store)
)
routes.put(
  '/debtors/:debtor_id/debts/:id',
  validate(validators.Debt),
  handle(controllers.DebtController.update)
)
routes.delete(
  '/debtors/:debtor_id/debts/:id',
  handle(controllers.DebtController.destroy)
)
routes.get(
  '/debtors/:debtor_id/debts/:id/charge',
  handle(controllers.DebtController.charge)
)

module.exports = routes
