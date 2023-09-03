import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import posts from "./data/posts.js"
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.get("/api/posts", (req, res) => {
  res.json(posts)
})

app.listen(port, () => console.log(`Server running on port ${port}`))