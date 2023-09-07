import express from "express"
const router = express.Router()
import asyncHandler from "../middleware/asyncHandler.js"
import Post from "../models/post.js"

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.find({})
    res.json(posts)
  })
)

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (post) {
      return res.json(post)
    } else {
      res.status(404)
      throw new Error("Resource not found")
    }
  })
)

export default router
