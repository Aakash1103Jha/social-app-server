const router = require("express").Router()
const UserController = require("../Controllers/user-controller")

router.get("/user/:username", UserController.getOneUser)

module.exports = router
