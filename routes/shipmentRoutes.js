const { Router } = require("express");
const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');
const { getAllShipments, getSingleShipment, updateShipmentStatus, createShipment } = require("../controllers/shipment/shipmentController");
const { deleteDelivery } = require("../controllers/delivery/deliveryController");

const shipmentRouter = Router();

shipmentRouter.route("/").post([authenticateUser, authorizeRoles('SHIPPER')], createShipment);
shipmentRouter.route("/all").get([authenticateUser, authorizeRoles('SHIPPER','ADMIN')], getAllShipments);
shipmentRouter.route("/:id").get(authenticateUser, getSingleShipment);
shipmentRouter.route("/:id").patch([authenticateUser, authorizeRoles('SHIPPER')], updateShipmentStatus);
shipmentRouter.route("/:id").delete([authenticateUser, authorizeRoles('SHIPPER','ADMIN')], deleteDelivery);

module.exports = { shipmentRouter };