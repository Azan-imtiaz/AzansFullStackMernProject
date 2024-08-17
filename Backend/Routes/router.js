const express = require("express");
const upload = require("../multerConfig/storageConfig");

const router = new express.Router();
const controllers = require("../Controllers/usersControllers");

//routes

//api for regsiter user

router.post(
  "/user/register",
  upload.single("user_profile"),
  controllers.userpost
);

//api for userget
router.get("/user/details", controllers.userget);

router.get("/user/:id", controllers.singleUserGetFunction);
router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  controllers.userEdit
);

router.delete("/user/delete/:id", controllers.deleteUser);
router.put("/user/status/:id", controllers.userStatus);
router.get("/user/status/userexport",controllers.userExport);
module.exports = router;
