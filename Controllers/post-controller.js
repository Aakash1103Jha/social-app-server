const Post = require("../Models/Post")

exports.getAllPosts = async (req, res) => {
	try {
		const allPosts = await Post.find()
		return res.status(200).json(allPosts.reverse())
	} catch (error) {
		return res.status(404).json(error.message)
	}
}

exports.newPostByUser = async (req, res) => {
	// if (!req.body || !req.params || !req.file) {
	// 	return res.status(404).json("Something went wrong...")
	// }
	console.log({ body: req.body })
	console.log({ params: req.params })
	console.log({ file: req.file })
	// const username = req.params.username
	// const newPost = new Post({
	// 	content: req.body.content,
	// 	hashtags: req.body.hashtags,
	// 	imageUrl: req.body.imageUrl,
	// 	_username: username,
	// })
	// try {
	// 	const savedPost = await newPost.save()
	// 	return res.status(200).json(savedPost)
	// } catch (error) {
	// 	return res.status(404).json(error.message)
	// }
}

exports.deleteOnePostById = async (req, res) => {}

exports.likeOnePostById = async (req, res) => {}

exports.dislikeOnePostById = async (req, res) => {}
