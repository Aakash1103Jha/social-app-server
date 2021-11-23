const User = require("../Models/User")

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		return res.status(200).json(users)
	} catch (err) {
		return res.status(404).json(err.message)
	}
}
