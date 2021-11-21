const router = require("express").Router()
const AuthController = require("../Controllers/auth-controller")

router.post("/login", AuthController.onLoginUser)
router.post("/register", AuthController.onRegisterUser)
router.put("/reset/:userId", AuthController.onResetPassword)
router.delete("/delete/:userId", AuthController.onDeleteUser)

module.exports = router
