const { Router } = require("express");
const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');
const { getAllUsers, getSingleUser, showCurrentUser } = require("../controllers/user/getUser");

const userRouter = Router();

// Admin level routes
userRouter.route("/all").get([authenticateUser, authorizeRoles('ADMIN')], getAllUsers);

// User level routes
userRouter.route("/:id").get(authenticateUser, getSingleUser);
userRouter.route("/").get(authenticateUser, showCurrentUser);

module.exports = { userRouter };