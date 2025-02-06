const { Router } = require("express");
const { userSignup, adminSignup } = require("../controllers/auth/signup");
const { login } = require ("../controllers/auth/login");
const { logout } = require ("../controllers/auth/logout");
const { authenticateUser } = require("../middleware/full-auth");

const authRouter = Router();

authRouter.route("/user/signup").post(userSignup);
authRouter.route("/admin/signup").post(adminSignup);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(authenticateUser,logout);


module.exports = { authRouter };