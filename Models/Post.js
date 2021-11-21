const { Schema, model } = require("mongoose")

const User = new Schema(
	{
		content: [{ type: String, required: true }],
		hashtags: [{ type: String, required: true }],
		likes: {
			type: Number,
			default: 0,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		_userId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

module.exports = model("users", User)
