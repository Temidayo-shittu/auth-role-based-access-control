const { Router } = require("express");
const { userSignup, adminSignup } = require("../controllers/auth/signup");
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";


const authRouter = Router();

// Admin level routes
authRouter.route("/user/signup").post(userSignup);
authRouter.route("/admin/signup").post(adminSignup);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);


module.exports = { authRouter };