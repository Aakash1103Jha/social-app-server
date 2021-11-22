require("dotenv/config")

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

try {
	mongoose.connect(process.env.ATLAS_URI, () => {
		console.log(`MongoDB Atlas connected!`)
	})
} catch (err) {
	console.error(`MongoDB connection failed: ${err.message}`)
}

const AuthRoute = require("./Routes/auth-route")
const PostRoute = require("./Routes/post-route")
const UserRoute = require("./Routes/user-route")

app.use("/auth/", AuthRoute)
app.use("/post/", PostRoute)
app.use("/users/", UserRoute)
