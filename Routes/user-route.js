const router = require("express").Router()
const UserController = require("../Controllers/user-controller")

router.get("/all-users", UserController.getAllUsers)

module.exports = router
