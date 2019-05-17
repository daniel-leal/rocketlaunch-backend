const express = require('express')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const controllers = require('./app/controllers')

/**
 * Home
 */
routes.get('/', (req, res) =>
  res.send({ health: true, version: '1.0', app: 'Uncalote.ME' })
)

routes.post('/users', handle(controllers.UserController.store))
routes.post('/sessions', handle(controllers.SessionController.store))

// Daqui pra baixo, precisa estar logado
routes.use(authMiddleware)

/**
 * Debtors
 */
routes.get('/debtors', handle(controllers.DebtorController.index))
routes.get('/debtors/:id', handle(controllers.DebtorController.show))
routes.post('/debtors', handle(controllers.DebtorController.store))
routes.put('/debtors/:id', handle(controllers.DebtorController.update))
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
  handle(controllers.DebtController.store)
)
routes.put(
  '/debtors/:debtor_id/debts/:id',
  handle(controllers.DebtController.update)
)
routes.delete(
  '/debtors/:debtor_id/debts/:id',
  handle(controllers.DebtController.destroy)
)

module.exports = routes
