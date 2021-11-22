const router = require("express").Router()
const PostController = require("../Controllers/post-controller")

router.get("/all-posts", PostController.getAllPosts)
router.post("/new-post/:username", PostController.newPostByUser)
router.delete("/delete-post/:postId", PostController.deleteOnePostById)
router.put("/like/:postId", PostController.likeOnePostById)
router.put("/dislike/:postId", PostController.dislikeOnePostById)

module.exports = router
