const { Schema, model } = require("mongoose")

const User = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		postCount: {
			type: Number,
			default: 0,
		},
		followerCount: {
			type: Number,
			default: 0,
		},
		followingCount: {
			type: Number,
			default: 0,
		},
		imgUrl: {
			type: String,
		},
	},
	{ timestamps: true },
)

module.exports = model("users", User)
