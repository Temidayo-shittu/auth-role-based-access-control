const { Router } = require("express");
const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');
const { deleteDelivery, createDelivery, getAllDeliveries, getSingleDelivery, updateDeliveryStatus } = require("../controllers/delivery/deliveryController");

const deliveryRouter = Router();

deliveryRouter.route("/").post([authenticateUser, authorizeRoles('CARRIER')], createDelivery);
deliveryRouter.route("/all").get([authenticateUser, authorizeRoles('CARRIER','ADMIN')], getAllDeliveries);
deliveryRouter.route("/:id").get(authenticateUser, getSingleDelivery);
deliveryRouter.route("/:id").patch([authenticateUser, authorizeRoles('CARRIER')], updateDeliveryStatus);
deliveryRouter.route("/:id").delete([authenticateUser, authorizeRoles('CARRIER','ADMIN')], deleteDelivery);

module.exports = { deliveryRouter };