import {
    Router
} from "express";

import UserController from "../controller/userController.js";
import checkToken from "../../../middlewares/auth/checkToken.js"

const router = new Router();

router.post("/auth", UserController.getAccessToken);
router.post("/auth/register", UserController.createUser);

router.use(checkToken);

router.get("/email/:email", UserController.findByEmail);

export default router;