const User = require("../Models/User")

exports.getOneUser = async (req, res) => {
	try {
		const users = await User.findOne({ username: req.params.username })
		return res.status(200).json(users)
	} catch (err) {
		return res.status(404).json(err.message)
	}
}
