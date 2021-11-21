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
