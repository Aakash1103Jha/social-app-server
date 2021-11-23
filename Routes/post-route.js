const router = require("express").Router()
const PostController = require("../Controllers/post-controller")
const { postImgUploadHandler } = require("../Utils/multer.config")

router.get("/all-posts", PostController.getAllPosts)
router.post(
	"/new-post/:username",
	postImgUploadHandler.single("postImg"),
	PostController.newPostByUser,
)
router.delete("/delete-post/:postId", PostController.deleteOnePostById)
router.put("/like/:postId", PostController.likeOnePostById)
router.put("/dislike/:postId", PostController.dislikeOnePostById)

module.exports = router
