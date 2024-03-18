import express from "express"
import {meteorsFormController} from "./pages/meteors/meteors.controller.js"
import {handler as mainController} from "./pages/main/main.controller.js"
import {
    roverNameFormController,
    roverPhotoController
} from "./pages/rover/rover.controller.js";
import path from "path";
import {__dirname} from "./pages/utils/utils.js";
import {
    validateMeteorsFilterUiMiddleware,
    validateRoverNameMiddleware,
} from "../common/middleware/validation.middleware.js";
import {userController} from "./pages/user/user.controller.js";

export const router = express.Router();
router.get("/", mainController);

router.get("/user", userController);

router.get("/meteors", validateMeteorsFilterUiMiddleware, meteorsFormController);


router.get("/photos", roverNameFormController);
router.get("/photos/:rover", validateRoverNameMiddleware, roverPhotoController);

router.use("*", (req, res) =>
    res.render(path.resolve(__dirname(import.meta.url), "views", "page-not-found.html"))
);



