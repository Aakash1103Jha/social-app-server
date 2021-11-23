const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.onRegisterUser = async (req, res) => {
	// if req.body is empty
	if (!req.body) {
		return res.status(400).json("Please provide details for all mandatory fields")
	}
	// if req.body exists
	const emailInput = req.body.email
	const passwordInput = req.body.password

	// check if email alrady exists
	const user = await User.findOne({ email: emailInput.trim() })
	if (user) {
		return res.status(400).json("User with this email already exists")
	}

	// check if username is already taken
	const isUsernameTaken = await User.findOne({ username: req.body.username })
	if (isUsernameTaken) {
		return res.status(400).json("Username already in use. Please try another one.")
	}

	// check for valid password -> must be al least 8 characters
	// can use regex : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
	if (passwordInput.trim().length < 8) {
		return res.status(400).json("Password must be at least 8 characters")
	}

	// hash password
	const salt = await bcrypt.genSalt(5)
	const hashPassword = await bcrypt.hash(passwordInput, salt)

	// create and save new user
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: emailInput,
		password: hashPassword,
	})
	try {
		const saveNewUser = await newUser.save()
		return res.status(200).json(saveNewUser)
	} catch (error) {
		return res.status(502).json(error.message)
	}
}

exports.onLoginUser = async (req, res) => {
	// if req.body is empty
	if (!req.body) {
		return res.status(400).json("Please provide details for all mandatory fields")
	}
	const username = req.body.username
	const passwordInput = req.body.password

	// check if user exists
	const user = await User.findOne({ username: username.trim() })
	if (!user) {
		return res.status(400).json("User does not exists")
	}
	// check if password is correct
	const validPassword = await bcrypt.compare(passwordInput, user.password)

	if (!validPassword) {
		return res.status(400).json("Invalid password")
	}
	const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET)
	return res.status(200).json(token)
}

exports.onDeleteUser = async (req, res) => {}

exports.onResetPassword = async (req, res) => {
	// check for req.body
	if (!req.body) {
		return res.status(400).json("Please provide details for all mandatory fields")
	}
	try {
		// check if user is already registered
		const user = await User.findOne({ email: req.body.email })

		if (!user) {
			// user is not registered
			return res.status(404).json("User with this email does not exist")
		}
		try {
			// user is registered and found in DB
			// hash password
			const salt = await bcrypt.genSalt(5)
			const newHashPassword = await bcrypt.hash(req.body.password, salt)

			// update user password with new hash password
			await User.findOneAndUpdate(
				{ email: user.email },
				{ $set: { password: newHashPassword } },
				{ upsert: false, useFindAndModify: false },
				(err, doc) => {
					if (err) {
						console.error(err.message)
						return res.status(504).json(err.message)
					}
					return res.status(200).json(doc)
				},
			)
		} catch (error) {
			console.error(`Password reset error: ${error.message}`)
			return res.status(504).json(error.message)
		}
	} catch (error) {
		console.error(`Error in finding user: ${error.message}`)
	}
}
