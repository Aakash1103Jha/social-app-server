const multer = require("multer")
const path = require("path")

const fileTypes = ["image/jpg", "image/jpeg", "image/png"]

const userAvatarStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(
			null,
			path.resolve(__dirname, "..", "..", "social-app", "public", "Uploads", "User-Avatar"),
		)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + Date.now().toString())
	},
})
const postImgStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(
			null,
			path.resolve(__dirname, "..", "..", "social-app", "public", "Uploads", "Post-Imgs"),
		)
	},
	filename: (req, file, cb) => {
		cb(null, Date.now().toString() + "-" + file.originalname)
	},
})
const commonFileFilter = (req, file, cb) => {
	if (fileTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const postImgUploadHandler = multer({ fileFilter: commonFileFilter, storage: postImgStorageEngine })
const userAvatarUploadHandler = multer({
	fileFilter: commonFileFilter,
	storage: userAvatarStorageEngine,
})

module.exports = { postImgUploadHandler }
