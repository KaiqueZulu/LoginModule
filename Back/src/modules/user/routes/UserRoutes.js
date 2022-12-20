import {
    Router
} from "express";

import UserController from "../controller/userController.js";
import checkToken from "../../../middlewares/auth/checkToken.js"

const router = new Router();

router.post("/auth", UserController.getAccessToken);

router.use(checkToken);

router.get("/email/:email", UserController.findByEmail);

export default router;