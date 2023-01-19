import {
    Router
} from "express";

import UserController from "../controller/userController.js";
import checkToken from "../../../middlewares/auth/checkToken.js"

const router = new Router();

router.get("/auth", UserController.getAccessToken);
router.post("/register", UserController.createUser);

router.get("/email/:email", checkToken, UserController.findUserByEmail);

export default router;