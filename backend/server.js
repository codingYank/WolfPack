import express from "express"
import posts from "./data/posts.js"
const port = 5000

const app = express()

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.get("/api/posts", (req, res) => {
  res.json(posts)
})

app.listen(port, () => console.log(`Server running on port ${port}`))
