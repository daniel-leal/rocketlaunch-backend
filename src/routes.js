const express = require("express");
const handle = require("express-async-handler");

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const controllers = require("./app/controllers");

routes.get("/", (req, res) =>
  res.send({ healthy: true, version: "1.0", app: "Uncalote.ME" })
);

routes.post("/users", handle(controllers.UserController.store));
routes.post("/sessions", handle(controllers.SessionController.store));

// Daqui pra baixo, precisa estar logado
routes.use(authMiddleware);

/**
 * Debtors
 */
// routes.get("/ads", handle(controllers.AdController.index));
// routes.get("/ads/:id", handle(controllers.AdController.show));
// routes.post(
//   "/ads",
//   validate(validators.Ad),
//   handle(controllers.AdController.store)
// );
// routes.put(
//   "/ads/:id",
//   validate(validators.Ad),
//   handle(controllers.AdController.update)
// );
// routes.delete("/ads/:id", handle(controllers.AdController.destroy));

/**
 * Debts
 */
// routes.post(
//   "/purchases",
//   validate(validators.Purchase),
//   handle(controllers.PurchaseController.store)
// );

// routes.put("/purchases/:id", handle(controllers.PurchaseController.approve));

module.exports = routes;
