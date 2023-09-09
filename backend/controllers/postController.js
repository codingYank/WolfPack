import asyncHandler from "../middleware/asyncHandler.js"
import Post from "../models/post.js"
import User from "../models/user.js"

//@desc fetches all posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ parent: null }).populate("user")
  res.json(posts)
})

//@desc fetches a post
//@route GET /api/posts/:id
//@access Public
const getPostById = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id)
    .populate("user")
    .populate({
      path: "comments",
      model: "Post",
      populate: {
        path: "user",
        model: "User",
      },
    })

  if (post) {
    return res.status(200).json(post)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

export { getPostById, getPosts }
